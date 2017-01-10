'use strict';

const UPDATE_COMMAND = 'UPDATE';

/**
 * Bridge between parser and matrix classes,
 * it takes the control of application flow
 * */
module.exports = class Context {

  constructor(matrix, parser) {
    this.matrix = matrix;
    this.parser = parser;
  }

  /**
   * Gets test cases from parser and iterate over them,
   * so with each test case it executes matrix's methods with
   * its respectives command and parameters
   *
   * @return {Array} Array of results
   */
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