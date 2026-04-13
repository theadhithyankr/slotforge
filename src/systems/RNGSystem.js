import { reelStrips } from '../config/reelStrips.js';

export class RNGSystem {
    // Math model uses server-side provably fair RNG; client side here for portfolio purposes.
    static getRandomSymbolForReel(reelIndex) {
        const strip = reelStrips[reelIndex];
        const totalWeight = strip.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of strip) {
            random -= item.weight;
            if (random < 0) return item.symbol;
        }
        return strip[strip.length - 1].symbol; // Fallback
    }

    static generateSpinResult() {
        const grid = [];
        for (let row = 0; row < 3; row++) {
            grid[row] = [];
            for (let col = 0; col < 3; col++) {
                grid[row][col] = this.getRandomSymbolForReel(col);
            }
        }
        return grid;
    }
}
