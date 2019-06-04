const express = require('express');

const router = express.Router();

/* GET help pages. */
router.get('/faq', (req, res) => {
  res.render('faq');
  // res.render(req.params.page);
});

router.get('/aboutUs', (req, res) => {
  res.render('aboutUs');
});

module.exports = router;