const categories = [
  { key: "ppg", label: "Points per game", statLabel: "PPG", description: "Pick the scorer with the highest scoring average." },
  { key: "rpg", label: "Rebounds per game", statLabel: "RPG", description: "Pick the rebounder with the strongest board average." },
  { key: "apg", label: "Assists per game", statLabel: "APG", description: "Pick the playmaker with the most assists." },
  { key: "spg", label: "Steals per game", statLabel: "SPG", description: "Pick the defender with the best steal rate." },
  { key: "bpg", label: "Blocks per game", statLabel: "BPG", description: "Pick the rim protector with the strongest block average." },
  { key: "fgPct", label: "Field goal %", statLabel: "FG%", description: "Pick the shooter with the best efficiency." }
];

const teams = [
  {
    name: "Boston Celtics",
    summary: "A veteran core with strong rim protection and balanced scoring.",
    players: [
      { name: "Jayson Tatum", mpg: 34.1, ppg: 26.9, rpg: 8.1, apg: 4.1, spg: 1.0, bpg: 0.6, fgPct: 0.468, threePct: 0.347 },
      { name: "Jaylen Brown", mpg: 33.6, ppg: 23.7, rpg: 5.8, apg: 3.5, spg: 1.1, bpg: 0.4, fgPct: 0.465, threePct: 0.336 },
      { name: "Derrick White", mpg: 31.2, ppg: 15.2, rpg: 4.2, apg: 5.2, spg: 1.0, bpg: 0.8, fgPct: 0.451, threePct: 0.389 }
    ]
  },
  {
    name: "Los Angeles Lakers",
    summary: "Star power and high-usage offense shape this roster.",
    players: [
      { name: "LeBron James", mpg: 37.5, ppg: 25.7, rpg: 7.3, apg: 8.3, spg: 1.0, bpg: 0.6, fgPct: 0.500, threePct: 0.410 },
      { name: "Anthony Davis", mpg: 34.0, ppg: 24.7, rpg: 12.6, apg: 3.5, spg: 1.2, bpg: 2.3, fgPct: 0.563, threePct: 0.250 },
      { name: "Austin Reaves", mpg: 31.4, ppg: 20.4, rpg: 4.8, apg: 5.3, spg: 0.8, bpg: 0.3, fgPct: 0.468, threePct: 0.389 }
    ]
  },
  {
    name: "Denver Nuggets",
    summary: "A playmaking-led roster with elite efficiency and size.",
    players: [
      { name: "Nikola Jokic", mpg: 39.0, ppg: 26.4, rpg: 12.4, apg: 9.0, spg: 1.3, bpg: 0.9, fgPct: 0.583, threePct: 0.368 },
      { name: "Jamal Murray", mpg: 35.4, ppg: 22.5, rpg: 4.1, apg: 6.2, spg: 1.1, bpg: 0.3, fgPct: 0.469, threePct: 0.402 },
      { name: "Aaron Gordon", mpg: 32.0, ppg: 14.8, rpg: 6.8, apg: 3.2, spg: 0.8, bpg: 0.6, fgPct: 0.514, threePct: 0.321 }
    ]
  },
  {
    name: "Milwaukee Bucks",
    summary: "High-level scoring and rim pressure from the wing and the paint.",
    players: [
      { name: "Giannis Antetokounmpo", mpg: 35.4, ppg: 30.4, rpg: 11.5, apg: 6.5, spg: 1.2, bpg: 1.5, fgPct: 0.584, threePct: 0.278 },
      { name: "Damian Lillard", mpg: 36.0, ppg: 24.3, rpg: 4.3, apg: 7.3, spg: 0.9, bpg: 0.2, fgPct: 0.444, threePct: 0.379 },
      { name: "Khris Middleton", mpg: 29.4, ppg: 16.9, rpg: 5.1, apg: 4.5, spg: 0.9, bpg: 0.3, fgPct: 0.434, threePct: 0.365 }
    ]
  },
  {
    name: "Golden State Warriors",
    summary: "A shooting-heavy roster with quick playmakers and strong spacing.",
    players: [
      { name: "Stephen Curry", mpg: 34.5, ppg: 26.4, rpg: 4.5, apg: 6.1, spg: 0.8, bpg: 0.4, fgPct: 0.468, threePct: 0.427 },
      { name: "Draymond Green", mpg: 31.1, ppg: 8.6, rpg: 7.2, apg: 6.8, spg: 1.5, bpg: 1.2, fgPct: 0.497, threePct: 0.320 },
      { name: "Jonathan Kuminga", mpg: 26.0, ppg: 16.8, rpg: 4.9, apg: 2.3, spg: 0.7, bpg: 0.5, fgPct: 0.497, threePct: 0.345 }
    ]
  },
  {
    name: "New York Knicks",
    summary: "A defensive-minded team that thrives on hustle and rebounding.",
    players: [
      { name: "Jalen Brunson", mpg: 35.4, ppg: 28.7, rpg: 3.6, apg: 6.7, spg: 1.1, bpg: 0.2, fgPct: 0.485, threePct: 0.382 },
      { name: "Karl-Anthony Towns", mpg: 33.0, ppg: 22.9, rpg: 10.1, apg: 3.4, spg: 0.8, bpg: 1.1, fgPct: 0.529, threePct: 0.416 },
      { name: "OG Anunoby", mpg: 34.0, ppg: 18.2, rpg: 5.5, apg: 2.7, spg: 1.8, bpg: 0.6, fgPct: 0.486, threePct: 0.383 }
    ]
  },
  {
    name: "Miami Heat",
    summary: "A team defined by defense, pressure, and smart shot-making.",
    players: [
      { name: "Jimmy Butler", mpg: 32.8, ppg: 20.8, rpg: 5.3, apg: 5.0, spg: 1.7, bpg: 0.6, fgPct: 0.486, threePct: 0.354 },
      { name: "Tyler Herro", mpg: 33.6, ppg: 25.9, rpg: 5.2, apg: 4.8, spg: 1.0, bpg: 0.3, fgPct: 0.454, threePct: 0.390 },
      { name: "Bam Adebayo", mpg: 34.5, ppg: 19.3, rpg: 10.4, apg: 4.1, spg: 1.1, bpg: 1.2, fgPct: 0.528, threePct: 0.200 }
    ]
  },
  {
    name: "Phoenix Suns",
    summary: "A fast, high-volume scoring team with deep shooting.",
    players: [
      { name: "Kevin Durant", mpg: 37.6, ppg: 27.1, rpg: 6.8, apg: 5.0, spg: 1.2, bpg: 1.2, fgPct: 0.562, threePct: 0.413 },
      { name: "Devin Booker", mpg: 36.8, ppg: 27.1, rpg: 4.1, apg: 7.1, spg: 1.1, bpg: 0.3, fgPct: 0.465, threePct: 0.363 },
      { name: "Brandon Miller", mpg: 24.0, ppg: 17.3, rpg: 4.4, apg: 2.0, spg: 0.7, bpg: 0.4, fgPct: 0.463, threePct: 0.398 }
    ]
  }
];

