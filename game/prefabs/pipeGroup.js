'use strict';
var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);
  // add pipes
  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.add(this.topPipe);

  // 440 = pipe.height + (bird.height * 5)
  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.bottomPipe);

  // keep track of score
  this.hasScored = false;

  // got to keep on movin'
  this.setAll('body.velocity.x', -200);
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

PipeGroup.prototype.reset = function(x,y) {
  
  this.topPipe.reset(0,0);
  this.bottomPipe.reset(0,440);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -200);
  this.hasScored = false;
  this.exists = true;
};

PipeGroup.prototype.checkWorldBounds = function() {

  if (!this.topPipe.inWorld) {
    this.exists = false;
  }
};

module.exports = PipeGroup;
