'use strict';

const Parser = require('../lib/parser');
const parser = new Parser();
const assert = require('assert');

describe('parser class', () => {
  it('should returns an object with a correct input', () => {
    parser.parse(`2
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
    assert.deepEqual(parser.testCases, [{
      N: 4,
      M: 5,
      operations: [{
        command: 'UPDATE',
        params: [2, 2, 2, 4]
      },{
        command: 'QUERY',
        params: [1, 1, 1, 3, 3, 3]
      },{
        command: 'UPDATE',
        params: [1, 1, 1, 23]
      },{
        command: 'QUERY',
        params: [2, 2, 2, 4, 4, 4]
      },{
        command: 'QUERY',
        params: [1, 1, 1, 3, 3, 3]
      }],
    },{
      N: 2,
      M: 4,
      operations: [{
        command: 'UPDATE',
        params: [2, 2, 2, 1]
      },{
        command: 'QUERY',
        params: [1, 1, 1, 1, 1, 1]
      },{
        command: 'QUERY',
        params: [1, 1, 1, 2, 2, 2]
      },{
        command: 'QUERY',
        params: [2, 2, 2, 2, 2, 2]
      }],
    }]);
  });

  it('should returns an error with a incorrect input', () => {
     parser.reset();
     assert.deepEqual(parser.testCases, []);
  });

  it('should return an error with invalid test cases number', () => {
    assert.throws(() => {
      parser.parse(`a
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
     });
  });

  it('should return an error with invalid command lines', () => {
    assert.throws(() => {
      parser.parse(`2
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

  it('should return an error with wrong command syntax', () => {
    assert.throws(() => {
      parser.parse(`2
        4 3
        UPDATE 2 2 2 4 4
        QUERY 1 1 1 3 3 3
        QUERY 1 1 1 3 3 3
        2 4
        UPDATE 2 2 2 1
        QUERY 1 1 1 1 1 1
        QUERY 1 1 1 2 2 2
        QUERY 2 2 2 2 2 2`);
     });
  });

  it('should return an error with empty string', () => {
    assert.throws(() => {
      parser.parse('');
     });
  });

  it('should return an error with wrong type input', () => {
    assert.throws(() => {
      parser.parse(12354);
     });
  });
});