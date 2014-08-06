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

    // create a group to hold the pipes
    this.pipes = this.game.add.group();

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
    // collide with the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
    // cycle through each group of pipes to check collision
    this.pipes.forEach(function(pipeGroup) {

      this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
    }, this);
  },
  deathHandler: function() {
    this.game.state.start('gameover');
  },
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    
    if (!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }

    pipeGroup.reset(this.game.width, pipeY);
  },
  // called when we leave the game
  shutdown: function() {
    // remove binding of the key otherwise on a new game
    // it would still be bound the last instance of the game
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    // release memory
    this.bird.destroy();
    this.pipes.destroy();
  }
};

module.exports = Play;
