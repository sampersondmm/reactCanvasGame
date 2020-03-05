const environment = {
    createMap(){
        const wall1 = function(posX,posY){
            this.tileSet(21*32,26*32,32,32,posX,posY,32,32)
        }.bind(this);
        const wall2 = function(posX,posY){
            this.tileSet(21*32,28*32,32,32,posX,posY,32,32)
        }.bind(this);
        const topRightCorner = function(posX,posY){
            this.tileSet(22*32,26*32,32,32,posX,posY,32,32)
        }.bind(this);
        const topLeftCorner = function(posX,posY){
            this.tileSet(20*32,26*32,32,32,posX,posY,32,32)
        }.bind(this);
        const dirt1 = function(posX,posY){
            this.tileSet(20*32,5*32,32,32,posX,posY,32,32)
        }.bind(this);
        const lightDirt2 = function(posX,posY){
            this.tileSet(17*32,5*32,32,32,posX,posY,32,32)
        }.bind(this);

        const {currentLevel} = this.state,
            {tiles} = currentLevel;
        let mapCount = 0;
        for(var i = 0; i < 15; i++){
            for(var j = 0; j < 20; j++, mapCount++){
                let posX = j * 32,
                    posY = i * 32;
                if(currentLevel.map[mapCount] === 0){this.drawTile(posX, posY, tiles.zero[0], tiles.zero[1])}
                if(currentLevel.map[mapCount] === 1){this.drawTile(posX,posY,tiles.one[0],tiles.one[1])}
                if(currentLevel.map[mapCount] === 2){this.drawTile(posX,posY,tiles.two[0],tiles.two[1])}
                if(currentLevel.map[mapCount] === 4){this.drawTile(posX,posY,tiles.four[0], tiles.four[1])}  
                if(currentLevel.map[mapCount] === 5){this.drawTile(posX, posY, tiles.five[0], tiles.five[1])}
            }
        }
    },
    //changes the currentMap and enemies data to the currentLevel
    changeLevel(){
        const {canvasHeight, canvasWidth, world} = this;
        
        const {setLevel} = world;

        //move Left
        if(this.posX < 0){
            let newLevel = this.state.currentLevel.doors.left();
            this.setState(state => ({
                ...state,
                currentLevel: newLevel
            }))
            this.posX = canvasWidth;
        }
        //Move Up
        if(this.posY < 0){
            let newLevel = this.state.currentLevel.doors.up();
            this.setState(state => ({
                ...state,
                currentLevel: newLevel
            }))
            this.posY = canvasHeight;
        }
        //Move Right
        if(this.posX > canvasWidth){
            let newLevel = this.state.currentLevel.doors.right();
            this.setState(state => ({
                ...state,
                currentLevel: newLevel
            }))
            this.posX = 0;
        }
        //Move Down
        if(this.posY > canvasHeight){
            let newLevel = this.state.currentLevel.doors.down();
            this.setState(state => ({
                ...state,
                currentLevel: newLevel
            }))
            this.posY = 0;
        }
    }
}

export default environment;