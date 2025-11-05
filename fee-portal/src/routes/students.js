// src/routes/students.js
const express = require('express');
const { addStudent, getAllStudents } = require('../controllers/studentsCtrl');
const auth = require('../middleware/auth'); // ✅ correct path
const router = express.Router();

router.post('/', auth, addStudent);
router.get('/', auth, getAllStudents);

module.exports = router;