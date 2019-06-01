import {commands} from '../js/Enums.js';
import * as utils from '../js/utils.js';

export default class Objects{
    constructor(){
        this.obstacles = [];
        this.enemies = [];
    }
    draw(ctx){
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }
    addObstacle(obstacle){
        this.obstacles.push(obstacle);
    }
    moveUp(dist){
        this.obstacles.forEach(obstacle => {obstacle.y -= dist});
    }
    moveRight(dist){
        this.obstacles.forEach(obstacle => {obstacle.x += dist});
    }
    moveDown(dist){
        this.obstacles.forEach(obstacle => {obstacle.y += dist});
    }
    moveLeft(dist){
        this.obstacles.forEach(obstacle => {obstacle.x -= dist});
    }
    checkUpCollisions(o){
        this.obstacles.forEach(ob => {
            if(utils.objInObj(o, ob)){
                moveUp(ob.y + ob.height - o.y);
            }
        });
    }
    checkRightCollisions(o){
        this.obstacles.forEach(ob => {
            if(utils.objInObj(o, ob)){
                moveRight(o.x + o.width - ob.x);
            }
        });
    }
    checkDownCollisions(o){
        this.obstacles.forEach(ob => {
            if(utils.objInObj(o, ob)){
                moveDown(o.y + o.height - ob.y);
            }
        });
    }
    checkLeftCollisions(o){
        this.obstacles.forEach(ob => {
            if(utils.objInObj(o, ob)){
                moveLeft(ob.x + ob.width - o.x);
            }
        });
    }
}