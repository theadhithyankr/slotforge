import * as Phaser from 'phaser';
import { symbolDisplay } from '../config/paytable.js';

export class PaytableOverlay extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.buildUI();
        this.setVisible(false);
    }

    buildUI() {
        const bg = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0x000000, 0.85);
        bg.setInteractive(); // block touches
        
        const panel = this.scene.add.rectangle(0, 0, 400, 500, 0x1a0a00).setStrokeStyle(3, 0xc9922a);
        
        const title = this.scene.add.text(0, -220, "PAYTABLE", { fontSize: '32px', color: '#f5d678', fontStyle: 'bold' }).setOrigin(0.5);

        const closeBtn = this.scene.add.text(170, -220, "❌", { fontSize: '24px', color: '#ff0000' }).setOrigin(0.5).setInteractive({useHandCursor: true});
        closeBtn.on('pointerdown', () => this.setVisible(false));

        this.add([bg, panel, title, closeBtn]);

        const items = [
            { id: "Diamond", pay: 500 },
            { id: "Bell", pay: 100 },
            { id: "Cherry", pay: 50 },
            { id: "Lemon", pay: 20 },
            { id: "Star", pay: 10 },
            { id: "Scatter", pay: "Free Spins" }
        ];

        let startY = -150;
        items.forEach(item => {
            const sym = this.scene.add.text(-120, startY, symbolDisplay[item.id], { fontSize: '32px' }).setOrigin(0.5);
            const desc = this.scene.add.text(-50, startY, `${item.id}`, { fontSize: '24px', color: '#fff' }).setOrigin(0, 0.5);
            const payout = this.scene.add.text(140, startY, `3x = ${item.pay === 'Free Spins' ? item.pay : item.pay + 'x'}`, { fontSize: '20px', color: '#f5d678' }).setOrigin(1, 0.5);
            this.add([sym, desc, payout]);
            startY += 60;
        });

        this.setDepth(100);
    }
}