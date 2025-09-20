const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    
    const totalIdentificationsResult = await db.query('SELECT COUNT(*) FROM gaunetra_schema.predictions');
    const totalIdentifications = parseInt(totalIdentificationsResult.rows[0].count, 10);

    
    const uniqueBreedsResult = await db.query('SELECT COUNT(DISTINCT breed) FROM gaunetra_schema.predictions');
    const uniqueBreeds = parseInt(uniqueBreedsResult.rows[0].count, 10);

    
    const breedDistributionResult = await db.query(
      'SELECT breed, COUNT(*) as count FROM gaunetra_schema.predictions GROUP BY breed ORDER BY count DESC'
    );
    const breedDistribution = breedDistributionResult.rows;

    
    const locationsResult = await db.query(
      'SELECT id, breed, confidence, latitude, longitude FROM gaunetra_schema.predictions WHERE latitude IS NOT NULL AND longitude IS NOT NULL'
    );
    const locations = locationsResult.rows;

    
    res.json({
      totalIdentifications,
      uniqueBreeds,
      breedDistribution,
      locations,
    });

  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Failed to retrieve dashboard data' });
  }
});

module.exports = router;