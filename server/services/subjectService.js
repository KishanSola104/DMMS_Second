const Subject = require('../models/subjectModel');

const subjectService = {
    //create Subject
    createSubject: async (data) => {
        try{
            const{schoolId, subjectCode, subjectName, category} = data;
            const subject = await Subject.create(data);
            return{
                success:true,
                message:"Subject Created Successfully",
                data:subject
            };
        }catch(error){
            throw new Error(`Error While Creating Subject: ${error.message}`);
        }
    },

    //Get All Subject
    getAllSubject: async () => {
        try{
            const subject = await Subject.find();
            return{
                success:true,
                message:"All Subject Fetched Successfully",
                data:subject
            };
        }catch(error){
            throw new Error(`Error while fetching All Subject: ${error.message}`);
        }
    },

    //Get Subject By SubjectCode
    getByCode: async (subjectCode) => {
        try{
            const subject = await Subject.findOne({subjectCode:subjectCode});
            if(!subject){
                throw new Error("Subject Not Found");
            }
            return{
                success:true,
                message:"Subject fetched Successfully",
                data:subject
            };
        }catch(error){
            throw new Error(`Error While fetching Subject: ${error.message}`);
        }
    },

    //Update Subject By SubjectCode
    updateByCode: async (subjectCode,updateData) => {
        try{
            const subject = await Subject.findOneAndUpdate(
                {subjectCode:subjectCode},
                {$set:updateData},
                {returnDocument:'after'}
            );
            if(!subject){
                throw new Error("Subject Not Found");
            }
            return{
                success:true,
                message:"Subject Updated Successfully",
                data:subject
            };
        }catch(error){
            throw new Error(`Error While Updating Subject: ${error.message}`);
        }
    },


    //Delete Subject By SubjectCode
    deleteByCode: async (subjectCode) => {
        try{
            const subject = await Subject.findOneAndDelete({subjectCode:subjectCode});
            if(!subject){
                throw new Error("Subject Not Found");
            }
            return{
                success:true,
                message:"Subject Deleted Successfully"
            };
        }catch(error){
            throw new Error(`Error While Deleting Subject: ${error.message}`);
        }
    },

    //Change the Status of Subject By SubjectCode(Active or Inactive)
    changeStatusByCode: async (subjectCode) => {
        try{
            const subject = await Subject.findOne({subjectCode:subjectCode});
            if(!subject){
                throw new Error("Subject Not Found");
            }

            subject.status = subject.status === "Active" ? "Inactive" : "Active";
            await subject.save();

            return{
                success:true,
                message:"Status Change Successfully of Subject",
                data:subject
            };
        }catch(error){
        throw new Error(`Error While changing Status: ${error.message}`);
        }
    }
};

module.exports = subjectService;