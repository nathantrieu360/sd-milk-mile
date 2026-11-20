import { useEffect, useState } from 'react';

const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function Fundraising() {
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    let timer;
    async function refresh() {
      try {
        const response = await fetch('/api/fundraising', { signal: controller.signal });
        if (!response.ok) throw new Error();
        const { amountCents } = await response.json();
        if (!Number.isSafeInteger(amountCents) || amountCents < 0) throw new Error();
        if (!controller.signal.aborted) {
          setTotal(amountCents);
          setStatus('ready');
        }
      } catch {
        if (!controller.signal.aborted) setStatus('unavailable');
      } finally {
        if (!controller.signal.aborted) timer = setTimeout(refresh, 60000);
      }
    }
    refresh();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  return <section className="fundraising" aria-labelledby="fundraising-title">
    <h2 id="fundraising-title">2027 race fees raised for charity</h2>
    <p aria-live="polite">
      {total !== null && <strong>{dollars.format(total / 100)}</strong>}
      {status === 'loading' && 'Checking the total…'}
      {status === 'unavailable' && (total === null ? 'Live total unavailable.' : 'Last known total · updates paused')}
    </p>
    <small>2026 race raised $350 for Ronald McDonald House Charities.</small>
  </section>;
}
