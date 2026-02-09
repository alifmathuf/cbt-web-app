const TOTAL_QUESTIONS = 50;
let currentQuestion = 0;
let answers = Array(TOTAL_QUESTIONS).fill(null);

// ===== TIMER 120 MENIT =====
let timeLeft = 120 * 60;
const timerEl = document.getElementById("timer");

setInterval(() => {
  if (timeLeft <= 0) {
    submitExam();
    return;
  }
  timeLeft--;
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}, 1000);

// ===== SOAL DUMMY =====
const questions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
  text: `Soal nomor ${i + 1}`,
  options: ["A", "B", "C", "D"]
}));

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");

// ===== RENDER SOAL =====
function renderQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;

  optionsDiv.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx);
    optionsDiv.appendChild(btn);
  });

  updateFinishButton();
}

function selectAnswer(idx) {
  answers[currentQuestion] = idx;
  document
    .querySelectorAll(".question-nav button")[currentQuestion]
    .classList.add("answered");
  updateProgress();
}

// ===== NAVIGASI =====
const nav = document.getElementById("questionNav");

for (let i = 0; i < TOTAL_QUESTIONS; i++) {
  const btn = document.createElement("button");
  btn.textContent = i + 1;
  btn.onclick = () => {
    currentQuestion = i;
    renderQuestion();
  };
  nav.appendChild(btn);
}

// ===== PROGRESS =====
function updateProgress() {
  const answered = answers.filter(a => a !== null).length;
  const percent = Math.round((answered / TOTAL_QUESTIONS) * 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").textContent = percent + "%";
}

// ===== TOMBOL SELESAI =====
const finishBtn = document.getElementById("finishBtn");

function updateFinishButton() {
  finishBtn.disabled = currentQuestion !== TOTAL_QUESTIONS - 1;
}

finishBtn.onclick = () => {
  if (confirm("Yakin ingin menyelesaikan ujian?")) {
    submitExam();
  }
};

function submitExam() {
  alert("Ujian selesai!");
  // nanti diarahkan ke halaman hasil
}

// INIT
renderQuestion();
