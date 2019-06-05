/*global Phaser dude game*/

// var game = new Phaser.Game(850, 850, Phaser.AUTO, '');
var game_state = {};

game_state.Stage5 = function() {};
game_state.Stage5.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/backback.png');
        game.load.spritesheet('dude', 'assets/wizardlmao.png', 75, 75);
        game.load.image('crate', 'assets/box.png', 80, 80);
        game.load.image('platforms', 'assets/platformlmao.png', 500, 125);
        game.load.spritesheet('portal', 'assets/portal.png', 150, 150);
        game.load.spritesheet('fireball', 'assets/fireballlmao.png', 75, 41);
    },

    create: function(){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2250, 850, 'sky');
        //  Set the world (global) gravity
        game.physics.arcade.gravity.y = 500;
        this.portal = game.add.sprite(1800, 200, 'portal');
        this.crate = game.add.group();
        // This creates physics for any of the objects that are in my game
        this.platforms = game.add.group();
        this.platforms.create(0, 1000, 'platforms');
        this.platforms.create(1600, 300, 'platforms');
        game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.platforms.forEach(function(item) {
            item.body.enableBody = true;
            item.body.allowGravity = false;
            item.body.immovable = true;
        });

        this.crate.create(600, 950, 'crate');
        this.crate.create(950, 900, 'crate');
        this.crate.create(1100, 850, 'crate');
        this.crate.create(1300, 800, 'crate');
        this.crate.create(1500, 750, 'crate');
        this.crate.create(1800, 700, 'crate');
        this.crate.create(2000, 650, 'crate');
        this.crate.create(1850, 620, 'crate');
        this.crate.create(1700, 530, 'crate');
        this.crate.create(1500, 550, 'crate');
        game.physics.arcade.enable(this.crate, Phaser.Physics.ARCADE);
        this.crate.forEach(function(item) {
            item.enableBody = true;
            item.body.immovable = true;
            item.body.allowGravity = false;
        });
        game.world.setBounds(0, 0, 1920, 1800);

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
        this.portal.animations.add('portalman', [0, 1, 2, 3, 4, 5], 8, true);
        //Platforms
        this.fireballs = game.add.group();
        // this.fireball = game.add.sprite(50,50, 'fireball');
        this.fireballs.enableBody = true;

        game.time.events.loop(Phaser.Timer.SECOND, function() {
            let fireball = this.fireballs.create(2250, Math.random() * 600, 'fireball');
            fireball.body.velocity.x = 500;
            fireball.animations.add('fireballman', [0, 1, 2, 3], 10, true);
            fireball.animations.play('fireballman');
        }, this);

         this.Stage5Text = game.add.text(16, 800, 'Hey whats that in the distance?', {
            fontSize: '64px',
            fill: '#ffffff'
        });
        
        this.Stage5Text = game.add.text(600, 800, 'Oh yeah, fireballs LMAO', {
            fontSize: '64px',
            fill: '#ffffff'
        });
    },


    update: function() {
        
        game.physics.arcade.collide(this.dude, this.fireballs, function(x, e) {
            x.body.position.x = 0;
            x.body.position.y = 900;
        });
        
        if (checkOverlap(this.dude, this.portal)) {
            // game.state.start('stage1copy');
            // alert("Portal Touching REEEEEEEEEEE");

        }

        this.dude.body.setSize(35, 70, 20, 5);
        this.fireballs.forEach(function(fireball) {
            fireball.body.velocity.x = -300;
            fireball.body.velocity.y = 0;
        });

        //Collision
        game.physics.arcade.collide(this.dude, this.platforms);
        game.physics.arcade.collide(this.dude, this.crate);
        game.physics.arcade.overlap(this.dude, this.fireball);
        //velocity Reset
        this.dude.body.velocity.x = 0;
        this.portal.animations.play('portalman');
        if (this.p.isDown) {
            this.dude.body.velocity.y = -10000;
        }

        if (this.wKey.isDown && this.dude.body.touching.down) {
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
        if (this.dude.position.y > 1500) {
            this.dude.position.x = 0;
            this.dude.position.y = 200;
        }


        function render() {

            game.debug.cameraInfo(game.camera, 200, 200);

            game.debug.spriteCoords(dude, 32, 500);

            game.debug.bodyInfo(this.dude, 75, 75);

            game.debug.body(this.dude);

            game.debug.bodyInfo(this.portal, 200, 200);

            game.debug.body(this.portal);

            game.debug.body(this.fireball);

            game.debug.text(game.time.physicsElapsed, 32, 32);
        }

        function checkOverlap(spriteA, spriteB) {

            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }


    },
};
game.state.add('Stage5', game_state.Stage5);
// game.state.start('Stage5');
