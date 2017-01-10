'use strict';

/**
 * Represents an interface that interpret the text input and converts to an object
 */
module.exports = class Parser {

  constructor() {
    this.reset();
  }

  /**
   * Parses given text to an object
   * @param  {String} input Commands that indicates how to parse test cases
   */
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

  /**
   * Restart the test cases
   */
  reset() {
    this.testCases = [];
  }

  /**
   * Takes the first line and then converts it to test cases number
   * @param  {String} line Unparsed test cases number
   * @return {Number}    Test cases number
   */
  _parseCasesNumber(line) {
    if (!/^\d+$/.test(line)) {
      throw Error('Invalid test cases number');
    }
    return parseInt(line, 10);
  }

  /**
   * Parses a given N and M values
   * @param  {String} line Unparsed N and M values from  an input param
   * @return {Object}  Returns N and M values within an object
   */
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

  /**
   * Parses a given commands
   * @param  {String} line Unparsed command
   * @return {Object} Object with matrix's commands and params
   */
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