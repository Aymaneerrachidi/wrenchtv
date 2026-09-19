import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const PODCAST =
  "https://www.iheart.com/podcast/1333-tetragrammaton-with-rick-329505932/episode/vlad-tenev-part-2-335191499/";
const TRANSCRIPT =
  "https://podscripts.co/podcasts/tetragrammaton-with-rick-rubin/vlad-tenev-part-2";
const ticker = import.meta.env.VITE_TOKEN_TICKER?.trim() || "$WRENCH";
const contract = import.meta.env.VITE_CONTRACT_ADDRESS?.trim() || "";

function externalUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
const buyUrl = externalUrl(import.meta.env.VITE_BUY_URL);
const xUrl = externalUrl(import.meta.env.VITE_X_URL);
const telegramUrl = externalUrl(import.meta.env.VITE_TELEGRAM_URL);

function Arrow({
  diagonal = false,
  down = false,
}: {
  diagonal?: boolean;
  down?: boolean;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      style={{
        transform: down
          ? "rotate(90deg)"
          : diagonal
            ? "rotate(-45deg)"
            : undefined,
      }}
    >
      <path d="M4 12h15M12 5l7 7-7 7" />
    </svg>
  );
}
function WrenchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M39 5a18 18 0 0 0-18 23L5 44a9 9 0 0 0 13 13l17-17A18 18 0 0 0 58 18L47 29l-11-2-2-11L45 5a18 18 0 0 0-6 0ZM12 47a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </svg>
  );
}
function TVIcon() {
  return (
    <svg
      viewBox="0 0 130 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      aria-hidden="true"
    >
      <path d="m36 4 25 24L90 2M26 96l-5 10m77-10 7 10" />
      <rect x="9" y="27" width="113" height="68" rx="9" />
      <rect x="18" y="36" width="73" height="49" rx="10" />
      <circle cx="106" cy="45" r="5" />
      <path d="M101 61h11m-11 8h11m-11 8h11" />
    </svg>
  );
}
function MetalWrench() {
  return (
    <svg viewBox="0 0 76 246" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="chrome"
          x1="9"
          x2="65"
          y1="30"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#626561" />
          <stop offset=".24" stopColor="#e0e2d7" />
          <stop offset=".43" stopColor="#aaada6" />
          <stop offset=".65" stopColor="#f6f3e3" />
          <stop offset="1" stopColor="#73766f" />
        </linearGradient>
      </defs>
      <path
        d="M11 6h22v17h18V4h17v37L52 61 47 75l-1 147c0 22-27 22-27 0l2-147-7-20L6 40V13Z"
        fill="url(#chrome)"
        stroke="#292c26"
        strokeWidth="2"
      />
      <path
        d="M17 10h12v18h27V8h7v31L48 57H25L11 38V15Z"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="2"
      />
      <rect
        x="29"
        y="78"
        width="9"
        height="128"
        rx="4"
        fill="#71766f"
        stroke="#d7d9ce"
        strokeWidth="1.2"
      />
      <circle
        cx="32"
        cy="222"
        r="6"
        fill="#32372e"
        stroke="#e4e5d8"
        strokeWidth="1.5"
      />
      <rect x="24" y="36" width="26" height="12" rx="2" fill="#51574d" />
      <path
        d="M28 37v10m5-10v10m5-10v10m5-10v10m5-10v10"
        stroke="#c3c8bb"
        strokeWidth="2"
      />
    </svg>
  );
}
const channelNames = ["The original", "The backstory", "The philosophy"];
function Television() {
  const [channel, setChannel] = useState(0);
  const [on, setOn] = useState(true);
  const [tuning, setTuning] = useState(false);
  const [turns, setTurns] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function changeChannel(next = (channel + 1) % channelNames.length) {
    if (timer.current) clearTimeout(timer.current);
    setOn(true);
    setTuning(true);
    setTurns((value) => value + 1);
    setChannel(next);
    timer.current = setTimeout(() => setTuning(false), 190);
  }
  return (
    <div className="tv-stage">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="stage-caption mono">
        <span className="crosshair">+</span> FOUND ON THE CURB. KEPT FOR THE
        CULTURE.
      </div>
      <div className="television">
        <svg
          className="antenna"
          viewBox="0 0 500 180"
          fill="none"
          aria-hidden="true"
        >
          <path d="m80 7 172 160L426 11" stroke="#292921" strokeWidth="7" />
          <path d="m80 7 172 160L426 11" stroke="#bfc1aa" strokeWidth="3" />
          <circle cx="79" cy="7" r="6" fill="#36372e" />
          <circle cx="426" cy="11" r="6" fill="#36372e" />
          <path
            d="M213 180v-14c0-18 76-18 76 0v14"
            fill="#393a30"
            stroke="#22241b"
            strokeWidth="4"
          />
        </svg>
        <div className="tv-case">
          <div className="screen-bezel">
            <div
              className={`tv-screen ${!on ? "is-off" : ""} ${tuning ? "is-tuning" : ""}`}
            >
              <div className="screen-top mono">
                <span>WTV / {String(channel + 1).padStart(2, "0")}</span>
                <span>● ON AIR</span>
              </div>
              <div className="screen-program" key={channel}>
                {channel === 0 && (
                  <>
                    <div className="test-pattern" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="screen-wordmark">
                      WRENCH
                      <span>
                        TV
                        <WrenchIcon />
                      </span>
                    </div>
                    <div className="screen-sub mono">
                      A LITTLE STATIC. A LOT OF LORE.
                    </div>
                  </>
                )}
                {channel === 1 && (
                  <div className="channel-story">
                    <span className="mono">THE ORIGIN SIGNAL</span>
                    <strong>
                      BULGARIA.
                      <br />A BROKEN TV.
                      <br />
                      ROBINHOOD.
                    </strong>
                    <span className="mono">EVERY STORY STARTS SOMEWHERE.</span>
                  </div>
                )}
                {channel === 2 && (
                  <div className="channel-story philosophy">
                    <WrenchIcon />
                    <strong>
                      MAKE IT
                      <br />
                      WORK.
                    </strong>
                    <span className="mono">NO KNOB. NO PROBLEM.</span>
                  </div>
                )}
              </div>
              <div className="screen-bottom mono">
                <span>BLACK & WHITE</span>
                <span>EST. IN THE LORE</span>
              </div>
              <div className="screen-static" aria-hidden="true" />
              {!on && <div className="off-message mono">SIGNAL OFF</div>}
            </div>
          </div>
          <div className="tv-controls">
            <span className="tv-brand">
              WRENCH<span>VISION</span>
            </span>
            <button
              className="channel-dial"
              aria-label="Change TV channel"
              onClick={() => changeChannel()}
            >
              <span style={{ transform: `rotate(${channel * 70 - 30}deg)` }} />
              <i>CH</i>
            </button>
            <div className="wrench-mount">
              <span className="missing-knob" />
              <button
                className="real-wrench"
                aria-label="Turn the wrench to change channel"
                onClick={() => changeChannel()}
                style={
                  {
                    "--wrench-turn": `${turns % 2 === 0 ? -29 : 5}deg`,
                  } as CSSProperties
                }
              >
                <MetalWrench />
              </button>
            </div>
            <div className="speaker" aria-hidden="true" />
            <button
              className={`power-button ${on ? "is-on" : ""}`}
              onClick={() => setOn((value) => !value)}
              aria-label={on ? "Turn TV off" : "Turn TV on"}
              aria-pressed={on}
            >
              <span />
              POWER
            </button>
          </div>
        </div>
        <div className="tv-feet" aria-hidden="true">
          <i />
          <i />
        </div>
      </div>
      <div className="wrench-note" aria-hidden="true">
        <svg viewBox="0 0 95 50" fill="none">
          <path
            d="M4 43c37 3 70-9 82-37m-16 4 18-5 3 19"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span>yep. that’s the remote.</span>
      </div>
      <div className="channel-selector">
        <span className="mono">CHANGE THE CHANNEL</span>
        <div>
          {channelNames.map((name, index) => (
            <button
              key={name}
              onClick={() => changeChannel(index)}
              aria-label={`Channel ${index + 1}: ${name}`}
              aria-pressed={on && channel === index}
              className={on && channel === index ? "active" : ""}
            >
              0{index + 1}
            </button>
          ))}
        </div>
        <span className="channel-instruction mono">↖ OR TURN THE WRENCH</span>
      </div>
      <span className="sr-only" role="status">
        {on ? `Channel ${channel + 1}: ${channelNames[channel]}` : "TV is off"}
      </span>
    </div>
  );
}
const memes = [
  {
    title: "The original remote.",
    lines: ["REMOTE?", "WE HAVE", "A WRENCH."],
    color: "orange",
  },
  {
    title: "An origin story, actually.",
    lines: ["BEFORE THE HOOD.", "THERE WAS", "THE HARDWARE."],
    color: "cream",
  },
  {
    title: "The whole philosophy.",
    lines: ["NO KNOB.", "NO PROBLEM."],
    color: "dark",
  },
];
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timeout);
  }, [notice]);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  async function copyContract() {
    try {
      await navigator.clipboard.writeText(contract);
      setCopied(true);
      setNotice("Contract address copied.");
    } catch {
      setNotice(
        "Copy unavailable. Select the address below to copy it manually.",
      );
    }
  }
  async function downloadMeme(index: number) {
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1080;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      const meme = memes[index];
      const dark = meme.color === "dark";
      context.fillStyle = dark
        ? "#24251f"
        : meme.color === "orange"
          ? "#ff5b24"
          : "#eee9dd";
      context.fillRect(0, 0, 1080, 1080);
      context.fillStyle = dark ? "#eee9dd" : "#24251f";
      context.font = '400 24px "IBM Plex Mono"';
      context.fillText("WRENCH TV / THE INTERNET FOUND THE REMOTE.", 64, 78);
      context.fillRect(64, 112, 952, 2);
      context.save();
      context.translate(790, 145);
      context.scale(3, 3);
      context.fill(
        new Path2D(
          "M39 5a18 18 0 0 0-18 23L5 44a9 9 0 0 0 13 13l17-17A18 18 0 0 0 58 18L47 29l-11-2-2-11L45 5a18 18 0 0 0-6 0ZM12 47a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
        ),
      );
      context.restore();
      context.font = `400 ${index === 1 ? 109 : 150}px Anton`;
      meme.lines.forEach((line, lineIndex) =>
        context.fillText(
          line,
          64,
          (index === 2 ? 535 : 450) + lineIndex * 170,
          945,
        ),
      );
      context.fillRect(64, 950, 952, 2);
      context.font = '400 25px "IBM Plex Mono"';
      context.fillText(`${ticker} / NO KNOB. NO PROBLEM.`, 64, 1008);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Image unavailable");
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `wrench-tv-meme-${index + 1}.png`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Meme downloaded. Put it on the air.");
    } catch {
      setNotice("The download didn’t start. Please try again.");
    }
  }
  return (
    <div className="site-shell">
      <a className="skip-link" href="#lore">
        Skip to the lore
      </a>
      <header className="header" id="top">
        <a className="brand" href="#top" aria-label="Wrench TV home">
          <span className="brand-icon">
            <WrenchIcon />
          </span>
          <span>
            WRENCH<span className="brand-tv">TV</span>
          </span>
        </a>
        <nav
          className={menuOpen ? "navigation open" : "navigation"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <a href="#lore" onClick={() => setMenuOpen(false)}>
            THE LORE
          </a>
          <a href="#receipts" onClick={() => setMenuOpen(false)}>
            THE RECEIPTS
          </a>
          <a href="#memes" onClick={() => setMenuOpen(false)}>
            THE MEMES
          </a>
        </nav>
        <a className="header-cta mono" href="#tune-in">
          TUNE IN <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow mono">
              <span className="status-light" /> AN UNLIKELY ORIGIN. AN INTERNET
              CULT.
            </div>
            <h1 id="hero-title">
              NO KNOB.
              <br />
              NO <span className="headline-outline">PROBLEM.</span>
            </h1>
            <p className="hero-intro">
              Before Robinhood, there was a broken TV.
              <br />
              And a wrench that made it work.
            </p>
            <p className="hero-description">
              A memecoin for the ones who make something
              <br className="desktop-break" /> out of nothing. Inspired by a
              true story.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#lore">
                GET THE LORE <Arrow down />
              </a>
              <a
                className="hero-source"
                href={PODCAST}
                target="_blank"
                rel="noreferrer"
              >
                Hear it from Vlad <Arrow diagonal />
              </a>
            </div>
            <div className="hero-footnote mono">
              <WrenchIcon />
              <span>ONE OLD TV. ONE WRENCH. {ticker}.</span>
            </div>
          </div>
          <Television />
          <div className="hero-bottom mono">
            <span>INDEPENDENT MEME CULTURE / ORIGINAL SIGNAL</span>
            <a href="#lore">
              SCROLL TO TUNE IN <Arrow down />
            </a>
          </div>
        </section>
        <div
          className="broadcast-strip"
          role="img"
          aria-label="No knob. No problem. Just lore."
        >
          <div aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <span className="broadcast-group" key={index}>
                <span>NO KNOB. NO PROBLEM.</span>
                <WrenchIcon />
                <span>THE LORE IS REAL.</span>
                <WrenchIcon />
                <span>STAY TUNED.</span>
                <WrenchIcon />
              </span>
            ))}
          </div>
        </div>
        <section
          className="lore-section section-pad"
          id="lore"
          aria-labelledby="lore-title"
        >
          <div className="section-topline mono">
            <span>
              <span className="section-dot" /> THE BACKSTORY
            </span>
            <span>GOOD STORIES START SMALL.</span>
          </div>
          <div className="lore-heading">
            <h2 id="lore-title">
              SOMEONE’S TRASH.
              <br />
              THE INTERNET’S <span className="orange-text">TREASURE.</span>
            </h2>
            <p>
              No writers’ room. No made-up origin.
              <br />
              Just a kid, a discarded television,
              <br />
              and a little resourcefulness.
            </p>
          </div>
          <div className="lore-grid">
            <article className="lore-card">
              <div className="lore-art art-tv">
                <span className="art-note mono">ONE PERSON’S TRASH…</span>
                <TVIcon />
                <div className="ground-line" />
                <span className="art-stamp mono">
                  B&W
                  <br />
                  ONLY
                </span>
              </div>
              <div className="chapter-label mono">
                <span>01 / THE FIND</span>
                <span>↗</span>
              </div>
              <h3>
                A new country.
                <br />
                An old television.
              </h3>
              <p>
                After Vlad Tenev’s family moved from Bulgaria to the US, they
                picked up a black-and-white TV someone had thrown away.
              </p>
            </article>
            <article className="lore-card">
              <div className="lore-art art-wrench">
                <div className="wrench-outline">
                  <WrenchIcon />
                </div>
                <span className="art-note mono">
                  FACTORY REMOTE
                  <br />
                  NOT INCLUDED.
                </span>
                <span className="art-plus" aria-hidden="true">
                  +
                </span>
              </div>
              <div className="chapter-label mono">
                <span>02 / THE FIX</span>
                <span>↗</span>
              </div>
              <h3>
                Missing a knob.
                <br />
                Found a way.
              </h3>
              <p>
                The channel knob was missing. Their solution? A wrench. Grip it,
                turn it, change the channel. Problem solved.
              </p>
            </article>
            <article className="lore-card">
              <div className="lore-art art-signal">
                <div className="signal-rings" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>↗</span>
                </div>
                <span className="art-note mono">
                  SMALL BEGINNINGS.
                  <br />
                  DIFFERENT FREQUENCY.
                </span>
              </div>
              <div className="chapter-label mono">
                <span>03 / THE NEXT CHAPTER</span>
                <span>↗</span>
              </div>
              <h3>
                First, the channels.
                <br />
                Then, Robinhood.
              </h3>
              <p>
                Years later, Vlad co-founded Robinhood. The internet remembered
                the wrench. And here we are, keeping the story on air.
              </p>
            </article>
          </div>
          <div className="lore-bottom mono">
            <span>A REAL BACKSTORY. AN INDEPENDENT MEMECOIN.</span>
            <a href={TRANSCRIPT} target="_blank" rel="noreferrer">
              READ THE ORIGINAL TRANSCRIPT <Arrow diagonal />
            </a>
          </div>
        </section>
        <section
          className="receipts-section section-pad"
          id="receipts"
          aria-labelledby="receipts-title"
        >
          <div className="receipts-copy">
            <span className="eyebrow mono">
              <span className="status-light" /> DON’T TAKE OUR WORD FOR IT.
            </span>
            <h2 id="receipts-title">
              THE LORE
              <br />
              HAS <span>RECEIPTS.</span>
            </h2>
            <p>
              Vlad told Rick Rubin the story himself.
              <br />
              We just found our favorite part.
            </p>
            <a
              className="text-link mono"
              href={TRANSCRIPT}
              target="_blank"
              rel="noreferrer"
            >
              CHECK THE TRANSCRIPT <Arrow diagonal />
            </a>
          </div>
          <a
            className="podcast-card"
            href={PODCAST}
            target="_blank"
            rel="noreferrer"
            aria-label="Listen to Vlad Tenev Part 2 on Tetragrammaton with Rick Rubin. The TV story starts around 1 hour 9 minutes."
          >
            <div className="podcast-top mono">
              <span>THE ORIGINAL BROADCAST</span>
              <Arrow diagonal />
            </div>
            <div className="podcast-identity">
              <span className="podcast-art" aria-hidden="true">
                t<span>+</span>
              </span>
              <div>
                <span className="mono">TETRAGRAMMATON</span>
                <h3>Vlad Tenev (Part 2)</h3>
                <p>with Rick Rubin</p>
              </div>
            </div>
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 57 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    height: `${12 + Math.abs(Math.sin(index * 2.8) * Math.cos(index * 0.39)) * 66}px`,
                  }}
                />
              ))}
              <span className="wave-marker" />
            </div>
            <div className="podcast-time mono">
              <span>JUMP TO THE TV STORY</span>
              <strong>~ 01:09:00</strong>
            </div>
            <div className="podcast-bottom">
              <span className="play-icon" aria-hidden="true">
                ▶
              </span>
              <span>HEAR IT FROM VLAD</span>
              <Arrow />
            </div>
          </a>
        </section>
        <section
          className="memes-section section-pad"
          id="memes"
          aria-labelledby="memes-title"
        >
          <div className="section-topline mono">
            <span>
              <span className="section-dot" /> PUBLIC ACCESS TELEVISION
            </span>
            <span>MADE TO BE PASSED AROUND.</span>
          </div>
          <div className="memes-heading">
            <h2 id="memes-title">
              STEAL THE <span className="orange-text">SIGNAL.</span>
            </h2>
            <p>Save a meme. Spread the lore. Make some noise.</p>
          </div>
          <div className="meme-grid">
            {memes.map((meme, index) => (
              <article className="meme-item" key={meme.title}>
                <div className={`meme-poster meme-${meme.color}`}>
                  <div className="meme-top mono">
                    <span>WRENCH TV</span>
                    <span>↗</span>
                  </div>
                  <WrenchIcon />
                  <div className="meme-words">
                    {meme.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                  <span className="meme-signoff mono">
                    {ticker} / STAY TUNED.
                  </span>
                </div>
                <button
                  className="meme-download"
                  onClick={() => void downloadMeme(index)}
                >
                  <span>{meme.title}</span>
                  <span className="mono">
                    DOWNLOAD <Arrow down />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>
        <section
          className="tune-section section-pad"
          id="tune-in"
          aria-labelledby="tune-title"
        >
          <div className="tune-copy">
            <span className="eyebrow mono">THE CHANNEL IS OURS NOW.</span>
            <h2 id="tune-title">
              GRAB A WRENCH.
              <br />
              FIND YOUR <span className="headline-outline">PEOPLE.</span>
            </h2>
            <p>The best things start with a little improvisation.</p>
            <div className="community-links">
              {xUrl && (
                <a
                  className="button button-dark"
                  href={xUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  FOLLOW ON X <Arrow diagonal />
                </a>
              )}
              {telegramUrl && (
                <a
                  className="button button-outline"
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  JOIN TELEGRAM <Arrow diagonal />
                </a>
              )}
              {!xUrl && !telegramUrl && (
                <span className="community-pending mono">
                  <span className="status-light" /> COMMUNITY CHANNELS COMING
                  SOON
                </span>
              )}
            </div>
          </div>
          <div className="token-card">
            <div className="token-card-top mono">
              <span>THE OFFICIAL SIGNAL</span>
              <WrenchIcon />
            </div>
            <div className="token-ticker">{ticker}</div>
            <div className="contract-box">
              <span className="mono">CONTRACT ADDRESS</span>
              {contract ? (
                <>
                  <code>{contract}</code>
                  <button
                    className="copy-contract mono"
                    onClick={() => void copyContract()}
                  >
                    {copied ? "COPIED ✓" : "COPY ADDRESS"} <span>⧉</span>
                  </button>
                </>
              ) : (
                <>
                  <strong>Still tuning in.</strong>
                  <p>
                    The contract hasn’t been announced yet.
                    <br />
                    The address will appear here when it is.
                  </p>
                </>
              )}
            </div>
            {buyUrl ? (
              <a
                className="button button-dark token-buy"
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
              >
                GET {ticker} <Arrow diagonal />
              </a>
            ) : (
              <div className="launch-pending mono">
                <span className="pending-light" /> LAUNCH DETAILS COMING SOON
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <a className="brand" href="#top" aria-label="Back to Wrench TV home">
            <span className="brand-icon">
              <WrenchIcon />
            </span>
            <span>
              WRENCH<span className="brand-tv">TV</span>
            </span>
          </a>
          <span className="footer-tagline mono">
            NO KNOB. NO PROBLEM. JUST LORE.
          </span>
          <a className="back-top mono" href="#top">
            BACK TO TOP <Arrow down />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            Wrench TV is an independent memecoin concept inspired by a public
            story. Not affiliated with or endorsed by Vlad Tenev, Robinhood,
            Rick Rubin, or Tetragrammaton.
          </p>
          <span className="mono">
            FOR THE MEMES.
            <br />
            NOT FINANCIAL ADVICE.
          </span>
        </div>
      </footer>
      {notice && (
        <div className="toast mono" role="status">
          <WrenchIcon />
          {notice}
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
