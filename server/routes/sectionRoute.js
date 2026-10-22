const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

//Create Section
router.post('/',authenticate,authorize("ADMIN","HEAD_TEACHER"),sectionController.createSection);

//Get All Section By ClassId
router.get('/:classId',authenticate,authorize("ADMIN","HEAD_TEACHER"),sectionController.getAllSection);

//Update Section By SectionId
router.put('/:sectionId', authenticate,authorize("ADMIN","HEAD_TEACHER"),sectionController.updateById);

//Change Status of Section By sectionId
router.patch('/:sectionId', authenticate, authorize("ADMIN","HEAD_TEACHER"), sectionController.changeStatusById);

module.exports = router;