

const express = require('express');

const router = express.Router();

/* GET users pages. */
router.get('/:page', (req, res) => {
  res.render(req.params.page);
});

module.exports = router;
