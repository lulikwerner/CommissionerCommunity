const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true
});


router.post('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('distri');
    const collection = db.collection('district');

    await collection.deleteMany({});
    res.redirect('/check-address'); // Redirect back to main page
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).send('Failed to delete documents.');
  } finally {
    await client.close();
  }
});

module.exports = router;