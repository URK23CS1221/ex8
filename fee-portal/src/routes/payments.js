const express = require('express');
const { makePayment, getPaymentsByStudent } = require('../controllers/paymentsCtrl');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, makePayment);
router.get('/student/:studentId', auth, getPaymentsByStudent);

module.exports = router;