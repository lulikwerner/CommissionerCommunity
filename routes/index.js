const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('closeregistration'); 
});



const uploadRoutes = require('./upload');
const checkAddressRoutes = require('./checkAddress');
const updateContactRoutes = require('./updateContact');
const dropDownCollectionRoutes = require('./dropDown');


router.use('/upload', uploadRoutes);
router.use('/check-address', checkAddressRoutes);
router.use('/update-contact', updateContactRoutes);
router.use('/drop-collection', dropDownCollectionRoutes);

module.exports = router;
