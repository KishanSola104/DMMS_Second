const express = require('express');
const router = express.Router();
const academicYearController = require('../controllers/academicYearController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

//Create Academic Year
router.post('/', authenticate,authorize("ADMIN"), academicYearController.createAcademicYear);

//Get All Academic Year
router.get('/', authenticate, authorize("ADMIN"), academicYearController.getAllYear);

module.exports = router;
