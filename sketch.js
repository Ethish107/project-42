var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,bananaGroup;
var stone,stoneImg,stoneGroup;
var score = 0;
var gameOver,gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(950,600);
  
  backgr=createSprite(0,50,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.8;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,470,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,500,800,10);
  ground.x=ground.width/2;
  ground.visible=false;


  bananaGroup = new Group();
  stoneGroup = new  Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  if(bananaGroup.isTouching(player)){
    
    bananaGroup.destroyEach();
    player.scale += 0.03;
    score += 3;
  }

  if(stoneGroup.isTouching(player)){
    gameState = END;
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    bananaGroup.destroyEach();
    stoneGroup.destroyEach();

   gameOver = createSprite(475,300);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.6;

  }
 
  spawnFood();
  spawnStone();
  drawSprites();

  fill("white");
  textSize(30);
  text("Score: " + score,650,50 );


  push()
  fill("red");
  textSize(20);
  text(mouseX +" " + mouseY,mouseX,mouseY);
  pop()
}

function spawnFood(){
   if(frameCount%100 === 0){
 banana = createSprite(970,310);
 banana.addImage(bananaImg);
 banana.scale = 0.06;
 banana.velocityX = -6;
 banana.lifetime = 140;
 

 bananaGroup.add(banana);
   }
}

function spawnStone(){
  if(frameCount%300 === 0){
    stone = createSprite(970,470);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.velocityX = -7;
    stone.lifetime = 160;
    stone.debug = true;
    stone.setCollider("circle",20,-10,120);

    stoneGroup.add(stone);
    }
}
