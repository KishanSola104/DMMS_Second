const AcademicYear = require('../models/academicYearModel');

const academicYearService = {
    //Create Academic Year
    createAcademicYear: async (yeardata) => {
        try{ 
            if (yeardata.isCurrent) {
            await AcademicYear.updateMany({}, { $set: { isCurrent: false } });
            }
            const year = await AcademicYear.create(yeardata);
            return{
                success:true,
                message:"Academic Year Created Successully",
                data:year
            };
        }catch(error){
            throw new Error(`Error While Creating Year: ${error.message}`);
        }
    },

    //Get All Academic Year
    getAllYear: async () => {
        try{
            await AcademicYear.updateMany(
                { endDate: { $lt: new Date() }, isCompleted: false },
                { $set: { isCompleted: true, isCurrent: false, status: "Inactive" } }
            );
            const year = await AcademicYear.find();
            return{
                success:true,
                message:"All Academic Year Fetched Successfully",
                data:year
            };
        }catch(error){
            throw new Error(`Error While Fetching Academic Year: ${error.message}`);
        }
    },

    // ADD THIS
    syncAcademicYearStatus: async () => {
        try {
            const today = new Date();

            await AcademicYear.updateMany(
                { endDate: { $lt: today }, isCompleted: false },
                { $set: { isCompleted: true, isCurrent: false, status: "Inactive" } }
            );

            await AcademicYear.updateMany(
                { isCurrent: true },
                { $set: { isCurrent: false } }
            );

            const currentYear = await AcademicYear.findOneAndUpdate(
                { startDate: { $lte: today }, endDate: { $gte: today } },
                { $set: { isCurrent: true, isCompleted: false, status: "Active" } },
                { new: true }
            );

            return currentYear;
        } catch (error) {
            throw new Error(`Error While Syncing Academic Year: ${error.message}`);
        }
    }
};

module.exports = academicYearService;