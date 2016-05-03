GuardEnemy = function(game, x, y, thought){
    Phaser.Sprite.call(this, game, x, y, 'guard');
    
    this.thought = thought;
    this.inputEnabled = true;
    this.events.onInputDown.add(listener, this);
    
    this.animations.add('sleep', [7]);
    this.animations.add('wake', [3]);
    this.animations.add('up', [6, 7]);
    this.animations.add('down', [2,3]);
    this.animations.add('left', [4,5]);
    this.animations.add('right', [0, 1]);
    
    var path = [[]];
    this.asleep = 0;
    var follow = 1;
    this.movespeedx = 0;
    this.movespeedy = 0;
    
    game.add.existing(this);
}

GuardEnemy.prototype = Object.create(Phaser.Sprite.prototype);
GuardEnemy.prototype.constructor = GuardEnemy;

GuardEnemy.prototype.update = function(){
    if(this.asleep == 0)
    {
        this.body.velocity.set(this.movespeedx,this.movespeedy);
        if(this.follow == 1)
        {
        }
    }
    if(this.asleep == 1)
    {
        this.animations.play('sleep', 10, false, false);
        this.body.velocity.set(0);
    }
    if(this.movespeedx == 0 && this.movespeedy == 0 && this.asleep == 0)
    {
        this.animations.play('wake', 10, true, false);
    }
    else if(this.movespeedx > 0)
    {
        this.animations.play('right', 10, true, false);
    }
    else if(this.movespeedx < 0)
    {
        this.animations.play('left', 10, true, false);
    }
     else if(this.movespeedy < 0)
    {
        this.animations.play('up', 10, true, false);
    }
     else if(this.movespeedx < 0)
    {
        this.animations.play('down', 10, true, false);
    }
}


var game = new Phaser.Game(600, 400, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('woods', 'assets/base.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/desert.png');
    game.load.spritesheet('player', 'assets/soldier.png', 25, 25);
    game.load.spritesheet('guard', 'assets/enemy.png', 25, 25);
    game.load.spritesheet('alarm', 'assets/Alarm.png', 32, 32);
    game.load.image('c', 'assets/c.png');
    game.load.spritesheet('goal', 'assets/Safe.png', 32, 32);
    game.load.image('key', 'assets/key.png');
    game.load.audio("alarm", 'assets/Warning.mp3');
    game.load.audio("music", 'assets/Music.mp3');
    game.load.audio("yay", 'assets/yay.mp3');
}

var alarm2;
var music;
var yay;

var level;
var map;
var tileset;
var layer;
var p;
var cursors;
var numbers;
var guard1;
var oneSleep = 0;
var twoSleep = 0;
var threeSleep = 0;
var playerState = 0;
var guard2;
var guard3;
var guard4;
var guard5;
var guard6;
var guard2State = 0;

var guards;
var movers;
var up;
var down;
var left;
var right;
var subject;

var guard3Move;
var guard2Move;

var alarm;
var target = p;
var help;
var mindText1 = "If that alarm breaks one more time, I'm outta' here!";
var mindText2 = "I have to check on the alarm.";
var mindText3 = "The target can use mind reading, telekinesis, and hypnosis. Got it.";

var timer;
var timer2;
var timer3;

//collision markers
var c1;
var c2;
var c3;
var c4;
var c5;
var c6;

var key;
var key2;
var haveKey = 0;
var haveKey2 = 0;

