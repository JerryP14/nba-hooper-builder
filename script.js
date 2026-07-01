const state = {
  position: "PG",
  height: 75,
  weight: 190,
  wingspan: 79,
  shooting: 78,
  playmaking: 82,
  finishing: 68,
  defense: 64,
  speed: 84,
  strength: 54,
  vertical: 72,
  stamina: 76
};

const seasonBenchmarks = {
  ppg: { value: 33.5, leader: "Luka Doncic", label: "PPG" },
  rpg: { value: 12.9, leader: "Nikola Jokic", label: "RPG" },
  apg: { value: 10.7, leader: "Nikola Jokic", label: "APG" },
  spg: { value: 2.0, leader: "Ausar Thompson", label: "SPG" },
  bpg: { value: 3.1, leader: "Victor Wembanyama", label: "BPG" },
  mpg: { value: 38.0, leader: "Tyrese Maxey", label: "MPG" },
  fgPct: { value: 68.2, leader: "Rudy Gobert", label: "FG%" },
  ftPct: { value: 94.0, leader: "Cam Spencer", label: "FT%" },
  threePct: { value: 47.8, leader: "Luke Kennard", label: "3P%" }
};

const statLanes = [
  {
    name: "High-Usage Scorer",
    player: "Luka Doncic",
    stats: { ppg: 33.5 },
    profile: { scoring: 100, passing: 70, rebounding: 45, defense: 35, rimProtection: 10, efficiency: 65 }
  },
  {
    name: "Offensive Hub",
    player: "Nikola Jokic",
    stats: { rpg: 12.9, apg: 10.7 },
    profile: { scoring: 75, passing: 100, rebounding: 100, defense: 45, rimProtection: 35, efficiency: 82 }
  },
  {
    name: "Point-of-Attack Disruptor",
    player: "Ausar Thompson",
    stats: { spg: 2.0 },
    profile: { scoring: 45, passing: 45, rebounding: 58, defense: 100, rimProtection: 34, efficiency: 45 }
  },
  {
    name: "Rim Protector",
    player: "Victor Wembanyama",
    stats: { bpg: 3.1 },
    profile: { scoring: 72, passing: 42, rebounding: 84, defense: 82, rimProtection: 100, efficiency: 58 }
  },
  {
    name: "Elite Spacer",
    player: "Luke Kennard",
    stats: { threePct: 47.8 },
    profile: { scoring: 68, passing: 36, rebounding: 24, defense: 30, rimProtection: 5, efficiency: 100 }
  },
  {
    name: "Interior Efficiency Finisher",
    player: "Rudy Gobert",
    stats: { fgPct: 68.2 },
    profile: { scoring: 55, passing: 20, rebounding: 84, defense: 76, rimProtection: 88, efficiency: 96 }
  },
  {
    name: "Rookie All-Around Engine",
    player: "Cooper Flagg",
    stats: { ppg: 21.0, rpg: 6.7, apg: 4.5, spg: 1.2, bpg: 0.9, mpg: 33.5 },
    profile: { scoring: 72, passing: 56, rebounding: 62, defense: 64, rimProtection: 44, efficiency: 62 }
  }
];

const positionNames = {
  PG: "Point Guard",
  SG: "Shooting Guard",
  SF: "Small Forward",
  PF: "Power Forward",
  C: "Center"
};

const ranges = {
  height: document.querySelector("#height"),
  weight: document.querySelector("#weight"),
  wingspan: document.querySelector("#wingspan"),
  shooting: document.querySelector("#shooting"),
  playmaking: document.querySelector("#playmaking"),
  finishing: document.querySelector("#finishing"),
  defense: document.querySelector("#defense"),
  speed: document.querySelector("#speed"),
  strength: document.querySelector("#strength"),
  vertical: document.querySelector("#vertical"),
  stamina: document.querySelector("#stamina")
};

const outputs = {
  position: document.querySelector("#positionOutput"),
  measurements: document.querySelector("#measurementsOutput"),
  skill: document.querySelector("#skillOutput"),
  tools: document.querySelector("#toolsOutput"),
  build: document.querySelector("#buildLabel"),
  overall: document.querySelector("#overall"),
  name: document.querySelector("#playerName"),
  summary: document.querySelector("#playerSummary"),
  cardHeight: document.querySelector("#cardHeight"),
  cardWeight: document.querySelector("#cardWeight"),
  cardWingspan: document.querySelector("#cardWingspan"),
  ratings: document.querySelector("#ratingsList"),
  marker: document.querySelector("#playerMarker")
};

