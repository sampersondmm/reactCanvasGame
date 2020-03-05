import Bullet from './Bullet';

const attack = {
    swordCount: 20,
    //Creates bullet and loads into correct chamber
    pullTrigger: function(){
        const {dir,posX,posY,ctx,canvasWidth,canvasHeight,bulletCount,weapon} = this;
        const defaultProps = {
            ctx,
            canvasWidth,
            canvasHeight,
            dir,
            posX,
            posY,
            id: bulletCount
        };
        //create bullet
        const bullet = new Bullet({...defaultProps})
        this.bulletCount++;
        //push bullet into chamber
        if(!this.reload && weapon[1]){
            //left
            if(this.dir[0]){
                this.bullets = {
                    ...this.bullets,
                    left: [...this.bullets.left, bullet]
                }
            }
            //up
            if(this.dir[2]){
                this.bullets = {
                    ...this.bullets,
                    up: [...this.bullets.up, bullet]
                }
            }
            //right
            if(this.dir[4]){
                this.bullets = {
                    ...this.bullets,
                    right: [...this.bullets.right, bullet]
                }
            }
            //down
            if(this.dir[6]){
                this.bullets = {
                    ...this.bullets,
                    down: [...this.bullets.down, bullet]
                }
            }
            //leftUp
            if(this.dir[1]){
                this.bullets = {
                    ...this.bullets,
                    leftUp: [...this.bullets.leftUp, bullet]
                }
            }
            //rightUp
            if(this.dir[3]){
                this.bullets = {
                    ...this.bullets,
                    rightUp: [...this.bullets.rightUp, bullet]
                }
            }
            //rightDown
            if(this.dir[5]){
                this.bullets = {
                    ...this.bullets,
                    rightDown: [...this.bullets.rightDown, bullet]
                }
            }
            //leftDown
            if(this.dir[7]){
                this.bullets = {
                    ...this.bullets,
                    leftDown: [...this.bullets.leftDown, bullet]
                }
            }
        }
        if(!this.reload && weapon[0]){
            this.attack = true;
        }
        this.reload = true;
    },
     //Control the movement of the bullut
    shoot: function(){
        const {canvasWidth,canvasHeight} = this;
        const shootInDirection = (bulletDir) => {
            if(bulletDir.length){
                for(let i = 0; i < bulletDir.length; i++){
                    bulletDir[i].shoot();
                    //If bullet goes off screen remove bullet
                    if(bulletDir === this.bullets.left && bulletDir[i].posX < 0){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.left = newBullets;
                    }
                    if(bulletDir === this.bullets.up && bulletDir[i].posY < 0){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.up = newBullets;
                    }
                    if(bulletDir === this.bullets.right && bulletDir[i].posX > canvasWidth){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.right = newBullets;
                    }
                    if(bulletDir === this.bullets.down && bulletDir[i].posY > canvasHeight){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.down = newBullets;
                    }
                    //diagonal
                    if(bulletDir === this.bullets.leftUp && (bulletDir[i].posX < 0 || bulletDir[i].posY < 0)){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.leftUp = newBullets;
                    }
                    if(bulletDir === this.bullets.rightUp && (bulletDir[i].posX > canvasWidth || bulletDir[i].posY < 0)){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.rightUp = newBullets;
                    }
                    if(bulletDir === this.bullets.rightDown && (bulletDir[i].posX > canvasWidth || bulletDir[i].posY > canvasHeight)){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.rightDown = newBullets;
                    }
                    if(bulletDir === this.bullets.leftDown && (bulletDir[i].posX < 0 || bulletDir[i].posY > canvasHeight)){
                        let newBullets = [...bulletDir];
                        newBullets.shift()
                        this.bullets.leftDown = newBullets;
                    }
                }
            }
        }
        //Standard
        //left
        shootInDirection(this.bullets.left);
        //remove up
        shootInDirection(this.bullets.up);
        //remove right 
        shootInDirection(this.bullets.right);
        //remove down 
        shootInDirection(this.bullets.down);

        //Diagonal
        //remove leftUp
        shootInDirection(this.bullets.leftUp);
        //remove rightUp
        shootInDirection(this.bullets.rightUp);
        //remove rightDown
        shootInDirection(this.bullets.rightDown);
        //remove leftDown
        shootInDirection(this.bullets.leftDown);

        //Reload
        if(this.reload){
            this.reloadDelay--;
            if(this.reloadDelay <= 0){
                this.reload = false; 
                this.reloadDelay = 10;             
            }
        }
    },
    //swing the sword
    swordAttack: function(){
        if(this.attack){
            attack.swordCount--;
            if(attack.swordCount < 0){
                this.attack = false;
                attack.swordCount = 20;
            }
        }
    },
    mainAttack(){
        if(this.weapon[1]){this.pullTrigger()}
        if(this.weapon[0]){this.swordAttack()}
    }
}

export default attack;