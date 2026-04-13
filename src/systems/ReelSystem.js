import * as Phaser from 'phaser';
import { symbolDisplay } from '../config/paytable.js';

export class ReelSystem {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.reels = [];
        this.spinning = false;

        this.buildReels();
    }

    buildReels() {
        const symbolSize = 160;
        const spacing = 10;
        const totalSize = symbolSize + spacing;

        const maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(this.x - totalSize * 1.5, this.y - totalSize * 1.5, totalSize * 3, totalSize * 3);
        const mask = maskShape.createGeometryMask();

        for (let i = 0; i < 3; i++) {
            const rx = this.x + (i - 1) * totalSize;
            let reelSymbols = [];
            for (let j = -1; j <= 3; j++) {
                const ry = this.y + (j - 1) * totalSize;
                const cell = this.scene.add.container(rx, ry);
                
                const bg = this.scene.add.rectangle(0, 0, symbolSize, symbolSize, 0x2a1a00).setStrokeStyle(2, 0x5a3a00);
                const txt = this.scene.add.text(0, 0, "...", { fontSize: "80px", fontFamily: 'Arial' }).setOrigin(0.5);
                const nameTxt = this.scene.add.text(0, 50, "...", { fontSize: "16px", color: "#fff", fontStyle: "bold" }).setOrigin(0.5);
                
                cell.add([bg, txt, nameTxt]);
                reelSymbols.push(cell);
            }
            this.scene.children.bringToTop(maskShape); // keep behind mask
            reelSymbols.forEach(c => c.setMask(mask));
            this.reels.push({ container: this.scene.add.container(0, 0, reelSymbols), symbols: reelSymbols, x: rx });
        }
    }

    setSymbols(grid) {
        for (let col = 0; col < 3; col++) {
            const symbols = this.reels[col].symbols;
            symbols[1].getAt(1).setText(symbolDisplay[grid[0][col]]);
            symbols[1].getAt(2).setText(grid[0][col].toUpperCase());

            symbols[2].getAt(1).setText(symbolDisplay[grid[1][col]]);
            symbols[2].getAt(2).setText(grid[1][col].toUpperCase());

            symbols[3].getAt(1).setText(symbolDisplay[grid[2][col]]);
            symbols[3].getAt(2).setText(grid[2][col].toUpperCase());
        }
    }

    spin(targetGrid, onComplete) {
        this.spinning = true;
        let completed = 0;

        for (let col = 0; col < 3; col++) {
            // Number of steps to spin: Base spins + delay for each reel
            const steps = 15 + (col * 10);
            
            // Initial small pull back before spinning
            this.scene.tweens.add({
                targets: this.reels[col].container,
                y: -40,
                duration: 200,
                ease: 'Back.easeIn',
                onComplete: () => {
                    this.spinReelStep(col, targetGrid, steps, () => {
                        completed++;
                        if (completed === 3) {
                            this.spinning = false;
                            if (onComplete) onComplete();
                        }
                    });
                }
            });
        }
    }

    spinReelStep(col, targetGrid, stepsLeft, onComplete) {
        const totalSize = 170; // symbolSize (160) + spacing (10)
        const r = this.reels[col];
        
        this.scene.tweens.add({
            targets: r.container,
            y: totalSize,
            duration: 60, // fast spin
            ease: 'Linear',
            onComplete: () => {
                r.container.y = 0;
                
                // Shift symbols array (wrap bottom to top)
                const last = r.symbols.pop();
                r.symbols.unshift(last);
                
                // Reset local Ys
                for (let i = 0; i < 5; i++) {
                    r.symbols[i].y = this.y + (i - 2) * totalSize;
                }

                // Inject the new symbol at the top hidden slot (index 0)
                if (stepsLeft > 1 && stepsLeft <= 4) {
                    const targetIndex = stepsLeft - 2; // 4 -> 2 (bottom), 3 -> 1 (middle), 2 -> 0 (top)
                    const sym = targetGrid[targetIndex][col];
                    r.symbols[0].getAt(1).setText(symbolDisplay[sym]);
                    r.symbols[0].getAt(2).setText(sym.toUpperCase());
                } else {
                    const randomSyms = Object.keys(symbolDisplay);
                    const sym = randomSyms[Math.floor(Math.random() * randomSyms.length)];
                    r.symbols[0].getAt(1).setText(symbolDisplay[sym]);
                    r.symbols[0].getAt(2).setText(sym.toUpperCase());
                }

                if (stepsLeft > 1) {
                    this.spinReelStep(col, targetGrid, stepsLeft - 1, onComplete);
                } else {
                    // Final bounce down when stopping completely
                    this.scene.tweens.add({
                        targets: r.container,
                        y: 30,
                        duration: 150,
                        yoyo: true,
                        ease: 'Quad.easeOut',
                        onComplete: () => {
                            if (onComplete) onComplete();
                        }
                    });
                }
            }
        });
    }
}
