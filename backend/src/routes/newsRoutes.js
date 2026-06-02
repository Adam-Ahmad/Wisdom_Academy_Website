const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const News = require('../models/News');

const router = express.Router();

// Public
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = { status: 'published' };
    if (category) query.category = category;
    const news = await News.find(query).sort('-createdAt').limit(limit * 1).skip((page - 1) * limit);
    const total = await News.countDocuments(query);
    res.json({ success: true, data: news, pagination: { page, pages: Math.ceil(total / limit), total } });
  } catch (err) { next(err); }
});

// Admin Only
router.post('/', protect, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json({ success: true, data: news });
  } catch (err) { next(err); }
});

module.exports = router;