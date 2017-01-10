'use strict';

module.exports = class Parser {

  constructor() {
    this.reset();
  }

  parse(input) {
    if (typeof input != 'string') {
      throw Error('Invalid input type');
    }
    this.reset();
    let lines = input.toUpperCase().split('\n').map(Function.prototype.call, String.prototype.trim);
    let casesNumber = this._parseCasesNumber(lines.shift());
    while(casesNumber) {
      let test = this._parseSizes(lines.shift());
      test.operations = [];
      for (let i = 0;i < test.M;i++) {
        test.operations.push(this._parseOperations(lines.shift()));
      }
      this.testCases.push(test);
      casesNumber--;
    }
  }

  reset() {
    this.testCases = [];
  }

  _parseCasesNumber(line) {
    if (!/^\d+$/.test(line)) {
      throw Error('Invalid test cases number');
    }
    return parseInt(line, 10);
  }

  _parseSizes(line) {
    if (!/\d+\s\d+/.test(line)) {
      throw Error('Invalid N and M numbers');
    }
    line = line.split(/\s/);
    return {
      N: parseInt(line[0], 10),
      M: parseInt(line[1], 10)
    };
  }

  _parseOperations(line) {
    if (!/^UPDATE\s\d+\s\d+\s\d+\s-?\d+$/.test(line) &&
        !/^QUERY\s\d+\s\d+\s\d+\s\d+\s\d+\s\d+$/.test(line)) {
      throw Error(`Ivalid syntax: ${line}`);
    }
    line = line.split(/\s/);
    return {
      command: line.shift(),
      params: line.map(Number)
    };
  }
};