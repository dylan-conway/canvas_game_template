export default class Objects{
    constructor(){
        this.obstacles = [];
        this.enemies = [];
    }

    draw(){
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.enemies.forEach(enemy => enemy.draw());
    }
}