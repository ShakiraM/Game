var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var player;
var coin;
var enemies;
var GRAVITY = 1;
var JUMP = 20;
var button;


function preload() {
  scene = loadImage("Art/Background/sky.jpg");
  gfloor = loadImage("Art/Platforms/tiles_Green.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = WAITING;

  button = createButton('START');
  button.position(width/2, height/2);
  button.mousePressed(startGame);

}

var plats;
var ground;

function createGround() {
  
  var xInt = 45;
  ground = new Group();
  
  while(xInt < windowWidth) {
    var newFloor = createSprite(xInt, windowHeight, 100, 100);
    newFloor.addImage(gfloor);
    newFloor.setCollider("rectangle", 0, 30, 100, 100);
    ground.add(newFloor);
     
     xInt += 80;
   }
}

function draw() {
  image(scene, 0, 0, windowWidth, windowHeight);
  
  if(gameState == WAITING) {
   
  }
  
  else if(gameState == PLAYING_GAME) {
    button.remove();
    
    image(scene, 0, 0, windowWidth, windowHeight);
    
    player.velocity.y += GRAVITY;
    if(player.collide(ground)){
      player.velocity.y = 0;
    }     
    
    if(player.collide(plats)) {
      player.velocity.y = 0;
    }
    /*for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.2, player.position.x, player.position.y);
    }*/
    player.overlap(coin, collect);
    enemies.overlap(player, dead);
    drawSprites();
    
    
  }
  else if (gameState == GAME_OVER) {
    image(scene, 0, 0, windowWidth, windowHeight);
    //text("GAME OVER", width/2, height/2);
    
    button.remove();
    button = createButton('TRY AGAIN?');
    button.position(width/2, height/2);
    button.mousePressed(startGame);
    
  }
}

function dead(collector, collected) {
  collected.remove();
  collector.remove();
  gameState = GAME_OVER;
}

function collect(collector, collected) {
    collected.remove();
    score++;
    coin = createSprite(random(width), random(height), 10, 10);

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
    player.addAnimation("idle", "Art/Player/idle_0.png", "Art/Player/idle_1.png", "Art/Player/idle_2.png", "Art/Player/idle_3.png");
    player.addAnimation("runningright", "Art/Player/run_0.png", "Art/Player/run_1.png", "Art/Player/run_2.png", "Art/Player/run_3.png", "Art/Player/run_4.png", "Art/Player/run_5.png");
    player.addAnimation("jumping", "Art/Player/jump_0.png");
    player.addAnimation("runningleft","Art/Player/run2_0.png", "Art/Player/run2_1.png", "Art/Player/run2_2.png", "Art/Player/run2_3.png", "Art/Player/run2_4.png", "Art/Player/run2_5.png");
    //Platforms
    plats = new Group();
    var plat = createSprite(player.position.x + 300, 680, 100, 100);
    plat.addImage(gfloor);
    plat.setCollider("rectangle", 70, 20, 0, 100);
    plats.add(plat);
    //CREATE SOME ENEMIES
    enemies = new Group();
    // for (var i = 0; i < 3; i++) {
    //   var newEnemy = createSprite(random(width), random(height), 20, 20);
    //   enemies.add(newEnemy);
    // }
    //CREATE THE COIN
    coin = createSprite(random(width), random(height), 10, 10);
}
 