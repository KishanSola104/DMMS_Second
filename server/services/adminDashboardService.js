const mongoose = require('mongoose');

const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Exam = require('../models/examModel');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

const teachingCodes = [
    "HEAD_TEACHER",
    "CLASS_TEACHER",
    "SUBJECT_TEACHER"
];

const officeStaffCodes = [
    "OFFICE_STAFF"
];

const adminDashboardService = {

    // Get Dashboard Statistics
    getDashboardStats: async (academicYearId,schoolId) => {
        try {

            const teachingRoleIds = await Role.find(
                {
                    roleCode: { $in: teachingCodes },
                    isActive: true
                },
                { _id: 1 }
            ).distinct('_id');

            const officeStaffRoleIds = await Role.find(
                {
                    roleCode: { $in: officeStaffCodes },
                    isActive: true
                },
                { _id: 1 }
            ).distinct('_id');

            // Classes - Selected Academic Year
            const classes = await Class.countDocuments({
                academicYearId,
                schoolId:schoolId,
                status: "Active"
            });

            // Exams - Selected Academic Year
            const exams = await Exam.countDocuments({
                academicYearId,
                schoolId:schoolId,
                status: "Active"
            });

            // Students - Selected Academic Year
            const students = await Student.countDocuments({
                academicYearId,
                schoolId:schoolId,
                status: "Active"
            });

            // Teachers - School Wide
            const teachers = await User.countDocuments({
                roleIds: { $in: teachingRoleIds },
            });

            // Office Staff - School Wide
            const officeStaffs = await User.countDocuments({
                roleIds: { $in: officeStaffRoleIds }
            });

            return {
                success: true,
                message: "Stats Fetch Successfully",
                data: {
                    classes,
                    teachers,
                    students,
                    officeStaffs,
                    exams
                }
            };

        } catch (error) {
            throw new Error(
                `Error While Fetching Stats ${error.message}`
            );
        }
    },


    // Get Students Per Class
    getClassStrength: async (academicYearId) => {
        try {

            // Validate Academic Year ID
            if (!mongoose.Types.ObjectId.isValid(academicYearId)) {
                throw new Error("Invalid Academic Year ID");
            }

            const classStrength = await Class.aggregate([
                {
                    $match: {
                        academicYearId: new mongoose.Types.ObjectId(academicYearId),
                        status: "Active"
                    }
                },

                {
                    $lookup: {
                        from: "students",
                        let: {
                            classId: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    "$classId",
                                                    "$$classId"
                                                ]
                                            },
                                            {
                                                $eq: [
                                                    "$academicYearId",
                                                    new mongoose.Types.ObjectId(academicYearId)
                                                ]
                                            },
                                            {
                                                $eq: [
                                                    "$status",
                                                    "Active"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "students"
                    }
                },

                {
                    $project: {
                        _id: 0,
                        class: "$standard",
                        students: {
                            $size: "$students"
                        }
                    }
                },

                {
                    $sort: {
                        class: 1
                    }
                }
            ]);

            return {
                success: true,
                message: "Class Strength Fetched Successfully",
                data: classStrength
            };

        } catch (error) {
            throw new Error(
                `Error While Fetching Class Strength: ${error.message}`
            );
        }
    }

};

module.exports = adminDashboardService;