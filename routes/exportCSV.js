// routes/exportCSV.js
const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const Register = require('../models/register');

router.get('/', async (req, res) => {
  try {
    const records = await Register.find().lean();

    if (!records.length) {
      return res.status(404).send('No records found');
    }

    const fields = ['_id','firstName','lastName','email','phone','streetAddress','apartmentNumber','ticket','createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(records);

    res.header('Content-Type', 'text/csv');
    res.attachment('register_export.csv'); // indica que es descarga
    res.send(csv);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error while exporting CSV');
  }
});

module.exports = router;
