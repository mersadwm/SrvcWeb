const express = require('express');

const router = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:services');

/* GET users pages. */
router.get('/', (req, res) => {
  (async function query() {
    const request = new sql.Request();
    const result = await request.input('user_name', sql.VarChar, 'a').query('select * from services where user_name=@username')
    // const result = await request.input('id', sql.Int, 1).query('select * from services where id=@id');
    debug(result);
    res.send(result.recordset);
  }());
});

module.exports = router;