const filteredTeams = teams.map((team) => ({ ...team, players: team.players.filter((player) => player.mpg > 10) }));
const allPlayers = filteredTeams.flatMap((team) => team.players.map((player) => ({ ...player, team: team.name })));
const state = {
  selectedTeam: null,
  activeCategory: categories[0].key,
  selections: {},
  spinRotation: 0
};

const wheel = document.querySelector("#wheel");
const wheelText = document.querySelector("#wheelText");
const spinButton = document.querySelector("#spinButton");
const resetButton = document.querySelector("#resetButton");
const teamName = document.querySelector("#teamName");
const teamSummary = document.querySelector("#teamSummary");
const categoryList = document.querySelector("#categoryList");
const rosterGrid = document.querySelector("#rosterGrid");
const rosterTitle = document.querySelector("#rosterTitle");
const progressText = document.querySelector("#progressText");
const resultsList = document.querySelector("#resultsList");

function formatPlayerStat(player) {
  return `${player.mpg.toFixed(1)} MPG • ${player.ppg} PPG • ${player.rpg} RPG • ${player.apg} APG • ${player.spg} SPG • ${player.bpg} BPG • ${Math.round(player.fgPct * 100)}% FG`;
}

function getGradeForPlayer(categoryKey, player) {
  const ranked = [...allPlayers].sort((a, b) => b[categoryKey] - a[categoryKey]);
  const index = ranked.findIndex((entry) => entry.name === player.name && entry.team === player.team);
  const percentile = (index + 1) / ranked.length;

  if (percentile <= 0.1) return "A";
  if (percentile <= 0.25) return "B";
  if (percentile <= 0.5) return "C";
  if (percentile <= 0.75) return "D";
  return "F";
}

function getGradeValue(grade) {
  return { A: 5, B: 4, C: 3, D: 2, F: 1 }[grade] || 0;
}

