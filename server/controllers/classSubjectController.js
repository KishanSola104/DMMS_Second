const classSubjectService = require('../services/classSubjectService');

//Create Class Subject
const createClassSubject = async (req,res) => {
    try{
        const classSub = await classSubjectService.createClassSubject(req.body);
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get All Class Subject
const getAllClassSubject = async (req,res) => {
    try{
        const classSub = await classSubjectService.getAllClassSubject();
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get ClassSubject By Id
const getById = async (req,res) => {
    try{
        const classSub = await classSubjectService.getById(req.params.id);
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Update ClassSubject By Id
const updateById = async (req,res) => {
    try{
        const classSub = await classSubjectService.updateById(req.params.id,req.body);
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};


//Delete Class Subject By Id
const deleteById = async (req,res) => {
    try{
        const classSub = await classSubjectService.deleteById(req.params.id);
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Change the Status of Class Subject (Active or Inactive)
const changeStatusById = async (req,res) => {
    try{
        const classSub = await classSubjectService.changeStatusById(req.params.id);
        res.status(201).json(classSub);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createClassSubject, getAllClassSubject, getById, updateById, deleteById, changeStatusById};