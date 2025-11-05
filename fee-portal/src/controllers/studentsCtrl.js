const Student = require('../models/Student');

const addStudent = async (req, res) => {
  try {
    const { studentId, name, class: studentClass, totalFee } = req.body;
    const student = new Student({ studentId, name, class: studentClass, totalFee });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addStudent, getAllStudents };