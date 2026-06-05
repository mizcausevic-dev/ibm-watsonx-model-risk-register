export const snapshot = {
  platform: "IBM watsonx",
  title: "IBM watsonx Model Risk Register",
  domain: "AI governance",
  boardQuestion: "Which watsonx model use cases need risk, disclosure, or access evidence before executive sign-off?",
  liveSurface: "https://watsonx.kineticgain.com/",
  signals: [
  {
    "Confidence": 88,
    "Owner": "AI governance",
    "Recoverable": 0,
    "Severity": 86,
    "Action": "Assign model risk tier and disclosure posture",
    "Name": "Unclassified assistant use case",
    "Area": "model risk"
  },
  {
    "Confidence": 83,
    "Owner": "Platform AI",
    "Recoverable": 0,
    "Severity": 75,
    "Action": "Enable prompt and response audit event export",
    "Name": "Prompt audit stream missing",
    "Area": "evidence"
  },
  {
    "Confidence": 80,
    "Owner": "Data governance",
    "Recoverable": 0,
    "Severity": 67,
    "Action": "Attach source dataset card and retention policy",
    "Name": "Dataset lineage uncertainty",
    "Area": "lineage"
  }
]
};
