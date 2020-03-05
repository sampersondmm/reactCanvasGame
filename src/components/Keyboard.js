const keyBoard = {
    keyBoard: function(){
        const {move,collide,face,weapon} = this;
        window.addEventListener("keydown", event => {
            const key = event.keyCode;
            if(key === 65){move[0] = true};
            if(key === 87){move[1] = true};
            if(key === 68){move[2] = true};
            if(key === 83){move[3] = true};
            if(key === 65 || key === 87 || key === 68 || key === 83){
                collide[0] = false;
                collide[1] = false;
                collide[2] = false;
                collide[3] = false;
            }
            //space bar
            if(key === 32){this.pullTrigger()}
            //one key
            if(key === 49){this.weapon = [true,false]}
            //f key
            if(key === 70){this.defend = true}
            //two key
            if(key === 50){this.weapon = [false,true]}
            if(key === 74){this.dirOverride = true;face[0] = true}
            if(key === 73){this.dirOverride = true;face[1] = true}
            if(key === 76){this.dirOverride = true;face[2] = true}
            if(key === 75){this.dirOverride = true;face[3] = true}
        })
        window.addEventListener("keyup", event => {
            const key = event.keyCode
            if(key === 65){move[0] = false};
            if(key === 87){move[1] = false};
            if(key === 68){move[2] = false};
            if(key === 83){move[3] = false};
            if(key === 74){face[0] = false}
            if(key === 73){face[1] = false}
            if(key === 76){face[2] = false}
            if(key === 75){face[3] = false}
            //f key
            if(key === 70){this.defend = false}
            if(key !== 74 && key !== 73 && key !== 76 && key !== 75){
                this.dirOverride = false;
            }
        });
    }
}

export default keyBoard;