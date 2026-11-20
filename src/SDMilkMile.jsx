import { useEffect, useSyncExternalStore } from 'react';
import RaceUpdates from './RaceUpdates';
import './race.css';
import paymentPhoto from './assets/race-payment.webp';
import ticketPhoto from './assets/race-ticket.webp';
import checkInPhoto from './assets/bib-pickup.webp';
import preRace from '../1.png';
import racing from '../2.png';
import medal from '../3.png';
import logo from '../4.png';
import group from '../6.png';
import champion from '../7.webp';
import milk from '../8.webp';
import fuel from '../9.webp';
import setup from '../10.webp';

const instagram = 'https://www.instagram.com/sd.milk.mile.association/';
const album = 'https://www.instagram.com/p/DZ_fpTxHJ4s/?img_index=1';
const seasons = [
  { year: 2026, runners: [
    ['Ryan Polk', 'Mira Mesa', '5:34'],
    ['Jayden Moffit', 'Rancho Bernardo'],
    ['Josh Porter', 'San Marcos'],
  ] },
  { year: 2025, runners: [
    ['Cooper Castleberry', 'Poway', '5:33', 'Course record'],
    ['Jaxon Northcut', 'Mt. Carmel'],
    ['Aaron Moyse', 'Poway'],
  ] },
];
const gallery = [
  [group, 'Runners lined up on the track'], [preRace, 'Runners before the race'],
  [racing, 'Runner rounding the track'], [medal, 'Finisher wearing a medal'],
  [champion, 'Runner holding up his medal'], [milk, 'Runner drinking milk'],
  [fuel, 'Runner at the milk station'], [setup, 'Race supplies beside the track'],
];

const registrationSteps = [
  { photo: paymentPhoto, title: 'Register online', detail: 'One $22.50 entry covers one runner, a race bib, and milk for all four laps.' },
  { photo: ticketPhoto, title: 'Save your ticket', detail: 'Show the ticket from your confirmation email at bib pickup. On iPhone, tap Add to Apple Wallet if it appears in the email.' },
  { photo: checkInPhoto, title: 'Pick up your bib', detail: 'Show the ticket code on your phone so a volunteer can scan it and hand you your bib.' },
];

const raceEventId = 2543672;
const raceBoxOffice = 'sdmilkmileassociation';
const raceUrl = `https://buytickets.at/${raceBoxOffice}/${raceEventId}`;

function openRegistration(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (typeof window.TTWidget?.loadEvent === 'function') {
    window.TTWidget.loadEvent(raceBoxOffice, raceEventId, 'widget');
    event.preventDefault();
  }
}

function Cover() {
  return <>
      <section className="hero" aria-labelledby="race-title">
        <div className="race-photo"><img src={racing} alt="Runner rounding the track at the SD Milk Mile" fetchpriority="high" /></div>
        <div className="track-lanes" aria-hidden="true" />
        <div className="hero-copy">
          <h1 id="race-title" aria-label="SD Milk Mile">SD<br />Milk<br />Mile</h1>
          <p className="hero-date"><time dateTime="2027-06-19">June 19, 2027</time></p>
          <p className="label">6 PM · 4S Ranch</p>
          <div className="actions"><a className="button" href={raceUrl} onClick={openRegistration}>Register · $22.50 →</a><a className="text-link" href="#info">Race info</a></div>
          <p className="charity-notice">100% of race fees go to charity.</p>
        </div>
      </section>
      <a className="results-strip" href="#results"><strong>Results</strong><span>2026 winner · {seasons[0].runners[0][0]} · {seasons[0].runners[0][2]}</span><b aria-hidden="true">→</b></a>
      <section className="wrap about" id="about"><h2>The milk mile</h2>
        <p>Drink a serving of milk, run a lap, and repeat four times. High school and college runners from across San Diego line up for the mile. The first three finishers take home medals.</p>
        <p>The second annual summer race raised $350 for Ronald McDonald House Charities.</p>
      </section>
  </>;
}

