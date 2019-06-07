const express = require('express');

const router = express.Router();
const debug = require('debug')('app:services');
const servicesController = require('../controllers/servicesController');

const { getService, getAllServices } = servicesController;

/* GET users pages. */
router.get('/:id', (req, res) => {
  (async function query() {
    const result = await getService(req.param.id);
    debug(result);
    res.send(result.recordset);
  }());
});

router.get('/', (req, res) => {
  (async function query() {
    const result = await getAllServices();
    debug(result);
    res.send(result.recordset);
  }());
});

module.exports = router;
