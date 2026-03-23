const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET users listing */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* ✅ REQUIRED POST ROUTE */
router.post('/', function(req, res) {
  console.log(req.body); // log POST data
  res.send('POST received!');
});

module.exports = router;