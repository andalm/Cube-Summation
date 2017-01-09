'use strict';

const assert = require('assert');
const Context = require('../lib/context');
const Parser = require('../lib/parser');
const Matrix = require('../lib/matrix');

const parser = new Parser();
const matrix = new Matrix();
const context = new Context(matrix, parser);

describe('context class', () => {
  it('should receives an input and returns results', () => {
    context.parser.parse(`2
      4 5
      UPDATE 2 2 2 4
      QUERY 1 1 1 3 3 3
      UPDATE 1 1 1 23
      QUERY 2 2 2 4 4 4
      QUERY 1 1 1 3 3 3
      2 4
      UPDATE 2 2 2 1
      QUERY 1 1 1 1 1 1
      QUERY 1 1 1 2 2 2
      QUERY 2 2 2 2 2 2`);
    assert.deepEqual(context.run(), [ 4, 4, 27, 0, 1, 1 ]);
  });

  it('should receives an other input and returns results', () => {
    context.parser.parse(`1
      5 5
      UPDATE 5 5 5 4
      QUERY 1 1 1 3 3 3
      UPDATE 1 1 1 3
      QUERY 2 2 2 5 5 5
      QUERY 1 1 1 3 3 3`);
    assert.deepEqual(context.run(), [ 0, 4, 3 ]);
  });

  it('should returns an error with invalid command line', () => {
    assert.throws(() => {
      context.parser.parse(`2
        4 5
        UPDATE 2 2 2 4
        QUERY 1 1 1 3 3 3
        QUERY 1 1 1 3 3 3
        2 4
        UPDATE 2 2 2 1
        QUERY 1 1 1 1 1 1
        QUERY 1 1 1 2 2 2
        QUERY 2 2 2 2 2 2`);
     });
  });

  it('should returns results of last parse input', () => {
    context.parser.parse(`2
      4 5
      UPDATE 2 2 2 4
      QUERY 1 1 1 3 3 3
      UPDATE 1 1 1 23
      QUERY 2 2 2 4 4 4
      QUERY 1 1 1 3 3 3
      2 4
      UPDATE 2 2 2 1
      QUERY 1 1 1 1 1 1
      QUERY 1 1 1 2 2 2
      QUERY 2 2 2 2 2 2`);
    context.parser.parse(`1
      5 5
      UPDATE 5 5 5 4
      QUERY 1 1 1 3 3 3
      UPDATE 1 1 1 3
      QUERY 2 2 2 5 5 5
      QUERY 1 1 1 3 3 3`);
    assert.deepEqual(context.run(), [ 0, 4, 3 ]);
  });
});