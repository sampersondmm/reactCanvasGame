import keyBoard from './Keyboard';

const playerBody = {
    drawPlayer: function(dir){
        const {ctx,posX,posY} = this;
        const drawImage = function(dir,){
            const img = new Image();
            img.src = `./player/${dir}.png`
            ctx.drawImage(img,posX-30,posY-80,60,80);
        }

        //Shadow
        this.drawCircle(this.posX,this.posY,15,10,0,0,360,'rgba(0,0,0,.5)',false)
        //Aim dots
        if(dir[0]){
            drawImage('left')
            this.drawCircle(this.posX - 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 60,this.posY,2,2,0,0,360,'red')
        }
        if(dir === 'up'){
            drawImage('up')
            this.drawCircle(this.posX,this.posY - 30,2,2,0,0,360,'red')
            this.drawCircle(this.posX,this.posY - 60,2,2,0,0,360,'red')
        }
        if(dir === 'right'){
            drawImage('right')
            this.drawCircle(this.posX + 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX + 60,this.posY,2,2,0,0,360,'red')
        }
        if(dir === 'down'){
            drawImage('down')
            this.drawCircle(this.posX,this.posY+30,2,2,0,0,360,'red')
            this.drawCircle(this.posX,this.posY+60,2,2,0,0,360,'red')
        }
        if(dir[1]){
            drawImage('left')
            this.drawCircle(this.posX - 20,this.posY-20,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 20,this.posY-20,2,2,0,0,360,'red')
        }
        if(dir === 'rightUp'){
            drawImage('right')
            this.drawCircle(this.posX - 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 60,this.posY,2,2,0,0,360,'red')
        }
        if(dir === 'rightDown'){
            drawImage('right')
            this.drawCircle(this.posX - 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 60,this.posY,2,2,0,0,360,'red')
        }
        if(dir === 'leftDown'){
            drawImage('left')
            this.drawCircle(this.posX - 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 60,this.posY,2,2,0,0,360,'red')
        }
    },
}