function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('woods');

    map.addTilesetImage('Desert', 'tiles');

    //  14 = ? block
    //map.setCollisionBetween(14, 15);
    
    layer = map.createLayer('Tile Layer 1');

    //map.setCollisionBetween(15, 16);
    //map.setCollisionBetween(20, 25);
    //map.setCollisionBetween(27, 29);
    map.setCollision(10);
    map.setCollision(41);
    map.setCollision(42);
    map.setCollision(33);
    map.setCollision(43);
    map.setCollision(35);
    map.setCollision(48);
    map.setCollision(25);
    map.setCollision(26);
    map.setCollision(27);
    
    

    //  Un-comment this on to see the collision tiles
    //layer.debug = true;

    layer.resizeWorld();

    p = game.add.sprite(0, 1000, 'player');
    guard1 = new GuardEnemy(game, 224, 544, "I wish there was a pub round 'ere");
    guard2 = new GuardEnemy(game, 192, 320, "I wish there was a pub round 'ere");
    guard3 = new GuardEnemy(game, 230, 160, "I wish there was a pub round 'ere");
    guard4 = new GuardEnemy(game, 288, 64, "Who puts a key in a break room?");
    guard5 = new GuardEnemy(game, 256, 64, "If we're guarding the key, then who's on break?");
    guard6 = new GuardEnemy(game, 224, 64, "Coffee's pretty good, though");
    var guard7 = new GuardEnemy(game, 896, 448, "It takes two keys to open the weapons vault? I only know about one of them.");
    alarm = game.add.sprite(800, 192, 'alarm');
    
    
    music = game.add.audio("music");
    alarm2 = game.add.audio("alarm");
    yay = game.add.audio("yay");
    
    guards = game.add.group();
    guards.add(guard1);
    guards.add(guard2);
    guards.add(guard3);
    guards.add(guard4);
    guards.add(guard5);
    guards.add(guard6);
    guards.add(guard7);
    
    movers = game.add.group();
    up = game.add.group();
    down = game.add.group();
    left = game.add.group();
    right = game.add.group();
    c1 = game.add.sprite(192, 320, 'c');
    c2 = game.add.sprite(254, 160, 'c');
    c3 = game.add.sprite(192, 160, 'c');
    c4 = game.add.sprite(254, 320, 'c');
    c5 = game.add.sprite(384, 64, 'c');
    c6 = game.add.sprite(360, 256, 'c');
    var c11 = game.add.sprite(896, 448, 'c');
    var c12 = game.add.sprite(448, 448, 'c');
    right.add(c1);
    left.add(c2);
    down.add(c3);
    up.add(c4);
    down.add(c5);
    right.add(c6);
    left.add(c11);
    right.add(c12);
    
    
    goal = game.add.sprite(576, 0, 'goal');
    key = game.add.sprite(192, 64, 'key');
    key2 = game.add.sprite(1056, 384, 'key');

    game.physics.enable(p);
    game.physics.enable(guard1);
    game.physics.enable(guard2);
    game.physics.enable(guard3);
    game.physics.enable(guard4);
    game.physics.enable(guard5);
    game.physics.enable(guard6);
    game.physics.enable(guard7);
    
    game.physics.enable(c1);
    game.physics.enable(c2);
    game.physics.enable(c3);
    game.physics.enable(c4);
    game.physics.enable(c5);
    game.physics.enable(c6);
    game.physics.enable(c11);
    game.physics.enable(c12);
    
    game.physics.enable(key);
    game.physics.enable(key2);
    game.physics.enable(goal);
    
    p.animations.add('left', [0,1,2,3]);
    p.animations.add('right', [4,5,6,7]);
    p.animations.add('up', [12,13,14,15]);
    p.animations.add('down', [8,9,10, 11]);

    guard1.animations.add('sleep', [7]);
    guard2.animations.add('sleep', [7]);
    guard3.animations.add('sleep', [7]);
    
    guard1.animations.add('wake', [3]);
    guard2.animations.add('wake', [3]);
    guard3.animations.add('wake', [3]);
    
    alarm.animations.add('active', [0,1,2]);
    goal.animations.add('open', [0,1,2]);
    
    guard1.inputEnabled = true;
    guard1.events.onInputDown.add(listener, this);
    
    guard2.inputEnabled = true;
    guard2.events.onInputDown.add(listener, this);
    
    guard3.inputEnabled = true;
    guard3.events.onInputDown.add(listener, this);
    
    alarm.inputEnabled = true;
    alarm.events.onInputDown.add(listener, this);
    
    //timer = game.time.create(false);
    //timer.loop(Phaser.Timer.SECOND*3, timerLoop, this);
    //timer.start();
    //timer.pause();
    
    //timer2 = game.time.create(false);
    //timer2.loop(Phaser.Timer.SECOND*3,timerLoop2,this);
    //timer2.start();
    //timer2.pause();
    
    //timer3 = game.time.create(false);
    //timer3.loop(Phaser.Timer.SECOND*3,timerLoop3,this);
    //timer3.start();
    //timer3.pause();


    //game.physics.arcade.gravity.y = 250;

    p.body.bounce.y = 0.2;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;
    
    help = game.add.text(16, 16, 'a', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;

    game.camera.follow(p);
    
        
    //var easystar = new EasyStar.js();

    //easystar.setGrid(level);
    //easystar.setAcceptableTiles([30, 34]);
    //easystar.enableDiagonals();


    cursors = game.input.keyboard.createCursorKeys();
    numbers = {one: game.input.keyboard.addKey(Phaser.Keyboard.ONE), two: game.input.keyboard.addKey(Phaser.Keyboard.TWO), three: game.input.keyboard.addKey(Phaser.Keyboard.THREE), four: game.input.keyboard.addKey(Phaser.Keyboard.FOUR), five: game.input.keyboard.addKey(Phaser.Keyboard.FIVE), six: game.input.keyboard.addKey(Phaser.Keyboard.SIX), seven: game.input.keyboard.addKey(Phaser.Keyboard.SEVEN), eight: game.input.keyboard.addKey(Phaser.Keyboard.EIGHT), nine: game.input.keyboard.addKey(Phaser.Keyboard.NINE), zero: game.input.keyboard.addKey(Phaser.Keyboard.ZERO)};
    
    music.play();

}

