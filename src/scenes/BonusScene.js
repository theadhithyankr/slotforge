import * as Phaser from 'phaser';

export default class BonusScene extends Phaser.Scene {
    constructor() {
        super('BonusScene');
    }

    init(data) {
        this.balance = data.balance;
    }

    create() {
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);

        this.add.text(width/2, height/2 - 100, "10 FREE SPINS", {
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#cc00aa',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width/2, height/2, "2X WINS", {
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#f5d678'
        }).setOrigin(0.5);

        const btn = this.add.rectangle(width/2, height/2 + 100, 200, 60, 0x0066ff).setInteractive().setStrokeStyle(3, 0xffffff);
        this.add.text(width/2, height/2 + 100, "START", { fontSize: '32px', color: '#fff' }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('GameScene', { 
                balance: this.balance,
                isFreeSpins: true,
                freeSpinsLeft: 10,
                freeSpinsTotalWin: 0
            });
        });
    }
}