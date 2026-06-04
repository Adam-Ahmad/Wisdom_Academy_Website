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

module.exports = router;