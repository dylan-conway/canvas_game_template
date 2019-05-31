export default class Objects{
    constructor(){
        this.obstacles = [];
        this.enemies = [];
    }

    draw(ctx){
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }
}