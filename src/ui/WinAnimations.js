export class WinAnimations {
    constructor(scene, reelSystem) {
        this.scene = scene;
        this.reelSystem = reelSystem;
        
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(10);
    }

    playPaylines(winningLines, onComplete) {
        if (winningLines.length === 0) {
            if (onComplete) onComplete();
            return;
        }

        const symbolSize = 160;
        const spacing = 10;
        const totalSize = symbolSize + spacing;
        let delay = 0;

        winningLines.forEach((line, index) => {
            this.scene.time.delayedCall(delay, () => {
                this.drawLine(line.row, totalSize);
                if (index === winningLines.length - 1) {
                    this.scene.time.delayedCall(1000, () => {
                        this.clearLines();
                        if (onComplete) onComplete();
                    });
                }
            });
            delay += 1000;
        });
    }

    drawLine(row, totalSize) {
        this.graphics.clear();
        this.graphics.lineStyle(8, 0xf5d678, 0.8);
        const y = this.reelSystem.y + (row - 1) * totalSize;
        const xStart = this.reelSystem.x - totalSize * 1.6;
        const xEnd = this.reelSystem.x + totalSize * 3.6;
        
        this.graphics.beginPath();
        this.graphics.moveTo(xStart, y);
        this.graphics.lineTo(xEnd, y);
        this.graphics.strokePath();

        // Glow logic omitted for brevity
    }

    clearLines() {
        this.graphics.clear();
    }

    playBigWin(amount, onComplete) {
        const { width, height } = this.scene.scale;
        
        const overlay = this.scene.add.rectangle(width/2, height/2, width, height, 0xffffff, 0.8);
        overlay.setDepth(50);
        
        const text = this.scene.add.text(width/2, height/2, `BIG WIN!\n${amount}`, { 
            fontSize: '80px', color: '#f5d678', fontStyle: 'bold', align: 'center' 
        }).setOrigin(0.5).setDepth(51).setShadow(0, 0, '#000', 10);
        
        this.scene.tweens.add({
            targets: text,
            scale: { from: 0, to: 1 },
            duration: 500,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                this.scene.time.delayedCall(2000, () => {
                    overlay.destroy();
                    text.destroy();
                    if (onComplete) onComplete();
                });
            }
        });
    }

    playBonusTrigger(count, onComplete) {
        const { width, height } = this.scene.scale;
        
        const text = this.scene.add.text(width/2, height/2, "FREE SPINS!", { 
            fontSize: '100px', color: '#cc00aa', fontStyle: 'bold' 
        }).setOrigin(0.5).setDepth(51).setShadow(0, 0, '#fff', 10);
        
        this.scene.tweens.add({
            targets: text,
            y: height/2 - 100,
            alpha: { from: 1, to: 0 },
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                text.destroy();
                if (onComplete) onComplete();
            }
        });
    }
}