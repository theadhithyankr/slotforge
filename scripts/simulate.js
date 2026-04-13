// Simulates a simulation execution environment natively in Node without Phaser.
import { RNGSystem } from '../src/systems/RNGSystem.js';
import { PaylineSystem } from '../src/systems/PaylineSystem.js';
import { BonusSystem } from '../src/systems/BonusSystem.js';

// Parse args
const args = process.argv.slice(2);
let spins = 100000;
let bet = 1;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--spins') spins = parseInt(args[i+1]);
    if (args[i] === '--bet') bet = parseInt(args[i+1]);
}

let totalBet = 0;
let totalPayout = 0;
let biggestSingleWin = 0;
let bonusTriggers = 0;

console.log(`Starting simulation: Spins=${spins}, Bet=${bet}`);

for (let s = 0; s < spins; s++) {
    totalBet += bet;
    const grid = RNGSystem.generateSpinResult();
    
    // Evaluate main game wins
    const { totalWin } = PaylineSystem.evaluate(grid, bet);
    totalPayout += totalWin;
    if (totalWin > biggestSingleWin) biggestSingleWin = totalWin;

    // Evaluate scatters (bonus round is played automatically with RTP multiplier logic here)
    const bonusCheck = BonusSystem.checkScatters(grid);
    if (bonusCheck.triggered) {
        bonusTriggers++;
        // Simulate 10 free spins with 2x multiplier
        let freeSpinsTotal = 0;
        for (let fs = 0; fs < 10; fs++) {
            const fsGrid = RNGSystem.generateSpinResult();
            const { totalWin: fsWin } = PaylineSystem.evaluate(fsGrid, bet);
            freeSpinsTotal += (fsWin * 2);
        }
        totalPayout += freeSpinsTotal;
        if (freeSpinsTotal > biggestSingleWin) biggestSingleWin = freeSpinsTotal;
    }
}

const actualRTP = ((totalPayout / totalBet) * 100).toFixed(2);

console.log("\n--- Simulation Results ---");
console.log(`Total Spins: ${spins}`);
console.log(`Total Bet: ${totalBet}`);
console.log(`Total Payout: ${totalPayout}`);
console.log(`Actual RTP: ${actualRTP}% (target ~96.5%)`);
console.log(`Bonus Triggers: ${bonusTriggers} (approx 1 in ${(spins/bonusTriggers).toFixed(1)} spins)`);
console.log(`Biggest Win: ${biggestSingleWin}`);
console.log("--------------------------");
// Note: Production implementation would use server-side provably fair RNG — client-side used here for portfolio purposes
