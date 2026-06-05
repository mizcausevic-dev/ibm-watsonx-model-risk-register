#!/usr/bin/env node
import { snapshot } from './data.js';
import { analyzeSnapshot } from './analyze.js';

const result = analyzeSnapshot(snapshot);
const asJson = process.argv.includes('--json');

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`# ${result.title}`);
  console.log(result.decisionSummary);
  console.log(`Board question: ${result.boardQuestion}`);
  console.log(`Highest-risk lane: ${result.highestRisk.name} (${result.highestRisk.owner})`);
  console.log(`Next action: ${result.highestRisk.nextAction}`);
  console.log(`Live surface: ${result.liveSurface}`);
}
