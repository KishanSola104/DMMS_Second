const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

//Create Class
router.post('/', authenticate, authorize("ADMIN"), classController.createClass);

//Get All Class
router.get('/', authenticate, authorize("ADMIN","HEAD_TEACHER"), classController.getAllClass);

//Get Class By ClassId
router.get('/:id', authenticate, authorize("ADMIN","HEAD_TEACHER"), classController.getById);

//Update Class By ClassId
router.put('/:id', authenticate, authorize("ADMIN"), classController.updateById);

//Change the status of Class by ClassId
router.patch('/status/:id', authenticate, authorize("ADMIN"), classController.changeStatusById);

//Delete Class By ClassId
router.delete('/:id', authenticate, authorize("ADMIN"), classController.deleteById);


module.exports = router;

