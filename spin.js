    let scene, camera, renderer, cube;
    let rotX = 0, rotY = 0;
    const faceLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
    const timerElement = document.getElementById('timer');
    const levelElement = document.getElementById('level');
    const questionElement = document.getElementById('question');
    const levelSound = document.getElementById('levelSound');
    const tickSound = document.getElementById('tickSound');

    let level = 1;
    let timeLeft = 60;
    let interval;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(3, 3, 3);
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff6f61 }), // front
        new THREE.MeshBasicMaterial({ color: 0x2196f3 }), // back
        new THREE.MeshBasicMaterial({ color: 0x4caf50 }), // right
        new THREE.MeshBasicMaterial({ color: 0x1976d2 }), // left
        new THREE.MeshBasicMaterial({ color: 0xab47bc }), // top
        new THREE.MeshBasicMaterial({ color: 0xfb8c00 })  // bottom
      ];

      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      camera.position.z = 6;
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
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
        generateQuestion();
        startTimer();
      } else {
        questionElement.style.display = 'none';
        document.body.innerHTML += `<h1 style="font-size: 48px; color: #fff; margin-top: 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">GAME OVER</h1>`;
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start Game
    init();
    generateQuestion();
    startTimer();