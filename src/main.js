import * as Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import BonusScene from './scenes/BonusScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, GameScene, BonusScene],
    backgroundColor: '#000000',
    render: {
        pixelArt: false,
        antialias: true
    }
};

const game = new Phaser.Game(config);
