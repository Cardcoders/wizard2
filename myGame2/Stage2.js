/*global Phaser dude checkOverlap game*/

// var game = new Phaser.Game(850, 850, Phaser.AUTO, '');
var game_state = {};

game_state.Stage2 = function() {};
game_state.Stage2.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/backback.png');
        game.load.spritesheet('dude', 'assets/wizardlmao.png', 75, 75);
        game.load.image('crate', 'assets/box.png', 80, 80);
        game.load.image('platforms', 'assets/platformlmao.png', 500, 125);
        game.load.spritesheet('portal','assets/portal.png', 150, 150);
    },

    create: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2250, 850, 'sky');
        //  Set the world (global) gravity
        game.physics.arcade.gravity.y = 500;
        this.portal = game.add.sprite(1800, 610, 'portal');
        this.crate = game.add.group();
        // This creates physics for any of the objects that are in my game
        this.platforms = game.add.group();
        this.platforms.create(0, 300, 'platforms');
        this.platforms.create(1600,750, 'platforms');
        game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.platforms.forEach(function(item){
            item.body.enableBody = true;
            item.body.allowGravity = false;
            item.body.immovable = true;
        });

        this.crate.create(800, 450, 'crate');
        this.crate.create(700, 400, 'crate');
        this.crate.create(1100, 710, 'crate');
        this.crate.create(1300, 725, 'crate');
        game.physics.arcade.enable(this.crate, Phaser.Physics.ARCADE);
        this.crate.forEach(function(item){
            item.enableBody = true;
           item.body.immovable = true;
           item.body.allowGravity = false;
        });
        game.world.setBounds(0, 0, 1920,1800);
        
        this.dude = game.add.sprite(0, 100, 'dude');
        
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

               this.Stage2Text = game.add.text(16, 340, 'Whipash! It is the next level!', {
            fontSize: '64px',
            fill: '#ffffff'
        });
        
        this.Stage2Text = game.add.text(800, 270, 'Keep going!',{
            fontSize: '64px',
            fill: '#ffffff'
        });
        
        this.Stage2Text = game.add.text(1000, 500, 'You are so slow OMGOSH!',{
            FontSize:'64px',
            fill: '#ffffff'
        });
                
    },

    update: function() {
            
         if (checkOverlap(this.dude, this.portal)){
        game.state.start('Stage3');
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

            this.dude.body.velocity.y = -300;
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
        if(this.dude.position.y > 1500){ this.dude.position.x = 0; this.dude.position.y = 200;}

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
game.state.add('Stage2', game_state.Stage2);
// game.state.start('Stage2');