function getOverallGrade(grades) {
  const average = grades.reduce((sum, grade) => sum + getGradeValue(grade), 0) / grades.length;
  if (average >= 4.5) return "A";
  if (average >= 3.5) return "B";
  if (average >= 2.5) return "C";
  if (average >= 1.5) return "D";
  return "F";
}

function renderCategories() {
  categoryList.className = "category-list";
  categoryList.innerHTML = "";

  categories.forEach((category) => {
    const selectedPlayer = state.selections[category.key];
    const grade = selectedPlayer ? getGradeForPlayer(category.key, selectedPlayer) : null;
    const card = document.createElement("div");
    card.className = `category-card${state.activeCategory === category.key ? " active" : ""}`;
    card.innerHTML = `
      <div class="category-top">
        <button type="button" data-category="${category.key}">${category.label}</button>
        <span>${selectedPlayer ? grade : "—"}</span>
      </div>
      <div class="category-meta">${category.description}</div>
      <div class="category-result">${selectedPlayer ? `${selectedPlayer.name} • ${selectedPlayer[category.key]} ${category.statLabel}` : "Pick a player from the roster for this category."}</div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      state.activeCategory = category.key;
      render();
    });
    categoryList.appendChild(card);
  });
}

function renderRoster() {
  if (!state.selectedTeam) {
    rosterGrid.innerHTML = '<p class="muted">Spin the wheel first to unlock the roster.</p>';
    rosterTitle.textContent = "Roster";
    return;
  }

  rosterTitle.textContent = `${state.selectedTeam.name} roster`;
  rosterGrid.innerHTML = "";

  state.selectedTeam.players.forEach((player) => {
    const button = document.createElement("button");
    button.className = "player-choice";
    button.innerHTML = `<strong>${player.name}</strong><small>${formatPlayerStat(player)}</small>`;
    button.addEventListener("click", () => {
      state.selections[state.activeCategory] = player;
      render();
    });
    rosterGrid.appendChild(button);
  });
}

function renderResults() {
  const completed = categories.filter((category) => state.selections[category.key]);
  const grades = completed.map((category) => getGradeForPlayer(category.key, state.selections[category.key]));
  progressText.textContent = `${completed.length} / ${categories.length} complete`;

  if (!completed.length) {
    resultsList.innerHTML = '<div class="result-row">Spin a team and choose one player for each stat category.</div>';
    return;
  }

  resultsList.innerHTML = "";
  completed.forEach((category) => {
    const player = state.selections[category.key];
    const grade = getGradeForPlayer(category.key, player);
    const row = document.createElement("div");
    row.className = "result-row";
    row.innerHTML = `
      <div>
        <strong>${category.label}</strong><br>
        <span>${player.name} • ${player[category.key]} ${category.statLabel}</span>
      </div>
      <span class="result-grade">${grade}</span>
    `;
    resultsList.appendChild(row);
  });

  if (completed.length === categories.length) {
    const overall = document.createElement("div");
    overall.className = "result-row";
    overall.innerHTML = `
      <div><strong>Overall challenge grade</strong><br><span>You completed every stat category.</span></div>
      <span class="result-grade">${getOverallGrade(grades)}</span>
    `;
    resultsList.appendChild(overall);
  }
}

function render() {
  if (!state.selectedTeam) {
    teamName.textContent = "No team selected";
    teamSummary.textContent = "Spin the wheel to reveal a team and its roster.";
  } else {
    teamName.textContent = state.selectedTeam.name;
    teamSummary.textContent = state.selectedTeam.summary;
  }

  renderCategories();
  renderRoster();
  renderResults();
}

function spinWheel() {
  const randomIndex = Math.floor(Math.random() * teams.length);
  const nextTeam = teams[randomIndex];
  const rotation = 360 * 5 + randomIndex * (360 / teams.length) + 18;
  state.spinRotation += rotation;
  wheel.style.transform = `rotate(${state.spinRotation}deg)`;
  wheelText.textContent = "...";

  setTimeout(() => {
    state.selectedTeam = nextTeam;
    state.activeCategory = categories[0].key;
    wheelText.textContent = nextTeam.name;
    render();
  }, 4000);
}

spinButton.addEventListener("click", spinWheel);
resetButton.addEventListener("click", () => {
  state.selectedTeam = null;
  state.activeCategory = categories[0].key;
  state.selections = {};
  wheelText.textContent = "SPIN";
  render();
});

render();
