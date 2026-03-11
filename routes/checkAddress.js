const express = require('express');
const router = express.Router();
const District = require('../model/district');
const path = require('path');





//Show form and results if a search is performed
router.get('/', async (req, res) => {
  let { streetNumber, streetType, apartmentSearch } = req.query;


  let results = [];

  if (streetNumber && streetType) {
    streetNumber = streetNumber.trim().replace(/\s+/g, '');
    streetType = streetType.trim().replace(/\s+/g, '');
    const fullAddress = `${streetNumber}${streetType}`.toUpperCase();
    


    try {
      // Order Asc appartment number
results = await District.aggregate([
  { $match: { streetAddress: fullAddress } },
  {
    $addFields: {
      apartmentNumValue: {
        $convert: {
          input: {
            $trim: {
              input: { $substr: ["$apartmentNumber", 1, -1] },
              chars: " "
            }
          },
          to: "int",
          onError: null,
          onNull: null
        }
      }
    }
  },
  {
    $sort: {
      apartmentNumValue: 1 // Appartment Nubmer first and the blank appartment number
    }
  }
]);
    // ✅ Filter results by apartment number if provided
      if (apartmentSearch) {
        results = results.filter(r =>
          r.apartmentNumber?.toLowerCase().includes(apartmentSearch.toLowerCase())
        );
      }


      if (results.length === 0) {
        return res.render('not_found', {
          streetNumber: req.query.streetNumber,
          streetType: req.query.streetType
        });
      }
          // ✅ If results found, render updateContact.hbs
      return res.render('updateContact', {
        results,
        district: results[0]?.district || '',
        streetNumber,
        streetType,
        apartmentSearch,
      });

    } catch (err) {
      console.error('❌ Error searching address:', err);
      return res.status(500).render('error', {
        title: 'Error',
        message: 'Something went wrong while searching.'
      });
    }
  }

  res.render('checkAddress', {
    results,
    streetNumber: req.query.streetNumber || '',
    streetType: req.query.streetType || '',
    isBlvd: streetType === 'blvd',
    isDr: streetType === 'dr',
    isRd: streetType === 'rd',
    isCt: streetType === 'ct',
    isAve: streetType === 'ave',
    isSt: streetType === 'st',
    isTer: streetType === 'ter',
    isCir: streetType === 'cir',
    isPl: streetType === 'pl',
    isLn: streetType === 'ln',
    isWay: streetType === 'way',
    isMnr: streetType ==='mnr'
  });
});






router.post('/', async (req, res) => {
  const { streetNumber, streetType } = req.body;
  const fullAddress = `${streetNumber}${streetType}`.toUpperCase();

  try {
    const results = await District.find({ streetAddress: fullAddress });
    res.render('check_address', { results });
  } catch (err) {
    console.error('Error searching address:', err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Could not search address.'
    });
  }
});

module.exports = router;
