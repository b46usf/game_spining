document.addEventListener("DOMContentLoaded", () => {
  let scene, camera, renderer, cube;
  let rotX = 0, rotY = 0;
  let level = 1;
  let timeLeft = 60;
  let interval;

  const timerElement = document.getElementById('timer');
  const levelElement = document.getElementById('level');
  const questionElement = document.getElementById('question');
  const levelSound = document.getElementById('levelSound');
  const tickSound = document.getElementById('tickSound');

  const startBtn = document.getElementById('startBtn');
  const intro = document.querySelector('.intro-screen');
  const gameInfo = document.querySelector('.game-info');

  function getNumbersForLevel(level) {
    const numbers = [];
    for (let i = 0; i < 16; i++) {
      if (level === 1) {
        numbers.push(Math.floor(Math.random() * 9) + 1); // 1–9
      } else if (level === 2) {
        numbers.push(Math.floor(Math.random() * 90) + 10); // 10–99
      } else {
        numbers.push(Math.floor(Math.random() * 99) + 1); // 1–99
      }
    }
    return numbers;
  }

  function generateFaceTexture(numbers) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const gridSize = 4;
    const cellSize = canvas.width / gridSize;

    for (let i = 0; i < numbers.length; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      ctx.fillText(numbers[i], col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({ map: texture });
  }

  function recreateCube(level) {
    if (cube) {
      scene.remove(cube);
    }

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const materials = [];

    for (let i = 0; i < 6; i++) {
      const nums = getNumbersForLevel(level);
      materials.push(generateFaceTexture(nums));
    }

    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
  }

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);
    camera.position.z = 6;

    recreateCube(level);
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }

  function generateQuestion() {
    if (level === 1) {
      questionElement.textContent = 'Jumlahkan nilai angka tiap sisi kubus!';
    } else if (level === 2) {
      questionElement.textContent = 'Jumlahkan kembali nilai angka tiap sisi kubus!';
    } else {
      questionElement.textContent = 'Kalikan kembali nilai angka tiap sisi kubus!';
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
      generateQuestion();
      recreateCube(level);
      startTimer();
    } else {
      questionElement.style.display = 'none';
      document.body.innerHTML += `
        <h1 style="font-size: 48px; color: #fff; margin-top: 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
          GAME OVER
        </h1>`;
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

  window.addEventListener('resize', () => {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    gameInfo.style.display = 'block';
    document.getElementById('game-container').style.display = 'block';

    init();
    generateQuestion();
    startTimer();
  });
});