function Results() {
  return <>
      <section className="recap" id="event" aria-label="2026 race recap">
        <div><span>2026 race recap</span><strong>June 23 · Village Green Park</strong></div>
        <div><span>Field size</span><strong>20 runners</strong></div>
        <div><span>Raised for RMHC</span><strong>$350</strong></div>
      </section>
      <section className="wrap" id="leaderboard">
        <h1 className="page-title">Race Results</h1>
        <div className="boards">{seasons.map(({year, runners}) =>
          <table key={year}><caption>{year} podium</caption>
            <thead><tr><th scope="col">Place</th><th scope="col">Athlete / school</th><th scope="col">Time</th></tr></thead>
            <tbody>{runners.map(([name, school, time, record], i) =>
              <tr key={name}><td>{String(i + 1).padStart(2, '0')}</td>
                <th scope="row">{name}<small>{school}</small></th>
                <td>{time ?? '—'}{record && <small>{record}</small>}</td>
              </tr>)}</tbody>
          </table>)}</div>
      </section>
  </>;
}

function RaceInfo() {
  return <>
      <section className="next" id="next" aria-labelledby="next-title">
        <div>
          <p className="label">2027 Info</p>
          <h1 className="page-title" id="next-title">Summer Milk Mile</h1>
          <p className="race-schedule"><time dateTime="2027-06-19T18:00:00-07:00">Sat, June 19 · 6:00 PM</time> · 4S Ranch</p>
          <p className="next-details">Digital receipts and optional race updates by text.</p>
        </div>
        <div className="registration-actions">
          <a className="button" href={raceUrl} onClick={openRegistration}>Register · $22.50</a>
          <p className="entry-charity">Your full $22.50 entry fee goes to Ronald McDonald House Charities. We cover processing fees.</p>
          <a className="text-link" href={instagram}>Follow race updates ↗</a>
        </div>
        <div className="registration-guide">
          <h3>How registration works</h3>
          <ol>{registrationSteps.map(({ photo, title, detail }) =>
            <li key={title}>
              <img src={photo} alt="" loading="lazy" width="112" height="112" />
              <div><strong>{title}</strong><p>{detail}</p></div>
            </li>
          )}</ol>
        </div>
        <RaceUpdates />
      </section>
  </>;
}

function Media() {
  return <>
      <section className="wrap" id="gallery">
        <div className="section-head"><h1 className="page-title">Media</h1><a className="button" href={album}>2026 photos on Instagram ↗</a></div>
        <h2 className="media-title">Race photos</h2>
        <div className="gallery">{gallery.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" />)}</div>
      </section>
        <section className="wrap highlights" id="video"><h2 className="media-title">2025 highlights</h2><iframe loading="lazy" src="https://www.youtube.com/embed/DXD_yoVHPec" title="2025 SD Summer Milk Mile highlights" allowFullScreen />
      </section>
  </>;
}

const pages = [
  { id: 'cover', label: 'Cover', View: Cover, aliases: ['top', 'about'] },
  { id: 'results', label: 'Race Results', View: Results, aliases: ['event', 'leaderboard'] },
  { id: 'info', label: '2027 Info', View: RaceInfo, aliases: ['next'] },
  { id: 'media', label: 'Media', View: Media, aliases: ['gallery', 'video'] },
];

function subscribeToNavigation(listener) {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}

function currentHash() {
  return typeof window === 'undefined' ? '' : window.location.hash;
}

export default function SDMilkMile() {
  const hash = useSyncExternalStore(subscribeToNavigation, currentHash, currentHash);
  const id = hash.slice(1);
  const page = pages.find(item => item.id === id || item.aliases.includes(id)) ?? pages[0];
  useEffect(() => {
    document.title = page.label + ' · SD Milk Mile Association';
    const section = document.getElementById(id);
    if (page.aliases.includes(id) && section) section.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [page, id]);
  const { View } = page;
  return <>
    <header><nav aria-label="Main navigation">
      <a className="brand" href="#cover"><img src={logo} alt="" />SD Milk Mile</a>
      <div className="nav-links">{pages.map(item =>
        <a key={item.id} href={'#' + item.id} aria-current={page === item ? 'page' : undefined}>{item.label}</a>
      )}</div>
      <a className="button nav-register" href={raceUrl} onClick={openRegistration}>Register</a>
    </nav></header>
    <main><View /></main>
    <footer><strong>SD Milk Mile Association</strong><div><a href={instagram}>Instagram ↗</a><a href="https://youtu.be/DXD_yoVHPec">YouTube ↗</a></div></footer>
  </>;
}
