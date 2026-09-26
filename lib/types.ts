export type PatternKey =
  | "procrastination"
  | "perfectionism"
  | "overthinking"
  | "fearOfFailure"
  | "overpreparation"
  | "distraction"
  | "socialAvoidance"
  | "laziness"
  | "fakeProductivity"
  | "decisionParalysis"
  | "tutorialAddiction"
  | "prematureOptimization"
  | "doomScrolling"
  | "motivationWaiting"
  | "circumstanceBlaming"
  | "generic";

export interface Diagnosis {
  caseNumber: string;
  excuse: string;
  name: string;
  severity: number;
  primarySymptom: string;
  evidence: string[];
  treatment: string;
  relapseProbability: number;
  patterns: PatternKey[];
  roasted: boolean;
  timestamp: number;
}

export interface ArchiveEntry {
  caseNumber: string;
  excuse: string;
  diagnosisName: string;
  severity: number;
  timestamp: number;
}
