const express = require('express');
const router = express.Router();
const Register = require('../model/register'); // tu modelo Register

router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, streetAddress, apartmentNumber } = req.body;

  // validation
  if (!firstName || !lastName || !email) {
    return res.status(400).render('error', {
      title: 'Missing Data',
      message: 'First name, last name, and email are required.'
    });
  }

  try {
    // Up to 25 registrants
    const count = await Register.countDocuments();

    if (count >= 25) {
      // Si ya hay 25 o más, mostrar página max_reached
      return res.render('max_reached', {
        title: 'Maximum Registrations Reached',
        message: 'No more registrations can be accepted at this time.'
      });
    }

    // new user in register
    const newRegistration = new Register({
      firstName,
      lastName,
      email,
      phone: phone || '',
      streetAddress: streetAddress || '',
      apartmentNumber: apartmentNumber || '',
      ticket: true
    });

    const savedRegistration = await newRegistration.save();

    // Mostrar confirmación
    res.render('confirmation', {
      title: 'Registration Successful',
      contact: savedRegistration,
      contactId: savedRegistration._id
    });

  } catch (err) {
    console.error('Error saving registration:', err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'Could not save the registration. Please try again later.'
    });
  }
});

module.exports = router;


module.exports = router;
