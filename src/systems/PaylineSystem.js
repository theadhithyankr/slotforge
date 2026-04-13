import { paytable } from '../config/paytable.js';

export class PaylineSystem {
    // 3 Fixed paylines: Top (0), Middle (1), Bottom (2)
    static evaluate(grid, bet) {
        let totalWin = 0;
        const winningLines = [];

        for (let row = 0; row < 3; row++) {
            const sym1 = grid[row][0];
            const sym2 = grid[row][1];
            const sym3 = grid[row][2];

            if (sym1 === sym2 && sym2 === sym3 && sym1 !== "Scatter") {
                const multiplier = paytable[sym1] || 0;
                if (multiplier > 0) {
                    const winAmount = multiplier * bet;
                    totalWin += winAmount;
                    winningLines.push({ row, symbol: sym1, winAmount });
                }
            }
        }
        return { totalWin, winningLines };
    }
}
