const express = require('express');

const router = express.Router();

/* GET help pages. */
router.get('/:page', (req, res) => {
  res.render(req.params.page);
});

module.exports = router;
