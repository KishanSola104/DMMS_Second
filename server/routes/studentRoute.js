const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

const studentController = require('../controllers/studentController');

router.post('/', authenticate, authorize("ADMIN"), studentController.createStudent);

router.get('/', authenticate, authorize("ADMIN", "HEAD_TEACHER"), studentController.getStudent);

router.get('/get/:id', authenticate,authorize("ADMIN","HEAD_TEACHER"), studentController.getStudentById);

router.get('/getByName/:name', authenticate,authorize("ADMIN","HEAD_TEACHER"), studentController.getStudentByName);

router.put('/update/:id', authenticate,authorize("ADMIN"), studentController.updateStudentById);

router.delete('/delete/:name', authenticate,authorize("ADMIN"), studentController.deleteStudentByName);

router.patch('/status/:id', authenticate,authorize("ADMIN"), studentController.statusChangeById);

module.exports = router;