function update() {
    
    game.physics.arcade.collide(p, layer);
    
    if(checkOverlap(p, key))
    {
        yay.play();
        key.kill()
        haveKey = 1;
    }
    
    if(checkOverlap(p,key2))
    {
        yay.play();
        key2.kill();
        haveKey2 = 1;
    }
    
    if(game.physics.arcade.collide(p,guards))
    {
        if(guards.asleep == 1)
        {
            guards.asleep = 0;
            guards.animations.play('wake', 10, false, false);
        }
        guards.setAll('body.velocity',0);
        playerState = 4;
        help.text = "GAME OVER";
    }
    
    game.physics.arcade.overlap(guards, up, collisionHandler, null, this);
    game.physics.arcade.overlap(guards, down, collisionHandler2, null, this);
    game.physics.arcade.overlap(guards, left, collisionHandler3, null, this);
    game.physics.arcade.overlap(guards, right, collisionHandler4, null, this);

    p.body.velocity.set(0);
    if(playerState == 0)
    {
        help.text = "Press 1 to Read Minds, 2 to activate alarms, 3 to hypnotize guards.";
        if (cursors.left.isDown)
        {
            p.animations.play('left', 10, false, false);
            p.body.velocity.x = -100;   
        }
        else if (cursors.right.isDown)
        {
            p.animations.play('right', 10, false, false);
            p.body.velocity.x = 100;
        }
        else if (cursors.up.isDown)
        {
            p.animations.play('up', 10, false, false);
            p.body.velocity.y = -100;
        }
        else if (cursors.down.isDown)
        {
            p.animations.play('down', 10, false, false);
            p.body.velocity.y = 100;
        }
        else if (numbers.one.isDown)
        {
            playerState = 1;
            target = p;
        }
        else if (numbers.two.isDown)
        {
            playerState = 2;
            target = p;
        }
        else if (numbers.three.isDown)
        {
            playerState = 3;
            target = p;
        }
    } 
    if(playerState == 1)
    {
        if(target == p)
        {
           help.text = "Third Eye/Mind Reading";
        }
        if (cursors.left.isDown)
        {
            playerState = 0;  
            target = p;
        }
        else if (cursors.right.isDown)
        {
            playerState = 0;
            target = p;
        }
        else if (cursors.up.isDown)
        {
            playerState = 0; 
            target = p;
        }
        else if (cursors.down.isDown)
        {
            playerState = 0;
            target = p;
        }
        game.camera.follow(target);
    }
    
     if(playerState == 2)
    {
        help.text = "Telekinesis";
        if (cursors.left.isDown)
        {
            playerState = 0;  
        }
        else if (cursors.right.isDown)
        {
            playerState = 0;
        }
        else if (cursors.up.isDown)
        {
            playerState = 0; 
        }
        else if (cursors.down.isDown)
        {
            playerState = 0;
        }
    }
    
      if(playerState == 3)
      {
        if(target == p)
        {
            help.text = "Hypnosis";
        }
        if (cursors.left.isDown)
        {
            playerState = 0;  
        }
        else if (cursors.right.isDown)
        {
            playerState = 0;
        }
        else if (cursors.up.isDown)
        {
            playerState = 0; 
        }
        else if (cursors.down.isDown)
        {
            playerState = 0;
        }
    }
    
        if(checkOverlap(p, goal))
        {           
            if(haveKey == 1 && haveKey2 == 1)
            {
                yay.play();
                goal.animations.play('open', 10, false, true);
                playerState = 4;
                help.text = "Misson Complete!";
            }
            else
            {
                help.text = "The weapons vault won't open. There looks to be a keyhole.";
            }
        }
    
}

