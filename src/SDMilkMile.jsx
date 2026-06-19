import { useState, useEffect, useRef } from "react";

const BASE = "https://raw.githubusercontent.com/nathantrieu360/sd-milk-mile/main/";
const img1 = BASE + "1.png";
const img2 = BASE + "2.png";
const img3 = BASE + "3.png";
const img4 = BASE + "4.png";
const img5 = BASE + "5.png";
const img6 = BASE + "6.png";

const SIGNUP_URL = "https://surveymars.com/q/39k0UDDh5";
const IG_URL = "https://www.instagram.com/sd.milk.mile.association?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const YT_URL = "https://youtu.be/DXD_yoVHPec";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --white: #FFFFFF;
    --off-white: #F0F8FF;
    --light-blue: #E1F0FF;
    --mid-blue: #B8D9F5;
    --blue: #2A7FD4;
    --blue-dark: #1A5FA0;
    --blue-deep: #0D3F70;
    --navy: #0A2540;
    --accent: #4FA8F0;
    --accent-light: #7DC5FF;
    --gray: #5A7A99;
    --gray-light: #8AABBF;
    --text: #0A2540;
    --text-muted: #3A6080;
  }

  html { scroll-behavior: smooth; cursor: none; }
  body {
    background: var(--off-white);
    color: var(--text);
    font-family: 'Barlow', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }
  a, button { cursor: none; }

  /* CUSTOM CURSOR */
  .cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
  }
  .cursor-ring {
    position: fixed;
    width: 36px;
    height: 36px;
    border: 2px solid var(--blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, border-color 0.2s, opacity 0.2s;
    opacity: 0.5;
  }
  .cursor-dot.hovering { width: 12px; height: 12px; background: var(--accent); }
  .cursor-ring.hovering { width: 56px; height: 56px; border-color: var(--accent); opacity: 0.3; }

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
    padding: 20px 40px;
    transition: all 0.3s ease;
  }
  nav.scrolled {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(42,127,212,0.15);
    padding: 14px 40px;
    box-shadow: 0 2px 20px rgba(42,127,212,0.08);
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.08em;
    color: var(--blue);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nav-logo span { color: var(--navy); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
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
  .nav-links a:hover { color: var(--blue); }
  .nav-cta {
    background: var(--blue);
    color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 10px 22px;
    border: none;
    text-decoration: none;
    transition: all 0.2s;
    border-radius: 3px;
  }
  .nav-cta:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(42,127,212,0.3); }

  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(160deg, #DAEEFF 0%, #EEF7FF 40%, #F5FBFF 100%);
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-bg-circles {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .hero-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(42,127,212,0.06);
    animation: pulse 6s ease-in-out infinite;
  }
  .hero-circle:nth-child(1) { width: 600px; height: 600px; top: -200px; right: -100px; animation-delay: 0s; }
  .hero-circle:nth-child(2) { width: 400px; height: 400px; bottom: -100px; right: 200px; animation-delay: 2s; background: rgba(79,168,240,0.06); }
  .hero-circle:nth-child(3) { width: 300px; height: 300px; top: 40%; left: -80px; animation-delay: 4s; background: rgba(42,127,212,0.04); }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.08); opacity: 1; }
  }
  .hero-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(42,127,212,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(42,127,212,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-bg-img {
    position: absolute;
    right: 0;
    top: 0;
    width: 55%;
    height: 100%;
    background-image: url(${img6});
    background-size: cover;
    background-position: center top;
    mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 50%, transparent 100%);
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 50%, transparent 100%);
    filter: brightness(0.9) saturate(0.85);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 130px 40px 80px;
    width: 100%;
  }
  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--blue);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: var(--blue);
    border-radius: 1px;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 10vw, 120px);
    line-height: 0.92;
    letter-spacing: 0.02em;
    margin-bottom: 24px;
    max-width: 600px;
  }
  .hero-title .line1 { color: var(--navy); display: block; }
  .hero-title .line2 { color: var(--blue); display: block; }
  .hero-title .line3 { color: var(--blue-dark); display: block; -webkit-text-stroke: 1px rgba(42,127,212,0.3); }
  .hero-subtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(17px, 2.2vw, 24px);
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    margin-bottom: 48px;
    max-width: 480px;
    line-height: 1.5;
  }
  .hero-subtitle strong { color: var(--navy); font-weight: 700; }
  .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 64px; }
  .btn-primary {
    background: var(--blue);
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    padding: 16px 36px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    transition: all 0.2s;
    border: none;
    box-shadow: 0 4px 20px rgba(42,127,212,0.25);
  }
  .btn-primary:hover { background: var(--blue-dark); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(42,127,212,0.35); }
  .btn-secondary {
    background: white;
    color: var(--navy);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    padding: 14px 30px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 2px solid var(--mid-blue);
    border-radius: 3px;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-1px); }
  .hero-stats { display: flex; gap: 40px; flex-wrap: wrap; }
  .hero-stat { border-left: 3px solid var(--blue); padding-left: 16px; }
  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    color: var(--blue);
    line-height: 1;
    display: block;
  }
  .hero-stat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
  }
  .hero-logo-badge {
    position: absolute;
    left: 40px;
    bottom: 60px;
    width: 160px;
    opacity: 0.6;
    animation: float 4s ease-in-out infinite;
    z-index: 2;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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
    opacity: 0.35;
    z-index: 2;
  }
  .hero-scroll-hint span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--navy);
  }
  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--blue), transparent);
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
    background: var(--blue);
    padding: 11px 0;
    overflow: hidden;
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
    color: rgba(255,255,255,0.9);
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }
  .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.5); flex-shrink: 0; }

  /* SECTIONS */
  section { padding: 100px 40px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--blue); opacity: 0.4; }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    line-height: 0.95;
    letter-spacing: 0.02em;
    color: var(--navy);
    margin-bottom: 48px;
  }

  /* ABOUT */
  .about { background: white; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .about-text p { font-size: 16px; line-height: 1.8; color: var(--text-muted); margin-bottom: 20px; }
  .about-text p strong { color: var(--navy); font-weight: 700; }
  .about-rules { margin-top: 36px; }
  .rule-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--light-blue);
  }
  .rule-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    color: var(--blue);
    line-height: 1;
    min-width: 36px;
    opacity: 0.7;
  }
  .rule-body { flex: 1; }
  .rule-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--navy);
    margin-bottom: 3px;
    text-transform: uppercase;
  }
  .rule-desc { font-size: 13px; color: var(--gray); line-height: 1.6; }
  .about-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .about-photo { border-radius: 8px; overflow: hidden; position: relative; aspect-ratio: 3/4; box-shadow: 0 4px 20px rgba(42,127,212,0.1); }
  .about-photo:first-child { grid-column: 1 / -1; aspect-ratio: 16/9; }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.5s ease; }
  .about-photo:hover img { transform: scale(1.04); }
  .about-photo-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(10,37,64,0.7), transparent);
    padding: 20px 14px 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
  }
  .charity-card {
    margin-top: 40px;
    background: linear-gradient(135deg, #EEF7FF, #E1F0FF);
    border: 1px solid rgba(42,127,212,0.2);
    padding: 24px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .charity-icon { font-size: 36px; flex-shrink: 0; }
  .charity-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 3px;
  }
  .charity-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--navy); letter-spacing: 0.04em; }
  .charity-desc { font-size: 13px; color: var(--gray); margin-top: 2px; }
  .charity-goal { margin-left: auto; text-align: right; flex-shrink: 0; }
  .charity-amount { font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: var(--blue); line-height: 1; }
  .charity-goal-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); }

  /* LEADERBOARD */
  .leaderboard-section { background: var(--light-blue); }
  .lb-container { position: relative; overflow: visible; }
  .lb-year-tag {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 96px;
    color: rgba(42,127,212,0.06);
    line-height: 1;
    position: absolute;
    right: 0;
    top: -20px;
    pointer-events: none;
    user-select: none;
  }
  .lb-row {
    display: grid;
    grid-template-columns: 60px 1fr auto auto;
    gap: 16px 24px;
    align-items: center;
    padding: 20px 24px;
    margin-bottom: 8px;
    background: white;
    border: 1px solid rgba(42,127,212,0.1);
    border-radius: 8px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(42,127,212,0.05);
  }
  .lb-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: transparent;
    transition: all 0.2s;
  }
  .lb-row:hover { border-color: rgba(42,127,212,0.3); box-shadow: 0 4px 16px rgba(42,127,212,0.1); transform: translateX(4px); }
  .lb-row:hover::before { background: var(--blue); }
  .lb-row.rank-1 { background: linear-gradient(135deg, #EEF7FF, white); border-color: rgba(42,127,212,0.3); }
  .lb-row.rank-1::before { background: var(--blue); }
  .lb-rank { font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1; text-align: center; color: var(--gray); }
  .rank-1 .lb-rank { color: var(--blue); font-size: 36px; }
  .lb-name { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: var(--navy); letter-spacing: 0.03em; }
  .lb-school { font-size: 13px; color: var(--gray); }
  .lb-time { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--navy); letter-spacing: 0.05em; }
  .rank-1 .lb-time { color: var(--blue); font-size: 40px; }
  .lb-badge {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: rgba(42,127,212,0.1);
    color: var(--blue);
    border: 1px solid rgba(42,127,212,0.25);
    border-radius: 3px;
  }
  .lb-empty {
    text-align: center;
    padding: 48px;
    border: 1.5px dashed rgba(42,127,212,0.2);
    border-radius: 8px;
    margin-top: 16px;
    background: rgba(255,255,255,0.5);
  }
  .lb-empty-text { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: rgba(42,127,212,0.3); letter-spacing: 0.1em; margin-bottom: 6px; }
  .lb-empty-sub { font-size: 14px; color: var(--gray-light); }

  /* VIDEO */
  .video-section { background: var(--navy); padding: 80px 40px; }
  .video-section .section-label { color: var(--accent); }
  .video-section .section-label::after { background: var(--accent); }
  .video-section .section-title { color: white; }
  .video-wrapper {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(79,168,240,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; display: block; border: none; }

  /* EVENT INFO */
  .event-section { background: white; }
  .event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1px;
    background: var(--light-blue);
    border: 1px solid var(--mid-blue);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 48px;
  }
  .event-card { background: white; padding: 32px 24px; transition: background 0.2s; }
  .event-card:hover { background: var(--off-white); }
  .event-card-icon { font-size: 26px; margin-bottom: 14px; }
  .event-card-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
  .event-card-value { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: var(--navy); letter-spacing: 0.04em; line-height: 1.1; }
  .event-card-sub { font-size: 12px; color: var(--gray); margin-top: 4px; }
  .pricing-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .pricing-card { padding: 28px; border: 1.5px solid var(--mid-blue); border-radius: 8px; position: relative; overflow: hidden; background: var(--off-white); }
  .pricing-card.featured { border-color: var(--blue); background: linear-gradient(135deg, #EEF7FF, white); box-shadow: 0 4px 20px rgba(42,127,212,0.12); }
  .pricing-card.featured::after {
    content: 'POPULAR';
    position: absolute;
    top: 14px; right: -26px;
    background: var(--blue);
    color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 4px 32px;
    transform: rotate(45deg) translateX(8px);
  }
  .pricing-name { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); margin-bottom: 10px; }
  .pricing-price { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: var(--navy); line-height: 1; margin-bottom: 4px; }
  .pricing-price span { font-size: 26px; color: var(--gray); }
  .pricing-desc { font-size: 13px; color: var(--gray); }
  .awards-list { margin-top: 28px; }
  .award-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--light-blue);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--navy);
    letter-spacing: 0.04em;
  }
  .award-medal { font-size: 22px; }

  /* GALLERY */
  .gallery-section { background: var(--off-white); padding: 80px 40px; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 1200px; margin: 0 auto; }
  .gallery-item { overflow: hidden; position: relative; border-radius: 8px; box-shadow: 0 4px 16px rgba(42,127,212,0.08); }
  .gallery-item:first-child { grid-column: span 2; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; object-position: center top; aspect-ratio: 1; display: block; transition: transform 0.6s ease; }
  .gallery-item:first-child img { aspect-ratio: 2/1; }
  .gallery-item:hover img { transform: scale(1.05); }
  .gallery-item-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,37,64,0.6), transparent);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: flex-end; padding: 16px;
    border-radius: 8px;
  }
  .gallery-item:hover .gallery-item-overlay { opacity: 1; }
  .gallery-item-tag { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: white; background: rgba(42,127,212,0.6); padding: 4px 10px; border-radius: 3px; }

  /* SOCIAL */
  .social-section { background: var(--blue-deep); text-align: center; padding: 80px 40px; }
  .social-section .section-label { color: var(--accent-light); justify-content: center; }
  .social-section .section-label::after { background: var(--accent-light); }
  .social-section .section-title { color: white; text-align: center; }
  .social-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }
  .social-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 0.1em;
    padding: 14px 28px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.85);
    border-radius: 4px;
    transition: all 0.2s;
  }
  .social-btn:hover { border-color: var(--accent-light); color: white; background: rgba(79,168,240,0.1); }
  .social-btn.primary { background: var(--blue); border-color: var(--blue); color: white; }
  .social-btn.primary:hover { background: var(--accent); border-color: var(--accent); box-shadow: 0 4px 20px rgba(79,168,240,0.3); }
  .handle-tag { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: rgba(255,255,255,0.08); letter-spacing: 0.06em; margin-top: 24px; }

  /* FOOTER */
  footer { background: var(--navy); border-top: 1px solid rgba(79,168,240,0.15); padding: 40px; text-align: center; }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 10px; }
  .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 24px; }
  .footer-links { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
  .footer-links a { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--accent-light); }
  .footer-copy { font-size: 12px; color: rgba(255,255,255,0.15); margin-top: 24px; }
  .easter-egg { font-size: 11px; color: rgba(255,255,255,0.06); margin-top: 8px; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.1em; transition: color 0.3s; }
  .easter-egg:hover { color: var(--accent); }

  /* MOBILE */
  @media (max-width: 768px) {
    nav { padding: 14px 20px; }
    nav.scrolled { padding: 10px 20px; }
    .nav-links { display: none; }
    section { padding: 72px 20px; }
    .hero-content { padding: 100px 20px 60px; }
    .hero-bg-img { width: 100%; opacity: 0.2; }
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
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .stagger-1 { transition-delay: 0.1s; }
  .stagger-2 { transition-delay: 0.2s; }
  .stagger-3 { transition-delay: 0.3s; }
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
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

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

  useEffect(() => {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    let raf;

    const moveCursor = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (cursorDot.current) {
        cursorDot.current.style.left = dotX + "px";
        cursorDot.current.style.top = dotY + "px";
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = ringX + "px";
        cursorRing.current.style.top = ringY + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      cursorDot.current?.classList.add("hovering");
      cursorRing.current?.classList.add("hovering");
    };
    const onLeave = () => {
      cursorDot.current?.classList.remove("hovering");
      cursorRing.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <style>{styles}</style>

      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorRing} className="cursor-ring" />

      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">🥛 <span>SD</span> Milk Mile</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#event">Event Info</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
        <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="nav-cta">Sign Up</a>
      </nav>

      <div className="hero">
        <div className="hero-bg">
          <div className="hero-bg-circles">
            <div className="hero-circle" />
            <div className="hero-circle" />
            <div className="hero-circle" />
          </div>
          <div className="hero-bg-grid" />
          <div className="hero-bg-img" />
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
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="btn-primary">🎽 Register Now — $22.50</a>
            <a href={IG_URL} target="_blank" rel="noreferrer" className="btn-secondary">📷 @sd.milk.mile.association</a>
          </div>
          <div className="hero-stats">
            {[["2nd","Annual Event"],["June 23","Race Day 2026"],["$600","Charity Goal (RMHC)"],["4×","Milk Per Racer"],["12","Participants Registered"]].map(([n,l]) => (
              <div className="hero-stat" key={l}>
                <span className="hero-stat-num font-display">{n}</span>
                <span className="hero-stat-label font-condensed">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <img src={img4} alt="SD Milk Mile Logo" className="hero-logo-badge" />
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {tickerDouble.map((item, i) => (
            <span className="ticker-item" key={i}>
              <span className="ticker-dot" />{item}
            </span>
          ))}
        </div>
      </div>

      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text fade-up">
              <div className="section-label">What is This</div>
              <h2 className="section-title font-display">The Milk<br />Mile</h2>
              <p>The <strong>Milk Mile</strong> is a simple, glorious, and slightly unhinged event: drink a full glass of milk, run a lap around the track, repeat four times. That's a mile total, with four dairy pit stops.</p>
              <p>It's a legitimate test of athletic performance and lactose tolerance. Sub-5:00 is elite. Sub-6:00 is solid. Finishing without returning your milk to the track is a win.</p>
              <p>The <strong>SD Milk Mile Association</strong> brings together high school and college runners from across San Diego in a competitive, hilarious, and surprisingly serious race.</p>
              <div className="about-rules">
                {[
                  ["Milk First","Drink a full serving of milk before each lap. You cannot skip. The milk is non-negotiable."],
                  ["Run Fast","It's a mile. Four laps on a 400m track. Run like you trained for this (because some of these people definitely did)."],
                  ["Don't Quit","Finish what you started. Top 3 runners receive medals. Everyone gets a story."],
                  ["No Lactase Allowed","Just kidding. (Kind of.)"],
                ].map(([title, desc], i) => (
                  <div className="rule-item" key={i}>
                    <div className="rule-num font-display">{String(i+1).padStart(2,'0')}</div>
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
              <div className="about-photo"><img src={img6} alt="Runners on track" /><div className="about-photo-label">Race Day Action</div></div>
              <div className="about-photo"><img src={img2} alt="Runner mid-race" /><div className="about-photo-label">Full Send</div></div>
              <div className="about-photo"><img src={img3} alt="Finisher with medal" /><div className="about-photo-label">Glory</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="leaderboard-section" id="leaderboard">
        <div className="section-inner">
          <div className="fade-up">
            <div className="section-label">All-Time Records</div>
            <h2 className="section-title font-display">Leader<br />Board</h2>
          </div>
          {Object.entries(leaderboard).map(([year, runners]) => (
            <div key={year} className="lb-container fade-up">
              <div className="lb-year-tag font-display">{year}</div>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:"12px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--blue)",marginBottom:"16px"}}>{year} Season</div>
              {runners.map((r) => (
                <div key={r.rank} className={`lb-row rank-${r.rank}`}>
                  <div className="lb-rank font-display">{r.rank===1?"🥇":r.rank===2?"🥈":r.rank===3?"🥉":`#${r.rank}`}</div>
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
                <div className="lb-empty-sub">June 23, 2026 · Del Norte High School</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="video-section" id="video">
        <div className="section-inner">
          <div className="fade-up" style={{textAlign:"center",marginBottom:"32px"}}>
            <div className="section-label" style={{justifyContent:"center"}}>Watch</div>
            <h2 className="section-title font-display" style={{textAlign:"center"}}>2025 Highlights</h2>
          </div>
          <div className="video-wrapper fade-up">
            <iframe src="https://www.youtube.com/embed/DXD_yoVHPec" title="2025 SD Summer Milk Mile" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      <section className="event-section" id="event">
        <div className="section-inner">
          <div className="section-label fade-up">Event Details</div>
          <h2 className="section-title font-display fade-up">2nd Annual<br />Summer Race</h2>
          <div className="event-grid fade-up">
            {[["📅","Date","June 23, 2026","Monday Evening"],["🕖","Start Time","6:45 PM","Warm-ups at 6:30"],["📍","Venue","Del Norte HS","16601 Nighthawk Ln, SD"],["🎫","Bib Pickup","June 23","Del Norte HS "],["👥","Participants","17","First 15 to sign up enter to win a Fleet Feet gift card!"]].map(([icon,label,value,sub]) => (
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
          <div className="top-seeds fade-up" style={{marginBottom:"32px",background:"linear-gradient(135deg,#EEF7FF,white)",border:"1.5px solid rgba(42,127,212,0.2)",borderRadius:"8px",padding:"28px",boxShadow:"0 4px 16px rgba(42,127,212,0.08)"}}>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:"12px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"var(--blue)",marginBottom:"20px"}}>🏃 Top Seeds — 2026</div>
            {[
              {rank:"1",name:"Gunner Silva",school:"Classical Academy"},
              {rank:"2",name:"Cade Willhoit",school:"Del Norte"},
              {rank:"3",name:"Timothy Akinpelu",school:"Del Norte"},
            ].map((s) => (
              <div key={s.rank} style={{display:"flex",alignItems:"center",gap:"16px",padding:"12px 0",borderBottom:"1px solid rgba(42,127,212,0.08)"}}>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"22px",color:"var(--blue)",minWidth:"28px"}}>#{s.rank}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Barlow Condensed'",fontSize:"19px",fontWeight:700,color:"var(--navy)",letterSpacing:"0.03em"}}>{s.name}</div>
                  <div style={{fontSize:"13px",color:"var(--gray)"}}>{s.school}</div>
                </div>

              </div>
            ))}
          </div>
          <div className="awards-list fade-up">
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:"14px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--blue)",marginBottom:"16px"}}>Awards</div>
            {[["🥇","1st Place — Gold Medal"],["🥈","2nd Place — Silver Medal"],["🥉","3rd Place — Bronze Medal"],["🏅","All finishers — eternal respect"]].map(([medal,text]) => (
              <div className="award-item font-condensed" key={text}><span className="award-medal">{medal}</span>{text}</div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"48px"}} className="fade-up">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{display:"inline-flex",fontSize:"22px",padding:"18px 48px"}}>🥛 Register Now</a>
            <p style={{marginTop:"16px",fontSize:"13px",color:"var(--gray)"}}>Sign up via link in bio · @sd.milk.mile.association · Cash payment on bib pickup days</p>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-inner">
          <div className="section-label fade-up">Photo Gallery</div>
          <h2 className="section-title font-display fade-up" style={{marginBottom:"32px"}}>Race Day<br />Moments</h2>
        </div>
        <div className="gallery-grid fade-up" style={{maxWidth:"1200px",margin:"0 auto"}}>
          {[[img6,"Group Run"],[img1,"Pre-Race"],[img2,"Speed Work"],[img3,"Medal Ceremony"],[BASE+"7.png","Champion"],[BASE+"8.png","The Milk"],[BASE+"9.png","Fueling Up"],[BASE+"10.png","Race Day Setup"]].map(([src,tag],i) => (
            <div className="gallery-item" key={i}>
              <img src={src} alt={tag} />
              <div className="gallery-item-overlay"><span className="gallery-item-tag font-condensed">{tag}</span></div>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{maxWidth:"1200px",margin:"16px auto 0",background:"linear-gradient(135deg,#EEF7FF,white)",border:"1.5px solid rgba(42,127,212,0.2)",borderRadius:"8px",padding:"28px 32px",display:"flex",alignItems:"center",gap:"24px",boxShadow:"0 4px 16px rgba(42,127,212,0.08)"}}>
          <div style={{fontSize:"40px"}}>📸</div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:"12px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"var(--blue)",marginBottom:"6px"}}>Official Photography</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"26px",color:"var(--navy)",letterSpacing:"0.04em",marginBottom:"4px"}}>Professional Photographer On-Site</div>
            <div style={{fontSize:"14px",color:"var(--gray)",lineHeight:1.6}}>A professional photographer will be present at the 2nd Annual SD Summer Milk Mile. Race day photos will be shared after the event via our Instagram <span style={{color:"var(--blue)",fontWeight:600}}>@sd.milk.mile.association</span>. Tag us in your posts!</div>
          </div>
        </div>
      </section>

      <section className="social-section" id="social">
        <div className="section-inner">
          <div className="section-label fade-up" style={{justifyContent:"center"}}>Follow the Chaos</div>
          <h2 className="section-title font-display fade-up" style={{textAlign:"center"}}>Stay in the<br />Loop</h2>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:"17px",maxWidth:"520px",margin:"0 auto 40px",textAlign:"center"}} className="fade-up">Race updates, results, footage, and pure unfiltered milk mile content.</p>
          <div className="social-links fade-up">
            <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="social-btn primary font-display">🎽 Register for June 23</a>
            <a href={IG_URL} target="_blank" rel="noreferrer" className="social-btn font-display">📷 Instagram</a>
            <a href={YT_URL} target="_blank" rel="noreferrer" className="social-btn font-display">▶ YouTube</a>
          </div>
          <div className="handle-tag font-display">@sd.milk.mile.association</div>
        </div>
      </section>

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
