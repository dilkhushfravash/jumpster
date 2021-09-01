
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,200);
  jungle.addImage(jungleImage);
  jungle.scale=0.3
 // jungle.x = width /2;

  kangaroo = createSprite(150,280);
  kangaroo.addAnimation("running",kangaroo_running);
//  kangaroo.addAnimation("collide",kangaroo_collided);
  kangaroo.scale = 0.2;
kangaroo.setCollider("circle",0,0,300);
kangaroo.debug = true
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage('gameOver.png');
  
  restart = createSprite(300,140);
  restart.addImage('restart.png');
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(400,380,400,10);
  invisibleGround.visible = false;
  

 // obstaclesGroup = new Group();

  score = 0;

}

function draw() {
  background(255);
kangaroo.x=camera.position.x-270;  
text("Score:  "+ score,500,50);

if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
    jungle.velocityX = -(6 + 3*score/100);
    kangaroo.changeAnimation("running", kangaroo_running);
    if(keyDown("space") && kangaroo.y >= 159) {
      kangaroo.velocityY = -12;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
  
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
    kangaroo.collide(invisibleGround);
    //spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(kangaroo)){
        gameState = END;
    }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;

  jungle.velocityX = 0;
  kangaroo.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  
  kangaroo.changeAnimation("collided",kangaroo_collided);

  obstaclesGroup.setLifetimeEach(-1);
  //cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
}

  drawSprites();

}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 // cloudsGroup.destroyEach();
  score = 0;
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage('stone.png');
              break;
      case 2: obstacle.addImage('stone.png');
              break;
      case 3: obstacle.addImage('stone.png');
              break;
      case 4: obstacle.addImage('stone.png');
              break;
      case 5: obstacle.addImage('stone.png');
              break;
      case 6: obstacle.addImage('stone.png');
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}