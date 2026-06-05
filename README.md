# IBM watsonx Model Risk Register

IBM watsonx Model Risk Register is a Kinetic Gain platform-signal repo for **IBM watsonx**. It turns synthetic ai governance signals into a board-ready view of exposure, savings, investment priority, and the story leaders can tell.

## Board question

> Which watsonx model use cases need risk, disclosure, or access evidence before executive sign-off?

## What it scores

- **Unclassified assistant use case** — model risk; owner: AI governance; next action: Assign model risk tier and disclosure posture
- **Prompt audit stream missing** — evidence; owner: Platform AI; next action: Enable prompt and response audit event export
- **Dataset lineage uncertainty** — lineage; owner: Data governance; next action: Attach source dataset card and retention policy

## Run locally

`ash
npm test
npm start
npm start -- --json
`

## Example output

`	ext
# IBM watsonx Model Risk Register
IBM watsonx: watch posture, risk score from synthetic signals, recoverable or protected value surfaced for executive review.
`

## Data posture

This repo uses synthetic demonstration data only. It does not connect to live IBM watsonx tenants, export customer records, or store credentials.

## Portfolio connection

- Platform signal: $(System.Collections.Hashtable.Platform)
- Domain: $(System.Collections.Hashtable.Domain)
- Live surface family: [https://watsonx.kineticgain.com/](https://watsonx.kineticgain.com/)
- Apex: [https://kineticgain.com/](https://kineticgain.com/)
- Portfolio: [https://portfolio.kineticgain.com/](https://portfolio.kineticgain.com/)
