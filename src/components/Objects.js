const objects = {
    drawTile: function(posX,posY,color,type) {
        if(type === 'floor'){
            const {ctx} = this;
            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = color;
            ctx.rect(posX,posY,32,32);
            ctx.stroke();
            ctx.fill()
        }
        if(type === 'floorTexture'){
            const {ctx} = this,
                img = new Image();
            img.src = `./images/${color}.png`
            ctx.drawImage(img,posX,posY)
        }
        if(type === 'door'){
            const {ctx} = this;
            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = color;
            ctx.rect(posX,posY,32,32);
            ctx.stroke();
            ctx.fill()
        }
        if(type === 'wall'){
            const {collide,collideEnemy} = this,
            enemyX = this.state.currentEnemies ? this.state.currentEnemies[0].posX : null,
            enemyY = this.state.currentEnemies ? this.state.currentEnemies[0].posY : null,
                spacer = 2,
                leftPlayer = this.posX + spacer,
                topPlayer = this.posY + spacer,
                rightPlayer = this.posX + 22,
                bottomPlayer = this.posY + 22,
                leftEnemy = enemyX + 32,
                rightEnemy = enemyX + 32,
                topEnemy = enemyY + spacer,
                bottomEnemy = enemyY + spacer,
                leftWall = posX,
                topWall = posY,
                rightWall = posX + 32,
                bottomWall = posY + 32,
                intersect = [
                    ((leftPlayer <= rightWall + spacer && leftPlayer >= leftWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)),
                    ((leftPlayer < rightWall && rightPlayer > leftWall) && (topPlayer >= topWall && topPlayer <= bottomWall + spacer)),
                    ((rightPlayer >= leftWall - spacer && rightPlayer <= rightWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)),
                    ((leftPlayer < rightWall && rightPlayer > leftWall) && (bottomPlayer >= topWall - spacer && bottomPlayer <= bottomWall))
                ],
                intersectEnemy = [
                    ((leftEnemy <= rightWall + spacer && leftEnemy >= leftWall) && (bottomEnemy >= topWall && topEnemy <= bottomWall)),
                    ((leftEnemy < rightWall && rightEnemy > leftWall) && (topEnemy >= topWall && topEnemy <= bottomWall + spacer)),
                    ((rightEnemy >= leftWall - spacer && rightEnemy <= rightWall) && (bottomEnemy >= topWall && topEnemy <= bottomWall)),
                    ((leftEnemy < rightWall && rightEnemy > leftWall) && (bottomEnemy >= topWall - spacer && bottomEnemy <= bottomWall))
                ],
                {ctx} = this;
                ctx.beginPath();
                ctx.lineWidth = 0;
                ctx.strokeStyle = 'black';
                ctx.fillStyle = color;
                ctx.rect(posX,posY,32,32);
                ctx.stroke();
                ctx.fill()
            if(intersect[0]){collide[0] = true}
            if(intersect[1]){collide[1] = true}
            if(intersect[2]){collide[2] = true}
            if(intersect[3]){collide[3] = true}
            if(intersectEnemy[0]){collideEnemy[0] = true}else{collideEnemy[0] = false}
            if(intersectEnemy[1]){collideEnemy[1] = true}else{collideEnemy[1] = false}
            if(intersectEnemy[2]){collideEnemy[2] = true}else{collideEnemy[2] = false}
            if(intersectEnemy[3]){collideEnemy[3] = true}else{collideEnemy[3] = false}
        }
        if(type === 'wallTexture'){
            // let enemyX = this.state.currentEnemies ? this.state.currentEnemies[0].posX : null;
            // let enemyY = this.state.currentEnemies ? this.state.currentEnemies[0].posY : null;

            let levelEnemies = []

            if(this.state.currentEnemies && !levelEnemies.length){
                for(let enemy of this.state.currentEnemies){
                    levelEnemies.push(enemy)
                }
            }

            const {collide,collideEnemy} = this,
            img = new Image(),
                // spacer = 2,
                // leftPlayer = this.posX + spacer,
                // topPlayer = this.posY + spacer,
                // rightPlayer = this.posX + 22,
                // bottomPlayer = this.posY + 22,
                // leftWall = posX,
                // topWall = posY,
                // rightWall = posX + 32,
                // bottomWall = posY + 32,
                {ctx} = this;

            img.src = `./images/${color}.png`
            ctx.drawImage(img, posX,posY)

            objects.playerCollisionDetection(posX,posY,this.posX,this.posY,this.collide)
            objects.enemyCollisionDetection(posX,posY,this.state.currentEnemies)
        }
    },
    drawPlayer: function(fileName,sx,sy,sw,sh,dx,dy,dw,dh){
        const {ctx} = this;
        const img = new Image();
        img.src = `./player/${fileName}.png`
        ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
    },
    // drawPlayerBow: function(fileName,sx,sy,dx,dy,dw,dh){
    //     const {ctx} = this;
    //     const img = new Image();
    //     img.src = `./player/${fileName}.png`
    //     ctx.drawImage(img,this.posX-37,this.posY-62,55,62);
    // },
    playerCollisionDetection: function(x1,y1,x2,y2,collide){
        const collision = (x1,y1,x2,y2,collide) => {
            let leftWall = x1,
                rightWall = x1 + 32,
                topWall = y1,
                bottomWall = y1 + 32,
                rightPlayer = x2 + 12,
                leftPlayer = x2 - 11,
                topPlayer = y2 - 8,
                bottomPlayer = y2 + 8,
                spacer = 2;
            
            if((leftPlayer <= rightWall + spacer && leftPlayer >= leftWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)){collide[0] = true}
            if((leftPlayer < rightWall && rightPlayer > leftWall) && (topPlayer >= topWall && topPlayer <= bottomWall + spacer)){collide[1] = true}
            if((rightPlayer >= leftWall - spacer && rightPlayer <= rightWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)){collide[2] = true}
            if((leftPlayer < rightWall && rightPlayer > leftWall) && (bottomPlayer >= topWall - spacer && bottomPlayer <= bottomWall)){collide[3] = true}
        }
        collision(x1,y1,x2,y2,collide)
    },
    enemyCollisionDetection: function(x1,y1, currentEnemies){
        const collision = (x1,y1,x2,y2,collide) => {
            let leftWall = x1,
                rightWall = x1 + 32,
                topWall = y1,
                bottomWall = y1 + 32,
                rightPlayer = x2 + 12,
                leftPlayer = x2 - 15,
                topPlayer = y2 - 10,
                bottomPlayer = y2 + 10,
                spacer = 0;
    
            if((leftPlayer <= rightWall + spacer && leftPlayer >= leftWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)){collide[0] = true}
            if((leftPlayer < rightWall && rightPlayer > leftWall) && (topPlayer >= topWall && topPlayer <= bottomWall + spacer)){collide[1] = true}
            if((rightPlayer >= leftWall - spacer && rightPlayer <= rightWall) && (bottomPlayer >= topWall && topPlayer <= bottomWall)){collide[2] = true}
            if((leftPlayer < rightWall && rightPlayer > leftWall) && (bottomPlayer >= topWall - spacer && bottomPlayer <= bottomWall)){collide[3] = true}
        }
        //For enemies
        if(currentEnemies && currentEnemies.length){
            for(let enemy of currentEnemies){
                collision(x1,y1,enemy.posX,enemy.posY,enemy.collide)
            }
        }
    },
    drawShape: function(posX,posY,width,height,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(posX,posY,width,height);
        ctx.fill()
    },
    drawShapeRotate: function(posX,posY,width,height,color,angle){
        const {ctx} = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(posX+width/2, posY+height/2);
        ctx.rotate(angle * Math.PI/180);
        ctx.fillStyle = color;
        ctx.rect( -width/2, -height/2, width,height);
        ctx.fill();
        ctx.restore();
    },
    drawShape: function(x,y,w,h,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = color;
        ctx.rect(x,y,w,h);
        ctx.fill();
    },
    drawShapeStroke: function(x,y,w,h,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = color;
        ctx.rect(x,y,w,h);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke()
    },
    drawCircle: function(x,y,w,h,r,angleA,angleB,color,border = true){
        const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,w,h,r,angleA*Math.PI/180,angleB*Math.PI/180)
        ctx.fillStyle = color;
        ctx.fill();
        if(border){
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    },
    drawShapeRotate: function(x,y,w,h,angle,color){
        const {ctx} = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x+w/2,y+h/2);
        ctx.rotate(angle*Math.PI/180);
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.rect(-w/2,-h/2,w,h);
        ctx.fill();
        ctx.restore();
    },
    customShape: function(x1,y1,w1,h1,r1,angleA1,angleB1,
                        x2,y2,w2,h2,r2,angleA2,angleB2, color){
        const {ctx} = this;              
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.ellipse(x1,y1,w1,h1,r1,angleA1*Math.PI/180,angleB1*Math.PI/180)
        ctx.ellipse(x2,y2,w2,h2,r2,angleA2*Math.PI/180,angleB2*Math.PI/180);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    },
    tileSet: function(sx,sy,sw,sh,dx,dy,dw,dh){
        const {ctx} = this,
            img = new Image();
        img.src=`./images/terrainSet.png`;
        ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
    }
}

