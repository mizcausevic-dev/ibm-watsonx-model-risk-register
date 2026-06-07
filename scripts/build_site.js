import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeSnapshot } from '../src/analyze.js';
import { snapshot } from '../src/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'site');
const outFile = resolve(outDir, 'index.html');
const result = analyzeSnapshot(snapshot);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatUsd = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const signalRows = result.signals
  .map(
    (signal) => `
      <article class="signal-card">
        <div class="signal-topline">
          <span>${escapeHtml(signal.Area)}</span>
          <strong>${escapeHtml(signal.weightedRisk)}</strong>
        </div>
        <h3>${escapeHtml(signal.Name)}</h3>
        <dl>
          <div><dt>Owner</dt><dd>${escapeHtml(signal.Owner)}</dd></div>
          <div><dt>Severity</dt><dd>${escapeHtml(signal.Severity)}</dd></div>
          <div><dt>Confidence</dt><dd>${escapeHtml(signal.Confidence)}%</dd></div>
        </dl>
        <p>${escapeHtml(signal.Action)}</p>
      </article>`,
  )
  .join('');

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: result.title,
  description:
    'Board-readable IBM watsonx model risk register for AI governance, model evidence, IBM Cloud access, and release posture.',
  codeRepository: 'https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register',
  programmingLanguage: 'JavaScript',
  applicationCategory: 'BusinessApplication',
  keywords: ['IBM watsonx', 'AI governance', 'model risk', 'Kinetic Gain', 'executive intelligence'],
};

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(result.title)} | Kinetic Gain</title>
    <meta
      name="description"
      content="Board-readable IBM watsonx model risk register for AI governance, model evidence, IBM Cloud access, and release posture."
    />
    <meta property="og:title" content="${escapeHtml(result.title)}" />
    <meta property="og:description" content="${escapeHtml(result.boardQuestion)}" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#05080f" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <style>
      :root {
        color-scheme: dark;
        --bg: #05080f;
        --panel: #0b1220;
        --panel-2: #101827;
        --text: #f4f0e8;
        --muted: #a9b2c5;
        --line: rgba(151, 170, 197, 0.22);
        --cyan: #35d7ff;
        --green: #57f0a8;
        --violet: #9a7cff;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family:
          "IBM Plex Sans",
          "Aptos",
          "Segoe UI",
          sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(53, 215, 255, 0.16), transparent 32rem),
          radial-gradient(circle at top right, rgba(154, 124, 255, 0.16), transparent 34rem),
          linear-gradient(180deg, #05080f 0%, #08111b 100%);
      }

      a {
        color: inherit;
      }

      .shell {
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
        padding: 32px 0 44px;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 18px 0 26px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
        font-weight: 800;
        letter-spacing: -0.04em;
      }

      .mark {
        width: 46px;
        height: 34px;
        position: relative;
        border-left: 5px solid #526577;
      }

      .mark::before,
      .mark::after,
      .mark span {
        content: "";
        position: absolute;
        left: 10px;
        height: 7px;
        transform: skewX(-16deg);
        background: var(--text);
      }

      .mark::before {
        top: 3px;
        width: 20px;
      }

      .mark span {
        top: 14px;
        width: 34px;
      }

      .mark::after {
        top: 25px;
        width: 48px;
      }

      nav {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        justify-content: flex-end;
        font-size: 0.82rem;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
        gap: 24px;
        padding: 32px;
        border: 1px solid var(--line);
        border-radius: 28px;
        background:
          linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 38%),
          rgba(11, 18, 32, 0.86);
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
      }

      .eyebrow {
        display: inline-flex;
        gap: 9px;
        align-items: center;
        margin: 0 0 18px;
        color: var(--green);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }

      .eyebrow::before {
        content: "";
        width: 9px;
        height: 9px;
        border-radius: 99px;
        background: var(--cyan);
        box-shadow: 0 0 18px rgba(53, 215, 255, 0.8);
      }

      h1 {
        margin: 0;
        max-width: 780px;
        font-size: clamp(3.2rem, 9vw, 7.7rem);
        line-height: 0.9;
        letter-spacing: -0.075em;
      }

      .hero p {
        max-width: 780px;
        color: var(--muted);
        font-size: clamp(1rem, 1.7vw, 1.28rem);
        line-height: 1.65;
      }

      .decision-panel {
        align-self: stretch;
        display: grid;
        align-content: space-between;
        gap: 18px;
        padding: 26px;
        border: 1px solid var(--line);
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(16, 24, 39, 0.96), rgba(5, 8, 15, 0.9));
      }

      .score {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }

      .metric {
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.035);
      }

      .metric span {
        display: block;
        color: var(--muted);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .metric strong {
        display: block;
        margin-top: 8px;
        color: var(--text);
        font-size: 2.3rem;
        letter-spacing: -0.06em;
      }

      .board-question {
        margin: 0;
        padding-left: 16px;
        border-left: 3px solid var(--cyan);
        color: var(--text);
      }

      .section {
        margin-top: 24px;
        padding: 30px;
        border: 1px solid var(--line);
        border-radius: 28px;
        background: rgba(11, 18, 32, 0.74);
      }

      .section h2 {
        margin: 0 0 10px;
        font-size: clamp(2rem, 4vw, 4rem);
        line-height: 0.96;
        letter-spacing: -0.06em;
      }

      .section > p {
        margin: 0 0 24px;
        max-width: 820px;
        color: var(--muted);
        line-height: 1.7;
      }

      .signals {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }

      .signal-card {
        min-height: 250px;
        padding: 20px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015));
      }

      .signal-topline,
      dl {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }

      .signal-topline {
        color: var(--green);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .signal-topline strong {
        color: var(--cyan);
        font-size: 1.2rem;
        letter-spacing: -0.02em;
      }

      .signal-card h3 {
        min-height: 58px;
        margin: 18px 0;
        font-size: 1.35rem;
        line-height: 1.08;
        letter-spacing: -0.035em;
      }

      dl {
        margin: 0 0 18px;
        flex-wrap: wrap;
      }

      dt {
        color: var(--muted);
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }

      dd {
        margin: 5px 0 0;
        color: var(--text);
        font-weight: 700;
      }

      .signal-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.55;
      }

      .next-action {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 18px;
        align-items: stretch;
      }

      .next-card {
        padding: 24px;
        border-radius: 24px;
        border: 1px solid var(--line);
        background: var(--panel-2);
      }

      .next-card strong {
        color: var(--green);
        font-size: 0.75rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .next-card h3 {
        margin: 16px 0 10px;
        font-size: 2rem;
        line-height: 1;
        letter-spacing: -0.055em;
      }

      footer {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
        padding: 28px 0 0;
        color: var(--muted);
        font-size: 0.9rem;
      }

      @media (max-width: 920px) {
        .hero,
        .next-action {
          grid-template-columns: 1fr;
        }

        .signals {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .shell {
          width: min(100% - 24px, 1180px);
          padding-top: 18px;
        }

        header,
        nav {
          justify-content: flex-start;
        }

        .hero,
        .section {
          padding: 22px;
          border-radius: 22px;
        }

        .signals,
        .score {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header>
        <a class="brand" href="https://kineticgain.com/" aria-label="Kinetic Gain">
          <span class="mark" aria-hidden="true"><span></span></span>
          <span>Kinetic Gain</span>
        </a>
        <nav aria-label="Primary">
          <a href="#register">Register</a>
          <a href="#next-action">Decision</a>
          <a href="https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register">GitHub</a>
          <a href="${escapeHtml(result.liveSurface)}">Watsonx surface</a>
        </nav>
      </header>

      <section class="hero">
        <div>
          <p class="eyebrow">IBM watsonx model risk register</p>
          <h1>Which watsonx use cases need executive evidence before sign-off?</h1>
          <p>
            ${escapeHtml(result.title)} turns IBM watsonx governance, access, lineage, and release signals
            into one board-readable register. It is synthetic, offline, and designed to show the decision
            surface without exposing tenant data.
          </p>
        </div>
        <aside class="decision-panel" aria-label="Decision summary">
          <p class="board-question">${escapeHtml(result.boardQuestion)}</p>
          <div class="score">
            <div class="metric">
              <span>Posture</span>
              <strong>${escapeHtml(result.boardPosture)}</strong>
            </div>
            <div class="metric">
              <span>Risk score</span>
              <strong>${escapeHtml(result.riskScore)}/100</strong>
            </div>
            <div class="metric">
              <span>Signals</span>
              <strong>${escapeHtml(result.signals.length)}</strong>
            </div>
            <div class="metric">
              <span>Protected value</span>
              <strong>${escapeHtml(formatUsd(result.recoverableUsd))}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section class="section" id="register">
        <h2>Board-visible model risk lanes.</h2>
        <p>
          The register keeps risk tiering, prompt auditability, dataset lineage, IBM Cloud IAM posture,
          eval gates, and attestation packets visible in the same operating view.
        </p>
        <div class="signals">${signalRows}</div>
      </section>

      <section class="section next-action" id="next-action">
        <div class="next-card">
          <strong>Highest risk lane</strong>
          <h3>${escapeHtml(result.highestRisk.name)}</h3>
          <p>${escapeHtml(result.highestRisk.area)} owned by ${escapeHtml(result.highestRisk.owner)}.</p>
        </div>
        <div class="next-card">
          <strong>Recommended move</strong>
          <h3>${escapeHtml(result.highestRisk.nextAction)}</h3>
          <p>
            ${escapeHtml(result.decisionSummary)} This is the IBM proof surface for Kinetic Gain platform
            and company signals.
          </p>
        </div>
      </section>

      <footer>
        <span>IBM watsonx Model Risk Register</span>
        <span>Open source proof surface for Kinetic Gain platform signals.</span>
      </footer>
    </main>
  </body>
</html>
`;

await mkdir(outDir, { recursive: true });
await writeFile(outFile, html);
console.log(`wrote ${outFile}`);
