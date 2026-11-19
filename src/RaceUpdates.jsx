import { useState } from 'react';

export default function RaceUpdates() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [stage, setStage] = useState('send');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const response = await fetch('/api/race-updates', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, consent, action: stage }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) setStage(stage === 'send' ? 'verify' : 'done');
    } catch {
      setMessage('Couldn’t reach text signup. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <section className="sms-box" aria-labelledby="sms-title">
    <h3 id="sms-title">Get race updates by text</h3>
    {stage !== 'done' && <form onSubmit={submit}>
      {stage === 'send' ? <>
        <label htmlFor="race-phone">Mobile number (+1)</label>
        <input id="race-phone" type="tel" autoComplete="tel" placeholder="(858) 555-0123" required value={phone} onChange={e => setPhone(e.target.value)} />
        <label className="sms-consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />I agree to receive a verification code and occasional SD Milk Mile race updates by text.</label>
        <small>Message frequency varies. Message and data rates may apply.</small>
      </> : <>
        <label htmlFor="race-code">Verification code sent to {phone}</label>
        <input id="race-code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{4,10}" required value={code} onChange={e => setCode(e.target.value)} />
      </>}
      <div className="sms-controls"><button className="button" disabled={busy}>{busy ? 'Please wait…' : stage === 'send' ? 'Text me a code' : 'Verify & sign up'}</button>
        {stage === 'verify' && <button type="button" disabled={busy} onClick={() => { setStage('send'); setCode(''); setMessage(''); }}>Change number or resend</button>}
      </div>
    </form>}
    <p role="status">{message}</p>
  </section>;
}
