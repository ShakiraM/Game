var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var player;
var enemies;
var GRAVITY = 1;
var JUMP = 20;
var button;
var plats;
var ground;
var chest;
var chestImage;
var startButton;


function preload() {
  scene = loadImage("Art/Background/sky.jpg");
  gfloor = loadImage("Art/Platforms/tiles_Green.png");
  chestImage = loadImage("Art/Chest/box_open.png");
  starto = loadImage("Art/Start/start.png");
  mySound = loadSound('Art/music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = WAITING;
  mySound.setVolume(0.3);
	mySound.play();
}

function mousePressed() {  
  //button = createButton('START');
  startGame();
}

// function drawPlatform(xCoord) {
  
//   var newPlat = createSprite(xCoord, height - 100, 100, 100);
  
//   newPlat.addImage(gfloor);
//   newPlat.setCollider("rectangle", 0, 35, 100, 80);
  
//   plats.add(newPlat);
// }

function createGround() {
  
  ground = new Group();
  plats = new Group();
  
  for (var x = -width/2; x < width; x+= 80) {
    var newFloor = createSprite(x, height, 100, 100);
    newFloor.addImage(gfloor);
    newFloor.setCollider("rectangle", 0, 35, 100, 80);
    ground.add(newFloor);
    
   }
}

function draw() {
  
 image(scene, camera.position.x - width/2, camera.position.y - height/2, windowWidth, windowHeight);
  
  if(gameState == WAITING) {
   startButton = image(starto, 400, 300);
  }
  
  else if(gameState == PLAYING_GAME) {
    //button.remove();
    
    if(player.position.y >= height) gameState = GAME_OVER;
    
    if(chest && player.collide(chest)) gameState = GAME_OVER;
    
    camera.position.x = player.position.x;
    
    player.velocity.y += GRAVITY;
    if(player.collide(ground)){
      player.velocity.y = 0;
    }     
    
    if(player.collide(plats)) {
      player.velocity.y = 0;
    }

    for(var i = 0; i < ground.length; i++) {
      var g = ground.get(i);
      if (g.position.x < player.position.x - width/2 - 50) {
        console.log("Off screen for position: " + i);
        g.position.x = player.position.x + width/2 + 50;
        
        if(random(30) > 20) {
          
          if(g.position.y > height/2) {
            g.position.y = g.position.y - 100;
          }
          else {
            score++;
          }
        }
        
        if(score > 5) {
          
          if(!chest) {
            chest = createSprite(g.position.x, g.position.y - 100, 125, 85);
            chest.addImage(chestImage);
            chest.setCollider("rectangle", 0, 30, 125, 60);
          }
          else if(chest.position.x < player.position.x - width/2 - 50) {
            chest.position.x = g.position.x;
            chest.position.y = g.position.y - 100;
          }
        }
      }
    }

    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.2, player.position.x, player.position.y);
    }
    enemies.overlap(player, dead);
    drawSprites();
    
    
  }
  else if (gameState == GAME_OVER) {
    startButton = image(starto, width/3 - 50, height/3);
  }
}

function dead(collector, collected) {
  gameState = GAME_OVER;
}

function keyPressed() {
  if(gameState == WAITING) {
    startGame();
  }
  else if (gameState == PLAYING_GAME) {
    if(keyCode == UP_ARROW) {
      //JUMP
      player.velocity.y = -JUMP;
      player.changeAnimation("jumping");
    }
    
    else if (keyCode == LEFT_ARROW) {
      //MOVE LEFT
      player.setSpeed(5, 180);
      player.changeAnimation("runningleft");

    }
    else if (keyCode == RIGHT_ARROW) {
      //MOVE RIGHT
      player.setSpeed(5, 0);
      player.changeAnimation("runningright");
    }
  }
  else if (gameState == GAME_OVER) {
    
  }
}

function keyReleased() {
  player.velocity.x = 0;
  player.changeAnimation("idle");
}

function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    createGround();
    //CREATE THE PLAYER
    player = createSprite(100, 100, 100, 100);
    player.setCollider("rectangle", 0, 20, 20, 100)
    player.addAnimation("idle", "Art/Player/idle_1.png");
    player.addAnimation("runningright", "Art/Player/run_0.png", "Art/Player/run_1.png", "Art/Player/run_2.png", "Art/Player/run_3.png", "Art/Player/run_4.png", "Art/Player/run_5.png");
    player.addAnimation("jumping", "Art/Player/jump_0.png");
    player.addAnimation("runningleft","Art/Player/run2_0.png", "Art/Player/run2_1.png", "Art/Player/run2_2.png", "Art/Player/run2_3.png", "Art/Player/run2_4.png", "Art/Player/run2_5.png");
    
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
    var newEnemy = createSprite(random(width), random(height), 20, 20);
    newEnemy.addAnimation("flying", "Art/Dragon/frame-1.png","Art/Dragon/frame-2.png","Art/Dragon/frame-3.png","Art/Dragon/frame-4.png");
    enemies.add(newEnemy);
    }
   
}
 