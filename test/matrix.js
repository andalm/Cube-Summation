'use strict';

const Matrix = require('../lib/matrix');
const assert = require('assert');

describe('matrix class', () => {
  it('should create a matrix with x y z parameters', () => {
    const matrix = new Matrix(4);
    assert.deepEqual(matrix.body,
        [ [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
      [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ] ]
    );
  });

  it('should resets the matrix', () => {
    const matrix = new Matrix(4);
    matrix.set(2, 2, 2, 1);
    matrix.reset();
    assert.deepEqual(matrix.body,
        [ [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
      [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ] ]
    );
  });

  it('should updates a position in the matrix', () => {
    const matrix = new Matrix(4);
    matrix.set(2, 2, 2, 1);
    assert.deepEqual(matrix.body,
        [ [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
        [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
      [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ] ]
    );
  });

  it('should makes a sum over given positions', () => {
    const matrix = new Matrix(4);
    matrix.set(2, 2, 2, 4);
    matrix.set(1, 1, 1, 23);
    assert.equal(matrix.sum(1 ,1, 1, 3, 3, 3), 27);
  });

  it('should returns an error with wrong size', () => {
    assert.throws(() => {
      new Matrix(-4);
    });
  });

  it('should returns an error with wrong position', () => {
    const matrix = new Matrix(4);
    assert.throws(() => {
      matrix.set(5, 2, 2, 4);
    });
  });

  it('should returns an error with wrong type position', () => {
    const matrix = new Matrix(4);
    assert.throws(() => {
      matrix.set('a', 2, 'a', 4);
    });
  });
});