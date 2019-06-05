/*global Phaser dude checkOverlap game*/

// var game = new Phaser.Game(850, 850, Phaser.AUTO, '');
var game_state = {};

game_state.Stage3 = function() {};
game_state.Stage3.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/backback.png');
        game.load.spritesheet('dude', 'assets/wizardlmao.png', 75, 75);
        game.load.image('crate', 'assets/box.png', 80, 80);
        game.load.image('platforms', 'assets/platformlmao.png', 500, 125);
        game.load.spritesheet('portal','assets/portal.png', 150, 150);
        game.load.image('arrow', 'assets/uparrow.png');
    },

    create: function() {
          
          this.Stage3Text = game.add.text(16, 16, '', {
            fontSize: '64px',
            fill: '#ffffff'
        
          });
          
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2250, 850, 'sky');
        //  Set the world (global) gravity
        this.uparrow = game.add.sprite(1100,1650, 'arrow');
        game.physics.arcade.gravity.y = 500;
        this.portal = game.add.sprite(1800, 60, 'portal');
        this.crate = game.add.group();
        this.crate.create(600, 1950, 'crate');
        this.crate.create(930, 1800, 'crate');
        this.crate.create(1260, 1670, 'crate');
        this.crate.create(930, 1520, 'crate');
        this.crate.create(1260, 1370, 'crate');
        this.crate.create(930, 1220, 'crate');
        this.crate.create(1260, 1070, 'crate');
        this.crate.create(1600, 920, 'crate');
        this.crate.create(1260, 770, 'crate');
        this.crate.create(1550, 620, 'crate');
        this.crate.create(1260, 470, 'crate');
        this.crate.create(1550, 320, 'crate');
`  `

        // This creates physics for any of the objects that are in my game
        this.platforms = game.add.group();
        this.platforms.create(0, 2000, 'platforms');
        this.platforms.create(1600,200, 'platforms');
        game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.platforms.forEach(function(item){
            item.body.enableBody = true;
            item.body.allowGravity = false;
            item.body.immovable = true;
        });

        game.physics.arcade.enable(this.crate, Phaser.Physics.ARCADE);
        this.crate.forEach(function(item){
            item.enableBody = true;
           item.body.immovable = true;
           item.body.allowGravity = false;
        });
        game.world.setBounds(0, 0, 1920,2400);
        
        this.dude = game.add.sprite(0, 1700, 'dude');
        
        // Enable physics on those sprites
        game.physics.enable(this.dude, Phaser.Physics.ARCADE);

        this.dude.body.collideWorldBounds = true;
        this.dude.body.bounce.y = 0.2;

        this.cursors = game.input.keyboard.createCursorKeys();
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.p = game.input.keyboard.addKey(Phaser.Keyboard.P);
        game.camera.follow(this.dude);
        this.dude.animations.add('left', [3, 4], 5, true);
        this.dude.animations.add('right', [1, 2], 5, true);
        this.dude.animations.add('still', [0], 5, true);
        this.portal.animations.add('portalman',[0,1,2,3,4,5], 8, true);
        //Platforms

        
    },

    update: function() {
            
         if (checkOverlap(this.dude, this.portal)){
        game.state.start('Stage4');
        // alert("Portal Touching REEEEEEEEEEE");
        
    }
        // game.debug.body(this.dude);
        this.dude.body.setSize(35,70,20, 5);

        //Collision
        game.physics.arcade.collide(this.dude, this.platforms);
        game.physics.arcade.collide(this.dude, this.crate);
        //velocity Reset
        this.dude.body.velocity.x = 0;
        this.portal.animations.play('portalman');
        if(this.p.isDown){
            this.dude.body.velocity.y = -10000;
        }

        if (this.wKey.isDown && this.dude.body.touching.down){

            this.dude.body.velocity.y = -400;
        }

        if (this.left.isDown) {
            this.dude.body.velocity.x = -250;
            this.dude.animations.play('left');

        }
        else if (this.right.isDown) {
            this.dude.body.velocity.x = 250;
            this.dude.animations.play('right');

        }
        
        else {
            this.dude.animations.play('still');
        }
        
        // game.debug.bodyInfo(this.dude,32,32);
        if(this.dude.position.y > 2100){ this.dude.position.x = 0; this.dude.position.y = 1700;}

        function render() {

            game.debug.cameraInfo(game.camera, 200, 200);
            
            game.debug.spriteCoords(dude, 32, 500);

            game.debug.bodyInfo(this.dude, 75, 75);

            game.debug.body(this.dude);

            game.debug.bodyInfo(this.portal, 200, 200);

            game.debug.body(this.portal);


                game.debug.text(game.time.physicsElapsed, 32, 32);
        }

        function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}


    },
};
game.state.add('Stage3', game_state.Stage3);
// game.state.start('Stage3');
// MEOW UWU OWO 