const subjectService = require('../services/subjectService');

//Create Subject
const createSubject = async (req,res) => {
    try{
        const subject = await subjectService.createSubject(req.body);
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get All Subject
const getAllSubject = async (req,res) => {
    try{
        const subject = await subjectService.getAllSubject();
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get Subject By SubjectID
const getByCode = async (req,res) => {
    try{
        const subject = await subjectService.getByCode(req.params.subjectCode);
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Update Subject By SubjectID
const updateByCode = async (req,res) => {
    try{
        const subject = await subjectService.updateByCode(req.params.subjectCode,req.body);
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Delete Subject By Subject Id
const deleteByCode = async (req,res) => {
    try{
        const subject = await subjectService.deleteByCode(req.params.subjectCode);
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Change the Status of Subject By SubjectId
const changeStatusByCode = async (req,res) => {
    try{
        const subject = await subjectService.changeStatusByCode(req.params.subjectCode);
        res.status(201).json(subject);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};


module.exports = {createSubject, getAllSubject, getByCode, updateByCode, deleteByCode, changeStatusByCode};