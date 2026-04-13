import * as Phaser from 'phaser';
import { ReelSystem } from '../systems/ReelSystem.js';
import { RNGSystem } from '../systems/RNGSystem.js';
import { PaylineSystem } from '../systems/PaylineSystem.js';
import { BonusSystem } from '../systems/BonusSystem.js';
import { HUD } from '../ui/HUD.js';
import { ControlBar } from '../ui/ControlBar.js';
import { PaytableOverlay } from '../ui/PaytableOverlay.js';
import { WinAnimations } from '../ui/WinAnimations.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.balance = data.balance !== undefined ? data.balance : 1000;
        this.isFreeSpins = data.isFreeSpins || false;
        this.freeSpinsLeft = data.freeSpinsLeft || 0;
        this.freeSpinsTotalWin = data.freeSpinsTotalWin || 0;
    }

    create() {
        this.createBackground();
        this.createCabinet();

        const { width, height } = this.scale;
        this.reelSystem = new ReelSystem(this, width / 2, height / 2);
        
        // Initial setup visual
        this.reelSystem.setSymbols(RNGSystem.generateSpinResult());
        
        this.hud = new HUD(this);
        this.hud.updateBalance(this.balance);
        
        this.controlBar = new ControlBar(this, (bet) => this.onSpinPress(bet));
        if (this.isFreeSpins) {
            this.controlBar.setDisabled(true);
            this.controlBar.updateWin(this.freeSpinsTotalWin);
            this.hud.balanceText.setText(`FREE SPINS: ${this.freeSpinsLeft}`);
        }

        this.paytableOverlay = new PaytableOverlay(this, width / 2, height / 2);
        this.winAnimations = new WinAnimations(this, this.reelSystem);

        this.events.on('open_paytable', () => {
            this.paytableOverlay.setVisible(true);
        });

        // Start free spins loop
        if (this.isFreeSpins && this.freeSpinsLeft > 0) {
            this.time.delayedCall(1000, () => this.onSpinPress(0));
        }
    }

    createBackground() {
        const { width, height } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a0033, 0x1a0033, 0x0d0018, 0x0d0018, 1);
        bg.fillRect(0, 0, width, height);

        // Decorator
        const cone = this.add.graphics();
        cone.fillStyle(0xff00ff, 0.1);
        cone.fillTriangle(0, 0, 300, 0, 0, height);
        cone.fillTriangle(width, 0, width - 300, 0, width, height);
        cone.setBlendMode(Phaser.BlendModes.ADD);
    }

    createCabinet() {
        const { width, height } = this.scale;
        const w = 550, h = 530;
        
        const cab = this.add.rectangle(width/2, height/2, w, h, 0xcc0000).setStrokeStyle(4, 0x880000);
        this.add.rectangle(width/2, height/2, w - 48, h - 48, 0x000000).setStrokeStyle(4, 0xf5d678);
        cab.setDepth(-1);
    }

    onSpinPress(bet) {
        if (this.reelSystem.spinning) return;
        
        if (!this.isFreeSpins) {
            if (this.balance < bet) {
                // Not enough funds (Game Over logic)
                return;
            }
            this.balance -= bet;
            this.hud.updateBalance(this.balance);
            this.controlBar.updateWin(0);
        }
        
        this.controlBar.setDisabled(true);

        const resultGrid = RNGSystem.generateSpinResult();
        
        this.reelSystem.spin(resultGrid, () => {
            this.evaluateSpin(resultGrid, bet);
        });
    }

    evaluateSpin(grid, bet) {
        let multiplier = this.isFreeSpins ? 2 : 1;
        const { totalWin, winningLines } = PaylineSystem.evaluate(grid, bet);
        const finalWin = totalWin * multiplier;

        if (!this.isFreeSpins && finalWin > 0) {
            this.balance += finalWin;
            this.hud.updateBalance(this.balance);
            this.controlBar.updateWin(finalWin);
        } else if (this.isFreeSpins) {
            this.freeSpinsTotalWin += finalWin;
            this.controlBar.updateWin(this.freeSpinsTotalWin);
        }

        const proceed = () => {
            const bonus = BonusSystem.checkScatters(grid);
            if (bonus.triggered && !this.isFreeSpins) {
                this.winAnimations.playBonusTrigger(bonus.count, () => {
                    this.scene.start('BonusScene', { balance: this.balance });
                });
            } else {
                this.finishSpin();
            }
        };

        if (winningLines.length > 0) {
            this.winAnimations.playPaylines(winningLines, () => {
                if (finalWin > bet * 100) {
                    this.winAnimations.playBigWin(finalWin, proceed);
                } else {
                    proceed();
                }
            });
        } else {
            proceed();
        }
    }

    finishSpin() {
        if (this.isFreeSpins) {
            this.freeSpinsLeft--;
            if (this.freeSpinsLeft <= 0) {
                this.time.delayedCall(2000, () => {
                    this.scene.start('GameScene', { balance: this.balance + this.freeSpinsTotalWin });
                });
            } else {
                this.hud.balanceText.setText(`FREE SPINS: ${this.freeSpinsLeft}`);
                this.time.delayedCall(1000, () => this.onSpinPress(0));
            }
        } else {
            this.controlBar.setDisabled(false);
        }
    }
}
