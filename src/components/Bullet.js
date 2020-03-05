class Bullet {
    constructor(props){
        this.dir = props.dir;
        this.posX = props.posX;
        this.posY = props.posY;
        this.ctx = props.ctx;
        this.canvasWidth = props.canvasWidth;
        this.canvasHeight = props.canvasHeight;
        // this.shoot = this.shoot.bind(this);
        this.private = [...props.dir];
        this.bulletSpeed = 5;
        this.bulletRadius = 5;
        this.id = props.id;
    }
    drawBullet(posX,posY){
        const {ctx} = this;
        ctx.beginPath();
        ctx.fillStyle = 'rgb(120,30,30)';
        ctx.arc(posX,posY,this.bulletRadius,0,2 * Math.PI);
        ctx.fill()
    }
    drawArrow(sx,sy,sw,sh,dx,dy,dw,dh){
        const {ctx} = this,
         img = new Image();
        img.src = './player/arrowSprite.png'
        ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
    }

    shoot(){
        //create The bullet by Direction
        //left 
        if(this.private[0]){this.drawArrow(0,0,300,300,this.posX-75,this.posY-55,100,100)}
        //up 
        if(this.private[2]){this.drawArrow(300,0,300,300,this.posX-30,this.posY-85,100,100)}
        //right 
        if(this.private[4]){this.drawArrow(600,0,300,300,this.posX+15,this.posY-55,100,100)}
        //down
        if(this.private[6]){this.drawArrow(900,0,300,300,this.posX-25,this.posY,100,100)}
        //leftUp
        if(this.private[1]){this.drawArrow(0,300,300,300,this.posX-55,this.posY-70,100,100)}
        //rightUp
        if(this.private[3]){this.drawArrow(300,300,300,300,this.posX+10,this.posY-80,100,100)}
        //rightDown
        if(this.private[5]){this.drawArrow(600,300,300,300,this.posX+10,this.posY-20,100,100)}
        //leftDown
        if(this.private[7]){this.drawArrow(900,300,300,300,this.posX-60,this.posY-20,100,100)}
        
        //Move the bullet in the right Direction
        //left
        if(this.private[0]){this.posX -= this.bulletSpeed};
        //leftUp
        if(this.private[1]){this.posX -= this.bulletSpeed*(2/3); this.posY -= this.bulletSpeed*(2/3)};
        //up
        if(this.private[2]){this.posY -= this.bulletSpeed};
        //rightUp
        if(this.private[3]){this.posX += this.bulletSpeed*(2/3); this.posY -= this.bulletSpeed*(2/3)};
        //right
        if(this.private[4]){this.posX += this.bulletSpeed}
        //rightDown
        if(this.private[5]){this.posX += this.bulletSpeed*(2/3);this.posY += this.bulletSpeed*(2/3)};
        ///down
        if(this.private[6]){this.posY += this.bulletSpeed};
        //leftDown
        if(this.private[7]){this.posX -= this.bulletSpeed*(2/3); this.posY += this.bulletSpeed*(2/3)}
    }
}
export default Bullet;