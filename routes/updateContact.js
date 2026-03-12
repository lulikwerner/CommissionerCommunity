const express = require('express');
const router = express.Router();
const District = require('../model/district');

router.post('/', async (req, res) => {
  const {
    selectedId, // from radio button
    firstName,
    lastName,
    email,
    phone,
  } = req.body;


  if (!selectedId) {
    return res.status(400).render('error', {
      title: 'Missing Selection',
      message: 'Please select an address to register.'
    });
  }

  try {
    // Find the exact record by _id
    const existing = await District.findById(selectedId);

    if (!existing) {
      return res.status(404).render('not_found', {
        title: 'Address Not Found',
        message: 'No matching address was found to update.'
      });
    }

    // Build update object, preserving streetAddress and apartmentNumber
    const updateFields = {
      streetAddress: existing.streetAddress,
      apartmentNumber: existing.apartmentNumber,
      ticket:true
    };

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (phone) updateFields.phone = phone;
    if (email) updateFields.email = email;

    const updated = await District.findByIdAndUpdate(selectedId, updateFields, { new: true });
    const plainContact = JSON.parse(JSON.stringify(updated));
console.log('Updated registration:', plainContact);



    res.render('confirmation', {
      title: 'Registration Successful',
     // message: 'Contact information has been updated successfully.',
      contact: plainContact,
      contactId:selectedId
    });
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'Could not update the registration. Please try again later.'
    });
  }
});

module.exports = router;
