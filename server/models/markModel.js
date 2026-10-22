const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
{
    markId: {
        type: String,
        unique: true,
        required: true
    },
    
    schoolId : {type: mongoose.Schema.Types.ObjectId,ref:"School"},

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },

    academicYearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },

    // First Term / Second Term / End Term
    exams: [
        {
            examId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exam",
                required: true
            },

            subjects: [
                {
                    subjectId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Subject",
                        required: true
                    },

                    writtenMarks: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 50
                    },

                    oralMarks: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 5
                    },

                    classAssessmentMarks: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 5
                    }
                }
            ],

            comments: {
                classTeacher: {
                    type: String,
                    default: null,
                    trim: true
                },

                headMaster: {
                    type: String,
                    default: null,
                    trim: true
                },

                guardian: {
                    type: String,
                    default: null,
                    trim: true
                }
            }
        }
    ],

    // Subject-wise Project Marks (Once Per Academic Year)
    projectMarks: [
        {
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
                required: true
            },

            marks: {
                type: Number,
                required: true,
                min: 0,
                max: 10
            }
        }
    ],

    // Co-Scholastic Grades
    coScholastic: [
        {
            area: {
                type: String,
                enum: [
                    "Arts",
                    "Sports",
                    "Music",
                    "Recitation",
                    "GeneralKnowledge",
                    "Uniform",
                    "Discipline",
                    "Attendance",
                    "Behaviour",
                    "Cleanliness"
                ],
                required: true
            },

            grade: {
                type: String,
                enum: ["A+", "A", "B", "C", "D", "E"],
                required: true
            }
        }
    ],

    finalRemarks: {
        type: String,
        default: null,
        trim: true
    },

    isLocked: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

// One document per student per class per academic year
markSchema.index(
    {
        studentId: 1,
        classId: 1,
        academicYearId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Mark", markSchema);