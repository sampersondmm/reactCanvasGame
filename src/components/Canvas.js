// Where the game loop lives. This is where all the other parts of the game are pulled together and put into the animation loop.

import React, {Component} from 'react';
import Enemy from './Enemy';
// import Environment from './Environment';
import {connect} from 'react-redux';
import actionTypes from '../actions/actionTypes';
import Keyboard from './Keyboard';
import objects from './Objects';
import environment from './Environment';
import keyBoard from './Keyboard';
import {BigEnemy} from './Enemy';
import attack from './Attack';
import enemy from './Enemy';
import {world} from '../data/maps';
import {player,playerBody} from './Player';

class Canvas extends Component {
    constructor(props){
        super(props);
        this.canvasWidth = 640;
        this.canvasHeight = 480;
        this.posX = 102;
        this.posY = 352;
        this.speed = 2;
        this.weapon = [true,false];
        this.move = [false,false,false,false];
        this.collide = [false,false,false,false];
        this.collideEnemy = [false,false,false,false];
        this.bullets = {id: 0,left: [],leftUp: [],up: [],rightUp: [],right: [],rightDown: [],down: [],leftDown: []};
        this.reload = false;
        this.reloadDelay = 10;
        this.bulletCount = 0;
        this.face = [false,false,false,false];
        this.dir = [true,false,false,false,false,false,false,false];
        this.world = world;
        this.defend = false;
        this.attack = false;
        this.newEnemies = [];
        this.bigEnemyHealth = 100;
        this.deadEnemies = [];
        this.state = {
            player: null,
            currentLevel: world.level1,
            currentEnemies: [],
            levelMod: []
        }
    }

    componentDidMount(){
        this.createCanvas();
        this.gameLoop();

        //Initilize methods to context
        this.drawTile = objects.drawTile;
        this.tileSet = objects.tileSet;
        this.drawTexture = objects.drawTexture;
        this.drawShapeRotate = objects.drawShapeRotate;
        this.drawShape = objects.drawShape
        this.drawCircle = objects.drawCircle;
        this.createMap = environment.createMap;
        this.changeLevel = environment.changeLevel;
        this.createPlayer = player.createPlayer;
        this.drawPlayer = objects.drawPlayer;
        this.drawPlayerBow = objects.drawPlayerBow;
        this.keyBoard = keyBoard.keyBoard;
        this.handleMovement = player.handleMovement;
        this.handleDirection = player.handleDirection;
        this.pullTrigger = attack.pullTrigger;
        this.shoot = attack.shoot;
        this.swordAttack = attack.swordAttack;

        //Intitialize level state
        this.setUpEnemies(this.state)
    }


    setUpEnemies(newState){
        const newLevel = newState.currentLevel,
            {currentEnemies, currentLevel, levelMod} = this.state;

        let newEnemies = [],
            alteredEnemies = [];

        //Check if currentLevel was modified
        //For each current enemy
        for(let enemy of currentEnemies){
            alteredEnemies.push(enemy);
        }

        // replace currentLevelData with modified data
        if(alteredEnemies.length && currentEnemies.length){
            this.setState(state => ({
                ...state,
                levelMod: [...state.levelMod, {title: currentLevel.title, enemies: [...alteredEnemies]}]
            }));
        }

        //If all currentEnemies are dead, return empty enemy data to levelMod
        if(!currentEnemies.length && !alteredEnemies.length){
            this.setState(state => ({
                ...state,
                levelMod: [...state.levelMod, {title: currentLevel.title, enemies: []}]
            }));
        }

        //Does the new level contain enemy data
        if(newLevel.enemies){
            //Is there levelMod data
            if(levelMod && levelMod.length){
                //Loop through levelMod and find one that matches the newLevel title
                for(let level of levelMod){
                    //If the titles match
                    if(level.title === newLevel.title){
                        newEnemies = [...level.enemies]
                    }
                }      
            }
        }

        //If there are no replacement enemies
        if(newLevel.enemies){
            //Loop through map data and consruct fresh enemies
            for(let i = 0; i < newLevel.enemies.length;i++){
                //create array of enemies
                newEnemies.push(
                    new BigEnemy({
                        ctx: this.ctx,
                        drawPlayer: this.drawPlayer,
                        drawCircle: this.drawCircle,
                        posX: newLevel.enemies[i][0],
                        posY: newLevel.enemies[i][1],
                        id: i
                    })
                )
            }
        }

        //return new enemies to current state
        this.setState(state => ({
            ...state,
            currentEnemies: newEnemies
        }))

    
    }


    createEnemies(){
        if(this.state.currentEnemies.length){
            for(let enemy of this.state.currentEnemies){
                enemy.create(this.bullets, [this.posX,this.posY], this.deadEnemies);
            }
        }
    }
    removeEnemies(){
        //If there are dead enemies
        if(this.deadEnemies.length){
            //Create a copy of the current enemies whithout the current one
            let newEnemies = [...this.state.currentEnemies].filter(el => {
                return el.id !== this.deadEnemies[0].id;
            })
            this.setState(state => ({
                ...state,
                currentEnemies: newEnemies
            }))
            this.deadEnemies.shift();
        }
    }

    componentWillUpdate(nextProps, nextState){
        if(nextState.currentLevel !== this.state.currentLevel){
            this.setUpEnemies(nextState)
            this.bullets = {id: 0,left: [],leftUp: [],up: [],rightUp: [],right: [],rightDown: [],down: [],leftDown: []};
        }
    }

    //Main Loop
    gameLoop(){
        setInterval(() => {
            this.keyBoard();
            this.createMap();
            this.changeLevel();
            this.createPlayer();
            this.handleDirection();
            this.handleMovement();

            this.shoot(); 
            this.swordAttack();
            // this.removeEnemies();
            // this.createEnemies();
        },25)
    }
    //Create the canvas context
    createCanvas(){
        this.ctx = this.refs.canvas.getContext('2d')
    }
    //Return canvas to DOM
    render(){
        const style = {
            background: {
                backgroundColor: 'rgb(50,50,50)'
            },
            canvas: {
                border: '1px solid black',
                margin: '5px'
            }
        }
        return (
            <div style={style.background}>
                <canvas height={this.canvasHeight} width={this.canvasWidth} ref='canvas' style={style.canvas}/>
            </div>
        )
    }
}



export default Canvas;