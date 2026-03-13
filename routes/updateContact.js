const express = require('express');
const router = express.Router();
const District = require('../model/district'); 
const Register = require('../model/register');

router.post('/', async (req, res) => {
  const { selectedId, firstName, lastName, email, phone } = req.body;

  if (!selectedId) {
    return res.status(400).render('error', {
      title: 'Missing Selection',
      message: 'Please select an address to register.'
    });
  }

  try {
    // Search District
    const district = await District.findById(selectedId);
    if (!district) {
      return res.status(404).render('error', {
        title: 'District Not Found',
        message: 'No matching district found.'
      });
    }

    // Limit registration to 25
    const count = await Register.countDocuments();
    if (count >= 25) {
      return res.render('max_reached', {
        title: 'Maximum Registrations Reached',
        message: 'No more registrations can be accepted at this time.'
      });
    }

    // New register
    const newRegistration = new Register({
      firstName,
      lastName,
      email,
      phone: phone || '',
      streetAddress: district.streetAddress,
      apartmentNumber: district.apartmentNumber,
      ticket: true
    });

    const savedRegistration = await newRegistration.save();

    res.render('confirmation', {
      title: 'Registration Successful',
      contact: savedRegistration,
      contactId: savedRegistration._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'Could not save registration. Please try again later.'
    });
  }
});

module.exports = router;
