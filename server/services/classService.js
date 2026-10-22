const Class = require('../models/classModel');

const classService = {
    //Create Class
    createClass: async (classData,schoolId) => {
        try{
            const{classId,standard,academicYearId,maximumCapacity}=classData;
            const existingClass = await Class.findOne({classId,schoolId});
            if (existingClass) {
                throw new Error(`ClassId ${classId} already exists`);
            }
            const classes = await Class.create({classId,standard,academicYearId,maximumCapacity,schoolId});
            return{
                success:true,
                message:"Class created Successfully",
                data:classes
            };
        }catch(error){
            throw new Error(`Error While Creating Class: ${error.message}`);
        }
    },

    //Get All Class
    getAllClass: async (schoolId) => {
        try{
            const classes = await Class.find({schoolId : schoolId});
            return{
                success:true,
                message:"All Class Fetched Successfully",
                data:classes
            };
        }catch(error){
            throw new Error(`Error While Fetching Classes: ${error.message}`);
        }
    },

    //Get Class By ClassId
    getById: async (id,schoolId) => {
        try{
            const classes = await Class.findOne({classId:id, schoolId : schoolId});
            if(!classes){
                throw new Error("Class Not Found");
            }
            return{
                success:true,
                message:`Class ${id} is Fetched Successfully`,
                data:classes
            };
        }catch(error){
            throw new Error(`Error While Fetching ${id} Class: ${error.message}`);
        }
    },

    //Update Class By ClassId
    updateById: async (id,updateData,schoolId) => {
        try{
            const classes = await Class.findOneAndUpdate(
                {classId:id, schoolId : schoolId},
                {$set:updateData},
                {returnDocument:'after'}
            );
            if(!classes){
                throw new Error("Class Not Found");
            }
            return{
                success:true,
                message:`Class ${id} Updated Successfully`,
                data:classes
            };
        }catch(error){
            throw new Error(`Error While Updating Class: ${error.message}`);
        }
    },


    //Change the Status of Class ("Active" or "Deactive")
    changeStatusById: async (id,schoolId) => {
        try{
            const classes = await Class.findOne({classId:id, schoolId : schoolId});
            if(!classes){
                throw new Error("Class Not Found");
            }
            classes.status = classes.status === "Active"?"Inactive" : "Active";
            await classes.save();

            return{
                success:true,
                message:"Status Change Successfully",
                data:classes
            };
        }catch(error){
            throw new Error(`Error While changing Status: ${error.message}`);
        }
    },

    //Delete the Class by ClassId
    deleteById: async (id) => {
        try{
            const classes = await Class.findOneAndDelete({classId:id, schoolId : schoolId});
            if(!classes){
                throw new Error("Class Not Found");
            }
            return{
                success:true,
                message:`Class ${id} is Deleted Successfully`
            };
        }catch(error){
            throw new Error(`Error While Deleting ${id} Class: ${error.message}`);
        }
    }
};

module.exports = classService;