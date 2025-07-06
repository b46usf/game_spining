# 🎲 3D Math Cube Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/b46usf/game_spining)
![GitHub last commit](https://img.shields.io/github/last-commit/b46usf/game_spining)
[![Made with Three.js](https://img.shields.io/badge/Made%20with-Three.js-000?logo=three.js)](https://threejs.org/)
![GitHub top language](https://img.shields.io/github/languages/top/b46usf/game_spining)
![GitHub stars](https://img.shields.io/github/stars/b46usf/game_spining?style=social)
![GitHub forks](https://img.shields.io/github/forks/b46usf/game_spining?style=social)

> Game edukasi matematika 3D berbasis Three.js. Hitung angka dari tiap sisi kubus, naik level otomatis, dan tantang dirimu hingga level tertinggi!

---

## 🚀 Fitur

- 🎮 Game 3D berbasis WebGL
- 🧮 Level matematika:
  - **Level 1:** Jumlahkan nilai satuan dari tiap sisi kubus
  - **Level 2:** Jumlahkan nilai puluhan dari tiap sisi kubus
  - **Level 3:** Jumlahkan nilai satuan, puluhan, ratusan tiap sisi kubus
- ⏱️ Timer per menit (60 detik) per level, berganti otomatis tanpa input
- 🔢 Grid 4x4 (16 kotak per sisi) dengan angka acak
- 🎨 Warna berbeda untuk tiap sisi kubus
- 🔤 Label sisi A–F ditampilkan sebagai lingkaran transparan di tengah
- 🔄 Tombol **"Let's Start Play Again"** untuk restart tanpa reload halaman
- 💻 Tampilan responsif landscape mobile-friendly
- 🅰️–🅵 Label sisi tengah
- 💥 Efek animasi loading dan transisi level

---

## 🧩 Teknologi

- [Three.js](https://threejs.org/)
- HTML5 + CSS3 + JS Vanilla
- [Spin.js](https://spin.js.org/) (loading spinner)
- Tailwind CDN (opsional styling UI)

---

## 📦 Struktur Folder

game_spining/
├── index.html             # Entry point game
├── style.css              # Styling khusus UI
├── game.js                # Logika game utama
├── spin.min.js            # Spin.js loader
├── assets/
│   ├── sounds/            # Efek suara
│   └── textures/          # Jika ada tekstur tambahan
├── LICENSE
└── README.md


---

## 🧠 Cara Main

1. Buka `index.html` di browser
2. Klik tombol **Start Play**
3. Ikuti instruksi level matematika (setiap menit naik level)
4. Main hingga `Level 3` selesai → muncul "Game Over"
5. Klik **Let’s Start Play Again** untuk restart canvas

---

## 🔗 Live Demo

👉 [spining-cube.vercel.app](https://spining-cube.vercel.app)  
👉 [GitHub Pages Mirror](https://b46usf.github.io/game_spining)

---

## 👨‍💻 Kontribusi

Kontribusi, feedback, dan fitur tambahan sangat diterima!  
Silakan fork repo ini dan ajukan Pull Request.

📧 Email: [babesugab@gmail.com](mailto:babesugab@gmail.com)  
👤 Author: [BabeSugab](https://github.com/b46usf)

---

## 📄 Lisensi

Distributed under the [MIT License](./LICENSE).

---

> 🎓 Game ini dikembangkan untuk membantu belajar matematika sambil bermain. Seru untuk anak-anak maupun dewasa yang ingin melatih otak dalam waktu singkat.
