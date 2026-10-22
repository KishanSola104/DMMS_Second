const classService = require('../services/classService');

//Create Class
const createClass = async (req,res) => {
    try{
        const classes = await classService.createClass(req.body,req.user.schoolId);
        res.status(201).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get All Class
const getAllClass = async (req,res) => {
    try{
        const classes = await classService.getAllClass(req.user.schoolId);
        res.status(200).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get Class By classId
const getById = async (req,res) => {
    try{
        const classes = await classService.getById(req.params.id,req.user.schoolId);
        res.status(200).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Update Class By ClassId
const updateById = async (req,res) => {
    try{
        const classes = await classService.updateById(req.params.id, req.body,req.user.schoolId);
        res.status(200).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Change the Status of Class("Active" or "Deactive")
const changeStatusById = async (req,res) => {
    try{
        const classes = await classService.changeStatusById(req.params.id,req.user.schoolId);
        res.status(200).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Delete Class By classId
const deleteById = async (req,res) => {
    try{
        const classes = await classService.deleteById(req.params.id,req.user.schoolId);
        res.status(200).json(classes);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createClass, getAllClass, getById, updateById, changeStatusById, deleteById};