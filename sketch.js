
var monkey , monkey_running,ground, groundI;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, GameOver, GameOverI;
var score;
var END = 0;
var PLAY = 1;
var GameState = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  GameOverI = loadImage("SeekPng.com_game-over-png_2391119.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundI = loadImage("Ground.png");
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(100,320,20,60);
  ground = createSprite(300,490,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -4; 

  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  ground.addImage("Ground_move",groundI);
  ground.scale = 1.2;
    GameOver = createSprite(300,300,30,30);
  GameOver.addImage(GameOverI);
  GameOver.scale = 1.2;
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  monkey.debug = true;

  score = 0;
  
}


function draw() {
  background(220);
  text("Time: "+ score, 500,50);

  monkey.collide(ground);
 if(GameState === 1){
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -15;
        //jumpSound.play();
    }
    score = score + Math.round(getFrameRate()/60);
    textSize(20);
    textFont("Gilroy");
    GameOver.visible = false;

   
  if(obstaclesGroup.isTouching(monkey)){
    
    GameState = 0;
  }
   
   
   
 }
  
  if(GameState === 0){
    

    GameOver.visible = true;

   ground.velocityX = 0;
   monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 

    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    
    monkey.destroy();
   }
    
    

  
  

  
    //add gravity
  monkey.velocityY = monkey.velocityY + 0.5;
  spawnObstacles();
  spawnFood();
  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,360,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.2
   obstacle.velocityX = -6;
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);

 }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,140));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);

     
    
    //add each cloud to the group
  
  }
}



