'use strict';

/**
 * Represents an abstraction of the 3D array
 */
module.exports = class Matrix {

  constructor(size, fill) {
    if (size <= 0) {
      throw Error('Invalid size of matrix');
    }
    this.size = size;
    this.fill = fill || 0;
    this.reset();
  }

  /**
   * Set value in the matrix with x y z coordinates
   * @param {Number} x X axis coordinate
   * @param {Number} y Y axis coordinate
   * @param {Number} z Z axis coordinate
   * @param {Number} w Value that is going to set in the specific coordinates
   */
  set(x, y, z, w) {
    this._validatePositions(x, y, z);
    return this.body[x - 1][y - 1][z - 1] = w;
  }

  /**
   * Sums each value in the matrix over given x1 y1 z1 x2 y2 z2 coordinates
   * @param  {Number} x1 X1 coordinate
   * @param  {Number} y1 y1 coordinate
   * @param  {Number} z1 z1 coordinate
   * @param  {Number} x2 X2 coordinate
   * @param  {Number} y2 y2 coordinate
   * @param  {Number} z2 z2 coordinate
   * @return {Number}   Result of the sum over coordinates
   */
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

  /**
   * Restarts the matrix with a new size and fill
   */
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

  /**
   * Validates given x y z coordinates
   * @param  {Number} x X axis coordinate
   * @param  {Number} y y axis coordinate
   * @param  {Number} z z axis coordinate
   */
  _validatePositions(x, y, z) {
    if (1 > x || x > this.size ||
        1 > y || y > this.size ||
        1 > z || z > this.size) {
      throw Error('Invalid params');
    }
  }
};