export default objects;



export const soldierObjects = {
    drawShape: function(x,y,w,h,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = color;
        ctx.rect(x,y,w,h);
        ctx.fill();
    },
    drawShapeStroke: function(x,y,w,h,color){
        const {ctx} = this;
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = color;
        ctx.rect(x,y,w,h);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke()
    },
    drawCircle: function(x,y,w,h,r,angleA,angleB,color,border = true){
        const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,w,h,r,angleA*Math.PI/180,angleB*Math.PI/180)
        ctx.fillStyle = color;
        ctx.fill();
        if(border){
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    },
    drawShapeRotate: function(x,y,w,h,angle,color){
        const {ctx} = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x+w/2,y+h/2);
        ctx.rotate(angle*Math.PI/180);
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.rect(-w/2,-h/2,w,h);
        ctx.fill();
        ctx.restore();
    },
    customShape: function(x1,y1,w1,h1,r1,angleA1,angleB1,
                        x2,y2,w2,h2,r2,angleA2,angleB2, color){
        const {ctx} = this;              
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.ellipse(x1,y1,w1,h1,r1,angleA1*Math.PI/180,angleB1*Math.PI/180)
        ctx.ellipse(x2,y2,w2,h2,r2,angleA2*Math.PI/180,angleB2*Math.PI/180);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
}