const player = {
    //Changes position
    handleMovement: function() {
        const {move, collide, speed,defend,attack} = this;
        if(move[0] && !collide[0] && !defend && !attack){this.posX -= speed}
        if(move[1] && !collide[1] && !defend && !attack){this.posY -= speed}
        if(move[2] && !collide[2] && !defend && !attack){this.posX += speed}
        if(move[3] && !collide[3] && !defend && !attack){this.posY += speed}
    },
    //Changes Directions
    handleDirection: function(){
        const {move, dir, dirOverride,face} = this
        //set all directions to false
        const dirFalse = function(){
            for(var i = 0; i < 8; i++){
                dir[i] = false;
            }
        }
        const faceFalse = function(){
            for(var i = 0; i < 4;i++){
                face[i] = false;
            }
        }
        //set the correct direction to true
        const setDir = function(move1,move2, direction){
            if(!dirOverride){
                if(move2 === null){
                    if(move[move1]){
                        dirFalse();
                        dir[direction] = true; 
                    }
                } else {
                    if(move[move1] && move[move2]){
                        dirFalse();
                        dir[direction] = true; 
                    }
                }
            }
            if(dirOverride){
                //left
                if(face[0] && !face[1] && !face[2] && !face[3]){
                    dirFalse();
                    dir[0] = true;
                }
                //up
                if(!face[0] && face[1] && !face[2] && !face[3]){
                    dirFalse();
                    dir[2] = true;
                }
                //right
                if(!face[0] && !face[1] && face[2] && !face[3]){
                    dirFalse();
                    dir[4] = true;
                }
                //down
                if(!face[0] && !face[1] && !face[2] && face[3]){
                    dirFalse();
                    dir[6] = true
                }
                //leftUp
                if(face[0] && face[1] && !face[2] && !face[3]){
                    dirFalse();
                    dir[1] = true;
                }
                //rightUp
                if(!face[0] && face[1] && face[2] && !face[3]){
                    dirFalse();
                    dir[3] = true;
                }
    
                //rightDown
                if(!face[0] && !face[1] && face[2] && face[3]){
                    dirFalse();
                    dir[5] = true;
                }
    
                //leftDown
                if(face[0] && !face[1] && !face[2] && face[3]){
                    dirFalse();
                    dir[7] = true;
                }
            }
        }
        
        //left
        setDir(0,null,0)
        //up
        setDir(1,null,2)
        //right
        setDir(2,null,4)
        //down
        setDir(3,null,6)
        //leftUp
        setDir(0,1,1)
        //rightUp
        setDir(1,2,3)
        //rightDown
        setDir(2,3,5)
        //leftDown
        setDir(0,3,7)
    },
    //Draw the player based on direction facing
    createPlayer: function(){
        const {dir} = this;

        //Shadow
        this.drawCircle(this.posX,this.posY,15,10,0,0,360,'rgba(0,0,0,.5)',false)

        if(dir[0]){
            //left
            if(this.weapon[0] && !this.defend && !this.attack){
                this.drawPlayer('sprite',0,0,600,600,this.posX-100,this.posY-150,200,200);
            }
            //leftDefend
            if(this.weapon[0] && this.defend){this.drawPlayer('sprite',0,1200,600,600,this.posX-100,this.posY-150,200,200)}
            //leftBow
            if(this.weapon[1]){this.drawPlayer('sprite',0,600,600,600,this.posX-100,this.posY-150,200,200)}
            //aim dots
            this.drawCircle(this.posX - 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 60,this.posY,2,2,0,0,360,'red')

            // if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',0,0,600,600,this.posX-80,this.posY-80,200,200)}
            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',0,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[2]){
            //up
            if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',600,0,600,600,this.posX-100,this.posY-150,200,200)}
            //upDefend
            if(this.weapon[0] && this.defend){this.drawPlayer('sprite',600,1200,600,600,this.posX-100,this.posY-150,200,200)}
            //upBow
            if(this.weapon[1]){this.drawPlayer('sprite',600,600,600,600,this.posX-100,this.posY-150,200,200)}
            //aim dots
            this.drawCircle(this.posX,this.posY - 30,2,2,0,0,360,'red')
            this.drawCircle(this.posX,this.posY - 60,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',600,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[4]){
            //right
            if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',1200,0,600,600,this.posX-100,this.posY-150,200,200)}
            //rightDefend
            if(this.weapon[0] && this.defend){this.drawPlayer('sprite',1200,1200,600,600,this.posX-100,this.posY-150,200,200)}
            //rightBow
            if(this.weapon[1]){this.drawPlayer('sprite',1200,600,600,600,this.posX-100,this.posY-150,200,200)}
            //aim dots
            if(this.weapon[0] && !this.defend){this.drawPlayer('right',-24,-80,-8,0)}
            if(this.weapon[0] && this.defend){this.drawPlayer('rightDefend',-28,-80,-8,0)}
            if(this.weapon[1]){this.drawPlayer('rightBow',-20,-75,-10,-15)}
            this.drawCircle(this.posX + 30,this.posY,2,2,0,0,360,'red')
            this.drawCircle(this.posX + 60,this.posY,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',1200,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[6]){
            //down
            if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',1800,0,600,600,this.posX-100,this.posY-150,200,200)}
            //downDefend
            if(this.weapon[0] && this.defend){this.drawPlayer('sprite',1800,1200,600,600,this.posX-100,this.posY-150,200,200)}
            //downBow
            if(this.weapon[1]){this.drawPlayer('sprite',1800,600,600,600,this.posX-100,this.posY-150,200,200)}
            //aim dots
            this.drawCircle(this.posX,this.posY+30,2,2,0,0,360,'red')
            this.drawCircle(this.posX,this.posY+60,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',1800,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[1]){
           //leftUp
           if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',2400,0,600,600,this.posX-97,this.posY-150,200,200)}
           //leftUpDefend
           if(this.weapon[0] && this.defend){this.drawPlayer('sprite',2400,1200,600,600,this.posX-100,this.posY-150,200,200)}
           //leftUpBow
           if(this.weapon[1]){this.drawPlayer('sprite',2400,600,600,600,this.posX-100,this.posY-150,200,200)}
           //aim dots
            this.drawCircle(this.posX - 20,this.posY-20,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 40,this.posY-40,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',0,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[3]){
            //rightUp
           if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',3000,0,600,600,this.posX-100,this.posY-150,200,200)}
           //rightUpDefend
           if(this.weapon[0] && this.defend){this.drawPlayer('sprite',3000,1200,600,600,this.posX-100,this.posY-150,200,200)}
           //rightUpBow
           if(this.weapon[1]){this.drawPlayer('sprite',3000,600,600,600,this.posX-100,this.posY-150,200,200)}
           //aim dots
            this.drawPlayer('right')
            this.drawCircle(this.posX + 20,this.posY - 20,2,2,0,0,360,'red')
            this.drawCircle(this.posX + 40,this.posY - 40,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',1200,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[5]){
            //rightDown
            if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',3600,0,600,600,this.posX-100,this.posY-150,200,200)}
            //rightDownDefend
            if(this.weapon[0] && this.defend){this.drawPlayer('sprite',3600,1200,600,600,this.posX-100,this.posY-150,200,200)}
            //rightDownBow
            if(this.weapon[1]){this.drawPlayer('sprite',3600,600,600,600,this.posX-100,this.posY-150,200,200)}
            //aim dots
            this.drawPlayer('right')
            this.drawCircle(this.posX + 20,this.posY + 20,2,2,0,0,360,'red')
            this.drawCircle(this.posX + 40,this.posY + 40,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',1200,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        if(dir[7]){
            //leftDown
            if(this.weapon[0] && !this.defend && !this.attack){this.drawPlayer('sprite',4200,0,600,600,this.posX-100,this.posY-150,200,200)}
           //leftDownDefend
           if(this.weapon[0] && this.defend){this.drawPlayer('sprite',4200,1200,600,600,this.posX-100,this.posY-150,200,200)}
           //leftDownBow
           if(this.weapon[1]){this.drawPlayer('sprite',4200,600,600,600,this.posX-100,this.posY-150,200,200)}
           //aim dots
            this.drawCircle(this.posX - 20,this.posY + 20,2,2,0,0,360,'red')
            this.drawCircle(this.posX - 40,this.posY + 40,2,2,0,0,360,'red')

            if(this.weapon[0] && this.attack){this.drawPlayer('attackSprite',0,600,600,600,this.posX-80,this.posY-80,200,200)}
        }
        
        if(!this.face[0] && !this.face[1] && !this.face[2] && !this.face[3]){this.dirOverride = false}else{this.dirOverride = true}
    }
}

export {player, playerBody}


