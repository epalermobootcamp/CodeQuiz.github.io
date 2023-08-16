var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionText = document.getElementById("question-text");
var choiceButtons = document.querySelectorAll(".choice-btn");
var endContainer = document.getElementById("end-container");
var scoreDisplay = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("save-btn");
var timerDisplay = document.getElementById("timer");

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60; // seconds
var timerInterval;

// Quiz questions and answers go here
var questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Hyper Transfer Markup Language",
      "Hyperlink and Text Markup Language",
      "High Text Markup Language",
    ],
    correctAnswer: 0,
  },
  // Add more questions here...
  {
    question: "What does JSON stand for?",
    choices: [
      "JavaScript On Now",
      "JavaScript Object Notation",
      "JavaScript Objection Notation",
      "JavaScript Object Notion",
    ],
    correctAnswer: 1,
  },
  {
    question: "How do we start grouping related code?",
    choices: [
      "By adding parenthesses",
      "By adding the 'function' keyword.",
      "By arranging it alphabetically.",
      "By placing in at the bottom.",
    ],
    correctAnswer: 1,
  },
];

startButton.addEventListener("click", startQuiz);
choiceButtons.forEach((button) =>
  button.addEventListener("click", selectAnswer)
);
saveButton.addEventListener("click", saveScore);

function updateTimer() {
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
  timeLeft--;
}

function startQuiz() {
  startButton.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion(currentQuestionIndex);
  updateTimer();
}

function displayQuestion(index) {
  if (index < questions.length) {
    questionText.textContent = questions[index].question;
    questions[index].choices.forEach((choice, i) => {
      choiceButtons[i].textContent = choice;
    });
  } else {
    endQuiz();
  }
}

function selectAnswer(event) {
  var selectedChoiceIndex = Array.from(choiceButtons).indexOf(event.target);
  var correctChoiceIndex = questions[currentQuestionIndex].correctAnswer;

  if (selectedChoiceIndex === correctChoiceIndex) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
}

function updateTime() {
  timeLeft--;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hidden");
  endContainer.classList.remove("hidden");
  scoreDisplay.textContent = score;
}

// Save initials and score to localstorage.
function saveScore() {
  event.preventDefault();
  var initials = initialsInput.value;
  localStorage.setItem("initials", initials);
  localStorage.setItem("score", score);
}
