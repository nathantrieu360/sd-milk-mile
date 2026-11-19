import './race.css';
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

export default function SDMilkMile() {
  return <>
    <header><nav aria-label="Main navigation">
      <a className="brand" href="#top"><img src={logo} alt="" />SD Milk Mile</a>
      <div className="nav-links"><a href="#leaderboard">Results</a><a href="#gallery">Photos</a><a href="#next">2027 race</a></div>
    </nav></header>
    <main id="top">
      <section className="hero" aria-labelledby="race-title">
        <div className="hero-copy">
          <p className="label">San Diego Milk Mile Association</p>
          <h1 id="race-title">SD Milk<br/><em>Mile.</em></h1>
          <p className="distance">4 laps <span>/</span> 4 milks <span>/</span> 1 mile</p>
          <div className="actions"><a className="button" href="#leaderboard">Race results ↓</a><a className="text-link" href="#next">2027 race info</a></div>
        </div>
        <div className="race-photo"><img src={racing} alt="Milk Mile runner taking the curve on a red track" /></div>
      </section>
      <section className="recap" id="event" aria-label="2026 race recap">
        <div><span>2026 race recap</span><strong>June 23 · Village Green Park</strong></div>
        <div><span>Field size</span><strong>20 runners</strong></div>
        <div><span>Raised for RMHC</span><strong>$350</strong></div>
        <div><span>Race sponsor</span><strong>Fleet Feet</strong></div>
      </section>
      <section className="wrap" id="leaderboard">
        <h2>Race results</h2>
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
      <section className="next" id="next"><div><p className="label">2027 Milk Mile</p><h2>Coming soon</h2></div>
        <a className="text-link" href={instagram}>Follow race updates ↗</a>
      </section>
      <section className="wrap" id="gallery">
        <div className="section-head"><h2>Race photos</h2><a className="button" href={album}>2026 photos on Instagram ↗</a></div>
        <div className="gallery">{gallery.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" />)}</div>
      </section>
      <section className="wrap about" id="about"><div><h2>The milk mile</h2>
        <p>Drink a serving of milk, run a lap, and repeat four times. High school and college runners from across San Diego line up for the mile. The first three finishers take home medals.</p>
        <p>The second annual summer race raised $350 for Ronald McDonald House Charities.</p></div>
        <div id="video"><h3>2025 highlights</h3><iframe loading="lazy" src="https://www.youtube.com/embed/DXD_yoVHPec" title="2025 SD Summer Milk Mile highlights" allowFullScreen /></div>
      </section>
    </main>
    <footer><strong>SD Milk Mile Association</strong><div><a href={instagram}>Instagram ↗</a><a href="https://youtu.be/DXD_yoVHPec">YouTube ↗</a></div></footer>
  </>;
}
