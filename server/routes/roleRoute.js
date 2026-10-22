const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

//Create Role
router.post("/", roleController.addRole);

//Get All Role
router.get("/",roleController.getAllRole);

//Get Role By Id
router.get("/:id",roleController.getRole);

module.exports = router;