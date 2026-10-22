const Section = require('../models/sectionModel');
const Class = require('../models/classModel');
const Employee = require('../models/employeeModel');

const sectionService = {
    //Create Section
    createSection: async (sectiondata,schoolId) => {
        try{
            const { sectionId, classId, section, classTeacherId, maximumCapacity } = sectiondata;

            const existingSection = await Section.findOne({sectionId,classId,schoolId});
        if (existingSection) {
            throw new Error(`Section ${sectionId} already exists in this class`);
        }

        if (classTeacherId) {
            const teacherAssigned = await Section.findOne({ classTeacherId, schoolId });

            if (teacherAssigned) {
                throw new Error("This teacher is already assigned to another section");
            }
        }
            const sections = await Section.create({ sectionId, classId, section, classTeacherId, maximumCapacity, schoolId });
            return{
                success:true,
                message:"Section Created Successfully",
                data:sections
            };
        }catch(error){
            throw new Error(`Error while creating Section ${error.message}`);
        }
    },

    //Get All Section By ClassId
    getAllSection: async (classId,schoolId) => {
        try{
            const sections = await Section.find({classId:classId, schoolId:schoolId}).populate("classId","classId standard").populate("classTeacherId","employeeId firstName gender email");
            if(!sections.length===0){
                throw new Error(`No Sections Found this class`);
            }
            return{
                success:true,
                message:"All Sections of ClassId is Fetched Successfully",
                data:sections
            };
        }catch(error){
            throw new Error(`Error While Fetching the Sections ${error.message}`);
        }
    },

    //Updated section By SectionId
    updateById: async (sectionId, updatedData,schoolId) => {
        try{
            const{classTeacherId,maximumCapacity,status}=updatedData;

            if (classTeacherId) {
            const teacherAssigned = await Section.findOne({ classTeacherId });

            if (teacherAssigned) {
                throw new Error("This teacher is already assigned to another section");
            }
        }

        // Only allow these three fields to be updated
        const updateFields = {};

        if (classTeacherId) {
            updateFields.classTeacherId = classTeacherId;
        }

        if (maximumCapacity !== undefined) {
            updateFields.maximumCapacity = maximumCapacity;
        }

        if (status) {
            updateFields.status = status;
        }
        
        const updatedSection = await Section.findOneAndUpdate(
            {sectionId:sectionId, schoolId:schoolId},
            {$set:updateFields},
            {returnDocument:'after'}
        );
        if(!sectionId){
            throw new Error("Section Does not Exisit");
        }
        return{
            success:true,
            message:`SectionId ${sectionId} updated Successfully`,
            data:updatedSection 
        };
        }catch(error){
            throw new Error(`Error While Updating section ${error.message}`);
        }
    },

    //Change the Status of Section By SectionId
    changeStatusById: async (sectionId,schoolId) => {
        try{
            const section = await Section.findOne({sectionId:sectionId, schoolId:schoolId});
            if(!section){
                throw new Error(`Section not Found`);
            }
            section.status = section.status === "Active"?"Inactive" : "Active";
            await section.save();
            return{
                success:true,
                message:`Status Changed Successfully`,
                data:section
            };
        }catch(error){
            throw new Error(`Error While Updating status ${error.message}`);
        }
    }
};

module.exports = sectionService;
