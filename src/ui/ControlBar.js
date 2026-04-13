import * as Phaser from 'phaser';

export class ControlBar {
    constructor(scene, onSpin) {
        this.scene = scene;
        this.bets = [1, 5, 10, 25, 50];
        this.betIndex = 0;
        this.onSpin = onSpin;
        
        this.buildBottomBar();
    }

    buildBottomBar() {
        const { width, height } = this.scene.scale;
        
        this.scene.add.rectangle(width/2, height - 40, width, 80, 0xb8860b).setStrokeStyle(3, 0xf5d678);

        // Bet Controls
        const btnMinus = this.scene.add.circle(100, height - 40, 24, 0xcc0000).setInteractive();
        this.scene.add.text(100, height - 40, "-", { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        
        const btnPlus = this.scene.add.circle(280, height - 40, 24, 0xcc0000).setInteractive();
        this.scene.add.text(280, height - 40, "+", { fontSize: '24px', color: '#fff' }).setOrigin(0.5);

        this.scene.add.text(190, height - 60, "BET", { fontSize: '14px', color: '#2a1a00' }).setOrigin(0.5);
        this.betText = this.scene.add.text(190, height - 35, String(this.bets[0]), { fontSize: '28px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);

        btnMinus.on('pointerdown', () => this.changeBet(-1));
        btnPlus.on('pointerdown', () => this.changeBet(1));

        // Center Display
        this.scene.add.rectangle(width/2, height - 40, 300, 60, 0x1a0a00).setStrokeStyle(2, 0xc9922a);
        this.totalBetText = this.scene.add.text(width/2 - 80, height - 40, `TOTAL BET: ${this.bets[0]}`, { fontSize: '18px', color: '#f5d678' }).setOrigin(0.5);
        this.winText = this.scene.add.text(width/2 + 80, height - 40, "WIN: 0", { fontSize: '18px', color: '#f5d678' }).setOrigin(0.5);

        // Max Bet
        const btnMax = this.scene.add.rectangle(width - 250, height - 40, 100, 40, 0xcc00aa).setInteractive().setStrokeStyle(2, 0xffffff);
        this.scene.add.text(width - 250, height - 40, "MAX BET", { fontSize: '16px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
        btnMax.on('pointerdown', () => this.setMaxBet());

        // Spin
        this.spinBtn = this.scene.add.rectangle(width - 100, height - 40, 120, 56, 0x0066ff).setInteractive().setStrokeStyle(3, 0xffffff);
        this.spinText = this.scene.add.text(width - 100, height - 40, "SPIN", { fontSize: '24px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
        
        this.spinBtn.on('pointerdown', () => {
            if (this.spinBtn.getData('disabled')) return;
            // animate
            this.scene.tweens.add({ targets: [this.spinBtn, this.spinText], scale: 0.95, duration: 100, yoyo: true });
            this.onSpin(this.bets[this.betIndex]);
        });
    }

    changeBet(dir) {
        if (this.spinBtn.getData('disabled')) return;
        this.betIndex = Phaser.Math.Clamp(this.betIndex + dir, 0, this.bets.length - 1);
        this.updateDisplays();
    }

    setMaxBet() {
        if (this.spinBtn.getData('disabled')) return;
        this.betIndex = this.bets.length - 1;
        this.updateDisplays();
        this.onSpin(this.bets[this.betIndex]);
    }

    updateDisplays() {
        this.betText.setText(String(this.bets[this.betIndex]));
        this.totalBetText.setText(`TOTAL BET: ${this.bets[this.betIndex]}`);
    }

    updateWin(amount) {
        this.winText.setText(`WIN: ${amount}`);
    }

    setDisabled(val) {
        this.spinBtn.setData('disabled', val);
        this.spinBtn.setAlpha(val ? 0.5 : 1);
    }
}