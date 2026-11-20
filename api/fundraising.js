const ordersUrl = 'https://api.tickettailor.com/v1/orders';

function cents(value) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid amount');
  return value;
}

function raceFees(order, eventId) {
  if (order.event_summary?.event_id !== eventId) throw new Error('Unexpected event');
  if (['pending', 'cancelled'].includes(order.status)) return 0;
  if (order.status !== 'completed' || order.currency?.code !== 'usd') throw new Error('Unexpected order');

  const retained = Math.max(0, cents(order.total_paid) - cents(order.refund_amount) - cents(order.credited_out_amount ?? 0));
  if (!retained) return 0;

  // Only race entries are sold by this checkout. If paid extras are introduced,
  // their payments and refunds need separate attribution before publishing a total.
  if (!order.line_items?.some(item => item.type === 'ticket') ||
      order.line_items.some(item => !['ticket', 'void', 'gift_card'].includes(item.type) && item.total !== 0) ||
      order.line_items.some(item => item.booking_fee > 0) || order.tax > 0 || order.sold_products?.length) {
    throw new Error('Mixed order');
  }
  return retained;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const key = process.env.TICKET_TAILOR_API_KEY;
  const eventId = process.env.TICKET_TAILOR_EVENT_ID;
  if (!key || !/^ev_\d+$/.test(eventId || '')) return res.status(503).json({ available: false });

  try {
    const url = new URL(ordersUrl);
    url.searchParams.set('event_id', eventId);
    const seen = new Set();
    let amountCents = 0;
    do {
      const response = await fetch(url, {
        headers: { Accept: 'application/json', Authorization: 'Basic ' + Buffer.from(key).toString('base64') },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error('Orders unavailable');
      const page = await response.json();
      for (const order of page.data) {
        if (!seen.has(order.id)) amountCents += raceFees(order, eventId);
        seen.add(order.id);
      }
      if (page.links?.next === null) break;
      const cursor = new URL(page.links.next, ordersUrl).searchParams.get('starting_after');
      if (!cursor || cursor === url.searchParams.get('starting_after')) throw new Error('Invalid cursor');
      url.searchParams.set('starting_after', cursor);
    } while (true);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
    return res.status(200).json({ amountCents });
  } catch {
    return res.status(503).json({ available: false });
  }
}
