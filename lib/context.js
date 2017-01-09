'use strict';

const UPDATE_COMMAND = 'UPDATE';

module.exports = class Context {

  constructor(matrix, parser) {
    this.matrix = matrix;
    this.parser = parser;
  }

  run() {
    let testCases = this.parser.testCases;
    let results = [];
    testCases.forEach(testCase => {
      this.matrix.size = testCase.N;
      this.matrix.reset();
      testCase.operations.forEach(operation => {
        if (operation.command == UPDATE_COMMAND) {
          this.matrix.set.apply(this.matrix, operation.params);
        } else {
          results.push(this.matrix.sum.apply(this.matrix, operation.params));
        }
      });
    });

    return results;
  }

};