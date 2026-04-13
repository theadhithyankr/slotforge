# SlotForge (Slot Machine)

A modern, HTML5-based slot machine game built with [Phaser 4](https://phaser.io/) and [Vite](https://vitejs.dev/).

## Features

- **Phaser 4 Powered**: Utilizing the latest Phaser framework for smooth 2D rendering and animations.
- **Fast Development**: Built with Vite for rapid Hot Module Replacement (HMR) and optimized production builds.
- **Modular Architecture**: Clean separation of concerns with Scenes, Systems (Reels, Paylines, RNG, Bonus), UI elements (HUD, Control Bar, Win Animations), and Configuration.

## Project Structure

```text
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
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (current version recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the Vite development server with HMR:
```bash
npm run dev
```

### Build for Production

Generate an optimized production build:
```bash
npm run build
```

## License

ISC
