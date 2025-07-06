document.addEventListener("DOMContentLoaded", () => {
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
  let rotX = 0, rotY = 0;
  let cube = document.querySelector('.cube');

  function animateCube() {
    rotX += 0.2;
    rotY += 0.3;

    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    updateHighlight(rotX, rotY);

    requestAnimationFrame(animateCube);
  }

  function updateHighlight(x, y) {
    faces.forEach(f => f.classList.remove('active'));

    const rx = ((x % 360) + 360) % 360;
    const ry = ((y % 360) + 360) % 360;

    let faceName = 'front';

    if (rx < 45 || rx > 315) {
      if (ry >= 45 && ry < 135) faceName = 'right';
      else if (ry >= 135 && ry < 225) faceName = 'back';
      else if (ry >= 225 && ry < 315) faceName = 'left';
      else faceName = 'front';
    } else if (rx >= 45 && rx < 135) faceName = 'top';
    else if (rx >= 225 && rx < 315) faceName = 'bottom';

    document.querySelector(`.face.${faceName}`)?.classList.add('active');
  }

  function generateNumbers() {
    faces.forEach((face, index) => {
      face.innerHTML = '';

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = faceLabels[index];
      face.appendChild(label);

      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        let value = (level === 1) ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 90) + 10;
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
      questionElement.style.display = 'none';
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

  // Start the game
  generateNumbers();
  generateQuestion();
  requestAnimationFrame(animateCube);
  startTimer();
});
