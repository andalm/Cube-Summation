const express = require('express');
const router = express.Router();
const Context = require('../lib/context');
const Parser = require('../lib/parser');
const Matrix = require('../lib/matrix');

const context = new Context(new Matrix(), new Parser());

router.post('/', (req, res, next) => {
  context.parser.parse(req.body.input);
  res.send({ results: context.run() });
});

module.exports = router;
