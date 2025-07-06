document.addEventListener("DOMContentLoaded", () => {
  let scene, camera, renderer, cube;
  let level = 1;
  let timeLeft = 600;
  let interval;

  const faceLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const faceColors = ['#ff4d4f', '#52c41a', '#1890ff', '#fa8c16', '#722ed1', '#13c2c2'];

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
        numbers.push(Math.floor(Math.random() * 9) + 1);
      } else if (level === 2) {
        numbers.push(Math.floor(Math.random() * 90) + 10);
      } else {
        const satuan = Math.floor(Math.random() * 9) + 1;
        const puluhan = Math.floor(Math.random() * 90) + 10;
        numbers.push(satuan * puluhan);
      }
    }
    return numbers;
  }

  function generateFaceTexture(numbers, label, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
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
      const mat = generateFaceTexture(nums, faceLabels[i], faceColors[i]);
      materials.push(mat);
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
      questionElement.textContent = 'Jumlahkan kembali nilai angka tiap sisi kubus!';
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
      timeLeft = 600;
      generateQuestion();
      recreateCube(level);
      startTimer();
    }
    else {
      questionElement.style.display = 'none';
      
      const gameOverDiv = document.createElement('div');
      gameOverDiv.style.position = 'absolute';
      gameOverDiv.style.top = '50%';
      gameOverDiv.style.left = '50%';
      gameOverDiv.style.transform = 'translate(-50%, -50%)';
      gameOverDiv.style.textAlign = 'center';
      gameOverDiv.innerHTML = `
        <h1 style="font-size: 48px; color: #fff; margin-bottom: 20px;">GAME OVER</h1>
        <button id="restartBtn" style="padding: 12px 24px; font-size: 18px; border-radius: 8px; background-color: #00bcd4; color: white; border: none; cursor: pointer;">
          Let's Start Play Again
        </button>
      `;
      document.body.appendChild(gameOverDiv);

      document.getElementById('restartBtn').addEventListener('click', () => {
        document.body.removeChild(gameOverDiv);
        startGame();
      });
    }
  }

  function startTimer() {
    tickSound.currentTime = 0;
    tickSound.play();
    interval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      if (timeLeft <= 0) {
        nextLevel();
      }
    }, 1000);
  }

  function startGame() {
    level = 1;
    timeLeft = 60;
    levelElement.textContent = level;
    questionElement.style.display = 'block';
    generateQuestion();
    recreateCube(level);
    startTimer();
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
    startGame();
  });
});
