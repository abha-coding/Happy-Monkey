var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver;
var score=0;

function preload()
{
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  gameOverImg = loadImage("gameOver.png");
}

function setup()
{
  createCanvas(600,200);
  backgr = createSprite();
  backgr.addImage("moving",backImage);
  backgr.velocityX=-5;
  
  ground = createSprite(0,190,600,7);
  ground.velocityX=-4;
  ground.visible=false;
  
  player = createSprite(40,150,20,10);
  player.addAnimation("jumping",player_running);
  player.scale=0.15;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  gameOver=createSprite(300,100,20,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
}

function draw() 
{
  background("white");
  
  if(gameState===PLAY)
    {
       if(backgr.x<100)
        {  
          backgr.x=backgr.width/2;
        }
      
      if(ground.x<300)
        {  
          ground.x=ground.width/2;
        }
  
      if(keyDown("space")&&player.y>=138)
        {
          player.velocityY=-12;
        }
      player.velocityY=player.velocityY + 0.6;
      
      food();
      stone();
      
      if(player.isTouching(FoodGroup))
        {
          score=score+1;
        }
      
      if(obstaclesGroup.collide(player))
        {
          player.scale=player.scale-0.05;
        }
      
      if(player.scale<=0.04)
        {
          gameState=END;
        }
    }
  
  if(gameState===END)
    {
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      ground.velocityX=0;
      player.velocityY=0;
      backgr.velocityX=0;
      
      gameOver.visible=true;
      
      FoodGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
    }
  
  if(mousePressedOver(gameOver))
    {
      reset();
    }
  
  player.collide(ground);
  
  drawSprites();
  
  textSize(20);
  fill("red");
  text("Score:" + score,500,30);
}

function food()
{
  if(World.frameCount%60===0)
    {
      var banana=createSprite(600,random(40,90),20,10);
      banana.addImage("flying",bananaImage);
      banana.velocityX=-5;
      banana.scale=0.03;
      banana.lifetime=120;
      
      FoodGroup.add(banana);
    }
}

function stone()
{
  if(World.frameCount%90===0)
  {
    var obstacle=createSprite(600,160,20,10);
    obstacle.addImage("floating",obstacle_img);
    obstacle.velocityX=-5;
    obstacle.lifetime=120;
    obstacle.scale=0.1;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset()
{
  gameState=PLAY;
  score=0;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  gameOver.visible=false;
  player.scale=0.15;
}
