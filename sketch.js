var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var player;
var coin;
var enemies;
var GRAVITY = 1;
var JUMP = 15;
var button;

function preload() {
  scene = loadImage("Art/Background/sky.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = WAITING;

  button = createButton('START');
  button.position(width/2, height/2);
  button.mousePressed(startGame);

}

function draw() {
  image(scene, 0, 0, windowWidth, windowHeight);
  
  if(gameState == WAITING) {
   /* button = createButton('START');
    button.position(width/2, height/2);
    button.mousePressed(startGame);*/
  }
  
  else if(gameState == PLAYING_GAME) {
    button.remove();
    
    image(scene, 0, 0, windowWidth, windowHeight);
    
    player.velocity.y += GRAVITY;
    
    if(keyIsDown(UP_ARROW)) {
      //JUMP
      //player.setSpeed(3, 270);
      player.velocity.y = -JUMP;
      
    }
    if (keyIsDown(LEFT_ARROW)) {
      //MOVE LEFT
      player.setSpeed(5, 180);

    }
    if (keyIsDown(RIGHT_ARROW)) {
      //MOVE RIGHT
      player.setSpeed(5, 0);
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
    
  }
  else if (gameState == GAME_OVER) {
    
  }
}

function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    //CREATE THE PLAYER
    player = createSprite(width/2, height/2, 100, 100);
    player.addAnimation("running", "Art/Player/run_0.png", "Art/Player/run_1.png", "Art/Player/run_2.png", "Art/Player/run_3.png", "Art/Player/run_4.png", "Art/Player/run_5.png");
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
      var newEnemy = createSprite(random(width), random(height), 20, 20);
      enemies.add(newEnemy);
    }
    //CREATE THE COIN
    coin = createSprite(random(width), random(height), 10, 10);
}
 