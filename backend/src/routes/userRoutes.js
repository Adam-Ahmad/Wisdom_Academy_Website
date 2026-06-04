const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Admin Only
router.get('/', protect, authorize('admin'), async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, data: users });
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;