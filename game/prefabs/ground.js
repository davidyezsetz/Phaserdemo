'use strict';

var Ground = function(game, x, y, frame, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground', frame);

  // enable physics for collision detection
  this.game.physics.arcade.enableBody(this);
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;
