var player,playerImg;
var bg;
var enemy,enemyImg;
var ground;
var upArrow,rightArrow,leftArrow,downArrow,shootBullet;
var bullet,bulletImg;
var count=0;
var gameState=1;
var kills=0;
var enemiesGroup,bulletGroup;
var bg2;


function preload(){
  playerImg=loadImage("images/player.jpg");
  bg=loadImage("images/bg.jpeg");
  enemyImg=loadImage("images/enemies.png");
  bulletImg=loadImage("images/normalBullet.jpg");
  bg2=loadImage("images/bg2.gif");
}


function setup(){
  createCanvas(displayWidth-20,displayHeight-20);

  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
  ground.visible=false;
  

  player=createSprite(100,displayHeight-250,50,50);
  player.addImage("player",playerImg);
  player.scale=0.25;


  upArrow=createButton("JUMP");
upArrow.position(displayWidth-400,displayHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;

});

downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })

  shootBullet=createButton("SHOOT");
  shootBullet.position(displayWidth-400,displayHeight-350);
  shootBullet.mousePressed(()=>{
    bulletGroup.setVelocityXEach(50);
    bulletGroup.setVisibleEach(true);
  })



  enemiesGroup=new Group();
  bulletGroup=new Group();
}


function draw(){

  if(gameState===1){
  background(bg);

  textSize(50);
  stroke(255);
  text("KILLS:"+kills,displayWidth/2,200);
  //camera.position.x=player.x;
  //camera.position.y=displayHeight/2;
player.collide(ground);
enemiesGroup.collide(ground);
//if(keyIsDown(UP_ARROW)){
 // bulletGroup.visible=true;
  //bulletGroup.velocityX=50;
//}
if(enemiesGroup.isTouching(bulletGroup)){
  enemiesGroup.destroyEach();
  bulletGroup.destroyEach();
  kills=kills+1;
}
if(enemiesGroup.isTouching(player)){
  gameState=3;
}
spawnEnemy();
createBullet();

if(kills>8){
  gameState=2;
}
  }

  if(gameState===2){
    background(bg2);
    player.x=400;
    player.y=300;

  }

  drawSprites();
}

function spawnEnemy(){
if(frameCount % 160===0 && count<10){
var enemy=createSprite(displayWidth,displayHeight-250,50,50);
  enemy.addImage("enemy",enemyImg);
  enemy.scale=0.7;
 count++
enemy.velocityX=-5;
enemy.velocityY=4;
 var rand=Math.round(random(1,3));
 if(rand===1){
   enemy.y=150;
 }
 else if(rand===2){
   enemy.y=displayHeight/2;
 }
 else{
 enemy.y=displayHeight-250;
 }
enemiesGroup.add(enemy);
}
}

function createBullet(){
  var bullet=createSprite(100,displayHeight-250,50,50);
  bullet.addImage("gun",bulletImg);
  bullet.x=player.x;
  //bullet.y=World.mouseY;
  bullet.visible=false;
  bullet.scale=0.1;

  bulletGroup.add(bullet);
}