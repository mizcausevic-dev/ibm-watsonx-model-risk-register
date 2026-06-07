# IBM watsonx Model Risk Register

IBM watsonx Model Risk Register is a Kinetic Gain platform-signal repo for **IBM watsonx**. It turns synthetic AI governance, model-risk, lineage, IBM Cloud IAM, and release-readiness signals into a board-readable register.

[![CI](https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register/actions/workflows/ci.yml)
[![Pages](https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register/actions/workflows/pages.yml/badge.svg)](https://github.com/mizcausevic-dev/ibm-watsonx-model-risk-register/actions/workflows/pages.yml)

## Board question

> Which watsonx model use cases need risk, disclosure, or access evidence before executive sign-off?

## What it scores

- **Model risk**: unclassified assistant use cases, risk tier, approved use boundary, and disclosure posture.
- **Evidence**: prompt, response, retrieval, and tool-call audit streams.
- **Lineage**: source dataset cards, retention policy, and approved grounding or training use.
- **Access**: IBM Cloud IAM drift around watsonx service roles and governance groups.
- **Release**: eval gates for model updates, retrieval changes, and prompt releases.
- **Attestation**: system cards, data cards, vendor disclosures, and incident route packets.

## Run locally

```bash
npm install
npm run verify
npm start
npm start -- --json
```

## Example output

```text
# IBM watsonx Model Risk Register
IBM watsonx: watch posture, 74/100 risk, $0 recoverable or protected value.
Board question: Which watsonx model use cases need risk, disclosure, or access evidence before executive sign-off?
Highest-risk lane: Unclassified assistant use case (AI governance)
```

## Static site

The repo builds a synthetic board surface into `site/index.html`.

```bash
npm run build:site
```

## Data posture

This repo uses synthetic demonstration data only. It does not connect to live IBM watsonx tenants, export customer records, store credentials, or publish admin-console screenshots.

## Portfolio connection

- Company/platform signal: IBM, IBM watsonx, IBM Cloud IAM
- Domain: AI governance and model risk
- Live surface family: [https://watsonx.kineticgain.com/](https://watsonx.kineticgain.com/)
- Apex: [https://kineticgain.com/](https://kineticgain.com/)
- Portfolio: [https://portfolio.kineticgain.com/](https://portfolio.kineticgain.com/)
