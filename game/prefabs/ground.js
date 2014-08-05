'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // scroll the ground
  this.autoScroll(-200, 0);

  // enable physics for collision detection
  this.game.physics.arcade.enableBody(this);

  // don't be affected by gravity
  this.body.allowGravity = false;
  // make it imovable
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;
