import { Diagnosis, PatternKey } from "./types";

/* ---------------------------------------------------------------------- */
/* Deterministic pseudo-random: same excuse always yields the same case,  */
/* different excuses drift to different corners of the diagnosis space.   */
/* ---------------------------------------------------------------------- */

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickMany<T>(rng: () => number, arr: T[], count: number): T[] {
  const pool = [...arr];
  const out: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

/* ---------------------------------------------------------------------- */
/* Pattern detection — keyword / phrase signals mapped to a PatternKey.   */
/* ---------------------------------------------------------------------- */

const PATTERN_SIGNALS: Record<Exclude<PatternKey, "generic">, RegExp[]> = {
  tutorialAddiction: [
    /tutorial/i,
    /watch(ed|ing)? (a |another |one more )?(video|course)/i,
    /learn(ing)? (the )?(basics|fundamentals) first/i,
    /just need(ed)? to (watch|study|learn)/i,
  ],
  overpreparation: [
    /research(ed|ing)? (the )?(best|right|proper)/i,
    /folder structure/i,
    /set ?up (my|the) (environment|workspace|tools)/i,
    /read (more|one more|another) (article|doc|book)/i,
    /need(ed)? (the )?right (tool|setup|stack)/i,
  ],
  perfectionism: [
    /wasn'?t (good|ready|perfect) enough/i,
    /needs? to be perfect/i,
    /not (quite )?ready (yet|to (show|share|ship))/i,
    /keep(s)? (redoing|rewriting|refactoring)/i,
    /still (polishing|tweaking|refining)/i,
  ],
  overthinking: [
    /overthink/i,
    /kept (thinking|going back and forth)/i,
    /couldn'?t decide/i,
    /what if (it|this|that)/i,
    /too many (options|choices|directions)/i,
  ],
  fearOfFailure: [
    /afraid (it|i)/i,
    /scared (it|i)('ll| will)? (fail|be bad|not work)/i,
    /what if (it|i) (fail|mess|screw)/i,
    /didn'?t want to (fail|be judged|embarrass)/i,
    /not confident/i,
  ],
  decisionParalysis: [
    /couldn'?t (pick|choose|decide)/i,
    /too many (options|frameworks|tools)/i,
    /still (deciding|comparing|weighing)/i,
    /which (one|framework|tool|stack) to (use|pick)/i,
  ],
  prematureOptimization: [
    /optimi[sz]e/i,
    /scal(e|ing) (it|this) properly/i,
    /make (it|this) (perfect|efficient) (before|first)/i,
    /architecture (right|correct) (first|before)/i,
  ],
  doomScrolling: [
    /scroll(ed|ing)?/i,
    /twitter|instagram|tiktok|reddit|x\.com/i,
    /got (distracted|lost) (on|in) (my|the) phone/i,
    /ended up watching/i,
  ],
  distraction: [
    /got distracted/i,
    /opened (a|another|14|so many) tabs?/i,
    /notification/i,
    /kept checking/i,
    /one thing led to another/i,
  ],
  motivationWaiting: [
    /wait(ed|ing)? for (the )?(right )?(mood|motivation|moment|inspiration)/i,
    /didn'?t feel (like it|motivated|ready)/i,
    /not in the (mood|zone)/i,
  ],
  socialAvoidance: [
    /didn'?t (want to |reply|respond|answer|call|text)/i,
    /avoid(ed|ing)? (the|a) (call|meeting|conversation|message)/i,
    /left (it|them) on read/i,
    /awkward to (reply|respond|bring it up)/i,
  ],
  laziness: [
    /too tired/i,
    /couldn'?t be bothered/i,
    /lazy/i,
    /didn'?t feel like (doing|it)/i,
    /just didn'?t/i,
  ],
  fakeProductivity: [
    /reorgani[sz](ed|ing)/i,
    /clean(ed|ing) up (my|the) (desk|inbox|files|theme)/i,
    /(vs ?code|editor|notion|todo) (theme|setup|template)/i,
    /made a (plan|spreadsheet|schedule) instead/i,
  ],
  circumstanceBlaming: [
    /(because|due to) (my|the) (wifi|internet|laptop|computer|schedule|job|weather)/i,
    /didn'?t have (time|enough time)/i,
    /(work|life|something) got in the way/i,
    /not my fault/i,
  ],
  procrastination: [
    /procrastinat/i,
    /put (it|this) off/i,
    /tomorrow instead/i,
    /kept (delaying|postponing|pushing it back)/i,
    /^i was going to/i,
  ],
};

function detectPatterns(text: string): PatternKey[] {
  const found: PatternKey[] = [];
  (Object.keys(PATTERN_SIGNALS) as Exclude<PatternKey, "generic">[]).forEach(
    (key) => {
      if (PATTERN_SIGNALS[key].some((rx) => rx.test(text))) {
        found.push(key);
      }
    }
  );
  if (found.length === 0) found.push("generic");
  return found;
}

/* ---------------------------------------------------------------------- */
/* Content banks, keyed by pattern.                                       */
/* ---------------------------------------------------------------------- */

const DIAGNOSIS_NAMES: Record<PatternKey, string[]> = {
  tutorialAddiction: [
    "Tutorial Dependency Disorder",
    "Chronic Course-Collector Syndrome",
    "Vicarious Learning Loop",
    "Tutorial Consumption Syndrome",
  ],
  overpreparation: [
    "Preparatory Procrastination",
    "Strategic Groundwork Syndrome",
    "Research Addiction",
    "Infrastructure-Before-Content Disorder",
  ],
  perfectionism: [
    "Perfectionism-Induced Paralysis",
    "Terminal Polishing Disorder",
    "The Unfinished Masterpiece Complex",
    "Draft Zero Syndrome",
  ],
  overthinking: [
    "Recursive Deliberation Disorder",
    "Analysis-Paralysis Spectrum Disorder",
    "Mental Rehearsal Loop",
  ],
  fearOfFailure: [
    "Anticipated Failure Syndrome",
    "Pre-Emptive Embarrassment Disorder",
    "Hypothetical Judgment Disorder",
  ],
  decisionParalysis: [
    "Executive Decision Deficiency",
    "Option Overload Syndrome",
    "Chronic Comparison Disorder",
  ],
  prematureOptimization: [
    "Premature Optimization Disease",
    "Architecture-First Affliction",
    "Scalability Fantasy Syndrome",
  ],
  doomScrolling: [
    "Infinite Scroll Absorption Disorder",
    "Feed-Induced Time Displacement",
    "Algorithmic Attention Capture",
  ],
  distraction: [
    "Chronic Tab Accumulation",
    "Notification-Triggered Task Switching",
    "Ambient Distraction Syndrome",
  ],
  motivationWaiting: [
    "Motivational Waiting Syndrome",
    "The Right-Mood Fallacy",
    "Inspiration Dependency Disorder",
  ],
  socialAvoidance: [
    "Conversational Avoidance Syndrome",
    "Read-Receipt Reluctance Disorder",
    "Strategic Non-Response Pattern",
  ],
  laziness: [
    "Executive 'I'll Start Tomorrow' Disorder",
    "Low-Voltage Motivation Syndrome",
    "Effort Conservation Disorder",
  ],
  fakeProductivity: [
    "Productivity Cosplay",
    "Adjacent Task Substitution Disorder",
    "Workspace Optimization Theater",
  ],
  circumstanceBlaming: [
    "External Attribution Syndrome",
    "Circumstantial Deflection Disorder",
    "The Convenient Culprit Complex",
  ],
  procrastination: [
    "Strategic Procrastination Syndrome",
    "Deadline Proximity Disorder",
    "Delayed Initiation Syndrome",
  ],
  generic: [
    "Unspecified Inaction Disorder",
    "Diffuse Avoidance Syndrome",
    "Non-Specific Task Aversion",
  ],
};

const PRIMARY_SYMPTOMS: Record<PatternKey, string[]> = {
  tutorialAddiction: [
    "Using preparation as a sophisticated disguise for procrastination.",
    "Mistaking the consumption of instructions for the act of doing.",
    "Collecting knowledge about the task in place of the task itself.",
  ],
  overpreparation: [
    "You have mistaken preparation for progress.",
    "Building the perfect launchpad for a rocket that never leaves the ground.",
    "Treating setup as a renewable, indefinitely extendable resource.",
  ],
  perfectionism: [
    "Refusing to let a first draft exist because it isn't the final one.",
    "Holding the work hostage until it meets a standard that was never defined.",
    "Editing a sentence that hasn't been written yet.",
  ],
  overthinking: [
    "Running the same decision through your head on an infinite loop.",
    "Simulating every possible outcome except the one where you just start.",
  ],
  fearOfFailure: [
    "Protecting a version of yourself that hasn't tried yet, because it can't fail.",
    "Treating an unstarted project as an undefeated one.",
  ],
  decisionParalysis: [
    "Comparing options with a thoroughness the decision did not request.",
    "Optimizing for a choice you were never going to be able to verify.",
  ],
  prematureOptimization: [
    "Engineering for a scale of problem you do not currently have.",
    "Solving next year's imaginary bottleneck instead of today's real one.",
  ],
  doomScrolling: [
    "Trading focused time for an algorithm that does not know you have a deadline.",
    "Letting a feed with no ending decide when your task begins.",
  ],
  distraction: [
    "Treating every incoming ping as more urgent than the thing you sat down to do.",
    "Opening a browser tab as a coping mechanism.",
  ],
  motivationWaiting: [
    "Waiting for a feeling that was never a prerequisite in the first place.",
    "Treating motivation as a weather event instead of a byproduct of starting.",
  ],
  socialAvoidance: [
    "Letting silence do the difficult talking for you.",
    "Postponing a five-minute conversation into a five-day standoff.",
  ],
  laziness: [
    "Choosing the version of today that requires the least of you.",
    "Letting comfort quietly outvote intention.",
  ],
  fakeProductivity: [
    "Rearranging the furniture in a house that still hasn't been built.",
    "Producing motion that looks like progress from a great distance.",
  ],
  circumstanceBlaming: [
    "Recruiting the outside world as a co-defendant.",
    "Letting a minor inconvenience carry the full weight of the outcome.",
  ],
  procrastination: [
    "Trading a task you can do today for a slightly worse version of tomorrow.",
    "Treating the deadline as a future problem with a future solution.",
  ],
  generic: [
    "A task was available, and it remained, notably, untouched.",
    "The gap between intention and action has been left unexplained.",
  ],
};

const EVIDENCE_BANK: Record<PatternKey, string[]> = {
  tutorialAddiction: [
    "Watched a tutorial about a tool you already knew how to use.",
    "Bookmarked 'one more' video for later. Later has not arrived.",
    "Learned the theory behind the thing instead of doing the thing.",
    "Subscribed to a channel that will never finish teaching you enough.",
  ],
  overpreparation: [
    "Researched tools before defining the problem.",
    "Opened 14 tabs comparing options nobody asked you to compare.",
    "Built a folder structure for a project that does not yet exist.",
    "Chose a font before writing a single word of content.",
  ],
  perfectionism: [
    "Rewrote the introduction for the fourth time.",
    "Deleted a working version because it 'didn't feel right'.",
    "Postponed sharing it until it was 'basically done'. It is not done.",
    "Somehow reorganized your VS Code theme.",
  ],
  overthinking: [
    "Drafted three different plans and executed none of them.",
    "Asked for opinions you had already privately overruled.",
    "Spent longer deciding how to start than starting would have taken.",
  ],
  fearOfFailure: [
    "Avoided sharing it with anyone who might have a real opinion.",
    "Set the bar high enough that starting felt riskier than waiting.",
    "Practiced the explanation for why it isn't finished yet.",
  ],
  decisionParalysis: [
    "Compared frameworks for a project with no users yet.",
    "Made a pros-and-cons list for a decision that expires by Thursday.",
    "Asked a group chat to decide for you, then ignored the consensus.",
  ],
  prematureOptimization: [
    "Refactored code that had never been run.",
    "Designed for 'scale' before shipping version one.",
    "Debated database choice before writing the first feature.",
  ],
  doomScrolling: [
    "Opened the app 'for a second'. It was not a second.",
    "Watched several videos with no relationship to the task at hand.",
    "Learned three unrelated facts and zero relevant ones.",
  ],
  distraction: [
    "Opened 14 tabs. Closed none of them.",
    "Responded to a notification that could have waited.",
    "Started a second task to avoid finishing the first.",
  ],
  motivationWaiting: [
    "Checked whether you 'felt like it' several times. You did not.",
    "Waited for inspiration to arrive on its own schedule.",
    "Treated a bad mood as a valid blocker.",
  ],
  socialAvoidance: [
    "Read the message. Did not reply. Reread the message.",
    "Drafted a reply and left it, unsent, as a monument to intention.",
    "Let the conversation get more awkward with every passing hour.",
  ],
  laziness: [
    "Chose the couch over the task, decisively and without regret.",
    "Told yourself you'd 'do it later' with total confidence and no plan.",
  ],
  fakeProductivity: [
    "Reorganized your files instead of using them.",
    "Made a to-do list about the task instead of doing the task.",
    "Cleaned your workspace for a project you have not started.",
  ],
  circumstanceBlaming: [
    "Cited an inconvenience that did not, in fact, block you.",
    "Assigned responsibility to your wifi for a decision you made offline.",
  ],
  procrastination: [
    "Said 'tomorrow' with total sincerity, and meant it, again.",
    "Chose a smaller, easier task to feel busy instead.",
    "Watched the deadline approach with something like curiosity.",
  ],
  generic: [
    "The task remained exactly where you left it.",
    "No measurable progress was detected in the observation window.",
  ],
};

const TREATMENTS: Record<PatternKey, string[]> = {
  tutorialAddiction: [
    "Close the tutorial. Open the project. You already know enough to be bad at this.",
    "Watch nothing else today. Write one real line instead.",
  ],
  overpreparation: [
    "Open the project. Write 20 lines. Stop researching.",
    "Use the first tool you thought of. Fix it later, if ever.",
  ],
  perfectionism: [
    "Ship the version you're embarrassed by. Improve it in public.",
    "Set a timer. When it ends, whatever exists is the draft.",
  ],
  overthinking: [
    "Pick the second-best option. It will not matter as much as you think.",
    "Decide in the next five minutes. Any decision beats this one, undecided.",
  ],
  fearOfFailure: [
    "Do the small, bad version first. Failure at this scale is survivable.",
    "Show one person. The fear was louder than the actual stakes.",
  ],
  decisionParalysis: [
    "Flip a coin. Genuinely. You will know immediately if you disagree with it.",
    "Pick the option you'd choose if you only had five minutes to decide.",
  ],
  prematureOptimization: [
    "Make it work. Ugly. Then, and only then, make it fast.",
    "Delete the abstraction. You do not have the scale problem yet.",
  ],
  doomScrolling: [
    "Put the phone in another room. This is not a metaphor.",
    "Delete the app for 24 hours. Report back on how little you missed.",
  ],
  distraction: [
    "Close every tab that isn't the task. All of them.",
    "Turn off notifications for one hour. Civilization will hold.",
  ],
  motivationWaiting: [
    "Start before you feel ready. The feeling shows up after, not before.",
    "Do two minutes of it. Motivation is a lagging indicator, not a gate.",
  ],
  socialAvoidance: [
    "Send the reply exactly as drafted. It is better than the silence.",
    "Make the call today. The awkwardness has an expiration date; use it.",
  ],
  laziness: [
    "Do the smallest possible version right now. Momentum does the rest.",
    "Stand up. Sit somewhere else. Begin before the couch notices.",
  ],
  fakeProductivity: [
    "Stop organizing the tools. Start using one of them, badly.",
    "Delete the plan. Do the first item on it instead.",
  ],
  circumstanceBlaming: [
    "Do the 10% that has nothing to do with the excuse.",
    "Solve around the obstacle instead of narrating it.",
  ],
  procrastination: [
    "Stop preparing. Start badly. Improve afterwards.",
    "Do the task for five minutes. Quit after that if you still want to.",
  ],
  generic: [
    "Begin. Anywhere. The exact starting point matters less than starting.",
    "Do the smallest true step, today, before this excuse gets a sequel.",
  ],
};

const ROAST_SYMPTOMS: Record<PatternKey, string[]> = {
  tutorialAddiction: [
    "You have a parasocial relationship with getting started.",
    "You are now professionally qualified to explain a task you have never done.",
  ],
  overpreparation: [
    "You have prepared for a marathon you are not running.",
    "The groundwork is immaculate. The building does not exist.",
  ],
  perfectionism: [
    "You are protecting a masterpiece that is, currently, a blank page.",
    "Nothing you've made is bad, because nothing you've made exists.",
  ],
  overthinking: [
    "You have thought about this so much it should legally count as doing it.",
    "Your brain has run this simulation more times than the task would take.",
  ],
  fearOfFailure: [
    "You'd rather stay undefeated than find out if you're any good.",
    "You are guarding a 0–0 record nobody is keeping score of.",
  ],
  decisionParalysis: [
    "You've compared every option except 'just picking one'.",
    "You could have finished the task in the time you spent deciding how.",
  ],
  prematureOptimization: [
    "You built a highway for a problem the size of a driveway.",
    "You are solving Google's scaling problems on a project with zero users.",
  ],
  doomScrolling: [
    "An algorithm that does not know your name has more control over your day than you do.",
    "You have given your attention to a feed with no ending, for free.",
  ],
  distraction: [
    "You opened 14 tabs and closed your own focus instead.",
    "You have been ambiently busy and specifically unproductive.",
  ],
  motivationWaiting: [
    "You are waiting for a feeling that has never once shown up on time.",
    "Motivation does not have your number. It never did.",
  ],
  socialAvoidance: [
    "The silence you're maintaining is louder than the reply would've been.",
    "You've now spent more energy avoiding this than answering it would cost.",
  ],
  laziness: [
    "You didn't run out of time. You ran out of willingness.",
    "This wasn't circumstance. This was a choice, made comfortably.",
  ],
  fakeProductivity: [
    "You have optimized the desk of a project that does not exist.",
    "This is motion cosplaying as momentum.",
  ],
  circumstanceBlaming: [
    "The circumstances were an accomplice, not the culprit.",
    "You found a bystander and put it on trial.",
  ],
  procrastination: [
    "Tomorrow-you has been assigned a task today-you refuses to do.",
    "You are functionally an assistant to a version of yourself who never arrives.",
  ],
  generic: [
    "Nothing dramatic happened here. That is, itself, the diagnosis.",
    "You simply didn't. History will record this without much interest.",
  ],
};

/* ---------------------------------------------------------------------- */
/* Public API                                                             */
/* ---------------------------------------------------------------------- */

let caseCounter = 48291;

function nextCaseNumber(rng: () => number): string {
  const n = 40000 + Math.floor(rng() * 9999);
  return `EX-${n}`;
}

export function analyzeExcuse(excuseRaw: string, roast = false): Diagnosis {
  const excuse = excuseRaw.trim();
  const seed = hashString(excuse.toLowerCase() + (roast ? "::roast" : ""));
  const rng = mulberry32(seed);

  const patterns = detectPatterns(excuse);
  const primaryPattern = patterns[0];

  const name = pick(rng, DIAGNOSIS_NAMES[primaryPattern]);
  const symptomBank = roast ? ROAST_SYMPTOMS : PRIMARY_SYMPTOMS;
  const primarySymptom = pick(rng, symptomBank[primaryPattern]);

  // Pull evidence from every detected pattern for richer, specific results.
  const evidencePool = patterns.flatMap((p) => EVIDENCE_BANK[p]);
  const evidenceCount = Math.min(4, Math.max(3, patterns.length + 2));
  const evidence = pickMany(rng, evidencePool, evidenceCount);

  const treatment = pick(rng, TREATMENTS[primaryPattern]);

  const baseSeverity = 55 + patterns.length * 8;
  const jitter = Math.floor(rng() * 20);
  const severity = Math.min(99, Math.max(31, baseSeverity + jitter + (roast ? 6 : 0)));

  const relapseProbability = Math.min(
    99,
    Math.max(40, Math.round(severity * 0.9 + rng() * 12))
  );

  return {
    caseNumber: nextCaseNumber(rng),
    excuse,
    name,
    severity,
    primarySymptom,
    evidence,
    treatment,
    relapseProbability,
    patterns,
    roasted: roast,
    timestamp: Date.now(),
  };
}
