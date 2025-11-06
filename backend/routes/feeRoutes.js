const express = require('express');
const router = express.Router();
const {
  createFee,
  getFees,
  getFeeById,
  updateFee,
  deleteFee,
  getFeesByStudentId
} = require('../controllers/feeController');

router.post('/', createFee);
router.get('/', getFees);
router.get('/:id', getFeeById);
router.put('/:id', updateFee);
router.delete('/:id', deleteFee);
router.get('/student/:studentId', getFeesByStudentId);

module.exports = router;