const studentModel = require('../models/studentModel');
const bcrypt = require('bcrypt');

const studentService = {

    //Create Student
    createStudent: async (studentData) => {
        try {
            const student = new studentModel(studentData);
            await student.save();
            return {
                message: 'Student Added Successfully',
                student: student
            }
        }catch(error){
            throw new Error(`Error adding student: ${error.message}`);
        }
    },

    //Get All Students
    getStudent: async () => {
        try{
            const student = await studentModel.find();
            return {
                message: "Students Fetched",
                student: student
            };
        }catch(error){
            throw new Error(`Error while Fetching Student: ${error.message}`);
        }
    },

    //Get Student By Id
    getStudentById: async (id) => {
        try{
            const student = await studentModel.findOne({studentId:id});
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                message: "Student Fetched",
                student: student
            };
        }catch(error){
            throw new Error(`Error while Fetching Student: ${error.message}`);
        }
    },

    //Get Student By Name
    getStudentByName: async (name) => {
        try{
            const student = await studentModel.findOne({firstName: name});
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                message:"Student Fetched By Name",
                student: student
            };
        }catch(error){
            throw new Error(`Error while Fetching Student: ${error.message}`);
        }
    },

    //Update Student By Id
    updateStudentById: async (id,updateData) => {
        try{
            const student = await studentModel.updateOne(
                {studentId:id},
                {$set: updateData}
            );
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                message:"Student Updated Successfully"
            }
        }catch(error){
            throw new Error(`Error While Updating Student: ${error.message}`);
        }
    },

    //Delete Student By Name
    deleteStudentbyName : async(name) => {
        try{ 
            const student = await studentModel.deleteOne({firstName:name});
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                message:"Student Deleted Successfully",
            };
        }catch(error){
            throw new Error(`Error While Fetching Student: ${error.message}`);
        }
    },

    //Status Change Active or Deactive
    statusChangeById : async(id,status) => {
        try{
            const student = await studentModel.updateOne(
                {studentId: id},
                {$set:{status: status}}
            );
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                message: "Student Status Changed Successfully"
            };
        }catch(error){
            throw new Error(`Error Changing Status: ${error.message}`);
        }
    }
};

module.exports = studentService;