function render() {

    //game.debug.body(p);
    //game.debug.bodyInfo(p, 32, 320);

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function listener(sprite, pointer)
{
        if(playerState == 1 && target == p && sprite != alarm)
        {
         target = sprite;
         if(target == subject && subject.asleep == 1)
         {
             help.text = "zzz";
         }
         else
         {
            help.text = target.thought;
         }
        }
        else if(playerState == 2 && target == p && sprite == alarm)
        {
            alarm2.play();
            alarm.animations.play('active', 10, false, false);
            var c7 = game.add.sprite(288, 64, 'c');
            var c8 = game.add.sprite(256, 64, 'c');
            var c9 = game.add.sprite(224,64,'c');
            var c10 = game.add.sprite(704, 230, 'c')
            guard4.thought = "Who sounded the alarm!?";
            guard5.thought = "Where is he!?";
            guard6.thought = "Wait for me!";
            right.add(c7);
            right.add(c8);
            right.add(c9);
            left.add(c10);
            game.physics.enable(c7);
            game.physics.enable(c8);
            game.physics.enable(c9);
            game.physics.enable(c10);
            
            playerState = 0;
        }
        else if(playerState == 3 && target == p && sprite != alarm)
        {
            target = sprite;
            if(subject != null && target != subject)
            {
                subject.asleep = 0;
                subject = target;
                subject.asleep = 1;
            }
            else
            {
                subject = target;
                subject.asleep = 1;
            }
            game.time.events.add(Phaser.Timer.SECOND*3, timerLoop, this, subject);
            playerState = 0;
        }
}

function timerLoop(subject)
{
    var currentSub;
    currentSub = subject;
    currentSub.asleep = 0;
    //currentSub.body.velocity.set(currentSub.movespeedx,currentSub.movespeedy);
    if(currentSub == target)
    {
        help.text = currentSub.thought;
    }
}

function collisionHandler(guards, up)
{
        guards.body.velocity.y = -150;
        guards.movespeedy = -150;
        guards.body.velocity.x = 0;
        guards.movespeedx = 0;
        guards.animations.play('up', 10, false, false);
}

function collisionHandler2(guards, down)
{
        guards.body.velocity.y = 150;
        guards.movespeedy = 150;
        guards.body.velocity.x = 0;
        guards.movespeedx = 0; 
        guards.animations.play('down', 10, false, false);
}

function collisionHandler3(guards, left)
{
        guards.body.velocity.y = 0;
        guards.movespeedy = 0;
        guards.body.velocity.x = -150;
        guards.movespeedx = -150; 
        //guards.animations.play('left', 10, false, false);
}

function collisionHandler4(guards, right)
{
        guards.body.velocity.y = 0;
        guards.movespeedy = 0;
        guards.body.velocity.x = 150;
        guards.movespeedx = 150;
        //guards.animations.play('right', 10, false, false);
}

