export class HUD {
    constructor(scene) {
        this.scene = scene;
        this.buildTopBar();
    }

    buildTopBar() {
        const { width } = this.scene.scale;
        const bg = this.scene.add.rectangle(width/2, 32, width, 64, 0xb8860b).setStrokeStyle(3, 0xf5d678);

        this.scene.add.text(20, 32, "← ⛶", { fontSize: '24px', color: '#fff' }).setOrigin(0, 0.5);
        this.balanceText = this.scene.add.text(120, 32, "⊙ 1000", { fontSize: '24px', fontStyle: 'bold', color: '#fff' }).setOrigin(0, 0.5);

        const bannerBg = this.scene.add.rectangle(width/2, 32, 300, 48, 0x1a0000).setStrokeStyle(2, 0xc9922a);
        this.scene.add.text(width/2, 32, "SLOTFORGE", { 
            fontSize: '32px', fontFamily: 'Arial', color: '#f5d678', fontStyle: 'bold', letterSpacing: 8 
        }).setOrigin(0.5, 0.5).setShadow(0, 0, '#f5d678', 10, true, true);

        const paytableBtn = this.scene.add.rectangle(width - 150, 32, 140, 40, 0x0066ff).setStrokeStyle(2, 0xffffff);
        const paytableText = this.scene.add.text(width - 150, 32, "PAYTABLE 🔊", { fontSize: '16px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        
        paytableBtn.setInteractive({ useHandCursor: true });
        paytableBtn.on('pointerdown', () => this.scene.events.emit('open_paytable'));
    }

    updateBalance(val) {
        this.balanceText.setText(`⊙ ${val}`);
    }
}