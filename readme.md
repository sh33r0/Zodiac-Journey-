# Zodiac Queens

A colorful browser puzzle game where players place one Queen per row, column, and colored region without adjacency — themed around the Zodiac.

## 💡 Features
 - **6x6 Puzzle Grid:** place Queens so each row, column and color region contains exactly one.
 - **Level Progression:** 12 zodiac-themed levels with escalating puzzles and scoring.
 - **Timer & Scoring:** time-based scoring with per-level leaderboard table.
 - **Hints & Reset:** hint button and reset to help players while solving puzzles.
 - **Accessible UI:** keyboard + mouse friendly controls and clear visual feedback.

## 🌐 Live Demo 

### Try It Out
- [Live Link](https://shyama-shree-pati.github.io/Zodiac-Journey-/) OR
- Open `index.html` in a browser to play locally.

## 🛠️ Tech Stack

- **Frontend:** Plain HTML, CSS, JavaScript
- **Audio:** Local audio assets for SFX and background music (mp3)
- **No build step required** — static site

## 📁 Project Structure
```bash
./
├── index.html           # main page
├── script.js            # game logic, levels, UI interactions
├── style.css            # styling and visual effects
├── bg.mp3               # background music (optional)
├── *.mp3                # sound effects (win, hint, next level, etc.)
└── README.md
```

## 🔰 Getting Started

### Prerequisites
- A modern web browser (Chrome, Edge, Firefox, Safari)

### Installation / Run Locally

1. **Clone the repository**
	```bash
	git clone https://github.com/Shyama-Shree-Pati/Zodiac-Journey.git
	cd Zodiac-Journey
	```
2. **Open locally** — simplest options:

	- Double-click `index.html` to open in your browser, or
	- Start a quick static server (recommended) for correct audio behavior:

	```bash
	# Python 3
	python -m http.server 8000

	# or using node (serve)
	npx serve .
	```

	Then open http://localhost:8000 in your browser.

## 🎮 How to Play

- Click `Start Game` to begin. Place Queens by clicking cells — states cycle between empty, cross, and Queen.
- The goal: exactly one Queen per row, per column, and per colored region, with no two Queens touching diagonally.
- When a level is solved a `Next Level` button appears — all other controls are frozen and the board is blurred until you click it to proceed.

## 🛠️ Development Notes

- Levels and region maps are defined in `script.js` in the `puzzles` array.
- Styling is in `style.css` — overlay and freeze behaviors are controlled via the `freeze-active` body class.
- To adjust scoring or timing, edit `calculateScore()` and timer logic in `script.js`.

---

<div align="center">

### ⭐ Star this repository if you enjoy the game!

**Made with ❤️ and starlight.**

[Report Bug](https://github.com/Shyama-Shree-Pati/Zodiac-Journey/issues) · [Request Feature](https://github.com/Shyama-Shree-Pati>/Zodiac-Journey/issues)

</div>
<div align="center">  <sub>© 2026 Zodiac-Journey. All rights reserved.</sub> </div>

