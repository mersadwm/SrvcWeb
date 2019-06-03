

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// router.get('/:name', function (req, res) {
//     res.render(req.param.name);
// });


// router.route('/:name').get(function (req, res) {
//     res.render(req.param.name);
// });
module.exports = router;