function inchesToFeet(value) {
  const feet = Math.floor(value / 12);
  const inches = value % 12;
  return `${feet}'${inches}"`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getTopKey(keys) {
  return keys.reduce((best, key) => (state[key] > state[best] ? key : best), keys[0]);
}

function roundStat(value, decimals = 1) {
  return Number(value.toFixed(decimals));
}

function getToolProfile() {
  const length = clamp((state.wingspan - state.height + 3) / 10, 0, 1);
  const size = clamp((state.height - 68) / 19, 0, 1);
  const mass = clamp((state.weight - 160) / 130, 0, 1);

  return {
    scoring: clamp(state.shooting * 0.55 + state.finishing * 0.3 + state.speed * 0.15, 0, 100),
    passing: clamp(state.playmaking * 0.86 + state.stamina * 0.14, 0, 100),
    rebounding: clamp(state.strength * 0.3 + state.vertical * 0.22 + size * 28 + mass * 20, 0, 100),
    defense: clamp(state.defense * 0.72 + state.speed * 0.12 + length * 16, 0, 100),
    rimProtection: clamp(state.defense * 0.32 + state.vertical * 0.2 + size * 30 + length * 18, 0, 100),
    efficiency: clamp(state.shooting * 0.42 + state.finishing * 0.24 + state.playmaking * 0.12 + state.stamina * 0.22, 0, 100)
  };
}

function getStatProjection(profile) {
  const guardBoost = ["PG", "SG"].includes(state.position) ? 1.08 : 0.92;
  const bigBoost = ["PF", "C"].includes(state.position) ? 1.1 : 0.9;
  const minutesShare = clamp((state.stamina * 0.62 + profile.scoring * 0.2 + profile.defense * 0.18) / 100, 0.35, 0.98);

  return {
    ppg: roundStat(seasonBenchmarks.ppg.value * clamp(profile.scoring / 100, 0.08, 0.98)),
    apg: roundStat(seasonBenchmarks.apg.value * clamp((profile.passing / 100) * guardBoost, 0.05, 0.98)),
    rpg: roundStat(seasonBenchmarks.rpg.value * clamp((profile.rebounding / 100) * bigBoost, 0.06, 0.98)),
    spg: roundStat(seasonBenchmarks.spg.value * clamp(profile.defense / 100, 0.05, 0.98)),
    bpg: roundStat(seasonBenchmarks.bpg.value * clamp(profile.rimProtection / 100, 0.02, 0.98)),
    mpg: roundStat(seasonBenchmarks.mpg.value * minutesShare),
    fgPct: roundStat(seasonBenchmarks.fgPct.value * clamp((state.finishing * 0.52 + state.strength * 0.18 + profile.efficiency * 0.3) / 100, 0.35, 0.94)),
    ftPct: roundStat(seasonBenchmarks.ftPct.value * clamp((state.shooting * 0.58 + state.stamina * 0.22 + state.playmaking * 0.2) / 100, 0.45, 0.98)),
    threePct: roundStat(seasonBenchmarks.threePct.value * clamp((state.shooting * 0.82 + state.playmaking * 0.08 + state.stamina * 0.1) / 100, 0.18, 0.98))
  };
}

function getClosestLane(profile) {
  return statLanes
    .map((lane) => {
      const distance = Object.keys(profile).reduce((total, key) => {
        return total + Math.abs(profile[key] - lane.profile[key]);
      }, 0);
      return { ...lane, similarity: Math.round(clamp(100 - distance / 6, 0, 99)) };
    })
    .sort((a, b) => b.similarity - a.similarity)[0];
}

function getSkillLabel() {
  const topSkill = getTopKey(["shooting", "playmaking", "finishing", "defense"]);
  const labels = {
    shooting: `3P% chase: ${seasonBenchmarks.threePct.leader}`,
    playmaking: `APG chase: ${seasonBenchmarks.apg.leader}`,
    finishing: `FG% chase: ${seasonBenchmarks.fgPct.leader}`,
    defense: `STL/BLK chase`
  };

  return labels[topSkill];
}

function getToolsLabel() {
  const topTool = getTopKey(["speed", "strength", "vertical", "stamina"]);
  const labels = {
    speed: "Speed pushes steals and pace",
    strength: "Strength pushes boards and FG%",
    vertical: "Vertical pushes blocks and rim stats",
    stamina: `Stamina pushes toward ${seasonBenchmarks.mpg.leader} minutes`
  };

  return labels[topTool];
}

function getSummary(lane, stats) {
  const shownStats = Object.entries(lane.stats)
    .map(([key, value]) => `${value} ${seasonBenchmarks[key].label}`)
    .join(", ");

  return `Your ${positionNames[state.position].toLowerCase()} maps closest to the 2025-26 ${lane.name.toLowerCase()} lane, led by ${lane.player}${shownStats ? ` (${shownStats})` : ""}. Projected line: ${stats.ppg} PPG, ${stats.rpg} RPG, ${stats.apg} APG, ${stats.spg} SPG, ${stats.bpg} BPG.`;
}

function getRatings(stats) {
  return [
    ["Points", stats.ppg, seasonBenchmarks.ppg.value, "PPG"],
    ["Rebounds", stats.rpg, seasonBenchmarks.rpg.value, "RPG"],
    ["Assists", stats.apg, seasonBenchmarks.apg.value, "APG"],
    ["Steals", stats.spg, seasonBenchmarks.spg.value, "SPG"],
    ["Blocks", stats.bpg, seasonBenchmarks.bpg.value, "BPG"],
    ["Three-Point", stats.threePct, seasonBenchmarks.threePct.value, "3P%"],
    ["Minutes", stats.mpg, seasonBenchmarks.mpg.value, "MPG"]
  ];
}

function updateMarker() {
  const x = 22 + state.shooting * 0.46;
  const y = 18 + ((state.finishing + state.vertical) / 2) * 0.45;
  const scale = 0.86 + state.strength / 360 + (state.height - 68) / 180;

  outputs.marker.style.left = `${clamp(x, 20, 78)}%`;
  outputs.marker.style.bottom = `${clamp(y, 20, 62)}%`;
  outputs.marker.style.transform = `translate(-50%, 50%) scale(${clamp(scale, 0.9, 1.22)})`;
}

function renderRatings(stats) {
  outputs.ratings.innerHTML = "";

  getRatings(stats).forEach(([label, value, leaderValue, unit]) => {
    const percentage = Math.round(clamp((value / leaderValue) * 100, 0, 100));
    const row = document.createElement("div");
    row.className = "rating-row";
    row.innerHTML = `
      <strong>${label}</strong>
      <div class="rating-meter" aria-hidden="true"><i style="--rating: ${percentage}%"></i></div>
      <span>${value} ${unit}</span>
    `;
    outputs.ratings.append(row);
  });
}

function render() {
  const profile = getToolProfile();
  const stats = getStatProjection(profile);
  const lane = getClosestLane(profile);

  outputs.position.textContent = positionNames[state.position];
  outputs.measurements.textContent = `${inchesToFeet(state.height)}, ${state.weight} lb, ${inchesToFeet(state.wingspan)} wingspan`;
  outputs.skill.textContent = getSkillLabel();
  outputs.tools.textContent = getToolsLabel();
  outputs.build.textContent = lane.name;
  outputs.overall.textContent = `${lane.similarity}%`;
  outputs.name.textContent = `${lane.player} Lane`;
  outputs.summary.textContent = getSummary(lane, stats);
  outputs.cardHeight.textContent = inchesToFeet(state.height);
  outputs.cardWeight.textContent = state.weight;
  outputs.cardWingspan.textContent = inchesToFeet(state.wingspan);

  renderRatings(stats);
  updateMarker();
}

document.querySelectorAll(".position-option").forEach((button) => {
  button.addEventListener("click", () => {
    state.position = button.dataset.position;
    document.querySelectorAll(".position-option").forEach((option) => {
      const active = option === button;
      option.classList.toggle("active", active);
      option.setAttribute("aria-pressed", active);
    });
    render();
  });
});

Object.entries(ranges).forEach(([key, input]) => {
  input.addEventListener("input", () => {
    state[key] = Number(input.value);
    render();
  });
});

render();
