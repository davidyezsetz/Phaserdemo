'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('flap');
  this.animations.play('flap', 12, true);
  
  // enable physics
  this.game.physics.arcade.enableBody(this);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.flap = function() {
  this.body.velocity.y = -400;

  // rotate the bird to -40 degrees
  this.game.add.tween(this).to({angle: -40}, 100).start();
};

Bird.prototype.update = function() {
  
  // rotate back
  if (this.angle < 90) {
    this.angle += 2.5;
  }
};

module.exports = Bird;
