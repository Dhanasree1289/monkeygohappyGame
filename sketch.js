

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup;
var obstacleGroup
var score;
var survivalTime;
var gameState=PLAY;
var PLAY=1;
var END=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
    
    obstacleGroup = new Group();
    FoodGroup = new Group();
  
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
score=0;
  

  
}


function draw() {
  background(255);
  
   stroke("pink");
  textSize(20);
  fill("pink");
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+ survivalTime,50,50);
  
  text("banana collected:"+ score,230,50);

  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
      }

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y >=200){
     monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  
  
  spawnObstacles();
  bananaGroup();
    
  
   if(obstacleGroup.isTouching(monkey)){ 
  gameState=END
      monkey.VelocityY=0 
  obstacleGroup.setVelocityXEach(0)
  FoodGroup.setVelocityXEach(0) 
  FoodGroup.setLifetimeEach(-1)
  obstacleGroup.setLifetimeEach(-1)
  ground.VelocityX=0 
   } 
  
  
  drawSprites();
  
}

function bananaGroup(){
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    }
  
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -6
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;

  obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth
  monkey.depth = monkey.depth + 1
 }

}

