import { createHash } from 'node:crypto';

const namespace = 'milk-mile:2027';
const consentText = 'I agree to receive a verification code and occasional SD Milk Mile race updates by text.';
const hash = value => createHash('sha256').update(value).digest('hex');

async function redis(command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.UPSTASH_REDIS_REST_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw Error('Storage unavailable');
  const data = await response.json();
  if (data.error) throw Error('Storage unavailable');
  return data.result;
}

// Reserve an SMS atomically across serverless instances before contacting the provider.
const reserveSms = `
  if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
  if tonumber(redis.call('GET', KEYS[2]) or 0) >= 8 then return 0 end
  if tonumber(redis.call('GET', KEYS[3]) or 0) >= 60 then return 0 end
  redis.call('SET', KEYS[1], 1, 'EX', 60)
  for i = 2, 3 do
    if redis.call('INCR', KEYS[i]) == 1 then redis.call('EXPIRE', KEYS[i], 3600) end
  end
  return 1
`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const reply = (status, message) => res.status(status).json({ message });
  if (req.method !== 'POST') return reply(405, 'Use the signup form.');
  const { action, phone: raw, code, consent } = req.body ?? {};
  const digits = typeof raw === 'string' ? raw.replace(/[\s()+.\-]/g, '') : '';
  if (!/^1?[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return reply(400, 'Enter a valid 10-digit number.');
  if (!['send', 'verify'].includes(action) || consent !== true) return reply(400, 'Confirm that you want race texts.');
  if (action === 'verify' && !/^\d{4,10}$/.test(String(code))) return reply(400, 'Enter the code from your text.');
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
  if (![TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN].every(Boolean)) {
    return reply(503, 'Text signup is not open yet. Please check back soon.');
  }
  const phone = '+1' + digits.slice(-10);
  try {
    const start = action === 'send';
    if (start) {
      const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
      const allowed = await redis(['EVAL', reserveSms, 3, namespace + ':cooldown:' + hash(phone), namespace + ':ip:' + hash(ip), namespace + ':hour']);
      if (!allowed) return reply(429, 'Please wait before requesting another code.');
    }
    const endpoint = start ? 'Verifications' : 'VerificationCheck';
    const response = await fetch('https://verify.twilio.com/v2/Services/' + TWILIO_VERIFY_SERVICE_SID + '/' + endpoint, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN).toString('base64') },
      body: new URLSearchParams(start ? { To: phone, Channel: 'sms' } : { To: phone, Code: String(code) }),
    });
    if (response.status === 429) return reply(429, 'Too many attempts. Please try again later.');
    if (!response.ok) {
      if (!start && [400, 404].includes(response.status)) return reply(400, 'Invalid or expired code. Check it or request another.');
      return reply(502, 'Text verification is unavailable. Please try again later.');
    }
    const result = await response.json();
    if (start && result.status === 'pending') return reply(200, 'Code sent. Check your texts.');
    if (start || result.status !== 'approved' || result.to !== phone) return reply(400, 'Check your code and try again.');
    await redis(['HSET', namespace + ':subscribers', phone, JSON.stringify({ verifiedAt: new Date().toISOString(), consent: consentText })]);
    return reply(200, 'You’re signed up for SD Milk Mile race updates.');
  } catch {
    return reply(503, 'Signup could not be completed. Please try again with a new code.');
  }
}
