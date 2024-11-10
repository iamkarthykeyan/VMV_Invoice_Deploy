const express = require('express');
const History = require('../models/history');
const router = express.Router();

// Route to save invoice information
router.post('/saveInfo', async (req, res) => {
  const { buyerCompanyName, invoiceNumber, date, month, year } = req.body;

  try {
    const newHistory = new History({
      buyerCompanyName,
      invoiceNumber,
      date,
      month,
      year,
    });

    await newHistory.save();
    res.status(201).json({ message: 'Information saved successfully' });
  } catch (error) {
    console.error('Error saving information:', error);
    res.status(500).json({ message: 'Failed to save information' });
  }
});

router.get('/saveInfo', async (req, res) => {
  try {
    const histories = await History.find();
    console.log('Fetched Histories:', histories);
    res.status(200).json(histories);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;
