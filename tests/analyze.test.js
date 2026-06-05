import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeSnapshot, snapshot } from '../src/index.js';

test('scores IBM watsonx snapshot into a board posture', () => {
  const result = analyzeSnapshot(snapshot);
  assert.equal(result.platform, 'IBM watsonx');
  assert.ok(result.riskScore >= 50);
  assert.ok(['ready', 'watch', 'escalate'].includes(result.boardPosture));
  assert.ok(result.highestRisk.nextAction.length > 20);
});

test('keeps recoverable value and live surface explicit', () => {
  const result = analyzeSnapshot(snapshot);
  assert.equal(result.liveSurface, 'https://watsonx.kineticgain.com/');
  assert.equal(result.signals.length, 3);
  assert.ok(Number.isInteger(result.recoverableUsd));
});
