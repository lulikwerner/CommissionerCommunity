const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const District = require('../model/district');

// What I use to upload addresses
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const results = [];

fs.createReadStream(req.file.path)
  .pipe(csv())
  .on('data', (data) => {
    // ⚡ Limits to 26 registros
    if (results.length < 26) {
      results.push({
        streetAddress: data.streetAddress?.toUpperCase().replace(/\s+/g, ''),
        apartmentNumber: data.apartmentNumber,
        zipCode: data.zipCode,
        district: data.district
      });
    }
  })
    .on('end', async () => {
      try {
        // 🔥 Delete all existing documents
        await District.deleteMany({});

        // 💾 Insert new data
        await District.insertMany(results);

        fs.unlinkSync(req.file.path);
        res.send('✅ Database overwritten with new CSV data');
      } catch (err) {
        console.error('❌ Error overwriting database:', err);
        res.status(500).send('❌ Error overwriting database');
      }
    });
});


const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});



module.exports = router;
