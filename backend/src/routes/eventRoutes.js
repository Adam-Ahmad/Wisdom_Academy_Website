const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const Event = require ('../models/Event');

const router = express.Router();

// Public
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const events = (await Event.find());
        const total = await Event.countDocuments();
        res.json({ success: true, data: events, pagination: { page, pages: Math.ceil(total/limit), total}});
    } catch (err) {
        next(err);
    }
})

// Admin Only
router.post('/', protect, authorize('admin', 'editor'), async (req, res, next) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event});
    } catch (err) {
        next(err);
    }
})

router.get('/admin', protect, authorize('admin'), async (req, res, next) => {
  try {
    const events = (await Event.find()).toSorted((a, b) => b.createdAt - a.createdAt)
    res.status(200).json({ success: true, data: events});
  } catch (err) {
    next(err)
  }
})

module.exports = router; 