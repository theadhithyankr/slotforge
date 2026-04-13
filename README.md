<div align=""center"">
  <h1>🎰 SlotForge</h1>
  <p><b>A modern, HTML5-based slot machine game built with Phaser 4 and Vite.</b></p>
  
  <a href=""https://slotforge1.vercel.app/"" target=""_blank"">
    <img src=""https://img.shields.io/badge/🎮_Play_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white"" alt=""Play Live Demo"" />
  </a>
  <br />
  <br />

  <a href=""https://slotforge1.vercel.app/"" target=""_blank"">
    <!-- Note: Replace this placeholder image URL with an actual animated GIF of your slot machine spinning once you record one! -->
    <img src=""https://placehold.co/600x350/16213e/e94560.png?text=Play+SlotForge+Now!&font=Montserrat"" alt=""SlotForge Gameplay"" />
  </a>
</div>

---

## ✨ Features

- **Phaser 4 Powered**: Utilizing the latest Phaser framework for smooth 2D rendering and animations.
- **Fast Development**: Built with Vite for rapid Hot Module Replacement (HMR) and optimized production builds.
- **Modular Architecture**: Clean separation of concerns with Scenes, Systems (Reels, Paylines, RNG, Bonus), UI elements (HUD, Control Bar, Win Animations), and Configuration.

## 📁 Project Structure

`	ext
├── package.json
├── vite.config.js
├── scripts/
│   └── simulate.js        # Simulation scripts for testing game math/RNG
└── src/
    ├── index.html         # Application entry point
    ├── main.js            # Game initialization
    ├── config/            # Game configurations (paytables, reel strips)
    ├── scenes/            # Phaser Scenes (Boot, Game, Bonus)
    ├── systems/           # Core game logic (Reels, RNG, Paylines)
    └── ui/                # User interface components
`

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (current version recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   `ash
   npm install
   `

### Development

Start the Vite development server with HMR:
`ash
npm run dev
`

### Build for Production

Generate an optimized production build:
`ash
npm run build
`

## 📄 License

ISC
