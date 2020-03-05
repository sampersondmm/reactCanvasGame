import {world} from '../data/maps'

class SmallEnemy {
    constructor(props){
        this.posX = props.posX;
        this.posY = props.posY;
        this.ctx = props.ctx;
        this.health = props.health;
        this.drawRect = this.drawRect.bind(this);
        this.create = this.create.bind(this);
        this.collide = [false,false,false,false]
    }
    drawRect(posX,posY,width,height,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(posX,posY,width,height);
        ctx.fill()
    }
    drawRect(posX,posY,width,height,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(posX,posY,width,height);
        ctx.fill()
    }
    create(){
        this.drawRect(this.posX,this.posY,22,22,'black');
    }
}

export class BigEnemy {
    constructor(props){
        this.posX = props.posX;
        this.posY = props.posY;
        this.ctx = props.ctx;
        this.drawCircle = props.drawCircle;
        this.drawPlayer = props.drawPlayer;
        this.offX = 0;
        this.id = props.id;
        this.height = 32;
        this.enemies = props.enemies;
        this.health = 100;
        this.countDown = 100;
        this.dir = [false,false,true,true];
        this.alive = true;
        this.move = [false,false,false,false];
        this.collide = [false,false,false,false];
    }
    drawRect(posX,posY,width,height,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(posX,posY,width,height);
        ctx.fill()
    }
    randomDir(){
        let num = Math.floor(Math.random() * Math.floor(100))
        if(num < 25){this.move = [true,false,false,false]}
        if(num > 25 && num < 50){this.move = [false,true,false,false]}
        if(num > 50 && num < 75){this.move = [false,false,true,false]}
        if(num > 57 && num < 100){this.move = [false,false,false,true]}
    }
    travel(end){
        if(this.posX > end[0]){this.posX--}
        if(this.posY > end[1]){this.posY--}
        if(this.posX < end[0]){this.posX++}
        if(this.posY < end[1]){this.posY++}
    }
    chase(playerPos){
        const diffX = Math.abs(this.posX - playerPos[0]),
            diffY = Math.abs(this.posY - playerPos[1]),
            distanceToPlayer = Math.floor(Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)));
        
        let tan = null;
        if(playerPos[0] > this.posX){
            tan = diffY / diffX
        }
        if(playerPos[0] < this.posX){
            tan = diffX / diffY
        }
        const angle = Math.atan(diffY/diffX)
        
        if(distanceToPlayer > 30 && distanceToPlayer < 100){
            if(this.posX > playerPos[0] && !this.collide[0]){
                this.posX--; 
            }
            if(this.posY > playerPos[1] && !this.collide[1]){
                this.posY--;
            }
            if(this.posX < playerPos[0] && !this.collide[2]){this.posX++}
            if(this.posY < playerPos[1] && !this.collide[3]){this.posY++}
            this.collide[0] = false;
            this.collide[1] = false;
            this.collide[2] = false;
            this.collide[3] = false;
        }

    }
    hover(){
        if(this.countDown > 0){
            if(this.move[0]){this.posX--}
            if(this.move[1]){this.posY--}
            if(this.move[2]){this.posX++}
            if(this.move[3]){this.posY++}
            this.countDown--;
        } else {
            this.dir = this.randomDir();
            this.countDown = 100;
        }
    }
    hitEffect(dir){
        const impact = 15,
            offset = 2/3
        if(dir === 'left'){this.posX -= impact}
        if(dir === 'up'){this.posY -= impact}
        if(dir === 'right'){this.posX += impact}
        if(dir === 'down'){this.posY += impact}
        //Offset diagonal for consistent distance
        if(dir === 'leftUp'){
            this.posX -= impact*offset;
            this.posY -= impact*offset;
        }
        if(dir === 'rightUp'){
            this.posX += impact*offset;
            this.posY -= impact*offset;
        }
        if(dir === 'rightDown'){
            this.posX += impact*offset;
            this.posY += impact*offset;
        }
        if(dir === 'leftDown'){
            this.posX -= impact*offset;
            this.posY += impact*offset;
        }
        if(dir === 'left' ||
            dir === 'right' ||
            dir === 'up' ||
            dir === 'down' ||
            dir === 'leftUp' ||
            dir === 'rightUp' ||
            dir === 'rightDown' ||
            dir === 'leftDown'
        ){
            this.health -= 20;
            if(this.health < 0){
                this.health = 0;
                this.alive = false;
            }
        }

    }
    hitDetection(bullets){
        const width = 32,
            height = 32;

        //left bullets
        for(var i = 0; i < bullets.left.length;i++){
            if (bullets.left[i].posX < this.posX + 50 &&
                bullets.left[i].posX > this.posX - 55 &&
                bullets.left[i].posY > this.posY - 10 &&
                bullets.left[i].posY < this.posY + height){
                    let newBullets = bullets.left.filter(el => {
                        return el.id !== bullets.left[i].id;
                    });
                    bullets.left = newBullets;
                    this.hitEffect('left');
            }
        }
        //up bullets
        for(var i = 0; i < bullets.up.length;i++){
            if (bullets.up[i].posX < this.posX + 20 &&
                bullets.up[i].posX > this.posX - 25 &&
                bullets.up[i].posY < this.posY + height + 30&&
                bullets.up[i].posY > this.posY){
                    let newBullets = bullets.up.filter(el => {
                        return el.id !== bullets.up[i].id
                    });
                    bullets.up = newBullets;
                    this.hitEffect('up');
            }
        }
        //right bullets
        for(var i = 0; i < bullets.right.length;i++){
            if (bullets.right[i].posX > this.posX - 40 &&
                bullets.right[i].posX < this.posX - 55 + width &&
                bullets.right[i].posY > this.posY - 10 &&
                bullets.right[i].posY < this.posY + height){
                    let newBullets = bullets.right.filter(el => {
                        return el.id !== bullets.right[i].id
                    });
                    bullets.right = newBullets;
                    this.hitEffect('right');
            }
        }
        //down bullets
        for(var i = 0; i < bullets.down.length;i++){
            if (bullets.down[i].posX < this.posX + width &&
                bullets.down[i].posX > this.posX - 10 &&
                bullets.down[i].posY < this.posY &&
                bullets.down[i].posY > this.posY - 40){
                    let newBullets = bullets.down.filter(el => {
                        return el.id !== bullets.down[i].id
                    });
                    bullets.down = newBullets;
                    this.hitEffect('down');
            }
        }

        //leftUp bullets
        for(var i = 0; i < bullets.leftUp.length;i++){
            if (bullets.leftUp[i].posX < this.posX + 20 + width &&
                bullets.leftUp[i].posX > this.posX + 10 &&
                bullets.leftUp[i].posY < this.posY + height + 25 &&
                bullets.leftUp[i].posY > this.posY + 10){
                    let newBullets = bullets.leftUp.filter(el => {
                        return el.id !== bullets.leftUp[i].id
                    });
                    bullets.leftUp = newBullets;
                    this.hitEffect('leftUp')
            }
        }
        
        //rightUp bullets
        for(var i = 0; i < bullets.rightUp.length;i++){
            if (bullets.rightUp[i].posX < this.posX &&
                bullets.rightUp[i].posX > this.posX - width - 10 &&
                bullets.rightUp[i].posY < this.posY + height + 20 &&
                bullets.rightUp[i].posY > this.posY + 10
                ){
                    let newBullets = bullets.rightUp.filter(el => {
                        return el.id !== bullets.rightUp[i].id
                    });
                    bullets.rightUp = newBullets;
                    this.hitEffect('rightUp')
            }
        }
        //rightDown bullets
        for(var i = 0; i < bullets.rightDown.length;i++){
            if (bullets.rightDown[i].posX < this.posX + 5&&
                bullets.rightDown[i].posX > this.posX - width &&
                bullets.rightDown[i].posY < this.posY + 5 &&
                bullets.rightDown[i].posY > this.posY - height
                ){
                    let newBullets = bullets.rightDown.filter(el => {
                        return el.id !== bullets.rightDown[i].id
                    });
                    bullets.rightDown = newBullets;
                    this.hitEffect('rightDown')
            }
        }
        //leftDown bullets
        for(var i = 0; i < bullets.leftDown.length;i++){
            if (bullets.leftDown[i].posX < this.posX + width + 20&&
                bullets.leftDown[i].posX > this.posX + 15 &&
                bullets.leftDown[i].posY < this.posY + 10 &&
                bullets.leftDown[i].posY > this.posY - height
                ){
                    let newBullets = bullets.leftDown.filter(el => {
                        return el.id !== bullets.leftDown[i].id
                    });
        
                    bullets.leftDown = newBullets;
                    this.hitEffect('leftDown');
            }
        }
        this.hitEffect()
    }
    killed(deadEnemies){
        if(!this.alive){
            //remove the dead enemy from level enemies
            deadEnemies.push(this);
        }
    }

    create(bullets, playerPos,deadEnemies){
        // this.offX += 1;
        let newColor = 255 - this.health;
        this.hitDetection(bullets);
        this.chase(playerPos)
        this.killed(deadEnemies);
        // this.hover();
        // this.travel([500,100])

        //Shadow
        this.drawCircle(this.posX-2,this.posY-2,15,10,0,0,360,'rgba(0,0,0,.5)',false)
        this.drawPlayer('demon',0,0,600,600,this.posX-102,this.posY-150,200,200)
        this.drawPlayer('demon',600,0,600,600,this.posX-102,this.posY-150,200,200)
        this.drawPlayer('demon',1200,0,600,600,this.posX-102,this.posY-150,200,200)
        this.drawPlayer('demon',1800,0,600,600,this.posX-102,this.posY-150,200,200)
       
    }
}

const enemy = {
    //Only need context, Mostly Objects
    //Create enemies from array in level details
    currentEnemies: [],
    setUpEnemies: function(){
        for(let i = 0; i < this.currentEnemies.length; i++){
            this.currentEnemies[i].create()
        }
    },
    createEnemies: function(){
        // if(enemy.currentEnemies.length < this.currentLevel.enemies.length){
        //         let newEnemy = new BigEnemy({
        //             posX: this.currentLevel.enemies[0][0],
        //             posY:  this.currentLevel.enemies[0][1],
        //             bullets: bullets,
        //             ctx: this.ctx
        //         })
        //     enemy.currentEnemies.push(newEnemy)
        // }
        // enemy.setUpEnemies()
    }
}

export default enemy;
