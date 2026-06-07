const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const Registration = require('../models/Registration');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const registration = await Registration.create(req.body);
        res.status(201).json({ success: true, data: registration});
    } catch (err) {
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const registrations = (await Registration.find()).toSorted((a, b) => b.createdAt - a.createdAt)
        res.status(200).json({ success: true, data: registrations});
    } catch (err) {
        next(err)
    }
})

router.patch('/:id', protect, authorize('admin'), async (req, res, next) => {
    try {
        const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, returnDocument: 'after'})
        if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });
        res.status(200).json({ success: true, data: registration});
    } catch (err) {
        next(err)
    }
})
module.exports = router;