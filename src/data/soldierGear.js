import objects from '../components/Objects';
const {drawShapeRotate,drawShapeStroke,customShape,drawShape, drawCircle} = objects;

export const soldierGear = {
    arrow: {
        left: function (x,y){
          const {ctx} = this;
          //arrowhead
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(270*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        leftUp: function(x,y){
          const {ctx} = this;
          // x += 20;
          // y -= 25;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(-45*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        up: function (x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(0*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        rightUp: function(x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(45*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        right: function(x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(90*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        rightDown: function(x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(135*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
        down: function (x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(180*Math.PI/180);
          drawArrow(-4/2,-65/2);
          ctx.restore();
        },
        leftDown: function(x,y){
          const {ctx} = this;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x+4/2,y);
          ctx.rotate(225*Math.PI/180);
          drawArrow(4/2,-65/2);
          ctx.restore();
        },
    },
    quiver: {
        left: function(x,y){
          //arrows
          drawShapeRotate(x+3,y-5,2,20,20,'black')
          drawShapeRotate(x+7,y-7,2,20,20,'black')
          drawShapeRotate(x+9,y-5,2,20,20,'black')
          //fletching
          drawShapeRotate(x+6,y-8,2,3,20,'white')
          drawShapeRotate(x+8,y-9,2,3,20,'white')
          drawShapeRotate(x+10,y-7,2,3,20,'white')
          drawShapeRotate(x+13,y-7,2,3,20,'white')
          //quiver
          drawShapeRotate(x,y,8,25,20,'white')
        },
        right: function(x,y){
          //arrows
          drawShapeRotate(x-3,y-5,2,20,-20,'black')
          drawShapeRotate(x,y-7,2,20,-20,'black')
          drawShapeRotate(x+3,y-5,2,20,-20,'black')
          //fletching
          drawShapeRotate(x-8,y-7,2,3,-20,'white')
          drawShapeRotate(x-5,y-7,2,3,-20,'white')
          drawShapeRotate(x-2,y-9,2,3,-20,'white')
          drawShapeRotate(x,y-9,2,3,-20,'white')
          //quiver
          drawShapeRotate(x,y,8,25,-20,'white')
        }
    },
    bow: {
    left: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,25,0,95 * Math.PI/180,265 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    leftUp: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,28,0,110 * Math.PI/180,250 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    up: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,5,28,0,110 * Math.PI/180,250 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    rightUp: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,28,0,-70 * Math.PI/180,70 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    right: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,25,0,-85 * Math.PI/180,85 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    rightDown: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,28,0,-70 * Math.PI/180,70 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    down: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,5,28,0,-70 * Math.PI/180,70 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    leftDown: function(x,y){
      const {ctx} = this;
        ctx.beginPath();
        ctx.ellipse(x,y,15,28,0,110 * Math.PI/180,250 * Math.PI/180);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
    },
    },
    helmet: {
        left: function (x,y){
          const {ctx} = this;
          //side
          drawShapeStroke(x-8,y+2,5,10,'white');
          //face
          customShape(x-1.5,y,6,10,0,90,180,
                      x-1.5,y,9,10,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.lineWidth = 1;
          //line
          ctx.beginPath();
          ctx.ellipse(x,y+2,4,25,0,180*Math.PI/180,270*Math.PI/180);
          ctx.lineWidth = 1;
          ctx.stroke();
          //side
          drawShapeStroke(x+4,y+3,5,10,'white');
        },
        //=============================
        //=============================
        leftUp: function (x,y){
          const {ctx} = this;
          //side
          drawShapeStroke(x-5,y+2,5,10,'white');
          //face
          customShape(x-1.5,y,6,10,0,90,180,
                      x-1.5,y,9,10,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.lineWidth = 1;
          //line
          // ctx.beginPath();
          // ctx.ellipse(x,y+2,4,25,0,180*Math.PI/180,270*Math.PI/180);
          // ctx.lineWidth = 1;
          // ctx.stroke();
          //side
          drawShapeStroke(x,y+3,8,12,'white');
        },
        //=============================
        //=============================
        up: function (x,y){
          const {ctx} = this;
          //face
          customShape(x+.5,y,7,8,0,90,180,
                      x+.5,y,7,8,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          //side
          drawShapeStroke(x+4,y+2,4,10,'white');
          //side
          drawShapeStroke(x-8,y+2,4,10,'white');
        },
        //=============================
        //=============================
        rightUp: function (x,y){
          const {ctx} = this;
          //side
          drawShapeStroke(x,y+2,5,10,'white');
          //face
          customShape(x-1.5,y,6,10,0,90,180,
                      x-1.5,y,9,10,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.lineWidth = 1;
          //line
          // ctx.beginPath();
          // ctx.ellipse(x,y+2,4,25,0,180*Math.PI/180,270*Math.PI/180);
          // ctx.lineWidth = 1;
          // ctx.stroke();
          //side
          drawShapeStroke(x-8,y+3,8,12,'white');
        },
        //=============================
        //=============================
        right: function (x,y){
          const {ctx} = this;
          //side
          drawShapeStroke(x+3,y+2,5,10,'white');
      
          //face
          customShape(x+2,y,9,10,0,90,180,
                      x+2,y,6,10,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.lineWidth = 1;
          //line
          ctx.beginPath();
          ctx.ellipse(x,y+2,4,25,0,270*Math.PI/180,360*Math.PI/180);
          ctx.lineWidth = 1;
          ctx.stroke();
          //side
          drawShapeStroke(x-9,y+2,5,10,'white');
        },
        //==============================
        //==============================
        down: function (x,y){
          const {ctx} = this;
          //side
          drawShapeStroke(x+5.5,y+2,3,10,'white');
          //side
          drawShapeStroke(x-9,y+2,3,10,'white');
          //face
          customShape(x,y,7,10,0,90,180,
                      x,y,7,10,0,0,90,'rgb(200,200,200)');
      
          ctx.beginPath();
          ctx.ellipse(x+4,y,12,25,0,180 * Math.PI/180,250 * Math.PI/180,0);
          ctx.ellipse(x-4,y,12,25,0,290 * Math.PI/180,360 * Math.PI/180,0);
          ctx.ellipse(x,y,8,2,0,0 * Math.PI/180,180 * Math.PI/180,0 * Math.PI/180);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
          // //line
          ctx.beginPath();
          ctx.fillStyle = 'black';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.ellipse(x,y+2,0,25,0,180*Math.PI/180,270*Math.PI/180);
          ctx.stroke();
          ctx.fill();
        }
    }
}

  

  
  
  
  export const SoldierTorso = function(color,crossColor){
    this.thin = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,color);
      ctx.ellipse(x,y,8,8,0,0,360 * Math.PI/180);
      ctx.fillStyle=color;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
    }
  
    this.left = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,color);
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle=color;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
  
      //cross
      drawShape(x -4,y,2,6,crossColor);
      drawShape(x -6,y+2,6,2,crossColor);
    }
  
    this.leftUp = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'black');
      ctx.ellipse(x,y,8,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
      //cross
      drawShape(x-7,y,2,6,'white');
      drawShape(x-7,y+2,4,2,'white');
    }
  
    this.up = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'red');
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
    }
  
    this.rightUp = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'black');
      ctx.ellipse(x,y,8,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
      //cross
      drawShape(x+5,y,2,6,'white');
      drawShape(x+3,y+2,4,2,'white');
    }
  
    this.right = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'red');
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
  
      //cross
      drawShape(x+2,y,2,6,'white');
      drawShape(x,y+2,6,2,'white');
    }
  
    this.rightDown = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'red');
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
  
      //cross
      drawShape(x+1,y,2,6,'white');
      drawShape(x-1,y+2,6,2,'white');
    }
    this.down = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'red');
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
  
      //cross
      drawShape(x-1,y,2,6,'white');
      drawShape(x-3,y+2,6,2,'white');
    }
    this.leftDown = function(x,y){
      const {ctx} = this;
      ctx.beginPath();
      drawShape(x-7,y,15,15,'red');
      ctx.ellipse(x,y,12,8,0,0,360 * Math.PI/180);
      ctx.fillStyle='black';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x,y+15,7,3,0,Math.PI/180,180 * Math.PI/180);
      ctx.fill();
  
      //cross
      drawShape(x-3,y,2,6,'white');
      drawShape(x-5,y+2,6,2,'white');
    }
  }
  
  var soldierTorsoBlue = new SoldierTorso('white','black')
  var soldierTorso = new SoldierTorso('black','white')
  
  export const shield = {
    right: function (x,y){
      drawCircle(x,y,14,14,0,0,360,'rgb(100,100,100)');
    },
    leftThin: function (x,y){
      drawCircle(x,y,13,16,0,0,360,'white')
    },
    left: function (x,y){
      drawCircle(x,y,16,16,0,0,360,'white')
    }
  }
  
  function drawSword(x,y,w,h){
    const {ctx} = this;
    //point
    ctx.beginPath();
    ctx.ellipse(x+2.5,y,2.5,10,0,180 * Math.PI/180, 270*Math.PI/180);
    ctx.ellipse(x+2.5,y,2.5,10,0,270 * Math.PI/180, 360*Math.PI/180);
    ctx.fillStyle = 'white';
    ctx.fill();
    //blade
    drawShape(x,y,5,40,'white')
    //guard
    drawShape(x-3,y+40,11,3,'black')
    //handle
    drawShape(x+1,y+43,3,8,'black')
    //pommel
    ctx.beginPath();
    ctx.ellipse(x+2.5,y+51,2.5,2.5,0,0,360*Math.PI/180);
    ctx.fillStyle = 'black';
    ctx.fill();
    //fuller
    drawShape(x+2,y,.5,40,'rgb(100,100,100)')
  }
  
  function drawArrow(x,y){
    const {ctx} = this;
    ctx.beginPath();
    //arrowhead
    ctx.ellipse(x,y,4,15,0,180 * Math.PI/180,270 * Math.PI/180,0);
    ctx.ellipse(x-2,y,4,15,0,270 * Math.PI/180,360 * Math.PI/180,0);
    ctx.fillStyle = 'white';
    ctx.fill();
    //shaft
    drawShape(x-2,y-1,2,40,'black');
    //fleching
    drawShape(x-4,y+35,2,5,'white');
    drawShape(x,y+35,2,5,'white');
  }