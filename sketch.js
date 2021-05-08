const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const mouseConstraint = Matter.MouseConstraint;

var skyImage;
var player_idleAnimation, player_runningAnimation, player_gunAnimation, player_jumpAnimation, player_swordAnimation, player_deathAnimation;
var grassImage, grassRoundImage, mudImage, stoneUpperImage, stoneLowerImage;
var camera1, camera2, camera3;

var Grass = [];
var movingTileSpeed = 2;
var chomper1Velocity = 0, chomper2Velocity = 0;
var spitter1Velocity = 0,spitter2Velocity = 0,spitter3Velocity = 0, spitter4Velocity = 0, spitter5Velocity = 0, spitter7Velocity = 0; spitter8Velocity = 0;
var spitter2;
var playerSpeed = 0;
var dragonVelocity = 0.1;
var movingPlatform3Velocity = 0;
var grass1Velocity = 0, grass2Velocity = 0;
var bubble;

function preload(){
    skyImage = loadImage("images/Sky.png");
    sky2Image = loadImage('images/sky2.png');

    player_deathAnimation = loadAnimation("player/death/death1.png","player/death/death2.png","player/death/death3.png","player/death/death4.png");
    player_gunAnimation = loadAnimation("player/gun/gun1.png","player/gun/gun2.png","player/gun/gun3.png","player/gun/gun4.png","player/gun/gun5.png")
    player_idleAnimation = loadAnimation("player/idle/idle1.png","player/idle/idle2.png","player/idle/idle3.png","player/idle/idle4.png","player/idle/idle5.png","player/idle/idle6.png","player/idle/idle7.png")
    player_jumpAnimation = loadAnimation("player/jump/jump1.png","player/jump/jump2.png","player/jump/jump3.png");
    player_runningAnimation = loadAnimation("player/running/run2.png","player/running/run3.png","player/running/run4.png","player/running/run5.png","player/running/run6.png","player/running/run7.png","player/running/run8.png","player/running/run9.png");
    player_swordAnimation = loadAnimation("player/sword/sword1.png","player/sword/sword2.png","player/sword/sword3.png","player/sword/sword4.png");

    dropshipImage = loadImage("images/Dropship.png");

    grassImage = loadImage('images/grass.png');
    mudImage = loadImage('images/mud.png');
    backTileImage = loadImage('images/backGroundTile.jpg');

    stoneUpperImage = loadImage('images/stoneUpper.png');
    stoneLowerImage = loadImage('images/stoneLower.png');

    info1Image = loadImage("images/InfoSign1.png");
    info2Image = loadImage("images/InfoSign2.png");

    movingPlatform1Image = loadImage('images/movingPlatformGrass.png');

    teleporterAnimation = loadAnimation("teleporter/Teleporter_00.png","teleporter/Teleporter_01.png","teleporter/Teleporter_02.png","teleporter/Teleporter_03.png","teleporter/Teleporter_04.png","teleporter/Teleporter_05.png","teleporter/Teleporter_06.png","teleporter/Teleporter_07.png","teleporter/Teleporter_08.png","teleporter/Teleporter_09.png","teleporter/Teleporter_10.png","teleporter/Teleporter_11.png","teleporter/Teleporter_12.png","teleporter/Teleporter_13.png","teleporter/Teleporter_14.png");

    enemy1AttackAnim = loadAnimation("enemies/enemy1/attack/ChomperAttack1.png","enemies/enemy1/attack/ChomperAttack2.png","enemies/enemy1/attack/ChomperAttack3.png","enemies/enemy1/attack/ChomperAttack4.png","enemies/enemy1/attack/ChomperAttack5.png","enemies/enemy1/attack/ChomperAttack6.png","enemies/enemy1/attack/ChomperAttack7.png","enemies/enemy1/attack/ChomperAttack8.png","enemies/enemy1/attack/ChomperAttack9.png");
    enemy1DeathAnim = loadAnimation("enemies/enemy1/death/ChomperDEATH_Paint_01.png","enemies/enemy1/death/ChomperDEATH_Paint_03.png","enemies/enemy1/death/ChomperDEATH_Paint_05.png","enemies/enemy1/death/ChomperDEATH_Paint_07.png","enemies/enemy1/death/ChomperDEATH_Paint_09.png","enemies/enemy1/death/ChomperDEATH_Paint_11.png","enemies/enemy1/death/ChomperDEATH_Paint_13.png");
    enemy1IdleAnim = loadAnimation("enemies/enemy1/idle/ChomperIdle1.png","enemies/enemy1/idle/ChomperIdle2.png","enemies/enemy1/idle/ChomperIdle3.png","enemies/enemy1/idle/ChomperIdle4.png","enemies/enemy1/idle/ChomperIdle5.png","enemies/enemy1/idle/ChomperIdle6.png","enemies/enemy1/idle/ChomperIdle7.png","enemies/enemy1/idle/ChomperIdle8.png","enemies/enemy1/idle/ChomperIdle9.png","enemies/enemy1/idle/ChomperIdle10.png","enemies/enemy1/idle/ChomperIdle11.png","enemies/enemy1/idle/ChomperIdle12.png","enemies/enemy1/idle/ChomperIdle13.png","enemies/enemy1/idle/ChomperIdle14.png","enemies/enemy1/idle/ChomperIdle15.png","enemies/enemy1/idle/ChomperIdle16.png","enemies/enemy1/idle/ChomperIdle17.png","enemies/enemy1/idle/ChomperIdle18.png","enemies/enemy1/idle/ChomperIdle19.png","enemies/enemy1/idle/ChomperIdle20.png","enemies/enemy1/idle/ChomperIdle21.png","enemies/enemy1/idle/ChomperIdle22.png","enemies/enemy1/idle/ChomperIdle23.png","enemies/enemy1/idle/ChomperIdle24.png","enemies/enemy1/idle/ChomperIdle25.png","enemies/enemy1/idle/ChomperIdle26.png","enemies/enemy1/idle/ChomperIdle27.png","enemies/enemy1/idle/ChomperIdle28.png","enemies/enemy1/idle/ChomperIdle29.png");
    enemy1RunAnim = loadAnimation("enemies/enemy1/run/CHomperRun1.png","enemies/enemy1/run/CHomperRun2.png","enemies/enemy1/run/CHomperRun3.png","enemies/enemy1/run/CHomperRun4.png","enemies/enemy1/run/CHomperRun5.png","enemies/enemy1/run/CHomperRun6.png");
    enemy1WalkAnim = loadAnimation("enemies/enemy1/walk/ChomperWalk1.png","enemies/enemy1/walk/ChomperWalk2.png","enemies/enemy1/walk/ChomperWalk3.png","enemies/enemy1/walk/ChomperWalk4.png","enemies/enemy1/walk/ChomperWalk5.png","enemies/enemy1/walk/ChomperWalk6.png","enemies/enemy1/walk/ChomperWalk7.png","enemies/enemy1/walk/ChomperWalk8.png","enemies/enemy1/walk/ChomperWalk9.png","enemies/enemy1/walk/ChomperWalk10.png");

    pressurePad1Image = loadImage('images/PressurePad1.png');
    pressurePad2Image = loadImage('images/PressurePad2.png');

    door1Image = loadImage('images/Door1.png');
    door2Image = loadImage('images/Door2.png');

    doorA = loadAnimation("images/Door3.png","images/Door4.png","images/Door5.png","images/Door6.png","images/Door7.png","images/Door8.png","images/Door9.png","images/Door10.png","images/Door11.png","images/Door12.png","images/Door13.png","images/Door14.png","images/Door15.png","images/Door16.png","images/Door17.png","images/Door18.png","images/Door19.png","images/Door20.png","images/Door21.png","images/Door22.png","images/Door23.png","images/Door24.png","images/Door25.png","images/Door26.png");

    pushableBox1Image = loadImage('images/PushableBox1.png');
    pushableBox2Image = loadImage('images/PushableBox2.png');

    fullWallImage = loadImage('images/WallTile.png');
    LeftEndWallImage = loadImage('images/WallTileEndLeft.png');
    RightEndWallImage = loadImage('images/WallTileEndRight.png');

    alienBlock1Image = loadImage('images/AlienBlock01.png');

    spike1Image = loadImage('images/spike1.png');
    spike2Image = loadImage('images/spike2.png');
    spike3Image = loadImage('images/spike3.png');
    spike4Image = loadImage('images/spike4.png');
    spike5Image = loadImage('images/spike5.png');
    spike6Image = loadImage('images/spike6.png');
    spike7Image = loadImage('images/spike7.png');

    stoneMovingPlatform = loadImage('images/StoneMovingPlatform.png');

    keyAnimation = loadAnimation('key/keySpin1.png','key/keySpin2.png','key/keySpin3.png','key/keySpin4.png','key/keySpin5.png','key/keySpin6.png','key/keySpin7.png','key/keySpin8.png','key/keySpin9.png','key/keySpin10.png','key/keySpin11.png','key/keySpin12.png','key/keySpin13.png','key/keySpin14.png','key/keySpin15.png','key/keySpin16.png','key/keySpin17.png','key/keySpin18.png','key/keySpin19.png','key/keySpin20.png','key/keySpin21.png','key/keySpin22.png','key/keySpin23.png')

    mainDoor0Image = loadImage('images/HubDoor0.png');
    mainDoor1Image = loadImage('images/HubDoor1.png');
    mainDoor2Image = loadImage('images/HubDoor2.png');
    mainDoor3Image = loadImage('images/HubDoor3.png');

    darkBgImage = loadImage('images/background.png');

    dragonFly = loadAnimation('dragon/fly/fly4.png','dragon/fly/fly5.png','dragon/fly/fly6.png','dragon/fly/fly5.png','dragon/fly/fly4.png');
    dragonFireUp = loadAnimation('dragon/upFire/fireUp1.png','dragon/upFire/fireUp2.png','dragon/upFire/fireUp3.png','dragon/upFire/fireUp4.png','dragon/upFire/fireUp5.png','dragon/upFire/fireUp6.png','dragon/upFire/fireUp7.png');
    dragonFireMid = loadAnimation('dragon/midFire/fireMid1.png','dragon/midFire/fireMid2.png','dragon/midFire/fireMid3.png','dragon/midFire/fireMid4.png','dragon/midFire/fireMid5.png','dragon/midFire/fireMid6.png');
    dragonFireDown = loadAnimation('dragon/downFire/fireDown1.png','dragon/downFire/fireDown2.png','dragon/downFire/fireDown3.png','dragon/downFire/fireDown4.png','dragon/downFire/fireDown5.png');
    dragonDeath = loadAnimation('dragon/death/death1.png','dragon/death/death2.png','dragon/death/death3.png','dragon/death/death4.png','dragon/death/death5.png','dragon/death/death6.png','dragon/death/death7.png','dragon/death/death8.png','dragon/death/death9.png');
    // dragonIdle = loadAnimation('dragon')
    dragonLanding = loadAnimation('dragon/fly/fly7.png','dragon/fly/fly8.png','dragon/fly/fly9.png','dragon/fly/fly10.png','dragon/fly/fly11.png');

    switch1Image = loadImage('images/Switch1.png');
    switch2Image = loadImage('images/Switch2.png');

    switch1UppImage = loadImage('images/Switch1Upper.png');
    switch2UppImage = loadImage('images/Switch2Upper.png');

    chomperAttack = loadAnimation('enemies/enemy2/attack/ChomperAttack1.png','enemies/enemy2/attack/ChomperAttack2.png','enemies/enemy2/attack/ChomperAttack3.png','enemies/enemy2/attack/ChomperAttack4.png','enemies/enemy2/attack/ChomperAttack5.png','enemies/enemy2/attack/ChomperAttack6.png','enemies/enemy2/attack/ChomperAttack7.png','enemies/enemy2/attack/ChomperAttack8.png','enemies/enemy2/attack/ChomperAttack9.png','enemies/enemy2/attack/ChomperAttack10.png','enemies/enemy2/attack/ChomperAttack11.png','enemies/enemy2/attack/ChomperAttack12.png','enemies/enemy2/attack/ChomperAttack13.png','enemies/enemy2/attack/ChomperAttack14.png','enemies/enemy2/attack/ChomperAttack15.png','enemies/enemy2/attack/ChomperAttack16.png','enemies/enemy2/attack/ChomperAttack17.png');
    chomperIdle = loadImage('enemies/enemy2/walk/ChomperWalk1.png');
    chomperRun = loadAnimation('enemies/enemy2/walk/ChomperWalk1.png','enemies/enemy2/walk/ChomperWalk2.png','enemies/enemy2/walk/ChomperWalk3.png','enemies/enemy2/walk/ChomperWalk4.png','enemies/enemy2/walk/ChomperWalk5.png','enemies/enemy2/walk/ChomperWalk6.png','enemies/enemy2/walk/ChomperWalk7.png','enemies/enemy2/walk/ChomperWalk8.png','enemies/enemy2/walk/ChomperWalk9.png','enemies/enemy2/walk/ChomperWalk10.png');

    bubbleA = loadAnimation('enemies/enemy2/bubble/bubble1.png','enemies/enemy2/bubble/bubble2.png','enemies/enemy2/bubble/bubble3.png','enemies/enemy2/bubble/bubble4.png','enemies/enemy2/bubble/bubble5.png','enemies/enemy2/bubble/bubble6.png','enemies/enemy2/bubble/bubble7.png','enemies/enemy2/bubble/bubble8.png','enemies/enemy2/bubble/bubble9.png','enemies/enemy2/bubble/bubble10.png','enemies/enemy2/bubble/bubble11.png','enemies/enemy2/bubble/bubble12.png','enemies/enemy2/bubble/bubble13.png','enemies/enemy2/bubble/bubble14.png','enemies/enemy2/bubble/bubble15.png','enemies/enemy2/bubble/bubble16.png','enemies/enemy2/bubble/bubble17.png','enemies/enemy2/bubble/bubble18.png','enemies/enemy2/bubble/bubble19.png','enemies/enemy2/bubble/bubble20.png');

    stonePlatformMoving = loadImage('images/stonePlatformMoving.png');
    movingPlatformg = loadImage('images/MovingPlatformg.png');

    mainTileImage = loadImage('images/mainTile.jpg');

    alien04Image = loadImage('images/AlienStatue04.png');
}
function setup(){
    createCanvas(windowWidth, windowHeight);

    /*teleporter = createSprite(1550,600);
    teleporter.addAnimation("port", teleporterAnimation);*/

    Platform = createGroup();
    Mud = createGroup();
    StoneLower = createGroup();

    // For making pltforms (Start)
    

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 1930);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 2200);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 2470);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 2740);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 3010);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 3280);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 3450);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 3620);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 3890);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4060);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4230);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4400);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4570);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4740);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 4910);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5080);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5250);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5420);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5590);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }
    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5760);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 5930);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6100);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6270);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6440);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6610);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6780);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 6950);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7120);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7290);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7460);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7630);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7800);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 7970);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8140);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8130);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8400);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8650);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8820);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 8890);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 9160);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 9430);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 9700);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 9970);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 10240);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 10510);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 10780);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 11050);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 11320);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 11590);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 11860);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    for(var i = -1000; i < 10600; i = i+535){
        backTile = createSprite(i, 12140);
        backTile.addImage(backTileImage);
        backTile.scale = 2;
    }

    

    for(var i = windowWidth-windowWidth; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+780);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-300; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+880);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-300; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+980);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-300; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+1080);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }


    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+262);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+355);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+450);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+650);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }


    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+547);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-500; i < windowWidth-windowWidth-30; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+750);
        mud.addImage(mudImage);
        Mud.add(mud);
        // mud.scale = 0.8;
    }

    for(var i = windowWidth-windowWidth-450; i < windowWidth-windowWidth-30; i = i+150){
        grass = createSprite(i, windowHeight-windowHeight+180);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    for(var i = windowWidth-windowWidth+155; i < windowWidth-windowWidth+760; i=i+100){
        grass = createSprite(i ,windowHeight-windowHeight+700);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    grass = createSprite(windowWidth-windowWidth-73, windowHeight-windowHeight+180);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    
    grass = createSprite(windowWidth-windowWidth-480, windowHeight-windowHeight+180);
    grass.addImage(grassImage);
    grass.scale = 0.2;

    dropship  = createSprite(350, 515);
    dropship.addImage(dropshipImage);
    dropship.scale = 0.4;

    // For making difficulties in game (Start) 
    for(var i = windowWidth-windowWidth+1022; i < windowHeight-windowHeight+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+672);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    

    grass = createSprite(windowWidth-windowWidth+820,windowHeight-windowHeight+700);
    grass.addImage(grassImage);
    grass.scale = 0.2;

    platform1 = createSprite(485, 717, 900, 50);
    platform1.visible = false;
    Platform.add(platform1);

    grass = createSprite(windowWidth-windowWidth+1010, windowHeight-windowHeight+597);
    grass.addImage(grassImage);
    grass.scale = 0.13;
    grass.setCollider('rectangle', -180, 120, 700, 270);
    Platform.add(grass);

    for(var i = windowWidth-windowWidth+1102; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, windowHeight-windowHeight+610);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    grass = createSprite(windowWidth-windowWidth+1091, windowHeight-windowHeight+534);
    grass.addImage(grassImage);
    grass.scale = 0.13;
    grass.setCollider('rectangle', -130, 120, 700, 270);
    Platform.add(grass);

    for(var i = windowWidth-windowWidth+1200; i < windowWidth-windowWidth+1600; i = i+150){
        mud = createSprite(i, 490);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    mud = createSprite(1553, 489);
    mud.addImage(mudImage);

    mud = createSprite(1552, 720);
    mud.addImage(mudImage);

    mud = createSprite(1552, 820);
    mud.addImage(mudImage);

    for(var i = windowWidth-windowWidth+1402.7; i < windowWidth-windowWidth+1602.7; i = i+150){
        mud = createSprite(i, 390);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    grass = createSprite(1212, 420);
    grass.addImage(grassImage);
    grass.scale = 0.17;
    grass.setCollider('rectangle', -50, 100, 1000, 270);
    Platform.add(grass);

    grass = createSprite(1407,312);
    grass.addImage(grassImage);
    grass.scale = 0.16;
    grass.setCollider('rectangle', 420, 110, 1900, 270);
    Platform.add(grass);

    grass = createSprite(1543,312);
    grass.addImage(grassImage);
    grass.scale = 0.16;

    

    

    for(var i = 2500; i < 3000; i = i+150){
        mud = createSprite(i, 390);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    

    for(var i = 2500; i < 3200; i = i+150){
        mud = createSprite(i, 490);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    grass = createSprite(3104, 419);
    grass.addImage(grassImage);
    grass.scale = 0.14;
    grass.setCollider('rectangle', -20, 120, 1200, 270);
    Platform.add(grass);

    mud = createSprite(2950, 390);
    mud.addImage(mudImage);
    Mud.add(mud);
    
    for(var i = 2500; i < 3300; i = i+150){
        mud = createSprite(i, 590);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 2500; i < 4000; i = i+150){
        mud = createSprite(i, 690);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 2500; i < 4000; i = i+150){
        mud = createSprite(i, 790);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 2500; i < 4000; i = i+150){
        mud = createSprite(i, 890);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 2530; i < 2900; i = i+100){
        grass = createSprite(i, 320);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    grass = createSprite(2919, 320);
    grass.addImage(grassImage);
    grass.scale = 0.2;

    platform2 = createSprite(2725, 333, 620, 40);
    platform2.visible = false;
    Platform.add(platform2);

    stoneLower1 = createSprite(0, 1175);
    stoneLower1.addImage(stoneLowerImage);
    stoneLower1.scale = 0.4;
    StoneLower.add(stoneLower1);

    

    grass = createSprite(3263, 523);
    grass.addImage(grassImage);
    grass.scale = 0.125;
    grass.setCollider('rectangle', -20, 120, 1200, 270);
    Platform.add(grass);

    for(var i = 3426; i < 3900; i = i+100){
        grass = createSprite(i, 623);
        grass.addImage(grassImage);
        grass.scale = 0.15;
        grass.setCollider("rectangle", 0, 25, 1100, 100);
        Platform.add(grass);

        platform3 = createSprite(3643, 641, 570, 40);
        platform3.visible = false;
        Platform.add(platform3);
    }

    grass = createSprite(3849, 623);
    grass.addImage(grassImage);
    grass.scale = 0.15;
    grass.setCollider("rectangle", 0, 20, 1100, 100);
    Platform.add(grass);

    grass = createSprite(7100, 970);
    grass.addImage(grassImage);
    grass.scale = 0.15;
    grass.setCollider("rectangle", 0, 30, 1100, 100);
    Platform.add(grass);

    for(var i = 5000; i < 7000; i = i+150){
        mud = createSprite(i, 685);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 5000; i < 7000; i = i+150){
        mud = createSprite(i, 785);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 5000; i < 7000; i = i+150){
        mud = createSprite(i, 885);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 5000; i < 7000; i = i+150){
        mud = createSprite(i, 985);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 5030; i < 6900; i = i+100){
        grass = createSprite(i, 610);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    grass = createSprite(6918, 610);
    grass.addImage(grassImage);
    grass.scale = 0.2;

    platform4 = createSprite(5980, 620, 2113, 30);
    platform4.visible = false;
    Platform.add(platform4);

    for(var i = 7500; i < 9000; i = i+150){
        mud = createSprite(i, 685);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 7530; i < 9000; i = i+130){
        grass = createSprite(i, 605);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    platform5 = createSprite(8160, 615, 1480, 30);
    platform5.visible = false;
    Platform.add(platform5);

    grass = createSprite(7330, 785);
    grass.addImage(grassImage);
    grass.scale = 0.15;
    grass.setCollider("rectangle", 20, 30, 1100, 100);
    Platform.add(grass);

    grass1 = createSprite(9000, 400);
    grass1.addImage(grassImage);
    grass1.scale = 0.12;

    grass2 = createSprite(9000, 200);
    grass2.addImage(grassImage);
    grass2.scale = 0.12;

    for(var i = 7500; i < 9000; i = i+150){
        mud = createSprite(i, 785);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 7500; i < 9000; i = i+150){
        mud = createSprite(i, 885);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 7500; i < 9700; i = i+150){
        mud = createSprite(i, 985);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9000, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9150, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9300, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9450, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9600, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 100; i < 985; i = i+100){
        mud = createSprite(9700, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 9030; i < 9700; i = i+100){
        grass = createSprite(i, 30);
        grass.addImage(grassImage);
        grass.scale = 0.2;
    }

    grass = createSprite(9670, 30);
    grass.addImage(grassImage);
    grass.scale = 0.2;

    for(var i = -90; i < 2810; i = i+240){
        stoneLower = createSprite(i, 4000);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -90; i < 2810; i = i+240){
        stoneLower = createSprite(i, 4240);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -110; i < 2610; i = i+150){
        stoneUpper = createSprite(i, 3870);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(2690, 3870);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    Platform.add(stoneUpper);

    platform6 = createSprite(1300, 3878, 3000, 20);
    platform6.visible = false;
    Platform.add(platform6);

    stoneLower2 = createSprite(0, 1380);
    stoneLower2.addImage(stoneLowerImage);
    stoneLower2.scale = 0.4;
    StoneLower.add(stoneLower2);


    for(var i = -100; i < 2800; i = i+200){
        fullWall = createSprite(i, 3747);
        fullWall.addImage(fullWallImage);
        fullWall.scale = 0.2;
    }

    for(var i = -100; i < 2800; i = i+200){
        mainTile = createSprite(i, 3545);
        mainTile.addImage(mainTileImage);
        mainTile.scale = 1;
    }

    for(var i = -100; i < 2800; i = i+200){
        mainTile = createSprite(i, 3345);
        mainTile.addImage(mainTileImage);
        mainTile.scale = 1;
    }

    for(var i = -100; i < 2800; i = i+200){
        mainTile = createSprite(i, 3145);
        mainTile.addImage(mainTileImage);
        mainTile.scale = 1;
    }

    door2 = createSprite(300, 3667);
    door2.addImage('before',door1Image);
    door2.addImage('after',door2Image);
    door2.scale = 0.39;

    alienStatue = createSprite(1800, 3425);
    alienStatue.addImage(alien04Image);
    alienStatue.scale = 0.9;

    stoneUpper = createSprite(-70, 3650);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', -20, 20, 410, 60);
    Platform.add(stoneUpper);

    door1 = createSprite(5500, 450);
    door1.addImage('before',door1Image);
    door1.addImage('after',door2Image)
    door1.scale = 0.3;  
    door1.setCollider('rectangle', 20, 0, 470, 1000);
    Grass.depth = door1.depth;
    door1.depth = door1.depth+1;

    mud = createSprite(5450, 695, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5550, 695, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5450, 795, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5550, 795, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5450, 895, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5550, 895, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5450, 995, 120, 120);
    mud.addImage(mudImage);

    mud = createSprite(5550, 995, 120, 120);
    mud.addImage(mudImage);

    movingPlatform1 = createSprite(1750, 350);
    movingPlatform1.addImage(movingPlatform1Image);
    movingPlatform1.scale = 0.4;
    movingPlatform1.setCollider('rectangle', 0, 20, 500, 210);
    Platform.add(movingPlatform1);

    movingPlatform2 = createSprite(4050, 660);
    movingPlatform2.addImage(movingPlatform1Image);
    movingPlatform2.scale = 0.38;
    movingPlatform2.setCollider('rectangle', 0, 20, 450, 210);
    Platform.add(movingPlatform2);

    spitter1 = createSprite(3900, 520);
    spitter1.addAnimation('walk',enemy1WalkAnim);
    spitter1.addAnimation("idle",enemy1IdleAnim);
    spitter1.addAnimation('death',enemy1DeathAnim);
    spitter1.addAnimation('attack',enemy1AttackAnim);
    spitter1.addAnimation('run',enemy1RunAnim);
    spitter1.scale = 0.5;
    spitter1.setCollider("rectangle", 10, 19, 150,120);

    spitter2 = createSprite(5640, 470);
    spitter2.addAnimation('walk',enemy1WalkAnim);
    spitter2.addAnimation("idle",enemy1IdleAnim);
    spitter2.addAnimation('death',enemy1DeathAnim);
    spitter2.addAnimation('attack',enemy1AttackAnim);
    spitter2.addAnimation('run',enemy1RunAnim);
    spitter2.scale = 0.5;
    spitter2.setCollider("rectangle", -10, 23, 150,120);

    info1 = createSprite(windowWidth-windowWidth+670,windowHeight-windowHeight+576);
    info1.addImage("before",info1Image);
    info1.addImage("after",info2Image);
    info1.scale = 0.5;

    pressurePad1 = createSprite(5200, 605);
    pressurePad1.addImage("before",pressurePad1Image);
    pressurePad1.addImage("after",pressurePad2Image);
    pressurePad1.scale = 0.18;
    pressurePad1.debug = false;
    pressurePad1.setCollider("rectangle", 0, 0, 700, 150);

    pressurePad2 = createSprite(8500, 600);
    pressurePad2.addImage("before",pressurePad1Image);
    pressurePad2.addImage("after",pressurePad2Image);
    pressurePad2.scale = 0.18;
    pressurePad2.debug = false;
    pressurePad2.setCollider("rectangle", 0, 0, 700, 200);

    pushableBox1 = createSprite(8500, 537);//8782
    pushableBox1.addImage('before',pushableBox1Image);
    pushableBox1.addImage('after', pushableBox2Image);
    pushableBox1.setCollider('rectangle', 0, 10, 360, 380);
    pushableBox1.scale = 0.28;
    spritePush1Left = createSprite(pushableBox1.x-10, pushableBox1.y, 30, 100);
    spritePush1Left.visible = false;
    spritePush1Right = createSprite(pushableBox1.x+50, pushableBox1.y, 30, 100);
    spritePush1Right.visible = false;

    spitter3 = createSprite(7000, 400);
    spitter3.addAnimation('walk',enemy1WalkAnim);
    spitter3.addAnimation("idle",enemy1IdleAnim);
    spitter3.addAnimation('death',enemy1DeathAnim);
    spitter3.addAnimation('attack',enemy1AttackAnim);
    spitter3.addAnimation('run',enemy1RunAnim);
    spitter3.scale = 0.5;
    spitter3.setCollider("rectangle", 10, 19, 150,120);

    spitter4 = createSprite(8640, 570);
    spitter4.addAnimation('walk',enemy1WalkAnim);
    spitter4.addAnimation("idle",enemy1IdleAnim);
    spitter4.addAnimation('death',enemy1DeathAnim);
    spitter4.addAnimation('attack',enemy1AttackAnim);
    spitter4.addAnimation('run',enemy1RunAnim);
    spitter4.scale = 0.5;
    spitter4.debug = false;
    spitter4.setCollider("rectangle", 10, 19, 150,100);

    spitter5 = createSprite(8480, 1150);
    spitter5.addAnimation('walk',enemy1WalkAnim);
    spitter5.addAnimation("idle",enemy1IdleAnim);
    spitter5.addAnimation('death',enemy1DeathAnim);
    spitter5.addAnimation('attack',enemy1AttackAnim);
    spitter5.addAnimation('run',enemy1RunAnim);
    spitter5.scale = 0.5;
    spitter5.setCollider("rectangle", 10, 19, 150,100);

    alienBlock1 = createSprite(1550, 3780);
    alienBlock1.addImage(alienBlock1Image);
    alienBlock1.scale = 0.5;
    alienBlock1.debug = false;
    alienBlock1.setCollider("rectangle", 0, 70, 250, 150);
    alienBlock1sprite = createSprite(alienBlock1.x, alienBlock1.y-13, 60, 20);
    alienBlock1sprite.visible = false;

    key1 = createSprite(alienBlock1.x, alienBlock1.y-65);
    key1.addAnimation('key',keyAnimation);
    key1.scale = 0.35;
    key1.setCollider("rectangle", 0, 0, 80,190);

    mainDoor = createSprite(1800, 3682);
    mainDoor.addImage('0', mainDoor0Image);
    mainDoor.addImage('1', mainDoor1Image);
    mainDoor.addImage('2', mainDoor2Image);
    mainDoor.addImage('3', mainDoor3Image);
    mainDoor.scale = 0.25;


    /*dragon = createSprite(9500, 2000);
    dragon.addAnimation('fly', dragonFly);
    dragon.addAnimation('death', dragonDeath);
    dragon.addAnimation('fireUp', dragonFireUp);
    dragon.addAnimation('fireMid', dragonFireMid);
    dragon.addAnimation('fireDown', dragonFireDown);
    // dragon.addAnimation('idle', dragonIdle);
    dragon.addAnimation('landing', dragonLanding);
    dragon.scale = 2;*/

    switch1 =  createSprite(9615, 2205);
    switch1.addImage('1', switch1Image);
    switch1.addImage('2', switch2Image);
    switch1.scale = 0.37;

    for(var i = 8500; i < 9300; i = i + 124){
        stoneLower = createSprite(i, 2765);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.2;
        StoneLower.add(stoneLower);
    }
    for(var i = 8500; i < 9300; i = i + 100){
        stoneUpper = createSprite(i, 2700);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.3;
    }

    for(var i = 7700; i < 8260; i = i+240){
        stoneLower = createSprite(i, 2703);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    stoneLower = createSprite(8320, 2703);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    for(var i = 9400; i < 10900; i = i + 120){
        stoneLower = createSprite(i, 2703);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 9370; i < 10900; i = i + 120){
        stoneUpper = createSprite(i, 2560);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform7 = createSprite(10090, 2575, 1620, 40);
    platform7.visible = false;
    Platform.add(platform7);

    stoneLower = createSprite(9600, 2020);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneLower = createSprite(9600, 2100);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneLower = createSprite(9500, 2060);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneLower = createSprite(9500, 2180);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneLower = createSprite(9500, 2300);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneLower = createSprite(9590, 2300);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;

    stoneUpper = createSprite(9613, 2240);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.22;

    stoneLower3 = createSprite(7260, 2703);
    stoneLower3.addImage(stoneLowerImage);
    stoneLower3.scale = 0.4;
    StoneLower.add(stoneLower3);

    stoneLower4 = createSprite(7450, 2703);
    stoneLower4.addImage(stoneLowerImage);
    stoneLower4.scale = 0.4;
    StoneLower.add(stoneLower4);

    for(var i = 7670; i < 8300; i = i+120){
        stoneUpper = createSprite(i, 2560);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform8 = createSprite(8010, 2576, 830, 40);
    platform8.visible = false;
    Platform.add(platform8);

    for(var i = 7020; i < 8000; i = i+240 ){
        stoneLower = createSprite(i, 4800);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }
    for(var i = 7020; i < 8000; i = i+240 ){
        stoneLower = createSprite(i, 5040);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7020; i < 9300; i = i+240 ){
        stoneLower = createSprite(i, 5280);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 8500; i < 9300; i = i+240 ){
        stoneLower = createSprite(i, 4800);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7020; i < 8000; i = i+240 ){
        stoneLower = createSprite(i, 5520);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7020; i < 9300; i = i+240 ){
        stoneLower = createSprite(i, 5760);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 6990; i < 8050; i = i+120){
        stoneUpper = createSprite(i, 4670);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(8005, 4670);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform14 = createSprite(7500, 4687, 1200, 40);
    platform14.visible = false;
    Platform.add(platform14);

    for(var i = 8470; i <= 9300; i = i+120){
        stoneUpper = createSprite(i, 4670);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform15 = createSprite(8850, 4687, 950, 40);
    platform15.visible = false;
    Platform.add(platform15);

    for(var i = 8190; i < 9250; i = i+120){
        stoneUpper = createSprite(i, 5150);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform16 = createSprite(8700, 5165, 1150, 40);
    platform16.visible = false;
    Platform.add(platform16);

    for(var i = 8190; i < 9250; i = i+120){
        stoneUpper = createSprite(i, 5630);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform17 = createSprite(8700, 5645, 1150, 40);
    platform17.visible = false;
    Platform.add(platform17);

    stoneUpper = createSprite(9480, 5170);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9250, 4670);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9208, 5150);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9208, 5630);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9780, 4960);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(10080, 5180);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(10180, 5470);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9700, 5370);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(9590, 5630);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    

    stoneUpper = createSprite(8350, 2560);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper1 = createSprite(7490, 2560);
    stoneUpper1.addImage(stoneUpperImage);
    stoneUpper1.scale = 0.4;
    stoneUpper1.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper1);

    stoneUpper2 = createSprite(7320, 2560);
    stoneUpper2.addImage(stoneUpperImage);
    stoneUpper2.scale = 0.4;
    stoneUpper2.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper2);

    stoneUpper3 = createSprite(7245, 2560);
    stoneUpper3.addImage(stoneUpperImage);
    stoneUpper3.scale = 0.4;
    stoneUpper3.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper3);

    stoneUpper = createSprite(8020, 2280);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.3;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7760, 2000);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.3;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneLower = createSprite(7885, 1880);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);
    
    stoneLower = createSprite(7885, 2000);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7885, 2120);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7885, 2240);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(7515, 2280);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.3;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 50);
    Platform.add(stoneUpper);

    stoneLower = createSprite(7380, 1880);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7380, 2000);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7380, 2120);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7380, 2240);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    for(var i = 1900; i <= 4000; i = i + 240){
        stoneLower = createSprite(7020, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3150; i <= 4000; i = i + 240){
        stoneLower = createSprite(7260, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3390; i < 4000; i = i +240){
        stoneLower = createSprite(7510, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3630; i < 4000; i = i +240){
        stoneLower = createSprite(7760, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3630; i < 4000; i = i +240){
        stoneLower = createSprite(7900, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    stoneUpper = createSprite(7260, 3000);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7510, 3240);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7760, 3480);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7900, 3480);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    door3 = createSprite(7895, 3340);
    door3.addImage('1',door1Image);
    door3.scale = 0.26;

    for(var i = 7895; i < 8500; i = i + 90){
        stoneLower = createSprite(i,3160);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.15;
        StoneLower.add(stoneLower);
    }

    for(var i = 8690; i < 9120; i = i + 90){
        stoneLower = createSprite(i,3160);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.15;
        StoneLower.add(stoneLower);
    }

    for(var i = 9290; i < 9667; i = i + 90){
        stoneLower = createSprite(i,3160);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.15;
        StoneLower.add(stoneLower);
    }

    for(var i = 9880; i < 10800; i = i + 90){
        stoneLower = createSprite(i,3160);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.15;
        StoneLower.add(stoneLower);
    }

    for(var i = 7919; i < 8370; i = i + 90){
        stoneUpper = createSprite(i,3100);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.3;
    }

    platform9 = createSprite(8150, 3120, 590, 40);
    platform9.visible = false;
    Platform.add(platform9);

    for(var i = 8715; i < 9060; i = i + 90){
        stoneUpper = createSprite(i,3100);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.3;
    }

    platform10 = createSprite(8850, 3120, 480, 40);
    platform10.visible = false;
    Platform.add(platform10);

    jail1 = createSprite(9500, 2970, 20, 190);
    jail2 = createSprite(10500, 2970, 20, 190);

    for(var i = 9317; i < 9660; i = i + 90){
        stoneUpper = createSprite(i,3100);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.3;
    }

    for(var i = 9910; i < 10800; i = i + 90){
        stoneUpper = createSprite(i,3100);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.3;
    }

    platform11 = createSprite(9490, 3120, 400, 40);
    platform11.visible = false;
    Platform.add(platform11);

    platform12 = createSprite(10290, 3120, 900, 40);
    platform12.visible = false;
    Platform.add(platform12);

    // First
    stoneLower4 = createSprite(8530,3160);
    stoneLower4.addImage(stoneLowerImage);
    stoneLower4.scale = 0.15;
    StoneLower.add(stoneLower4);

    stoneLower5 = createSprite(8610,3160);
    stoneLower5.addImage(stoneLowerImage);
    stoneLower5.scale = 0.15;
    StoneLower.add(stoneLower5);

    stoneUpper2 = createSprite(8500,3100);
    stoneUpper2.addImage(stoneUpperImage);
    stoneUpper2.scale = 0.3;
    stoneUpper2.debug = true;
    stoneUpper2.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper2);

    stoneUpper3 = createSprite(8578,3100);
    stoneUpper3.addImage(stoneUpperImage);
    stoneUpper3.scale = 0.3;
    stoneUpper3.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper3);

    // sceond
    stoneLower6 = createSprite(9140,3160);
    stoneLower6.addImage(stoneLowerImage);
    stoneLower6.scale = 0.15;
    StoneLower.add(stoneLower6);

    stoneLower7 = createSprite(9230,3160);
    stoneLower7.addImage(stoneLowerImage);
    stoneLower7.scale = 0.15;
    StoneLower.add(stoneLower7);

    stoneUpper4 = createSprite(9105,3100);
    stoneUpper4.addImage(stoneUpperImage);
    stoneUpper4.scale = 0.3;
    stoneUpper4.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper4);

    stoneUpper5 = createSprite(9199,3100);
    stoneUpper5.addImage(stoneUpperImage);
    stoneUpper5.scale = 0.3;
    stoneUpper5.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper5);

    //Third 
    stoneLower8 = createSprite(9720,3160);
    stoneLower8.addImage(stoneLowerImage);
    stoneLower8.scale = 0.15;
    StoneLower.add(stoneLower8);

    stoneLower9 = createSprite(9800,3160);
    stoneLower9.addImage(stoneLowerImage);
    stoneLower9.scale = 0.15;
    StoneLower.add(stoneLower9);

    stoneUpper6 = createSprite(9690,3100);
    stoneUpper6.addImage(stoneUpperImage);
    stoneUpper6.scale = 0.3;
    stoneUpper6.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper6);

    stoneUpper7 = createSprite(9770,3100);
    stoneUpper7.addImage(stoneUpperImage);
    stoneUpper7.scale = 0.3;
    stoneUpper7.setCollider('rectangle', 0, 10, 400, 40);
    Platform.add(stoneUpper7);

    switchUpper1 = createSprite(8200, 2863);
    switchUpper1.addImage('1',switch1UppImage);
    switchUpper1.addImage('2',switch2UppImage);
    switchUpper1.scale = 0.4;

    switchUpper2 = createSprite(8900, 2863);
    switchUpper2.addImage('1',switch1UppImage);
    switchUpper2.addImage('2',switch2UppImage);
    switchUpper2.scale = 0.4;

    pushableBox3 = createSprite(8590, 2950);
    pushableBox3.addImage('before',pushableBox1Image);
    pushableBox3.addImage('after', pushableBox2Image);
    pushableBox3.scale = 0.28;
    spritePush3Left = createSprite(pushableBox3.x-50, pushableBox3.y, 30, 100);
    spritePush3Left.visible = false;
    spritePush3Right = createSprite(pushableBox3.x+50, pushableBox3.y, 30, 100);
    spritePush3Right.visible = false;

    pushableBox4 = createSprite(9200, 2950);
    pushableBox4.addImage('before',pushableBox1Image);
    pushableBox4.addImage('after', pushableBox2Image);
    pushableBox4.scale = 0.28;
    spritePush4Left = createSprite(pushableBox4.x-50, pushableBox4.y, 30, 100);
    spritePush4Left.visible = false;
    spritePush4Right = createSprite(pushableBox4.x+50, pushableBox4.y, 30, 100);
    spritePush4Right.visible = false;

    pushableBox5 = createSprite(pushableBox4.x+610, 2950);
    pushableBox5.addImage('before',pushableBox1Image);
    pushableBox5.addImage('after', pushableBox2Image);
    pushableBox5.scale = 0.28;
    spritePush5Left = createSprite(pushableBox5.x-50, pushableBox5.y, 30, 100);
    spritePush5Left.visible = false;
    spritePush5Right = createSprite(pushableBox5.x+50, pushableBox5.y, 30, 100);
    spritePush5Right.visible = false;

    stoneLower = createSprite(8140,3870);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(8140,3740);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(8146,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.48;

    /*stoneUpper = createSprite(8180,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;*/

    stoneLower = createSprite(10200,3870);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(10200,3740);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(10174,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper = createSprite(10240,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneLower = createSprite(10440,3870);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(10440,3740);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(10420,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper = createSprite(10480,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneLower = createSprite(10690,3870);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(10690,3740);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(10620,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper = createSprite(10720,3610);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform13 = createSprite(10460, 3627, 720, 40);
    platform13.visible = false;
    Platform.add(platform13);

    // acid = createSprite(9300, 3700, 1000, 200);

    for(var i = 8330; i < 10100; i = i+ 90){
        stoneLower = createSprite(i,3928);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.2;
        StoneLower.add(stoneLower); 
    }

    door4 = createSprite(10500, 3420);
    door4.addImage('before',door1Image);
    door4.addImage('after',door2Image)
    door4.scale = 0.36;

    spike = createSprite(9200, 2630);
    spike.addImage(spike1Image);
    spike.scale = 0.5;

    spike = createSprite(9100, 2650);
    spike.addImage(spike2Image);
    spike.scale = 0.6;

    spike = createSprite(8980, 2640);
    spike.addImage(spike3Image);
    spike.scale = 0.5;

    spike = createSprite(8880, 2650);
    spike.addImage(spike4Image);
    spike.scale = 0.5;

    spike = createSprite(8780, 2650);
    spike.addImage(spike5Image);
    spike.scale = 0.6;

    spike = createSprite(8680, 2645);
    spike.addImage(spike6Image);
    spike.scale = 0.5;

    spike = createSprite(8580, 2655);
    spike.addImage(spike7Image);
    spike.scale = 0.5;

    spike = createSprite(8520, 2645);
    spike.addImage(spike4Image);
    spike.scale = 0.5;

    

    for(var i = 5800; i < 7800; i = i + 240){
        stoneLower = createSprite(i, 8800);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }
    for(var i = 5800; i < 7800; i = i + 240){
        stoneLower = createSprite(i, 9040);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }
    for(var i = 5770; i < 7800; i = i + 120){
        stoneUpper = createSprite(i, 8670);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(7750, 8665);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform18 = createSprite(6760, 8685, 2100, 40);
    platform18.visible = false;
    Platform.add(platform18);

    spitter7 = createSprite(9600, 2960);
    spitter7.addAnimation('walk',enemy1WalkAnim);
    spitter7.addAnimation("idle",enemy1IdleAnim);
    spitter7.addAnimation('death',enemy1DeathAnim);
    spitter7.addAnimation('attack',enemy1AttackAnim);
    spitter7.addAnimation('run',enemy1RunAnim);
    spitter7.scale = 0.5;
    spitter7.visible = true;
    spitter7.setCollider("rectangle", 10, 19, 150,100);

    spitter8 = createSprite(10370, 2960);
    spitter8.addAnimation('walk',enemy1WalkAnim);
    spitter8.addAnimation("idle",enemy1IdleAnim);
    spitter8.addAnimation('death',enemy1DeathAnim);
    spitter8.addAnimation('attack',enemy1AttackAnim);
    spitter8.addAnimation('run',enemy1RunAnim);
    spitter8.scale = 0.5;
    spitter8.visible = true;
    spitter8.setCollider("rectangle", 10, 19, 150,100);

    pressurePad3 = createSprite(9600, 2555);
    pressurePad3.addImage('before', pressurePad1Image);
    pressurePad3.addImage('after', pressurePad2Image);
    pressurePad3.scale = 0.18;
    pressurePad3.setCollider("rectangle", 0, -50, 700, 200);

    pushableBox2 = createSprite(9750, 2496);
    pushableBox2.addImage('before',pushableBox1Image);
    pushableBox2.addImage('after', pushableBox2Image);
    pushableBox2.scale = 0.28;
    spritePush2Left = createSprite(pushableBox2.x-50, pushableBox2.y, 30, 100);
    spritePush2Left.visible = false;
    spritePush2Right = createSprite(pushableBox2.x+50, pushableBox2.y, 30, 100);
    spritePush2Right.visible = false;

    movingPlatform3 = createSprite(9198, 2460);
    movingPlatform3.addImage(stoneMovingPlatform);
    movingPlatform3.scale = 0.3;
    movingPlatform3.visible = false;

    // First Row

    movingPlatform4 = createSprite(8580, 8900);
    movingPlatform4.addImage(stonePlatformMoving);
    movingPlatform4.scale = 0.35;

    movingPlatform5 = createSprite(8900, 8500);
    movingPlatform5.addImage(stonePlatformMoving);
    movingPlatform5.scale = 0.35;

    movingPlatform6 = createSprite(8170, 8880);
    movingPlatform6.addImage(stonePlatformMoving);
    movingPlatform6.scale = 0.35;

    movingPlatform7 = createSprite(9300, 8800);
    movingPlatform7.addImage(stonePlatformMoving);
    movingPlatform7.scale = 0.35;

    movingPlatform8 = createSprite(9700, 8700);
    movingPlatform8.addImage(stonePlatformMoving);
    movingPlatform8.scale = 0.35;

    // Second Row

    movingPlatform9 = createSprite(8170, 8300);
    movingPlatform9.addImage(stonePlatformMoving);
    movingPlatform9.scale = 0.35;

    movingPlatform10 = createSprite(8580, 8450);
    movingPlatform10.addImage(stonePlatformMoving);
    movingPlatform10.scale = 0.35;

    movingPlatform11 = createSprite(8900, 7900);
    movingPlatform11.addImage(stonePlatformMoving);
    movingPlatform11.scale = 0.35;

    movingPlatform12 = createSprite(9300, 8300);
    movingPlatform12.addImage(stonePlatformMoving);
    movingPlatform12.scale = 0.35;

    movingPlatform13 = createSprite(9700, 8250);
    movingPlatform13.addImage(stonePlatformMoving);
    movingPlatform13.scale = 0.35;

    // Third Row

    movingPlatform14 = createSprite(8170, 7880);
    movingPlatform14.addImage(stonePlatformMoving);
    movingPlatform14.scale = 0.35;

    movingPlatform15 = createSprite(8580, 8050);
    movingPlatform15.addImage(stonePlatformMoving);
    movingPlatform15.scale = 0.35;

    movingPlatform16 = createSprite(8900, 7400);
    movingPlatform16.addImage(stonePlatformMoving);
    movingPlatform16.scale = 0.35;

    movingPlatform17= createSprite(9300, 7800);
    movingPlatform17.addImage(stonePlatformMoving);
    movingPlatform17.scale = 0.35;

    movingPlatform18 = createSprite(9700, 7750);
    movingPlatform18.addImage(stonePlatformMoving);
    movingPlatform18.scale = 0.35;

    // Fourth Row

    movingPlatform19 = createSprite(8170, 7480);
    movingPlatform19.addImage(stonePlatformMoving);
    movingPlatform19.scale = 0.35;

    movingPlatform20 = createSprite(8580, 7650);
    movingPlatform20.addImage(stonePlatformMoving);
    movingPlatform20.scale = 0.35;

    // End

    for(var i = 6720; i < 7800; i = i + 240){
        stoneLower = createSprite(i,7100);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3120; i < 7800; i = i + 240){
        stoneLower = createSprite(i,7340);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }


    for(var i = 3120; i < 7800; i = i + 240){
        stoneLower = createSprite(i,7580);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3120; i < 7800; i = i + 240){
        stoneLower = createSprite(i,7820);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3120; i < 7800; i = i + 240){
        stoneLower = createSprite(i,8060);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3120; i < 7800; i = i + 240){
        stoneLower = createSprite(i,8300);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 6690; i < 7700; i = i + 120){
        stoneUpper = createSprite(i, 6980);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(7705, 6980);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform19 = createSprite(7200, 6998, 1170, 40);
    platform19.visible = false;
    Platform.add(platform19);

    movingPlatform21 = createSprite(6440, 6870);
    movingPlatform21.addImage(stoneMovingPlatform);
    movingPlatform21.scale = 0.48;
    StoneLower.add(movingPlatform21);

    pressurePad4 = createSprite(6440, 6827);
    pressurePad4.addImage('before', pressurePad1Image);
    pressurePad4.addImage('after', pressurePad2Image);
    pressurePad4.scale = 0.2;

    for(var i = 3120; i < 4910; i = i + 240){
        stoneLower = createSprite(i,7100);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 3090; i < 4860; i = i + 120){
        stoneUpper = createSprite(i,6970);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(4820,6970);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform20 = createSprite(3950, 6985, 1890, 40);
    platform20.visible = false;
    Platform.add(platform20);
 
    for(var i = 4000; i < 6600; i = i + 240){
        stoneLower = createSprite(i,6400);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 4000; i < 6600; i = i + 240){
        stoneLower = createSprite(i,6160);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    stoneLower = createSprite(6400,5920);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(4000,5920);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(4240,5920);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    for(var i = 4465; i < 6250; i = i + 120){
        stoneUpper = createSprite(i,6030);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    for(var i = 3970; i < 4300; i = i + 120){
        stoneUpper = createSprite(i,5800);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    platform21 = createSprite(5300, 6045, 2000, 40);
    platform21.visible = false;
    Platform.add(platform21);

    stoneUpper = createSprite(6200,6030);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper = createSprite(6370,5800);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    
    stoneUpper = createSprite(6430,5800);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    stoneUpper = createSprite(4270,5800);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform22 = createSprite(4125, 5815, 450, 40);
    platform22.visible = false;
    Platform.add(platform22);

    platform23 = createSprite(6400, 5815, 250, 40);
    platform23.visible = false;
    Platform.add(platform23);

    for(var i = 5600; i <= 6400; i = i + 240){
        stoneLower = createSprite(3400, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    pressurePad5 = createSprite(4000, 6960);
    pressurePad5.addImage('before', pressurePad1Image);
    pressurePad5.addImage('after', pressurePad2Image);
    pressurePad5.scale = 0.2;

    pushableBox6 = createSprite(4200, 6910);
    pushableBox6.addImage('before',pushableBox1Image);
    pushableBox6.addImage('after', pushableBox2Image);
    pushableBox6.scale = 0.28;
    spritePush6Left = createSprite(pushableBox6.x-50, pushableBox6.y, 30, 100);
    spritePush6Left.visible = false;
    spritePush6Right = createSprite(pushableBox6.x+50, pushableBox6.y, 30, 100);
    spritePush6Right.visible = false;

    movingPlatform22 = createSprite(3700, 6880);
    movingPlatform22.addImage(stoneMovingPlatform);
    movingPlatform22.scale = 0.38;
    // movingPlatform22.visible = false;
    StoneLower.add(movingPlatform22);

    door5 = createSprite(3400, 6750);
    door5.addImage('before',door1Image);
    door5.addImage('after',door2Image)
    door5.scale = 0.43;

    for(var i = 7100; i <= 8300; i = i + 240){
        stoneLower = createSprite(2600, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    stoneUpper = createSprite(2570, 6970);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(2630, 6970);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(2150, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(1750, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(1350, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(950, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(550, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(150, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(-250, 6970);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 190);
    Platform.add(stoneUpper);

    for(var i = 7100; i <= 8300; i = i + 240){
        stoneLower = createSprite(-700, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7100; i <= 8300; i = i + 240){
        stoneLower = createSprite(-940, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7100; i <= 8300; i = i + 240){
        stoneLower = createSprite(-1180, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -1210; i < -700; i = i + 120){
        stoneUpper = createSprite(i, 6970);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    /*stoneUpper = createSprite(-730, 6970);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;*/

    stoneUpper = createSprite(-670, 6970);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform24 = createSprite(-940, 6988, 720, 40);
    platform24.visible = false;
    Platform.add(platform24);

    for(var i = 7500; i < 9900; i = i + 240){
        stoneLower = createSprite(i, 11000);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7500; i < 9900; i = i + 240){
        stoneLower = createSprite(i, 11240);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 7500; i < 9900; i = i + 240){
        stoneLower = createSprite(i, 11480);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    stoneLower = createSprite(7500, 10880);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    stoneLower = createSprite(7300, 10745);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.4;
    StoneLower.add(stoneLower);

    for(var i = 10970; i < 11480; i = i + 240){
        stoneLower = createSprite(7300, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 5000; i < 7300; i = i + 240){
        stoneLower = createSprite(i, 10740);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 5000; i < 7300; i = i + 240){
        stoneLower = createSprite(i, 10970);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 5000; i < 7300; i = i + 240){
        stoneLower = createSprite(i, 11210);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 5000; i < 7300; i = i + 240){
        stoneLower = createSprite(i, 11450);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }
    
    for(var i = 4970; i <= 7300; i = i + 120){
        stoneUpper = createSprite(i, 10620);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(7333, 10620);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    for(var i = 9500; i < 10680; i = i + 100){
        stoneLower = createSprite(5800, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.2;
        StoneLower.add(stoneLower);
    }

    for(var i = 9500; i < 10400; i = i + 100){
        stoneLower = createSprite(7190, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.2;
        StoneLower.add(stoneLower);
    }

    stoneLower = createSprite(7190, 10380);
    stoneLower.addImage(stoneLowerImage);
    stoneLower.scale = 0.2;
    StoneLower.add(stoneLower);

    stoneUpper = createSprite(5983, 10400);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    for(var i = 6383; i < 7000; i = i + 220){
        stoneUpper = createSprite(i, 10400);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.5;
        stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(7000, 10400);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);


    for(var i = 5985; i < 6600; i = i + 220){
        stoneUpper = createSprite(i, 10200);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.5;
        stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(6600, 10200);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7000, 10200);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    for(var i = 6400; i < 7000; i = i + 220){
        stoneUpper = createSprite(i, 10000);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.5;
        stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(7000, 10000);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(5983, 10000);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    for(var i = 5985; i < 6600; i = i + 220){
        stoneUpper = createSprite(i, 9800);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.5;
        stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(6600, 9800);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(7000, 9800);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 440, 60);
    Platform.add(stoneUpper);

    for(var i = 7710; i < 9730; i = i + 120){
        stoneUpper = createSprite(i, 10870);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
    }

    stoneUpper = createSprite(9700, 10890);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;

    platform25 = createSprite(8700, 10887, 2150, 40);
    platform25.visible = false;
    Platform.add(platform25);

    stoneUpper = createSprite(4580, 10660);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 450, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(4070, 10800);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 450, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(3570, 11000);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 450, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(3070, 10800);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 450, 190);
    Platform.add(stoneUpper);

    stoneUpper = createSprite(2570, 10600);
    stoneUpper.addImage(stonePlatformMoving);
    stoneUpper.scale = 0.5;
    stoneUpper.setCollider('rectangle', 0, 20, 450, 190);
    Platform.add(stoneUpper);

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 10670);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 10910);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11150);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    
    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11390);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11630);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11870);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11870);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 2200; i = i + 240){
        stoneLower = createSprite(i, 11870);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = -100; i < 1000; i = i + 240){
        stoneLower = createSprite(i, 10540);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 9500; i < 12000; i = i + 240){
        stoneLower = createSprite(-340, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 9500; i < 12000; i = i + 240){
        stoneLower = createSprite(-580, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 9500; i < 12000; i = i + 240){
        stoneLower = createSprite(-820, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 9500; i < 12000; i = i + 240){
        stoneLower = createSprite(-1060, i);
        stoneLower.addImage(stoneLowerImage);
        stoneLower.scale = 0.4;
        StoneLower.add(stoneLower);
    }

    for(var i = 1080; i < 2100; i = i + 120){
        stoneUpper = createSprite(i, 10540);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
        stoneUpper.setCollider('rectangle', -20, 20, 410, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(2090, 10540);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', -20, 20, 410, 60);
    Platform.add(stoneUpper);

    for(var i = -140; i < 900; i = i + 120){
        stoneUpper = createSprite(i, 10410);
        stoneUpper.addImage(stoneUpperImage);
        stoneUpper.scale = 0.4;
        stoneUpper.setCollider('rectangle', -20, 20, 410, 60);
        Platform.add(stoneUpper);
    }

    stoneUpper = createSprite(890, 10410);
    stoneUpper.addImage(stoneUpperImage);
    stoneUpper.scale = 0.4;
    stoneUpper.setCollider('rectangle', -20, 20, 410, 60);
    Platform.add(stoneUpper);

    spitter9 = createSprite(4700, 6600);
    spitter9.addAnimation('walk',enemy1WalkAnim);
    spitter9.addAnimation("idle",enemy1IdleAnim);
    spitter9.addAnimation('death',enemy1DeathAnim);
    spitter9.addAnimation('attack',enemy1AttackAnim);
    spitter9.addAnimation('run',enemy1RunAnim);
    spitter9.scale = 0.5;
    spitter9.setCollider("rectangle", 10, 19, 150,100);

    spitter6 = createSprite(8260, 2400);
    spitter6.addAnimation('walk',enemy1WalkAnim);
    spitter6.addAnimation("idle",enemy1IdleAnim);
    spitter6.addAnimation('death',enemy1DeathAnim);
    spitter6.addAnimation('attack',enemy1AttackAnim);
    spitter6.addAnimation('run',enemy1RunAnim);
    spitter6.scale = 0.5;
    spitter6.setCollider("rectangle", 10, 19, 150,100);

    chomper1 = createSprite(8255, 550);
    chomper1.addImage('idle', chomperIdle);
    chomper1.addAnimation('attack', chomperAttack);
    chomper1.addAnimation('run', chomperRun);
    chomper1.scale = 0.6;
    chomper1.setCollider('rectangle', 0, 10, 110, 140);

    /*chomper2 = createSprite(7515, 200);
    chomper2.addImage('idle', chomperIdle);
    chomper2.addAnimation('attack', chomperAttack);
    chomper2.scale = 0.6;
    chomper2.debug = false;
    chomper2.setCollider('rectangle', 0, 0, 110, 120);*/

    switch2 = createSprite(7760, 1960);
    switch2.addImage('1', switch1Image);
    switch2.addImage('2', switch2Image);
    switch2.scale = 0.37;

    grass = createSprite(11470, 120);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    grass = createSprite(11620, 220);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 14500; i < 15000; i=i+150){
        mud = createSprite(i ,130);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 14530; i < 14900; i=i+100){
        grass = createSprite(i, 60);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(14917, 60);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 14500; i < 16000; i=i+150){
        mud = createSprite(i ,200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 14500; i < 16000; i=i+150){
        mud = createSprite(i ,300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 14500; i < 16000; i=i+150){
        mud = createSprite(i ,400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 14500; i < 16000; i=i+150){
        mud = createSprite(i ,500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 14500; i < 16000; i=i+150){
        mud = createSprite(i ,600);
        mud.addImage(mudImage);
        Mud.add(mud);
    }
    
    for(var i = 15150; i < 15800; i=i+100){
        grass = createSprite(i, 140);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(15820, 140);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);
    /*                                   */

    for(var i = 10900; i < 11400; i=i+150){
        mud = createSprite(i ,100);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 11550; i=i+150){
        mud = createSprite(i ,200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 11700; i=i+150){
        mud = createSprite(i ,300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 13000; i=i+150){
        mud = createSprite(i ,400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 13000; i=i+150){
        mud = createSprite(i ,500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 13000; i=i+150){
        mud = createSprite(i ,600);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 16000; i=i+150){
        mud = createSprite(i ,700);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 16000; i=i+150){
        mud = createSprite(i ,800);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10900; i < 16000; i=i+150){
        mud = createSprite(i ,900);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 10930; i < 11300; i=i+100){
        grass = createSprite(i ,30);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    for(var i = 11850; i < 12800; i=i+100){
        grass = createSprite(i ,320);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(12820 ,320);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    grass = createSprite(11320, 30);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    /*          SECOND VALLEY           */

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,600);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,700);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,800);
        mud.addImage(mudImage);
        Mud.add(mud);
    }
    grass = createSprite(16670 ,-930);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 17000; i < 18300; i=i+150){
        mud = createSprite(i ,900);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17030; i < 18200; i=i+100){
        grass = createSprite(i, 140);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(18167, 140);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    switch3 = createSprite(18160, 90);
    switch3.addImage('1', switch1Image);
    switch3.addImage('2', switch2Image);
    switch3.scale = 0.5;

    for(var i = 16400; i < 18300; i=i+150){
        mud = createSprite(i ,-750);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    mud = createSprite(16700 ,-850);
    mud.addImage(mudImage);
    Mud.add(mud);

    mud = createSprite(16550 ,-850);
    mud.addImage(mudImage);
    Mud.add(mud);

    mud = createSprite(16400 ,-850);
    mud.addImage(mudImage);
    Mud.add(mud);

    mud = createSprite(16550 ,-950);
    mud.addImage(mudImage);
    Mud.add(mud);

    mud = createSprite(16400 ,-950);
    mud.addImage(mudImage);
    Mud.add(mud);

    for(var i = 16900; i < 18150; i=i+100){
        grass = createSprite(i ,-830);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(18170 ,-830);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    grass = createSprite(16520 ,-1020);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    grass = createSprite(16430 ,-1020);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling1 = createSprite(16050, -970);
    GrassFalling1.addImage(movingPlatformg);
    GrassFalling1.scale = 0.4;

    GrassFalling2 = createSprite(15650, -970);
    GrassFalling2.addImage(movingPlatformg);
    GrassFalling2.scale = 0.4;

    GrassFalling3 = createSprite(15250, -970);
    GrassFalling3.addImage(movingPlatformg);
    GrassFalling3.scale = 0.4;

    GrassFalling4 = createSprite(14850, -970);
    GrassFalling4.addImage(movingPlatformg);
    GrassFalling4.scale = 0.4;

    GrassFalling5 = createSprite(14450, -970);
    GrassFalling5.addImage(movingPlatformg);
    GrassFalling5.scale = 0.4;

    for(var i = 13000; i < 14200; i=i+150){
        mud = createSprite(i ,-950);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 13000; i < 14200; i=i+150){
        mud = createSprite(i ,-850);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = -4000; i < -950; i=i+100){
        mud = createSprite(13000, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 13200; i < 14000; i=i+100){
        grass = createSprite(i ,-1000);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(14020 ,-1000);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    mud = createSprite(13900, -1200);
    mud.addImage(mudImage);
    mud.scale = 0.6;
    Mud.add(mud);

    mud = createSprite(14000, -1200);
    mud.addImage(mudImage);
    mud.scale = 0.6;
    Mud.add(mud);

    mud = createSprite(14100, -1200);
    mud.addImage(mudImage);
    mud.scale = 0.6;
    Mud.add(mud);

    grass = createSprite(13900 ,-1240);
    grass.addImage(grassImage);
    grass.scale = 0.15;
    grass.setCollider('rectangle', 7, 10, 1100, 80);
    Platform.add(grass);

    mud = createSprite(13800, -1280);
    mud.addImage(mudImage);
    mud.scale = 0.6;
    Mud.add(mud);

    mud = createSprite(13800, -1200);
    mud.addImage(mudImage);
    mud.scale = 0.6;
    Mud.add(mud);

    grass = createSprite(13800 ,-1326);
    grass.addImage(grassImage);
    grass.scale = 0.09;

    grass = createSprite(13800 ,-1320);
    grass.addImage(grassImage);
    grass.scale = 0.09;
    grass.setCollider('rectangle', 0, 0, 500, 70);
    Platform.add(grass);

    grass = createSprite(14065 ,-1240);
    grass.addImage(grassImage);
    grass.scale = 0.15;
    grass.setCollider('rectangle', 7, 10, 1100, 80);
    Platform.add(grass);

    GrassMovingPlatform1 = createSprite(18410, -800);
    GrassMovingPlatform1.addImage(movingPlatform1Image);
    GrassMovingPlatform1.scale = 0.4;
    Platform.add(GrassMovingPlatform1);


    for(var i = 19050; i < 20800; i=i+150){
        mud = createSprite(i, -400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 19050; i < 20800; i=i+150){
        mud = createSprite(i, -300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 19800; i < 20700; i=i+100){
        grass = createSprite(i ,-480);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(20670 ,-480);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 19050; i < 19800; i=i+150){
        mud = createSprite(i, -500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 19080; i < 19600; i=i+100){
        grass = createSprite(i ,-560);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(19617 ,-560);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling6 = createSprite(20950, -700);
    GrassFalling6.addImage(movingPlatformg);
    GrassFalling6.scale = 0.4;
    Platform.add(GrassFalling6);

    GrassFalling7 = createSprite(21350, -900);
    GrassFalling7.addImage(movingPlatformg);
    GrassFalling7.scale = 0.4;
    Platform.add(GrassFalling7);

    GrassFalling8 = createSprite(21750, -1100);
    GrassFalling8.addImage(movingPlatformg);
    GrassFalling8.scale = 0.4;
    Platform.add(GrassFalling8);

    GrassFalling9 = createSprite(22150, -1200);
    GrassFalling9.addImage(movingPlatformg);
    GrassFalling9.scale = 0.4;
    Platform.add(GrassFalling9);

    for(var i = 22500; i < 24000; i=i+150){
        mud = createSprite(i, -1210);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22500; i < 24000; i=i+150){
        mud = createSprite(i, -1110);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22500; i < 24000; i=i+150){
        mud = createSprite(i, -1010);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22530; i < 23800; i=i+100){
        grass = createSprite(i ,-1280);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(23820 ,-1280);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    door6 = createSprite(22570, -1500);
    door6.addImage('before',door1Image);
    door6.addImage('after',door2Image)
    door6.scale = 0.43; 

    for(var i = 26170; i < 26600; i=i+150){
        mud = createSprite(i, -1210);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 26170; i < 26600; i=i+150){
        mud = createSprite(i, -1110);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 26170; i < 26600; i=i+150){
        mud = createSprite(i, -1010);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 28950; i < 31000; i=i+150){
        mud = createSprite(i, -1110);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 28950; i < 31000; i=i+150){
        mud = createSprite(i, -1210);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 28950; i < 31000; i=i+150){
        mud = createSprite(i, -1110);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 28950; i < 31000; i=i+150){
        mud = createSprite(i, -1010);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22500; i < 31000; i=i+150){
        mud = createSprite(i, -910);
        mud.addImage(mudImage);
        Mud.add(mud);
    }
    
    GrassFalling10 = createSprite(24200, -1380);
    GrassFalling10.addImage(movingPlatformg);
    GrassFalling10.scale = 0.4;
    Platform.add(GrassFalling10);

    GrassFalling11 = createSprite(24700, -1380);
    GrassFalling11.addImage(movingPlatformg);
    GrassFalling11.scale = 0.4;
    Platform.add(GrassFalling11);

    GrassFalling12 = createSprite(25200, -1380);
    GrassFalling12.addImage(movingPlatformg);
    GrassFalling12.scale = 0.4;
    Platform.add(GrassFalling12);

    GrassFalling13 = createSprite(25700, -1380);
    GrassFalling13.addImage(movingPlatformg);
    GrassFalling13.scale = 0.4;
    Platform.add(GrassFalling13);

    for(var i = 26200; i < 26500; i=i+100){
        grass = createSprite(i ,-1280);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(26440 ,-1280);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling14 = createSprite(26900, -1380);
    GrassFalling14.addImage(movingPlatformg);
    GrassFalling14.scale = 0.4;
    Platform.add(GrassFalling14);

    GrassFalling15 = createSprite(27400, -1380);
    GrassFalling15.addImage(movingPlatformg);
    GrassFalling15.scale = 0.4;
    Platform.add(GrassFalling15);

    GrassFalling16 = createSprite(27900, -1380);
    GrassFalling16.addImage(movingPlatformg);
    GrassFalling16.scale = 0.4;
    Platform.add(GrassFalling16);

    GrassFalling17 = createSprite(28400, -1380);
    GrassFalling17.addImage(movingPlatformg);
    GrassFalling17.scale = 0.4;
    Platform.add(GrassFalling17);

    for(var i = 28980; i < 30800; i=i+100){
        grass = createSprite(i ,-1280);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(30866 ,-1280);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassMovingPlatform2 = createSprite(31110, -1300);
    GrassMovingPlatform2.addImage(movingPlatform1Image);
    GrassMovingPlatform2.scale = 0.4;
    Platform.add(GrassMovingPlatform2);

    GrassMovingPlatform3 = createSprite(31910, -1300);
    GrassMovingPlatform3.addImage(movingPlatform1Image);
    GrassMovingPlatform3.scale = 0.4;
    Platform.add(GrassMovingPlatform3);

    GrassMovingPlatform4 = createSprite(32510, -1300);
    GrassMovingPlatform4.addImage(movingPlatform1Image);
    GrassMovingPlatform4.scale = 0.4;
    Platform.add(GrassMovingPlatform4);

    for(var i = -3000; i < -1700; i=i+100){
        mud = createSprite(32510, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 33100; i < 33800; i=i+150){
        mud = createSprite(i, -1250);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 33130; i < 33700; i=i+100){
        grass = createSprite(i ,-1310);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(33670 ,-1310);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling18 = createSprite(34330, -1380);
    GrassFalling18.addImage(movingPlatformg);
    GrassFalling18.scale = 0.4;
    Platform.add(GrassFalling18);

    GrassFalling19 = createSprite(34850, -1380);
    GrassFalling19.addImage(movingPlatformg);
    GrassFalling19.scale = 0.4;
    Platform.add(GrassFalling19);

    GrassFalling20 = createSprite(35350, -1380);
    GrassFalling20.addImage(movingPlatformg);
    GrassFalling20.scale = 0.4;
    Platform.add(GrassFalling20);

    GrassFalling21 = createSprite(35850, -1380);
    GrassFalling21.addImage(movingPlatformg);
    GrassFalling21.scale = 0.4;
    Platform.add(GrassFalling21);

    for(var i = -1350; i < -700; i=i+100){
        mud = createSprite(36380, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    grass = createSprite(36380 ,-1400);
    grass.addImage(grassImage);
    grass.scale = 0.146;
    grass.setCollider('rectangle', 0, 10, 1100, 80);
    Platform.add(grass);

    for(var i = -1450; i < -700; i=i+100){
        mud = createSprite(36760, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }
    
    grass = createSprite(36760 ,-1520);
    grass.addImage(grassImage);
    grass.scale = 0.146;
    grass.setCollider('rectangle', 0, 10, 1100, 80);
    Platform.add(grass);

    for(var i = -3000; i < -2000; i=i+100){
        mud = createSprite(35000, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 35000; i < 36500; i=i+150){
        mud = createSprite(i, -2000);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 35200; i < 36300; i=i+100){
        grass = createSprite(i ,-2060);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(36315 ,-2060);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6000);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6100);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17000; i < 19000; i=i+150){
        mud = createSprite(i, 6500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 17030; i < 18900; i=i+100){
        grass = createSprite(i ,5930);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(18915 ,5930);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling22 = createSprite(19500, 6000);
    GrassFalling22.addImage(movingPlatformg);
    GrassFalling22.scale = 0.4;
    Platform.add(GrassFalling22);

    GrassFalling23 = createSprite(20000, 6300);
    GrassFalling23.addImage(movingPlatformg);
    GrassFalling23.scale = 0.4;
    Platform.add(GrassFalling23);

    GrassFalling24 = createSprite(20500, 6600);
    GrassFalling24.addImage(movingPlatformg);
    GrassFalling24.scale = 0.4;
    Platform.add(GrassFalling24);

    GrassFalling25 = createSprite(21000, 6300);
    GrassFalling25.addImage(movingPlatformg);
    GrassFalling25.scale = 0.4;
    Platform.add(GrassFalling25);

    GrassFalling26 = createSprite(21500, 6670);
    GrassFalling26.addImage(movingPlatformg);
    GrassFalling26.scale = 0.4;
    Platform.add(GrassFalling26);

    GrassFalling27 = createSprite(20500, 6100);
    GrassFalling27.addImage(movingPlatformg);
    GrassFalling27.scale = 0.4;
    Platform.add(GrassFalling27);

    GrassFalling28 = createSprite(21500, 6670);
    GrassFalling28.addImage(movingPlatformg);
    GrassFalling28.scale = 0.4;
    Platform.add(GrassFalling28);

    GrassFalling29 = createSprite(21500, 6670);
    GrassFalling29.addImage(movingPlatformg);
    GrassFalling29.scale = 0.4;
    Platform.add(GrassFalling29);

    GrassFalling30 = createSprite(20000, 5700);
    GrassFalling30.addImage(movingPlatformg);
    GrassFalling30.scale = 0.4;
    Platform.add(GrassFalling30);

    GrassFalling31 = createSprite(21000, 6900);
    GrassFalling31.addImage(movingPlatformg);
    GrassFalling31.scale = 0.4;
    Platform.add(GrassFalling31);

    GrassFalling32 = createSprite(21000, 5700);
    GrassFalling32.addImage(movingPlatformg);
    GrassFalling32.scale = 0.4;
    Platform.add(GrassFalling32);

    GrassFalling33 = createSprite(20500, 5400);
    GrassFalling33.addImage(movingPlatformg);
    GrassFalling33.scale = 0.4;
    Platform.add(GrassFalling33);

    GrassFalling34 = createSprite(20500, 5400);
    GrassFalling34.addImage(movingPlatformg);
    GrassFalling34.scale = 0.4;
    Platform.add(GrassFalling34);

    GrassFalling35 = createSprite(22000, 6300);
    GrassFalling35.addImage(movingPlatformg);
    GrassFalling35.scale = 0.4;
    Platform.add(GrassFalling35);

    GrassFalling36 = createSprite(22000, 5700);
    GrassFalling36.addImage(movingPlatformg);
    GrassFalling36.scale = 0.4;
    Platform.add(GrassFalling36);

    GrassFalling37 = createSprite(21500, 6000);
    GrassFalling37.addImage(movingPlatformg);
    GrassFalling37.scale = 0.4;
    Platform.add(GrassFalling37);

    GrassFalling38 = createSprite(21500, 6000);
    GrassFalling38.addImage(movingPlatformg);
    GrassFalling38.scale = 0.4;
    Platform.add(GrassFalling38);

    GrassFalling39 = createSprite(22500, 6000);
    GrassFalling39.addImage(movingPlatformg);
    GrassFalling39.scale = 0.4;
    Platform.add(GrassFalling39);

    GrassFalling40 = createSprite(21500, 5400);
    GrassFalling40.addImage(movingPlatformg);
    GrassFalling40.scale = 0.4;
    Platform.add(GrassFalling40);

    GrassFalling41 = createSprite(22500, 5400);
    GrassFalling41.addImage(movingPlatformg);
    GrassFalling41.scale = 0.4;
    Platform.add(GrassFalling41);

    GrassFalling42 = createSprite(22000, 5100);
    GrassFalling42.addImage(movingPlatformg);
    GrassFalling42.scale = 0.4;
    Platform.add(GrassFalling42);

    GrassFalling43 = createSprite(22690, 5100);
    GrassFalling43.addImage(movingPlatformg);
    GrassFalling43.scale = 0.4;
    Platform.add(GrassFalling43);

    for(var i = 23300; i < 24000; i=i+150){
        mud = createSprite(i, 5000);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    mud = createSprite(23200, 5000);
    mud.addImage(mudImage);
    Mud.add(mud);

    for(var i = 23230; i < 23900; i=i+100){
        grass = createSprite(i ,4940);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(23865 ,4940);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    GrassFalling44 = createSprite(24365, 5000);
    GrassFalling44.addImage(movingPlatformg);
    GrassFalling44.scale = 0.4;
    Platform.add(GrassFalling44);

    GrassFalling45 = createSprite(24865, 5000);
    GrassFalling45.addImage(movingPlatformg);
    GrassFalling45.scale = 0.4;
    Platform.add(GrassFalling45);

    GrassFalling46 = createSprite(25365, 5000);
    GrassFalling46.addImage(movingPlatformg);
    GrassFalling46.scale = 0.4;
    Platform.add(GrassFalling46);

    for(var i = 25860; i < 26800; i=i+150){
        mud = createSprite(i, 5000);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 25860; i < 26800; i=i+150){
        mud = createSprite(i, 5100);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 25860; i < 26800; i=i+150){
        mud = createSprite(i, 5200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 25860; i < 26800; i=i+150){
        mud = createSprite(i, 5300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 25860; i < 26800; i=i+150){
        mud = createSprite(i, 5400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 25890; i < 26700; i=i+100){
        grass = createSprite(i ,4940);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(26725 ,4940);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    for(var i = 23080; i < 23650; i=i+150){
        mud = createSprite(i, 9500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 9000; i < 10000; i=i+100){
        mud = createSprite(22460, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 9000; i < 10000; i=i+100){
        mud = createSprite(22610, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 9000; i < 10000; i=i+100){
        mud = createSprite(22760, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 9000; i < 10000; i=i+100){
        mud = createSprite(22910, i);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10000);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10100);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10200);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10300);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10400);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10500);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 22460; i < 26800; i=i+150){
        mud = createSprite(i, 10600);
        mud.addImage(mudImage);
        Mud.add(mud);
    }

    for(var i = 23110; i < 26500; i=i+100){
        grass = createSprite(i ,9930);
        grass.addImage(grassImage);
        grass.scale = 0.2;
        grass.setCollider('rectangle', 0, 35, 1100, 130);
        Platform.add(grass);
    }

    grass = createSprite(26625 ,9930);
    grass.addImage(grassImage);
    grass.scale = 0.2;
    grass.setCollider('rectangle', 0, 35, 1100, 130);
    Platform.add(grass);

    camera1 = createSprite(7270, 749, 20, 20);
    camera1.visible = false;

    camera2 = createSprite(windowWidth-windowWidth+580,windowHeight-windowHeight+ 3500, 10, 10);
    camera2.visible = false;

    camera3 = createSprite(1988, 3500, 10, 10);
    camera2.visible = true;

    left = createButton("<");
    left.position(400, 400);

    right = createButton(">");
    right.position(500, 400);

    space = createButton("space");
    space.position(500, 450);

    // dtjrxjthm

    player = createSprite(windowWidth-windowWidth+400, windowHeight-windowHeight+620);
    player.addAnimation("standing",player_idleAnimation);
    player.addAnimation('running',player_runningAnimation);
    player.addAnimation("jumping",player_jumpAnimation);
    player.addAnimation('gun', player_gunAnimation);
    player.addAnimation('sword', player_swordAnimation);
    player.scale = 1.3;
    
    info2 = createSprite(windowWidth-windowWidth+8600,windowHeight-windowHeight+1350);
    info2.addImage("before",info1Image);
    info2.addImage("after",info2Image);
    info2.scale = 0.5;
    info2.depth = player.depth;
    player.depth = player.depth+1;

    info3 = createSprite(windowWidth-windowWidth+9200,windowHeight-windowHeight+1320);
    info3.addImage("before",info1Image);
    info3.addImage("after",info2Image);
    info3.scale = 0.65;
    info3.depth = player.depth;
    player.depth = player.depth+1;

    cameraSprite = createSprite(player.x, player.y-30, 10, 10);
    cameraSprite.visible = false;
}

function draw(){

    background(0);

    console.log(player.x);

    image(sky2Image, -1000, 0, 11800, 4800);/* Sky Image */
    image(darkBgImage, 5500, 1800, 5000, 2500); 

    spitter1.velocityY = spitter1.velocityY+3;
    spitter2.velocityY = spitter2.velocityY+3;
    spitter3.velocityY = spitter3.velocityY+3;
    spitter4.velocityY = spitter4.velocityY+3;
    spitter5.velocityY = spitter5.velocityY+3;
    spitter6.velocityY = spitter6.velocityY+3;
    spitter7.velocityY = spitter7.velocityY+3;
    spitter8.velocityY = spitter8.velocityY+3;
    spitter9.velocityY = spitter9.velocityY+3;
    // dragon.velocityY = dragon.velocityY+3;
    // pushableBox2.velocityY = pushableBox2.velocityY+3;
    chomper1.velocityY  = chomper1.velocityY + 3;
    // chomper2.velocityY = chomper2.velocityY + 3;
    pushableBox1.velocityY = pushableBox1.velocityY + 3;
    pushableBox3.velocityY = pushableBox3.velocityY + 3;
    pushableBox4.velocityY = pushableBox4.velocityY + 3;

    spritePush1Right.x = pushableBox1.x+40;
    spritePush1Right.y = pushableBox1.y;

    spritePush1Left.x = pushableBox1.x-40;
    spritePush1Left.y = pushableBox1.y;

    spritePush2Right.x = pushableBox2.x+50;
    spritePush2Right.y = pushableBox2.y;

    spritePush2Left.x = pushableBox2.x-50;
    spritePush2Left.y = pushableBox2.y;

    spritePush3Right.x = pushableBox3.x+50;
    spritePush3Right.y = pushableBox3.y;

    spritePush3Left.x = pushableBox3.x-50;
    spritePush3Left.y = pushableBox3.y;

    spritePush4Right.x = pushableBox4.x+50;
    spritePush4Right.y = pushableBox4.y;

    spritePush4Left.x = pushableBox4.x-50;
    spritePush4Left.y = pushableBox4.y;

    if(player.x >= windowWidth-windowWidth+610 && player.x <= windowWidth-windowWidth+680){
        info1.changeImage("after",info2Image);
    }
    else{
        info1.changeImage("before",info2Image);
    }

    if(player.x >= info2.x - 10 && player.x <= info2.x + 15){
        info2.changeImage("after",info2Image);
    }
    else{
        info2.changeImage("before",info2Image);
    }

    if(player.y - cameraSprite.y >= 30){
        cameraSprite.y = player.y - 15;
    }
    if(cameraSprite.y - player.y >= 40){
        cameraSprite.y = player.y - 15;
    }
    if(player.x - cameraSprite.x >= 20){
        cameraSprite.x = player.x;
    }
    if(cameraSprite.x - player.x >= 20){
        cameraSprite.x = player.x;
    }

   /* if(player.x <= 10550 && player.y >= 1900){
        dragonVelocity = 7;
    }
    if(dragon.x >= player.x-430){
        dragonVelocity = 0;
        dragon.changeAnimation('landing', dragonLanding);
    }
    if(dragonVelocity === 0){
        dragon.changeAnimation('fireUp', dragonFireUp);
    }

    console.log(dragonVelocity);

    dragon.velocityX = dragonVelocity;*/

    player.changeAnimation('standing', player_idleAnimation);
    if(keyDown("RIGHT_ARROW")){
        player.x += 10;
        cameraSprite.x += 10;
        player.changeAnimation("running", player_runningAnimation);
        player.mirrorX(1);
    }
    if(keyDown("LEFT_ARROW")){
        player.x -= 10;
        cameraSprite.x -= 10;
        player.changeAnimation("running", player_runningAnimation);
        player.mirrorX(-1);
    }
    left.mousePressed(()=>{
        player.x -= 10;
        cameraSprite.x -= 10;
        player.changeAnimation("running", player_runningAnimation);
        player.mirrorX(-1);
    });

    right.mousePressed(()=>{
        player.x += 10;
        cameraSprite.x += 10;
        player.changeAnimation("running", player_runningAnimation);
        player.mirrorX(1);
    });

    space.mousePressed(()=>{
        player.y -= 30;
        cameraSprite.y -= 30;
        player.changeAnimation('jumping', player_jumpAnimation);
    });

    if(keyDown("Space")){
        player.y -= 30;
        cameraSprite.y -= 30;
        player.changeAnimation('jumping', player_jumpAnimation);
    }
    // looping, frameDelay

    if(keyDown(65)){
        player.changeAnimation('gun', player_gunAnimation);
    }
    if(keyDown(68)){
        player.changeAnimation('sword', player_swordAnimation);
    }
    // scale(no.); mirrorX(-1); 
    // animation(name, x, y) 

    player.velocityY = player.velocityY+3;

    if(movingPlatform1.x >= 2300){
        movingPlatform1.velocityX = -9;
    }
    else if(movingPlatform1.x <= 1750){
        movingPlatform1.velocityX = 9;
    }

    if(movingPlatform2.x >= 4800){
        movingPlatform2.velocityX = -14;
    }
    if(movingPlatform2.x <= 4050){
        movingPlatform2.velocityX = 14;
    }

    if(movingPlatform2.velocityX === 14 && player.isTouching(movingPlatform2)){
        player.velocityX = 14;
    }
    else if(movingPlatform2.velocityX === -14 && player.isTouching(movingPlatform2)){
        player.velocityX = -14;
    }

    
    
    if(spitter1.x <= 3389){
        spitter1Velocity = 2;
        spitter1.mirrorX(1);
    }
    else if(spitter1.x >= 3900){
        spitter1Velocity = -2;
        spitter1.mirrorX(-1);
    }

    if(spitter2.x <= 5640 || spitter2.x === 5633.6){
        spitter2Velocity = 5;
        spitter2.mirrorX(1);
    }
    else if(spitter2.x >= 7000){
        spitter2Velocity = -5;
        spitter2.mirrorX(-1);
    }
    if(spitter2Velocity === -5){
        spitter2.mirrorX(-1);
    }
    else if(spitter2Velocity === 5){ 
        spitter2.mirrorX(1);
    }
    
    if(spitter3.x <= 5700){
        spitter3Velocity = 6;
        spitter3.mirrorX(1);
    }
    else if(spitter3.x >= 7000){
        spitter3Velocity = -6;
        spitter3.mirrorX(-1);
    }

    if(spitter4.x <= 8340){
        spitter4Velocity += 6;
        spitter4.mirrorX(1);
    }
    else if(spitter4.x >= 8640){
        spitter4Velocity -= 6;
        spitter4.mirrorX(-1);
    }

    if(spitter5.x <= 7663){
        spitter5Velocity = 4;
        spitter5.mirrorX(1);
    }
    else if(spitter5.x >= 8480){
        spitter5Velocity = -4;
        spitter5.mirrorX(-1);
    }

    if(spitter5Velocity === -4){
        spitter5.mirrorX(-1);
    }
    else if(spitter5Velocity === 4){
        spitter5.mirrorX(1);
    }
    spitter5.velocityX = spitter5Velocity;

    if(spitter7.x <= 9600){
        spitter7Velocity = random(4,6);
        spitter7.mirrorX(1);
    }
    else if(spitter7.x >= 10370){
        spitter7Velocity = random(-4,-6);
        spitter7.mirrorX(-1);
    }
    if(spitter7Velocity >= -6 && spitter7Velocity <= -4){
        spitter7.mirrorX(-1);
    }
    else if(spitter7Velocity <= 6 && spitter7Velocity >= 4){
        spitter7.mirrorX(1);
    }
    spitter7.velocityX = spitter7Velocity;

    if(spitter8.x <= 9600){
        spitter8Velocity = random(4,6);
        spitter8.mirrorX(1);
    }
    else if(spitter8.x >= 10370){
        spitter8Velocity = random(-4,-6);
        spitter8.mirrorX(-1);
    }
    if(spitter8Velocity >= -6 && spitter8Velocity <= -4){
        spitter8.mirrorX(-1);
    }
    else if(spitter8Velocity <= 6 && spitter8Velocity >= 4){
        spitter8.mirrorX(1);
    }
    spitter8.velocityX = spitter8Velocity;
    

    /*if(spitter6.x <= 8260){
        spitter6Velocity = 7;
        spitter6.mirrorX(1);
    }
    /*else if(spitter5.x >= 8480){
        spitter5Velocity = -7;
        spitter5.mirrorX(-1);
    }*/

    spitter1.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= 3360 && player.x <= 3990){
        spitter1.changeAnimation('attack',enemy1AttackAnim);
        if(player.x <= spitter1.x){
            spitter1Velocity = -5;
            spitter1.mirrorX(-1);
        }
        if(player.x >= spitter1.x){
            spitter1Velocity = 5;
            spitter1.mirrorX(1);
        }
    }
    spitter1.velocityX = spitter1Velocity;

    spitter2.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= 5630 && player.x <= 7030){
        spitter2.changeAnimation('attack', enemy1AttackAnim);

        if(player.x <= spitter2.x){
            spitter2Velocity = -6;
            spitter2.mirrorX(-1);
        }
        else if(player.x >= spitter2.x){
            spitter2Velocity = 6;
            spitter2.mirrorX(1);
        }
    }
    spitter2.velocityX = spitter2Velocity;

    spitter3.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= 5630 && player.x <= 7030){
        spitter3.changeAnimation('attack', enemy1AttackAnim);

        if(player.x <= spitter3.x){
            spitter3Velocity = -6;
            spitter3.mirrorX(-1);
        }
        else if(player.x >= spitter3.x){
            spitter3Velocity = 6;
            spitter3.mirrorX(1);
        }
    }
    spitter3.velocityX = spitter3Velocity;

    spitter4.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= 8340 && player.x <= 8640 && player.y >= 395 && player.y <= 605){
        spitter4.changeAnimation('attack', enemy1AttackAnim);

        if(player.x <= spitter4.x){
            spitter4Velocity = -6;
            spitter4.mirrorX(-1);
        }
        else if(player.x >= spitter4.x){
            spitter4Velocity = 6;
            spitter4.mirrorX(1);
        }
    }
    spitter4.velocityX = spitter4Velocity;

    spitter5.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= 7638 && player.x <= 8480 && player.y >= 900){
        spitter5.changeAnimation('attack', enemy1AttackAnim);

        if(player.x <= spitter5.x){
            spitter5.velocityX = -6;
            spitter5.mirrorX(-1);
        }
        else if(player.x >= spitter5.x){
            spitter5.velocityX = 6;
            spitter5.mirrorX(1);
        }
    }

    spitter7.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= jail1.x && player.x <= jail2.x && player.y <= 3000){
        spitter7.changeAnimation('attack', enemy1AttackAnim);
        spitter7.visible = true;
        if(player.x <= spitter7.x){
            spitter7.velocityX = random(-4,-6);
            spitter7.mirrorX(-1);
        }
        else if(player.x >= spitter7.x){
            spitter7.velocityX = random(4,6);
            spitter7.mirrorX(1);
        }
    }

    spitter8.changeAnimation('walk', enemy1WalkAnim);
    if(player.x >= jail1.x && player.x <= jail2.x && player.y <= 3000){
        spitter8.changeAnimation('attack', enemy1AttackAnim);
        spitter8.visible = true;
        if(player.x <= spitter8.x){
            spitter8.velocityX = random(-4, -6);
            spitter8.mirrorX(-1);
        }
        else if(player.x >= spitter8.x){
            spitter8.velocityX = random(4, 6);
            spitter8.mirrorX(1);
        }
    }


    if(player.x >= 5160 && player.x <= 5240 && player.y <= 800){
        pressurePad1.changeImage("after",pressurePad2Image);
        pressurePad1.x = 5200;
        pressurePad1.y = 599;
        
        door1.changeImage('after', door2Image);
        door1.velocityY = 3;
    }

    if(door1.y >= 770){
        door1.destroy();
    }


    /*if(pressurePad2.y === 595){
        door2.changeImage('after', door2Image);
        door2.velocityY = 3;

        camera.position.y = 1500;
        camera.position.x = door2.x;
    }
    else{
        door2.changeImage('before', door1Image);
        door2.velocityY = 0;
        door2.y = 1267;
    }

    if(door2.y >= 1390){
        camera.position.x = cameraSprite.x;
        camera.position.y = cameraSprite.y;
    }

    if(player.y >= 785){
        camera.position.x = cameraSprite.x;
        camera.position.y = cameraSprite.y;
    }*/

    /*if(player.y >= 900){
        camera.position.x = cameraSprite.x;
        camera.position.y = cameraSprite.y;
    }*/

    if(player.isTouching(pressurePad2)){
        pressurePad2.changeImage("after",pressurePad2Image);
        pressurePad2.x = 8500;
        pressurePad2.y = 595;
    }
    else if(pushableBox1.x <= pressurePad2.x+10 && pushableBox1.x >= pressurePad2.x-10){
        pressurePad2.changeImage("after",pressurePad2Image);
        pressurePad2.x = 8500;
        pressurePad2.y = 595;
        
        pushableBox1.y = 540;
        pushableBox1.velocityY = pushableBox1.velocityY + 0;
        pushableBox1.changeImage('after', pushableBox2Image);
    }
    else{
        pushableBox1.y = 544;
        pushableBox1.changeImage('before', pushableBox1Image);
        pushableBox1.velocityY = pushableBox1.velocityY + 3;

        pressurePad2.changeImage('before', pressurePad1Image);
        pressurePad2.x = 8500;
        pressurePad2.y = 600;
    }


    if(player.y <= switch1.y){
        switch1.changeImage('2', switch2Image);
        switch1.x = 9615.01;
    }

    if(switch1.x === 9615.01){
        movingPlatform3.visible = true;
        player.collide(movingPlatform3);
    }

    if(player.y <= switch2.y){
        switch2.changeImage('2', switch2Image);
        switch2.x = 7760.01;
    }

    /*if(switch2.x === 7760.01){
        stoneLower3.velocityX = 4;
        stoneUpper1.velocityX = 4;
        stoneUpper2.velocityX = 4
    }*/

    if(player.isTouching(pressurePad3)){
        pressurePad3.changeImage("after",pressurePad2Image);

        pressurePad3.x = 9600;
        pressurePad3.y = 2550;
    }
    else if(pushableBox2.x <= pressurePad3.x+10 && pushableBox2.x >= pressurePad3.x-10){
        pressurePad3.changeImage("after",pressurePad2Image);
        pressurePad3.x = 9600;
        pressurePad3.y = 2550;

        pushableBox2.changeImage('after', pushableBox2Image);
    }
    else{
        pushableBox2.changeImage('before', pushableBox1Image);

        pressurePad3.changeImage('before', pressurePad1Image);
        pressurePad3.x = 9600;
        pressurePad3.y = 2555;
    }

    if(pressurePad3.y === 2350){
        movingPlatform3Velocity = -6;
    }
    else{
        movingPlatform3Velocity = 0;
    }

    if(movingPlatform3.x <= 8535){
        movingPlatform3Velocity = 6;
    }
    else if(movingPlatform3.x >= 9199){
        movingPlatform3Velocity = -6;
    }

    movingPlatform3.velocityX = movingPlatform3Velocity;

    if(player.isTouching(spritePush1Left) && keyDown(RIGHT_ARROW)){
        pushableBox1.x += 10;
    }
    else if(player.isTouching(spritePush1Right) && keyDown(LEFT_ARROW)){
        pushableBox1.x -= 3;
    }

    if(player.isTouching(spritePush2Left) && keyDown(RIGHT_ARROW)){
        pushableBox2.x += 10;
    }
    else if(player.isTouching(spritePush2Right) && keyDown(LEFT_ARROW)){
        pushableBox2.x -= 3;
    }

    if(player.isTouching(spritePush3Left) && keyDown(RIGHT_ARROW)){
        pushableBox3.x += 10;
    }
    else if(player.isTouching(spritePush3Right) && keyDown(LEFT_ARROW)){
        pushableBox3.x -= 3;
    }

    if(player.isTouching(spritePush4Left) && keyDown(RIGHT_ARROW)){
        pushableBox4.x += 10;
    }
    else if(player.isTouching(spritePush4Right) && keyDown(LEFT_ARROW)){
        pushableBox4.x -= 3;
    }

    if(player.x >= key1.x - 5 && player.x <= key1.x + 5 && player.y >= 800){

        key1.visible = false;
        key1.x = 500;

        mainDoor.changeImage('1',mainDoor1Image);
    }
    if(movingPlatform1.velocityX === 9 && player.isTouching(movingPlatform1)){
        player.x += 9;
    }
    else if(movingPlatform1.velocityX === -9 && player.isTouching(movingPlatform1)){
        player.x -= 9;
    }

    info3.changeImage("before",info2Image);
    if(player.x >= info3.x - 10 && player.x <= info3.x + 15){
        info3.changeImage("after",info2Image);

        camera.position.x = 8500;
        camera.position.y = 400;

       grass1Velocity = -2;
       grass2Velocity = -2;

    }
    if(grass1.x <= 8870 || grass2.x <= 8870){
        grass1Velocity = 0;
        grass2Velocity = 0;

        camera.position.x = 6910;
        camera.position.y = 1175;

        stoneLower1.velocityY = -4;
        stoneLower2.velocityY = 4;
    }

    grass1.velocityX = grass1Velocity;
    grass2.velocityX = grass2Velocity;

    if(chomper1.x <= 7460){
        chomper1Velocity = 9;
        chomper1.mirrorX(1);
    }else if(chomper1.x >= 8250){
        chomper1Velocity = -9;
        chomper1.mirrorX(-1);
    }
    

    chomper1.changeAnimation('run', chomperRun);
    if(player.x >= 7465 && player.x <= 8245 && player.y >= 395 && player.y <= 605){
        chomper1.changeAnimation('attack', chomperAttack);
        var chomper1Velocity2 = 0;
        chomper1.velocityX = chomper1Velocity2;

        if(player.x < chomper1.x){
            chomper1.mirrorX(-1);
        }

        if(player.x > chomper1.x){
            chomper1.mirrorX(1);
        }
        
        
    }else{
        chomper1.velocityX = chomper1Velocity;
    }
    if(chomper1.velocityX === chomper1Velocity){
        if(chomper1Velocity === -9){
            chomper1.mirrorX(-1);
        }else if(chomper1Velocity === 9){
            chomper1.mirrorX(1);
        }
    }
        /*
    if(chomper1.x === 8020.01){
        bubble = createSprite(chomper1.x + 18, chomper1.y+10);
        bubble.addAnimation("bubble1",bubbleA);
        bubble.scale = 0.2;
        bubble.velocityX = random(6,8);
        bubble.velocityY = random(1,8);
    }*/

    

    /*chomper2.changeAnimation('idle', chomperIdle);
    chomper2.x = 7515;
    if(player.x <= 7890 && player.x >= chomper2.x){
        chomper2.x = 7515.01;
        chomper2.changeAnimation('attack', chomperAttack);
    }
    if(chomper2.x === 7515.01){
        bubble = createSprite(chomper2.x + 18, chomper2.y+10);
        bubble.addAnimation("bubble1",bubbleA);
        bubble.scale = 0.2;
        bubble.velocityX = random(6,8);
        bubble.velocityY = random(1,8);
    }*/

    if(player.y >= 1000 && player.x <= 7394 && player.x >= 7000){
        player.x = -60;
        player.y = 3450;
    }

    if(player.x <= camera2.x){
        if(player.x <= 580 && player.y >= 3100){
            camera.position.x = camera2.x;
            camera.position.y = cameraSprite.y;
        }else{
            camera.position.x = cameraSprite.x;
            camera.position.y = cameraSprite.y;
            camera.zoom = 01;
        }
    }

    if(player.x >= 1988){
        if(player.x >= 1988 && player.y >= 3100){
            camera.position.x = camera3.x;
            camera.position.y = cameraSprite.y;
        }else{
            camera.position.x = cameraSprite.x;
            camera.position.y = cameraSprite.y;
            camera.zoom = 01;
        }
    }

    if(player.y <= 1500 && player.y >= 0){

        if(player.y >= 730 && player.y <= 1100 && player.x <= 7394 && player.x >= 7000){
            camera.position.x = camera1.x;
        }else{
            camera.position.x = cameraSprite.x;
            camera.position.y = cameraSprite.y;
            camera.zoom = 01;
        }
    }


    

    /*if(player.x >= 7700){
        camera.x = cameraSprite.x;
        camera.y = cameraSprite.y;
    }*/
    
    player.velocityX = 0;

    collider();
    movingPlatformCollide();

    movingPlatforms();

    drawSprites();


    fill('red');
    text(mouseX+","+mouseY,3000,300);
}

function collider(){
    player.collide(Platform);
    player.collide(Mud);
    player.collide(door1);
    player.collide(pushableBox1);
    player.collide(pushableBox2);
    player.collide(StoneLower);
    player.collide(alienBlock1);
    player.collide(alienBlock1sprite);
    // player.collide(door2);
    // player.collide(door3);h
    player.collide(pushableBox3);
    player.collide(pushableBox4);

   /* dragon.collide(Grass);
    dragon.collide(Mud);
    dragon.collide(door1);
    dragon.collide(pushableBox1);
    dragon.collide(StoneLower);
    dragon.collide(alienBlock1);
    dragon.collide(alienBlock1sprite);
*/

    pushableBox1.collide(Platform);

    spitter1.collide(Platform);
    spitter1.collide(Mud);

    spitter2.collide(Grass);
    spitter2.collide(Mud);
    spitter2.collide(door1);
    spitter2.collide(Platform);

    spitter3.collide(Grass);
    spitter3.collide(Mud);
    spitter3.collide(door1);
    spitter3.collide(Platform);
    
    spitter4.collide(Platform);
    spitter4.collide(Mud);
    spitter4.collide(door1);
    spitter4.collide(pushableBox1);

    spitter5.collide(Grass);
    spitter5.collide(Mud);
    spitter5.collide(door2);
    spitter5.collide(StoneLower);

    spitter7.collide(Grass);
    spitter7.collide(Mud);
    spitter7.collide(door1);
    spitter7.collide(pushableBox1);
    spitter7.collide(pushableBox2);
    spitter7.collide(StoneLower);
    spitter7.collide(alienBlock1);
    spitter7.collide(alienBlock1sprite);
    spitter7.collide(door2);
    spitter7.collide(door3);
    spitter7.collide(pushableBox3);
    spitter7.collide(pushableBox4);

    spitter8.collide(Grass);
    spitter8.collide(Mud);
    spitter8.collide(door1);
    spitter8.collide(pushableBox1);
    spitter8.collide(pushableBox2);
    spitter8.collide(StoneLower);
    spitter8.collide(alienBlock1);
    spitter8.collide(alienBlock1sprite);
    spitter8.collide(door2);
    spitter8.collide(door3);
    spitter8.collide(pushableBox3);
    spitter8.collide(pushableBox4);

    pushableBox1.collide(Mud);
    pushableBox1.collide(StoneLower);

    pushableBox2.collide(Mud);
    pushableBox2.collide(StoneLower);

    spitter6.collide(Grass);
    spitter6.collide(Mud);
    spitter6.collide(door1);
    spitter6.collide(pushableBox1);
    spitter6.collide(pushableBox2);
    spitter6.collide(StoneLower);
    spitter6.collide(alienBlock1);
    spitter6.collide(alienBlock1sprite);

    chomper1.collide(Platform);
    chomper1.collide(Mud);
    chomper1.collide(door1);
    chomper1.collide(pushableBox1);
    chomper1.collide(pushableBox2);
    chomper1.collide(StoneLower);
    chomper1.collide(alienBlock1);
    chomper1.collide(alienBlock1sprite);
    chomper1.collide(pushableBox1);

    /*chomper2.collide(Grass);
    chomper2.collide(Mud);
    chomper2.collide(door1);
    chomper2.collide(pushableBox1);
    chomper2.collide(pushableBox2);
    chomper2.collide(StoneLower);
    chomper2.collide(alienBlock1);
    chomper2.collide(alienBlock1sprite);*/

    pushableBox3.collide(Grass);
    pushableBox3.collide(Mud);
    pushableBox3.collide(door1);
    pushableBox3.collide(pushableBox1);
    pushableBox3.collide(pushableBox2);
    pushableBox3.collide(StoneLower);
    pushableBox3.collide(alienBlock1);
    pushableBox3.collide(alienBlock1sprite);

    pushableBox4.collide(Grass);
    pushableBox4.collide(Mud);
    pushableBox4.collide(door1);
    pushableBox4.collide(pushableBox1);
    pushableBox4.collide(pushableBox2);
    pushableBox4.collide(StoneLower);
    pushableBox4.collide(alienBlock1);
    pushableBox4.collide(alienBlock1sprite);
}

function movingPlatforms(){

    if(movingPlatform4.y >= 8900){
        movingPlatform4.velocityY = -25;
    }
    else if(movingPlatform4.y <= 8550){
        movingPlatform4.velocityY = 25;
    }

    if(movingPlatform5.y >= 8500){
        movingPlatform5.velocityY = -25;
    }
    else if(movingPlatform5.y <= 8030){
        movingPlatform5.velocityY = 25;
    }

    if(movingPlatform6.y >= 8880){
        movingPlatform6.velocityY = -25;
    }
    else if(movingPlatform6.y <= 8425){
        movingPlatform6.velocityY = 25;
    }

    if(movingPlatform7.y >= 8800){
        movingPlatform7.velocityY = -25;
    }
    else if(movingPlatform7.y <= 8400){
        movingPlatform7.velocityY = 25;
    }

    if(movingPlatform8.y >= 8700){
        movingPlatform8.velocityY = -25;
    }
    else if(movingPlatform8.y <= 8350){
        movingPlatform8.velocityY = 25;
    }

    if(movingPlatform9.y >= 8300){
        movingPlatform9.velocityY = -25;
    }
    else if(movingPlatform9.y <= 8000){
        movingPlatform9.velocityY = 25;
    }

    if(movingPlatform10.y >= 8300){
        movingPlatform10.velocityY = -25;
    }
    else if(movingPlatform10.y <= 8150){
        movingPlatform10.velocityY = 25;
    }

    if(movingPlatform11.y >= 7900){
        movingPlatform11.velocityY = -25;
    }
    else if(movingPlatform11.y <= 7500){
        movingPlatform11.velocityY = 25;
    }

    if(movingPlatform12.y >= 8300){
        movingPlatform12.velocityY = -25;
    }
    else if(movingPlatform12.y <= 7900){
        movingPlatform12.velocityY = 25;
    }

    if(movingPlatform13.y >= 8250){
        movingPlatform13.velocityY = -25;
    }
    else if(movingPlatform13.y <= 7850){
        movingPlatform13.velocityY = 25;
    }

    if(movingPlatform14.y >= 7880){
        movingPlatform14.velocityY = -25;
    }
    else if(movingPlatform14.y <= 7650){
        movingPlatform14.velocityY = 25;
    }

    if(movingPlatform15.y >= 8050){
        movingPlatform15.velocityY = -25;
    }
    else if(movingPlatform15.y <= 7875){
        movingPlatform15.velocityY = 25;
    }

    if(movingPlatform16.y >= 7400){
        movingPlatform16.velocityY = -25;
    }
    else if(movingPlatform16.y <= 7075){
        movingPlatform16.velocityY = 25;
    }

    if(movingPlatform17.y >= 7800){
        movingPlatform17.velocityY = -25;
    }
    else if(movingPlatform17.y <= 7225){
        movingPlatform17.velocityY = 25;
    }

    if(movingPlatform18.y >= 7750){
        movingPlatform18.velocityY = -25;
    }
    else if(movingPlatform18.y <= 7100){
        movingPlatform18.velocityY = 25;
    }

    if(movingPlatform19.y >= 7480){
        movingPlatform19.velocityY = -25;
    }
    else if(movingPlatform19.y <= 7030){
        movingPlatform19.velocityY = 25;
    }

    if(movingPlatform20.y >= 7480){
        movingPlatform20.velocityY = -25;
    }
    else if(movingPlatform20.y <= 7030){
        movingPlatform20.velocityY = 25;
    }

    if(player.y - movingPlatform9.y >= 95 && player.collide(movingPlatform9)){
        player.velocityY = 2;
    }

    
    // else if
    // console.warn(" ");?
    // console.error("");

}

function movingPlatformCollide(){
    
    player.bounce(movingPlatform4);
    player.collide(movingPlatform5);
    player.collide(movingPlatform6);
    player.collide(movingPlatform7);
    player.collide(movingPlatform8);
    player.bounce(movingPlatform9);
    player.collide(movingPlatform10);
    player.collide(movingPlatform11);
    player.collide(movingPlatform12);
    player.collide(movingPlatform13);
    player.collide(movingPlatform14);
    player.collide(movingPlatform15);
    player.collide(movingPlatform16);
    player.collide(movingPlatform17);
    player.collide(movingPlatform18);
    player.collide(movingPlatform19);
    player.collide(movingPlatform20);
    
}