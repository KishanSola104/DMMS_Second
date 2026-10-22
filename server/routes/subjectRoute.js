const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

//Create Subject
router.post('/', authenticate,authorize("ADMIN","HEAD_TEACHER"), subjectController.createSubject);

//Get All Subject
router.get('/', authenticate, authorize("ADMIN","HEAD_TEACHER"), subjectController.getAllSubject);

//Get Subject By SubjectCode
router.get('/:subjectCode', authenticate, authorize("ADMIN","HEAD_TEACHER"), subjectController.getByCode);

//Update Subject By SubjectCode
router.put('/:subjectCode', authenticate, authorize("ADMIN","HEAD_TEACHER"), subjectController.updateByCode);

//Delete Subject By SubjectCode
router.delete('/:subjectCode', authenticate, authorize("ADMIN","HEAD_TEACHER"), subjectController.deleteByCode);

//Change the status of Subject By SubjectCode
router.patch('/:subjectCode', authenticate, authorize("ADMIN","HEAD_TEACHER"), subjectController.changeStatusByCode);


module.exports = router;
