// Voeg hier jouw JavaScript-logica toe.
// Voorbeeldideeën:
// - levelselectie opslaan
// =========================
// IQ MATH QUIZ - SCRIPT
// =========================

// -------------------------
// 1. VRAGEN
// -------------------------
const allQuestions = [
  {
    id: 1,
    level: "easy",
    question: "Wat is 7 + 5?",
    options: ["10", "11", "12", "13"],
    correctAnswer: "12",
    points: 10,
    hint: "Denk aan optellen."
  },
  {
    id: 2,
    level: "easy",
    question: "Wat is 9 - 3?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    points: 10,
    hint: "Trek 3 af van 9."
  },
  {
    id: 3,
    level: "easy",
    question: "Wat is 4 × 3?",
    options: ["7", "10", "12", "14"],
    correctAnswer: "12",
    points: 10,
    hint: "4 groepjes van 3."
  },
  {
    id: 4,
    level: "easy",
    question: "Welke komt als volgende: 2, 4, 6, 8, ...?",
    options: ["9", "10", "12", "14"],
    correctAnswer: "10",
    points: 10,
    hint: "De reeks telt steeds 2 erbij."
  },
  {
    id: 5,
    level: "easy",
    question: "Wat is 15 ÷ 3?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    points: 10,
    hint: "Hoe vaak past 3 in 15?"
  },

  {
    id: 6,
    level: "medium",
    question: "Als 3 + 4 = 14 en 4 + 5 = 18, hoeveel is 5 + 6?",
    options: ["20", "22", "24", "26"],
    correctAnswer: "22",
    points: 10,
    hint: "Tel de twee getallen op en verdubbel het resultaat."
  },
  {
    id: 7,
    level: "medium",
    question: "Welke komt als volgende: 2, 4, 8, 16, ...?",
    options: ["18", "24", "30", "32"],
    correctAnswer: "32",
    points: 10,
    hint: "Het getal verdubbelt steeds."
  },
  {
    id: 8,
    level: "medium",
    question: "Wat is de uitkomst van 15 ÷ 3 + 2?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    points: 10,
    hint: "Eerst delen, daarna optellen."
  },
  {
    id: 9,
    level: "medium",
    question: "Wat is 12 - 4 + 6?",
    options: ["12", "14", "16", "18"],
    correctAnswer: "14",
    points: 10,
    hint: "Werk stap voor stap van links naar rechts."
  },
  {
    id: 10,
    level: "medium",
    question: "Welke komt als volgende: 5, 10, 15, 20, ...?",
    options: ["22", "25", "30", "35"],
    correctAnswer: "25",
    points: 10,
    hint: "De reeks telt steeds 5 erbij."
  },

  {
    id: 11,
    level: "hard",
    question: "Welke komt als volgende: 1, 4, 9, 16, ...?",
    options: ["20", "24", "25", "36"],
    correctAnswer: "25",
    points: 10,
    hint: "Dit zijn kwadraten."
  },
  {
    id: 12,
    level: "hard",
    question: "Als 2 + 3 = 13 en 3 + 4 = 25, hoeveel is 4 + 5?",
    options: ["33", "39", "41", "45"],
    correctAnswer: "41",
    points: 10,
    hint: "Eerst vermenigvuldigen, daarna iets erbij optellen."
  },
  {
    id: 13,
    level: "hard",
    question: "Wat is de uitkomst van (6 × 2) - (8 ÷ 4)?",
    options: ["8", "10", "12", "14"],
    correctAnswer: "10",
    points: 10,
    hint: "Bereken eerst de delen tussen haakjes."
  },
  {
    id: 14,
    level: "hard",
    question: "Welke komt als volgende: 3, 6, 12, 24, ...?",
    options: ["36", "42", "48", "48"],
    correctAnswer: "48",
    points: 10,
    hint: "Elk getal wordt verdubbeld."
  },
  {
    id: 15,
    level: "hard",
    question: "Wat is 18 ÷ 3 × 2?",
    options: ["6", "9", "12", "18"],
    correctAnswer: "12",
    points: 10,
    hint: "Werk van links naar rechts."
  }
];

// -------------------------
// 2. GAME STATE
// -------------------------
const gameState = {
  selectedLevel: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  timeLeft: 90,
  timerId: null,
  gameOver: false
};

// -------------------------
// 3. HELPERS
// -------------------------
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split("/").pop();
}
//Deze functie haalt alleen de vragen op van één gekozen level.
function getQuestionsByLevel(level) {
  return allQuestions.filter((question) => question.level === level);
}
//Deze functie geeft de vraag terug waar de speler nu mee bezig is
function getCurrentQuestion() {
  return gameState.questions[gameState.currentQuestionIndex]; 
}

function saveGameData() {
  const data = {
    selectedLevel: gameState.selectedLevel,
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    wrongAnswers: gameState.wrongAnswers,
    timeLeft: gameState.timeLeft
  };

  localStorage.setItem("iqMathQuizResult", JSON.stringify(data));
}

function loadSavedLevel() {
  return localStorage.getItem("iqMathQuizLevel");
}

function saveSelectedLevel(level) {
  localStorage.setItem("iqMathQuizLevel", level);
}

function clearSelectedAnswerStyles() {
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

function disableAnswerButtons() {
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

function enableAnswerButtons() {
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.disabled = false;
  });
}

// -------------------------
// 4. LEVELS PAGE
// -------------------------
function setupLevelsPage() {
  const easyBtn = document.getElementById("easy-btn");
  const mediumBtn = document.getElementById("medium-btn");
  const hardBtn = document.getElementById("hard-btn");

  if (!easyBtn || !mediumBtn || !hardBtn) {
    return;
  }

  easyBtn.addEventListener("click", () => {
    saveSelectedLevel("easy");
    window.location.href = "game.html";
  });

  mediumBtn.addEventListener("click", () => {
    saveSelectedLevel("medium");
    window.location.href = "game.html";
  });

  hardBtn.addEventListener("click", () => {
    saveSelectedLevel("hard");
    window.location.href = "game.html";
  });
}


