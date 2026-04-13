export class BonusSystem {
    static checkScatters(grid) {
        let scatterCount = 0;
        const scatterPositions = [];
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (grid[row][col] === "Scatter") {
                    scatterCount++;
                    scatterPositions.push({ row, col });
                }
            }
        }

        return {
            triggered: scatterCount >= 3,
            count: scatterCount,
            positions: scatterPositions
        };
    }
}
