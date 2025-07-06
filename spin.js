const faces = document.querySelectorAll('.face');
const faceLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
const timerElement = document.getElementById('timer');
const levelElement = document.getElementById('level');
const questionElement = document.getElementById('question');
const levelSound = document.getElementById('levelSound');
const tickSound = document.getElementById('tickSound');
const scene = document.querySelector('.scene');

let level = 1;
let timeLeft = 60;
let interval;

function generateNumbers() {
  faces.forEach((face, index) => {
    face.innerHTML = '';

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = faceLabels[index];
    face.appendChild(label);

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      let value;
      if (level === 1) {
        value = Math.floor(Math.random() * 10);
      } else {
        value = Math.floor(Math.random() * 90) + 10;
      }
      cell.textContent = value;
      face.appendChild(cell);
    }
  });
}

function generateQuestion() {
  if (level === 1) {
    questionElement.textContent = 'Jumlahkan nilai angka tiap sisi kubus';
  } else if (level === 2) {
    questionElement.textContent = 'Jumlahkan kembali nilai angka tiap sisi kubus';
  } else {
    questionElement.textContent = 'Kalikan kembali nilai angka tiap sisi kubus';
  }
}

function nextLevel() {
  tickSound.pause();
  tickSound.currentTime = 0;
  levelSound.play();
  clearInterval(interval);

  if (level < 3) {
    level++;
    levelElement.textContent = level;
    timeLeft = 60;
    generateNumbers();
    generateQuestion();
    startTimer();
  } else {
    scene.style.display = 'none';
    document.body.innerHTML += `<h1 style="font-size: 48px; color: #fff; margin-top: 20px;">GAME OVER</h1>`;
  }
}

function startTimer() {
  tickSound.currentTime = 0;
  tickSound.play();
  interval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      nextLevel();
    }
  }, 1000);
}

generateNumbers();
generateQuestion();
startTimer();
