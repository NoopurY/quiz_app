const questions = [
  {
    question: "What does the 'DOM' stand for in web development?",
    options: [
      "Document Object Model",
      "Display Object Management",
      "Digital Ordinance Model",
      "Document Order Mapping"
    ],
    answer: "Document Object Model",
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    options: [
      "<style>",
      "<script>",
      "<link>",
      "<css>"
    ],
    answer: "<link>",
  },
  {
    question: "Which CSS property controls the text size?",
    options: [
      "font-style",
      "text-size",
      "font-size",
      "text-style"
    ],
    answer: "font-size",
  },
  {
    question: "Which JavaScript method is used to select an element by ID?",
    options: [
      "getElementByName()",
      "getElementByClass()",
      "getElementById()",
      "querySelectorAll()"
    ],
    answer: "getElementById()",
  },
  {
    question: "Which attribute is used in HTML to open a link in a new tab?",
    options: [
      "new-tab",
      "target=\"_blank\"",
      "href=\"_blank\"",
      "link-type=\"new\""
    ],
    answer: "target=\"_blank\"",
  }
];

let currentQ = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionBox = document.getElementById('question');
const optionsBox = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const scoreBox = document.getElementById('score-box');

function loadQuestion() {
  const q = questions[currentQ];
  questionBox.textContent = `Q${currentQ + 1}: ${q.question}`;
  optionsBox.innerHTML = '';

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = option;

    if (userAnswers[currentQ] === option) {
      btn.classList.add(option === q.answer ? 'correct' : 'wrong');
    }

    btn.onclick = () => {
      userAnswers[currentQ] = option;
      updateOptionStyles(option, q.answer);
    };
    optionsBox.appendChild(btn);
  });

  prevBtn.style.display = currentQ > 0 ? 'inline-block' : 'none';
  nextBtn.textContent = currentQ === questions.length - 1 ? "Submit" : "Next";
}

function updateOptionStyles(selected, correct) {
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    if (btn.textContent === selected) {
      btn.classList.add(selected === correct ? 'correct' : 'wrong');
    }
  });
}

nextBtn.addEventListener('click', () => {
  if (currentQ === questions.length - 1) {
    calculateScore();
    showScore();
  } else {
    currentQ++;
    loadQuestion();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
});

function calculateScore() {
  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
}

function showScore() {
  questionBox.textContent = "Quiz Completed 🎉";
  optionsBox.innerHTML = '';
  document.querySelector('.nav-buttons').style.display = 'none';
  scoreBox.textContent = `Your Score: ${score} / ${questions.length}`;
}

loadQuestion();
