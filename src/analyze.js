export function analyzeSnapshot(snapshot) {
  const signals = snapshot.signals.map((signal) => ({
    ...signal,
    weightedRisk: Math.round(signal.Severity * (signal.Confidence / 100)),
  }));

  const riskScore = Math.round(
    signals.reduce((total, signal) => total + signal.weightedRisk, 0) / signals.length,
  );
  const recoverableUsd = signals.reduce((total, signal) => total + signal.Recoverable, 0);
  const highestRisk = [...signals].sort((a, b) => b.weightedRisk - a.weightedRisk)[0];
  const boardPosture = riskScore >= 78 ? 'escalate' : riskScore >= 65 ? 'watch' : 'ready';

  return {
    platform: snapshot.platform,
    title: snapshot.title,
    domain: snapshot.domain,
    boardQuestion: snapshot.boardQuestion,
    liveSurface: snapshot.liveSurface,
    boardPosture,
    riskScore,
    recoverableUsd,
    highestRisk: {
      name: highestRisk.Name,
      area: highestRisk.Area,
      owner: highestRisk.Owner,
      nextAction: highestRisk.Action,
      weightedRisk: highestRisk.weightedRisk,
    },
    decisionSummary: `${snapshot.platform}: ${boardPosture} posture, ${riskScore}/100 risk, $${recoverableUsd.toLocaleString('en-US')} recoverable or protected value.`,
    signals,
  };
}
