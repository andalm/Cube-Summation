'use strict';

module.exports = class Parser {

  constructor() {
    this.testCases = [];
  }

  parse(input) {
    let lines = input.toUpperCase().split('\n');
    let casesNumber = this._parseCasesNumber(lines.shift().trim());
    while(casesNumber) {
      let test = this._parseSizes(lines.shift().trim());
      test.operations = [];
      for (let i = 0; i<test.M; i++) {
        test.operations.push(this._parseOperations(lines.splice(0, 1)[0].trim()));
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
      throw Error('Invalid test number');
    }
    return parseInt(line, 10);
  }

  _parseSizes(line) {
    if (!/\d+\s\d+/.test(line)) {
      throw Error('N and M must be a numbers');
    }
    line = line.split(/\s/);
    return {
      N: parseInt(line[0], 10),
      M: parseInt(line[1], 10)
    };
  }

  _parseOperations(line) {
    if (!/^UPDATE\s\d+\s\d+\s\d+\s\d+$/.test(line) &&
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