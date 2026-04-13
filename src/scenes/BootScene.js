import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Here we would load actual images/audio
        // For portfolio purposes, we simulate loading and use built-in graphics
        
        const { width, height } = this.scale;
        const text = this.add.text(width / 2, height / 2, 'Loading Slotforge...', {
            fontSize: '32px', fill: '#f5d678', fontStyle: 'bold', letterSpacing: 8
        }).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: text,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.scene.start('GameScene');
            }
        });
    }
}