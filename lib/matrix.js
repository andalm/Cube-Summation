'use strict';

module.exports = class Matrix {

  constructor(size, fill) {
    if (size <= 0) {
      throw Error('Invalid size of matrix');
    }
    this.size = size;
    this.fill = fill || 0;
    this.reset();
  }

  set(x, y, z, w) {
    this._validatePositions(x, y, z);
    return this.body[x - 1][y - 1][z - 1] = w;
  }

  sum(x1, y1, z1, x2, y2, z2) {
    this._validatePositions(x1, y1, z1);
    this._validatePositions(x2, y2, z2);
    if (x1 > x2 || y1 > y2 || z1 > z2) {
      throw Error('Invalid params');
    }
    let result = 0;
    for(let i = x1 -1; i < x2; i++) {
      for(let j = y1 -1; j < y2; j++) {
        for(let k = z1 -1; k < z2; k++) {
          result += this.body[i][j][k];
        }
      }
    }
    return result;
  }

  reset() {
    let fillArray = new Array(this.size).fill(this.fill);
    this.body = [];
    for(let i = 0; i<this.size; i++) {
      this.body[i] = [];
      for(let j = 0; j<this.size; j++) {
        this.body[i][j] = fillArray.slice(0);
      }
    }
  }

  _validatePositions(x, y, z) {
    if (1 > x || x > this.size ||
        1 > y || y > this.size ||
        1 > z || z > this.size) {
      throw Error('Invalid params');
    }
  }
};