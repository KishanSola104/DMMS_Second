const express = require('express');
const router = express.Router();
const classSubjectController = require('../controllers/classSubjectController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

//Create Class Subject
router.post('/', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.createClassSubject);

//Get All Class Subject
router.get('/', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.getAllClassSubject);

//Get Class Subject By ClassSubjectID
router.get('/:id', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.getById);

//Update Class Subject By ClassSubjectID
router.put('/:id', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.updateById);

//Delete ClassSubject By ClassSubjectId
router.delete('/:id', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.deleteById);

//Change the Status Active or Inactive
router.patch('/status/:id', authenticate ,authorize("ADMIN","HEAD_TEACHER"), classSubjectController.changeStatusById);

module.exports = router;