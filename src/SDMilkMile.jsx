import { useState, useEffect, useRef } from "react";

const img1 = "/1.png";
const img2 = "/2.png";
const img3 = "/3.png";
const img4 = "/4.png";
const img5 = "/5.png";
const img6 = "/6.png";

const SIGNUP_URL = "https://surveymars.com/q/39k0UDDh5";
const IG_URL = "https://www.instagram.com/sd.milk.mile.association?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const YT_URL = "https://youtu.be/DXD_yoVHPec";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #F5F0E8;
    --milk: #FEFDF8;
    --gold: #D4A017;
    --gold-light: #F0C040;
    --red: #C41230;
    --red-dark: #8B0A1E;
    --dark: #0A0A0A;
    --dark2: #111111;
    --dark3: #1A1A1A;
    --dark4: #242424;
    --gray: #888888;
    --light: #EEEEEE;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--light);
    font-family: 'Barlow', sans-serif;
    overflow-x: hidden;
  }

  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
  .font-condensed { font-family: 'Barlow Condensed', sans-serif; }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    transition: all 0.3s ease;
  }
  nav.scrolled {
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(212,160,23,0.2);
    padding: 12px 32px;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.08em;
    color: var(--gold-light);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nav-logo span { color: var(--cream); }
  .nav-links { display: flex; gap: 28px; list-style: none; }
  .nav-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-cta {
    background: var(--red);
    color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 9px 20px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  }
  .nav-cta:hover { background: var(--red-dark); transform: translateY(-1px); }

  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 50%, rgba(196,18,48,0.15) 100%);
  }
  .hero-bg-img {
    position: absolute;
    inset: 0;
    background-image: url(${img6});
    background-size: cover;
    background-position: center 30%;
    filter: brightness(0.35) saturate(0.8);
  }
  .hero-accent-line {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(212,160,23,0.3), transparent);
    opacity: 0.5;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 32px 80px;
    width: 100%;
  }
  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: var(--gold);
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 10vw, 128px);
    line-height: 0.92;
    letter-spacing: 0.02em;
    margin-bottom: 24px;
  }
  .hero-title .line1 { color: var(--cream); display: block; }
  .hero-title .line2 {
    color: var(--gold-light);
    display: block;
    -webkit-text-stroke: 1px rgba(212,160,23,0.3);
  }
  .hero-title .line3 { color: var(--red); display: block; }
  .hero-subtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 400;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.6);
    margin-bottom: 48px;
    max-width: 560px;
  }
  .hero-subtitle strong {
    color: var(--cream);
    font-weight: 600;
  }
  .hero-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }
  .btn-primary {
    background: var(--red);
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    padding: 16px 36px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover { background: var(--red-dark); transform: translateY(-2px); }
  .btn-secondary {
    background: transparent;
    color: var(--cream);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    padding: 14px 30px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid rgba(255,255,255,0.25);
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold-light); }
  .hero-stats {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }
  .hero-stat { border-left: 2px solid var(--gold); padding-left: 16px; }
  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    color: var(--gold-light);
    line-height: 1;
    display: block;
  }
  .hero-stat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
  }
  .hero-logo-badge {
    position: absolute;
    right: 60px;
    bottom: 80px;
    width: 200px;
    opacity: 0.85;
    animation: float 4s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  .hero-scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.4;
    z-index: 2;
  }
  .hero-scroll-hint span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollLine 1.5s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    51% { transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }

  /* TICKER */
  .ticker {
    background: var(--red);
    padding: 10px 0;
    overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .ticker-track {
    display: flex;
    gap: 48px;
    animation: ticker 30s linear infinite;
    white-space: nowrap;
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.85);
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }
  .ticker-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-light); flex-shrink: 0; }

  /* SECTION SHARED */
  section { padding: 100px 32px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--gold); opacity: 0.5; }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    line-height: 0.95;
    letter-spacing: 0.02em;
    color: var(--cream);
    margin-bottom: 48px;
  }

  /* ABOUT */
  .about { background: var(--dark2); }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }
  .about-text p {
    font-size: 17px;
    line-height: 1.75;
    color: rgba(255,255,255,0.65);
    margin-bottom: 24px;
  }
  .about-text p strong { color: var(--cream); font-weight: 600; }
  .about-rules { margin-top: 40px; }
  .rule-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .rule-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px;
    color: var(--red);
    line-height: 1;
    min-width: 36px;
  }
  .rule-body { flex: 1; }
  .rule-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--cream);
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .rule-desc { font-size: 14px; color: var(--gray); line-height: 1.6; }
  .about-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .about-photo {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 3/4;
  }
  .about-photo:first-child { grid-column: 1 / -1; aspect-ratio: 16/9; }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; filter: brightness(0.9) saturate(0.9); }
  .about-photo:hover img { transform: scale(1.04); filter: brightness(1) saturate(1.1); }
  .about-photo-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    padding: 20px 12px 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }
  .charity-card {
    margin-top: 48px;
    background: linear-gradient(135deg, rgba(196,18,48,0.15), rgba(212,160,23,0.08));
    border: 1px solid rgba(196,18,48,0.3);
    padding: 28px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .charity-icon {
    font-size: 40px;
    flex-shrink: 0;
  }
  .charity-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 4px;
  }
  .charity-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: var(--cream);
    letter-spacing: 0.06em;
  }
  .charity-desc { font-size: 14px; color: var(--gray); margin-top: 4px; }
  .charity-goal {
    margin-left: auto;
    text-align: right;
    flex-shrink: 0;
  }
  .charity-amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    color: var(--gold-light);
    line-height: 1;
  }
  .charity-goal-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
  }

  /* LEADERBOARD */
  .leaderboard-section { background: var(--dark3); }
  .lb-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
  .lb-year-tag {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 96px;
    color: rgba(255,255,255,0.04);
    line-height: 1;
    position: absolute;
    right: 0;
    top: -20px;
    pointer-events: none;
    user-select: none;
  }
  .lb-container { position: relative; overflow: visible; }
  .lb-row {
    display: grid;
    grid-template-columns: 60px 1fr auto auto;
    gap: 16px 24px;
    align-items: center;
    padding: 20px 24px;
    margin-bottom: 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 4px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .lb-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: all 0.2s;
  }
  .lb-row:hover { background: rgba(255,255,255,0.04); border-color: rgba(212,160,23,0.2); }
  .lb-row:hover::before { background: var(--gold); }
  .lb-row.rank-1 { background: linear-gradient(135deg, rgba(212,160,23,0.1), rgba(212,160,23,0.03)); border-color: rgba(212,160,23,0.3); }
  .lb-row.rank-1::before { background: var(--gold); }
  .lb-rank {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    line-height: 1;
    text-align: center;
  }
  .rank-1 .lb-rank { color: var(--gold-light); font-size: 36px; }
  .lb-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--cream);
    letter-spacing: 0.03em;
  }
  .lb-school {
    font-size: 13px;
    color: var(--gray);
    font-weight: 400;
  }
  .lb-time {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    color: var(--cream);
    letter-spacing: 0.05em;
  }
  .rank-1 .lb-time { color: var(--gold-light); font-size: 40px; }
  .lb-badge {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: rgba(212,160,23,0.15);
    color: var(--gold);
    border: 1px solid rgba(212,160,23,0.3);
    border-radius: 2px;
  }
  .lb-empty {
    text-align: center;
    padding: 60px;
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 4px;
    margin-top: 16px;
  }
  .lb-empty-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  .lb-empty-sub { font-size: 14px; color: rgba(255,255,255,0.2); }

  /* VIDEO */
  .video-section { background: var(--dark); padding: 80px 32px; }
  .video-wrapper {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(212,160,23,0.2);
  }
  .video-wrapper iframe {
    width: 100%;
    aspect-ratio: 16/9;
    display: block;
    border: none;
  }

  /* EVENT INFO */
  .event-section { background: var(--dark2); }
  .event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 48px;
  }
  .event-card {
    background: var(--dark2);
    padding: 36px 28px;
    transition: background 0.2s;
  }
  .event-card:hover { background: var(--dark3); }
  .event-card-icon { font-size: 28px; margin-bottom: 16px; }
  .event-card-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }
  .event-card-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: var(--cream);
    letter-spacing: 0.04em;
    line-height: 1.1;
  }
  .event-card-sub { font-size: 13px; color: var(--gray); margin-top: 4px; }
  .pricing-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }
  .pricing-card {
    padding: 32px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .pricing-card.featured {
    border-color: rgba(196,18,48,0.4);
    background: linear-gradient(135deg, rgba(196,18,48,0.08), transparent);
  }
  .pricing-card.featured::after {
    content: 'POPULAR';
    position: absolute;
    top: 16px; right: -24px;
    background: var(--red);
    color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 4px 32px;
    transform: rotate(45deg) translateX(8px);
  }
  .pricing-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 12px;
  }
  .pricing-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 56px;
    color: var(--cream);
    line-height: 1;
    margin-bottom: 4px;
  }
  .pricing-price span { font-size: 28px; color: var(--gray); }
  .pricing-desc { font-size: 14px; color: var(--gray); }
  .awards-list { margin-top: 32px; }
  .award-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--light);
    letter-spacing: 0.04em;
  }
  .award-medal { font-size: 24px; }

  /* PHOTO GALLERY */
  .gallery-section { background: var(--dark); padding: 80px 32px; }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 8px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .gallery-item {
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .gallery-item:first-child { grid-column: span 2; }
  .gallery-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    display: block;
    transition: transform 0.6s ease, filter 0.3s ease;
    filter: brightness(0.85) saturate(0.85);
  }
  .gallery-item:first-child img { aspect-ratio: 2/1; }
  .gallery-item:hover img { transform: scale(1.06); filter: brightness(1) saturate(1); }
  .gallery-item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: flex-end;
    padding: 16px;
  }
  .gallery-item:hover .gallery-item-overlay { opacity: 1; }
  .gallery-item-tag {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold-light);
    background: rgba(0,0,0,0.5);
    padding: 4px 10px;
  }

  /* SOCIAL */
  .social-section {
    background: var(--dark3);
    text-align: center;
    padding: 80px 32px;
  }
  .social-links {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 32px;
  }
  .social-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 0.1em;
    padding: 14px 32px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid rgba(255,255,255,0.15);
    color: var(--cream);
    transition: all 0.2s;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold-light); }
  .social-btn.primary { background: var(--red); border-color: var(--red); }
  .social-btn.primary:hover { background: var(--red-dark); border-color: var(--red-dark); color: white; }
  .handle-tag {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px;
    color: rgba(255,255,255,0.08);
    letter-spacing: 0.06em;
    margin-top: 24px;
  }

  /* FOOTER */
  footer {
    background: var(--dark);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 40px 32px;
    text-align: center;
  }
  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.1em;
    color: var(--gold-light);
    margin-bottom: 12px;
  }
  .footer-tagline { font-size: 13px; color: var(--gray); margin-bottom: 24px; }
  .footer-links { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
  .footer-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold); }
  .footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); margin-top: 24px; }
  .easter-egg {
    font-size: 11px;
    color: rgba(255,255,255,0.08);
    margin-top: 8px;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.1em;
    cursor: default;
    transition: color 0.3s;
  }
  .easter-egg:hover { color: var(--gold); }

  /* MOBILE */
  @media (max-width: 768px) {
    nav { padding: 14px 20px; }
    nav.scrolled { padding: 10px 20px; }
    .nav-links { display: none; }
    section { padding: 72px 20px; }
    .hero-content { padding: 100px 20px 60px; }
    .hero-logo-badge { display: none; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .pricing-cards { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .gallery-item:first-child { grid-column: span 2; }
    .event-grid { grid-template-columns: 1fr 1fr; }
    .charity-card { flex-direction: column; text-align: center; }
    .charity-goal { margin-left: 0; text-align: center; }
  }

  /* ANIMATIONS */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  .stagger-1 { transition-delay: 0.1s; }
  .stagger-2 { transition-delay: 0.2s; }
  .stagger-3 { transition-delay: 0.3s; }
  .stagger-4 { transition-delay: 0.4s; }
`;

const TICKER_ITEMS = [
  "Drink. Run. Repeat.",
  "4 Laps. 4 Milks.",
  "SD Milk Mile Association",
  "2nd Annual Summer 2026",
  "Ronald McDonald House Charity",
  "June 23 · RB High School",
  "Medals for Top 3",
  "$22.50 Entry",
  "Real Athletes. Actual Milk.",
  "No Lactose Tolerance Required",
];

const leaderboard = {
  2025: [
    { rank: 1, name: "Cooper Castleberry", school: "Poway", time: "5:33", badge: "CR" },
  ],
};

export default function SDMilkMile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">
          🥛 <span>SD</span> Milk Mile
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#event">Event Info</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
        <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="nav-cta">
          Sign Up
        </a>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg">
          <div className="hero-bg-img" />
          <div className="hero-bg-overlay" />
          <div className="hero-bg-grid" />
          <div className="hero-accent-line" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">San Diego, California · Est. 2024</div>

          <h1 className="hero-title font-display">
            <span className="line1">SD Milk</span>
            <span className="line2">Mile</span>
            <span className="line3">Association</span>
          </h1>

          <p className="hero-subtitle">
            San Diego's Premier Milk Mile Event —<br />
            <strong>4 laps. 4 milks. One legendary race.</strong>
          </p>

          <div className="hero-buttons">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="btn-primary">
              🎽 Register Now — $22.50
            </a>
            <a href={IG_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              📷 Follow @sd.milk.mile.association
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">2nd</span>
              <span className="hero-stat-label">Annual Event</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">June 23</span>
              <span className="hero-stat-label">Race Day 2026</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">$600</span>
              <span className="hero-stat-label">Charity Goal (RMHC)</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">4×</span>
              <span className="hero-stat-label">Milk Per Racer</span>
            </div>
          </div>
        </div>

        <img src={img4} alt="SD Milk Mile Logo" className="hero-logo-badge" />

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {tickerDouble.map((item, i) => (
            <span className="ticker-item" key={i}>
              <span className="ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text fade-up">
              <div className="section-label">What is This</div>
              <h2 className="section-title font-display">The Milk<br />Mile</h2>

              <p>
                The <strong>Milk Mile</strong> is a simple, glorious, and slightly unhinged event: drink a full glass (or cup) of milk, run a lap around the track, repeat four times. That's a mile total, with four dairy pit stops.
              </p>
              <p>
                It's a legitimate test of athletic performance and lactose tolerance. Sub-5:00 is elite. Sub-6:00 is solid. Finishing without returning your milk to the track is a win.
              </p>
              <p>
                The <strong>SD Milk Mile Association</strong> brings together high school and college runners from across San Diego in a competitive, hilarious, and surprisingly serious race. Think track meet meets county fair chaos.
              </p>

              <div className="about-rules">
                {[
                  ["Milk First", "Drink a full serving of milk before each lap. You cannot skip. The milk is non-negotiable."],
                  ["Run Fast", "It's a mile. Four laps on a 400m track. Run like you trained for this (because some of these people definitely did)."],
                  ["Don't Quit", "Finish what you started. Top 3 runners receive medals. Everyone gets a story."],
                  ["No Lactase Allowed", "Just kidding. (Kind of.)"],
                ].map(([title, desc], i) => (
                  <div className="rule-item" key={i}>
                    <div className="rule-num font-display">{String(i + 1).padStart(2, '0')}</div>
                    <div className="rule-body">
                      <div className="rule-title font-condensed">{title}</div>
                      <div className="rule-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="charity-card fade-up stagger-2">
                <div className="charity-icon">🏠</div>
                <div>
                  <div className="charity-label">Charity Partner</div>
                  <div className="charity-title font-display">Ronald McDonald House</div>
                  <div className="charity-desc">Every entry supports RMHC San Diego — families who need it most.</div>
                </div>
                <div className="charity-goal">
                  <div className="charity-amount font-display">$600</div>
                  <div className="charity-goal-label">2026 Goal</div>
                </div>
              </div>
            </div>

            <div className="about-photos fade-up stagger-1">
              <div className="about-photo">
                <img src={img6} alt="Runners on track" />
                <div className="about-photo-label">Race Day Action</div>
              </div>
              <div className="about-photo">
                <img src={img2} alt="Runner mid-race" />
                <div className="about-photo-label">Full Send</div>
              </div>
              <div className="about-photo">
                <img src={img3} alt="Finisher with medal" />
                <div className="about-photo-label">Glory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="leaderboard-section" id="leaderboard">
        <div className="section-inner">
          <div className="lb-header fade-up">
            <div>
              <div className="section-label">All-Time Records</div>
              <h2 className="section-title font-display">Leader<br />Board</h2>
            </div>
          </div>

          {Object.entries(leaderboard).map(([year, runners]) => (
            <div key={year} className="lb-container fade-up">
              <div className="lb-year-tag font-display">{year}</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>
                {year} Season
              </div>

              {runners.map((r) => (
                <div key={r.rank} className={`lb-row rank-${r.rank}`}>
                  <div className={`lb-rank font-display`}>
                    {r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : `#${r.rank}`}
                  </div>
                  <div>
                    <div className="lb-name font-condensed">{r.name}</div>
                    <div className="lb-school">{r.school}</div>
                  </div>
                  <div className="lb-time font-display">{r.time}</div>
                  {r.badge && <div className="lb-badge font-condensed">{r.badge}</div>}
                </div>
              ))}

              <div className="lb-empty fade-up stagger-2">
                <div className="lb-empty-text font-display">Your Name Here</div>
                <div className="lb-empty-sub">June 23, 2026 · Rancho Bernardo High School</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section className="video-section" id="video">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "32px" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Watch</div>
            <h2 className="section-title font-display" style={{ textAlign: "center" }}>2025 Highlights</h2>
          </div>
          <div className="video-wrapper fade-up">
            <iframe
              src="https://www.youtube.com/embed/DXD_yoVHPec"
              title="2025 SD Summer Milk Mile"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* EVENT INFO */}
      <section className="event-section" id="event">
        <div className="section-inner">
          <div className="section-label fade-up">Event Details</div>
          <h2 className="section-title font-display fade-up">2nd Annual<br />Summer Race</h2>

          <div className="event-grid fade-up">
            {[
              ["📅", "Date", "June 23, 2026", "Monday Evening"],
              ["🕖", "Start Time", "6:45 PM", "Warm-ups at 6:30"],
              ["📍", "Venue", "Rancho Bernardo HS", "13010 Paseo Lucido, SD"],
              ["🎫", "Bib Pickup", "June 20–22", "Del Norte HS Student Lot"],
            ].map(([icon, label, value, sub]) => (
              <div className="event-card" key={label}>
                <div className="event-card-icon">{icon}</div>
                <div className="event-card-label font-condensed">{label}</div>
                <div className="event-card-value font-display">{value}</div>
                <div className="event-card-sub">{sub}</div>
              </div>
            ))}
          </div>

          <div className="pricing-cards fade-up">
            <div className="pricing-card">
              <div className="pricing-name font-condensed">Race Entry</div>
              <div className="pricing-price font-display"><span>$</span>22.50</div>
              <div className="pricing-desc">Entry only · Race bib · Certified bragging rights</div>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-name font-condensed">Entry + Swag Bag</div>
              <div className="pricing-price font-display"><span>$</span>25</div>
              <div className="pricing-desc">Entry + exclusive swag bag · Best value for the culture</div>
            </div>
          </div>

          <div className="awards-list fade-up">
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>
              Awards
            </div>
            {[
              ["🥇", "1st Place — Gold Medal"],
              ["🥈", "2nd Place — Silver Medal"],
              ["🥉", "3rd Place — Bronze Medal"],
              ["🏅", "All finishers — eternal respect"],
            ].map(([medal, text]) => (
              <div className="award-item font-condensed" key={text}>
                <span className="award-medal">{medal}</span>
                {text}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }} className="fade-up">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "inline-flex", fontSize: "22px", padding: "18px 48px" }}>
              🥛 Register Now
            </a>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--gray)" }}>
              Sign up via link in bio · @sd.milk.mile.association · Cash payment on bib pickup days
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="gallery">
        <div className="section-inner">
          <div className="section-label fade-up">Photo Gallery</div>
          <h2 className="section-title font-display fade-up" style={{ marginBottom: "32px" }}>Race Day<br />Moments</h2>
        </div>
        <div className="gallery-grid fade-up" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {[
            [img6, "Group Run"],
            [img1, "Pre-Race"],
            [img2, "Speed Work"],
            [img3, "Medal Ceremony"],
          ].map(([src, tag], i) => (
            <div className="gallery-item" key={i}>
              <img src={src} alt={tag} />
              <div className="gallery-item-overlay">
                <span className="gallery-item-tag font-condensed">{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL / CTA */}
      <section className="social-section" id="social">
        <div className="section-inner">
          <div className="section-label fade-up" style={{ justifyContent: "center" }}>Follow the Chaos</div>
          <h2 className="section-title font-display fade-up" style={{ textAlign: "center" }}>Stay in the<br />Loop</h2>
          <p style={{ color: "var(--gray)", fontSize: "17px", maxWidth: "520px", margin: "0 auto 40px", textAlign: "center" }} className="fade-up">
            Race updates, results, footage, and pure unfiltered milk mile content.
          </p>
          <div className="social-links fade-up">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="social-btn primary font-display">
              🎽 Register for June 23
            </a>
            <a href={IG_URL} target="_blank" rel="noreferrer" className="social-btn font-display">
              📷 Instagram
            </a>
            <a href={YT_URL} target="_blank" rel="noreferrer" className="social-btn font-display">
              ▶ YouTube
            </a>
          </div>
          <div className="handle-tag font-display">@sd.milk.mile.association</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo font-display">SD Milk Mile Association</div>
        <div className="footer-tagline">San Diego's Premier Milk Mile Event · Est. 2024</div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#leaderboard">Leaderboard</a>
          <a href="#event">Event Info</a>
          <a href={SIGNUP_URL} target="_blank" rel="noreferrer">Register</a>
          <a href={IG_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a href={YT_URL} target="_blank" rel="noreferrer">YouTube</a>
        </div>
        <div className="footer-copy">© 2026 SD Milk Mile Association · All rights reserved · All milk consumed</div>
        <div className="easter-egg">🥛 Pro tip: don't eat beforehand. You'll thank us later.</div>
      </footer>
    </>
  );
}
