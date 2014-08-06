'use strict';
var Bird      = require('../prefabs/bird');
var Ground    = require('../prefabs/ground');
var PipeGroup = require('../prefabs/PipeGroup');

function Play() {}
Play.prototype = {
  create: function() {
    // enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    // add backgroundsprite
    this.background = this.game.add.sprite(0, 0, 'background');

    // create a new bird object
    this.bird = new Bird(this.game, 100, this.game.height / 2);
    // and add it to the game
    this.game.add.existing(this.bird);

    // create and a new ground object
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    // CONTROLS
    // keep the spacebar from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add keyboard controls
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    flapKey.onDown.add(this.bird.flap, this.bird);

    // add mouse/touch controls
    this.input.onDown.add(this.bird.flap, this.bird);

    // OBSTACLES
    // add a time
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();
  },

  update: function() {
    this.game.physics.arcade.collide(this.bird, this.ground);

  },
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = new PipeGroup(this.game);
    
    pipeGroup.x = this.game.width;
    pipeGroup.y = pipeY;
  }
};

module.exports = Play;
