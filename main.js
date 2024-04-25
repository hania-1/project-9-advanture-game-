#! /usr/bin/env node
import * as readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Define a class representing a Player
class Player {
    name;
    health;
    energy;
    constructor(name) {
        this.name = name;
        this.health = 100; // Initial health
        this.energy = 100; // Initial energy
    }
    // Method to get player's name
    getName() {
        return this.name;
    }
    // Method to get player's health
    getHealth() {
        return this.health;
    }
    // Method to get player's energy
    getEnergy() {
        return this.energy;
    }
    // Method to decrease player's health
    decreaseHealth(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            console.log(`${this.name} has been defeated! Game Over.`);
            rl.close();
        }
        else {
            console.log(`${this.name} has ${this.health} health remaining`);
        }
    }
    // Method to decrease player's energy
    decreaseEnergy(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            console.log(`${this.name} has run out of energy! Game Over.`);
            rl.close();
        }
        else {
            console.log(`${this.name} has ${this.energy} energy remaining`);
        }
    }
}
// Define a class representing a Monster
class Monster {
    name;
    health;
    constructor(name) {
        this.name = name;
        this.health = 50; // Initial health
    }
    // Method to get monster's name
    getName() {
        return this.name;
    }
    // Method to get monster's health
    getHealth() {
        return this.health;
    }
    // Method representing a monster attack
    attack(player) {
        const damage = Math.floor(Math.random() * 10) + 1; // Random damage between 1 and 10
        console.log(`${this.name} attacks ${player.getName()} for ${damage} damage.`);
        player.decreaseHealth(damage);
    }
}
// Create instance of Player and Monster
const player = new Player("Hero");
const monster = new Monster("Dragon");
// Simulate a battle
console.log(`A wild ${monster.getName()} appears.`);
function battle() {
    rl.question("Press enter to attack: ", () => {
        const playerAttack = Math.floor(Math.random() * 20) + 1; // Random attack between 1 and 20
        const energyConsumption = Math.floor(Math.random() * 10) + 1; // Random energy consumption between 1 and 10
        player.decreaseEnergy(energyConsumption);
        console.log(`${player.getName()} attacks ${monster.getName()} for ${playerAttack} damage.`);
        monster.attack(player);
        if (player.getHealth() > 0 && player.getEnergy() > 0) {
            console.log(`========================================`);
            console.log(`Next Round:`);
            console.log(`Player's Health: ${player.getHealth()}`);
            console.log(`Player's Energy: ${player.getEnergy()}`);
            console.log(`Monster's Health: ${monster.getHealth()}`);
            console.log(`========================================`);
            battle();
        }
        else {
            rl.close();
        }
    });
}
battle();
