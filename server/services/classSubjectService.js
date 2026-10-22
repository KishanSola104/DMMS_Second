const ClassSubject = require('../models/classSubjectModel');

const classSubjectService = {
    //Create Class Subject
    createClassSubject: async (data) => {
        try{
            const classSub = await ClassSubject.create(data);
            return{
                success:true,
                message:"Class Subject Created Successfully",
                data:classSub
            };
        }catch(error){
            throw new Error(`Error While Creating Class Subject: ${error.message}`);
        }
    },

    //Get All Class Subject
    getAllClassSubject: async () => {
        try{
            const classSub = await ClassSubject.find().populate("classId","classId standard").populate("sectionId","sectionId section").populate("subjectId","subjectCode subjectName").populate("subjectTeacherId","employeeId firstName email gender");
            return{
                success:true,
                message:"All Class Subject Fetched Successfully",
                data:classSub
            };
        }catch(error){
            throw new Error(`Error While Fetching ClassSubject: ${error.message}`);
        }
    },

    //Get ClassSubject By Id
    getById: async (id) => {
        try{
            const classSub = await ClassSubject.findOne({classSubjectId:id});
            if(!classSub){
                throw new Error("ClassSubject Not Found");
            }
            return{
                success:true,
                message:"ClassSubject Fetched Successfully",
                data:classSub
            };
        }catch(error){
            throw new Error(`Error While Fetching ClassSubject: ${error.message}`);
        }
    },

    //Update ClassSubject By Id
    updateById: async (id,updateData) => {
        try{
            const classSub = await ClassSubject.findOneAndUpdate(
                {classSubjectId:id},
                {$set:updateData},
                {returnDocument:'after'}
            );
            if(!classSub){
                throw new Error("ClassSubject Not Found");
            }
            return{
                success:true,
                message:"ClassSubject Updated Successfully",
                data:classSub
            };
        }catch(error){
            throw new Error(`Error While Updating ClassSubject: ${error.message}`);
        }
    },

    //Delete Class Subject By Id
    deleteById: async (id) => {
        try{
            const classSub = await ClassSubject.findOneAndDelete({classSubjectId:id});
            if(!classSub){
                throw new Error("ClassSubject Not Found");
            }
            return{
                success:true,
                message:"ClassSubject Deleted Successfully"
            };
        }catch(error){
            throw new Error(`Error While Deleting ClassSubject: ${error.message}`);
        }
    },

    //Change the Status of Class Subject (Active or Inactive)
    changeStatusById: async (id) => {
        try{
            const classSub = await ClassSubject.findOne({classSubjectId:id});
            if(!classSub){
                throw new Error("ClassSubject Not Found");
            }

            classSub.status = classSub.status === "Active"?"Inactive":"Active";
            await classSub.save();
            return{
                success:true,
                message:"ClassSubject status Changed Successfully",
                data:classSub
            };
        }catch(error){
            throw new Error(`Error While Changing Status ClassSubject: ${error.message}`);
        }
    }
};

module.exports = classSubjectService;