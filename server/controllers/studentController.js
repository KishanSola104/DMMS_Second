const studentService = require('../services/studentService');

//Create Student
const createStudent = async(req,res) => {
    try{
        const student = await studentService.createStudent(req.body);
        res.status(201).json({
            success: true,
            data: student
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

//Get All Students
const getStudent = async(req,res) => {
    try{
        const student = await studentService.getStudent();
        res.status(201).json({
            success:true,
            data: student
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

//Get Student by Id
const getStudentById = async(req,res) => {
    try{
        const student = await studentService.getStudentById(req.params.id);
        res.status(201).json({
            success:true,
            data: student
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

//Get Student By Name
const getStudentByName = async(req,res) => {
    try{
        const student = await studentService.getStudentByName(req.params.name);
        res.status(201).json({
            success:true,
            data:student
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

//Update Student By Id
const updateStudentById = async(req,res) => {
    try{
        const student = await studentService.updateStudentById(req.params.id, req.body);
        res.status(201).json({
            success:true,
            data:student
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

//Delete Student By Name
const deleteStudentByName = async(req,res) => {
    try{
        const student = await studentService.deleteStudentbyName(req.params.name);
        res.status(200).json({
            messsage:"Student Deleted Successfully",
        });
    }catch(error){
        res.status(400).json({
            
        });
    }
};

//Status Change Active or Deactive
const statusChangeById = async (req,res) => { 
    try{
        const student = await studentService.statusChangeById(
            req.params.id,
            req.body.status
        );
        res.status(201).json({
            message:"Status Changed",
        });
    }catch(error){
        res.status(400).json({
        });
    }
};

module.exports = {
    createStudent, getStudent, getStudentById, getStudentByName, updateStudentById, deleteStudentByName, statusChangeById
};