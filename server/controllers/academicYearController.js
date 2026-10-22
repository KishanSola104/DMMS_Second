const academicYearService = require('../services/academicYearService');

//Create Academic Year
const createAcademicYear = async (req,res) => {
    try{
        const year = await academicYearService.createAcademicYear(req.body);
        res.status(201).json(year);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get All Academic Year
const getAllYear = async (req,res) => {
    try{
        const year = await academicYearService.getAllYear();
        res.status(200).json(year);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createAcademicYear, getAllYear};