Every collection: 
1. academicYearModel:
        academicYearId: {type:String, unique:true, required:true, trim:true}

        year: {type:String, unique:true, required:true, trim:true}

        startDate: {type:Date, required:true}

        endDate: {type:Date, required:true}

        isCurrent: {type:Boolean, default:false}

        isCompleted: {type:Boolean, default:false}

        status: {type:String, enum:["Active","Inactive"], default:"Active"}

        timestamps:true


2. auditLogModel:
        auditLogId: {type: String,unique: true,required: true}

        userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true}

        action: {type: String,enum: ["CREATE","UPDATE","DELETE","LOGIN","LOGOUT","PASSWORD_CHANGE","STATUS_CHANGE"],required: true}

        entity: {type: String,required: true,enum: ["School","AcademicYear", "Employee","User","Student", "Class","Section","Subject","Exam","Mark","Role","Notification"]}

        entityId: {type: mongoose.Schema.Types.ObjectId,required: true}

        oldData: {type: mongoose.Schema.Types.Mixed,default: null}

        newData: {type: mongoose.Schema.Types.Mixed,default: null}

        ipAddress: {type: String,default: null}

        timestamps: true


3. classModel:
        schoolId:{type:mongoose.Schema.Types.ObjectId, ref:"School", required:true}
        
        classId: {type:String, unique:true, required:true, trim:true}
        
        standard: {type:String, required:true, trim:true}
        
        academicYearId: {type:mongoose.Schema.Types.ObjectId, ref:"AcademicYear", required:true}
        
        maximumCapacity: {type:Number, required:true, min:1}
        
        status: {type:String, enum: ["Active","Inactive"], default:"Active"}

        timestamps:true
    

4. classSubjectModel:
        classSubjectId:{type:String, unique:true, required:true, trim:true}
        
        classId:{type:mongoose.Schema.Types.ObjectId, ref:"Class", required:true}
        
        sectionId:{type:mongoose.Schema.Types.ObjectId, ref:"Section", required:true}
        
        subjectId:{type:mongoose.Schema.Types.ObjectId, ref:"Subject", required:true}
        
        subjectTeacherId:{type:mongoose.Schema.Types.ObjectId, ref:"Employee", required:true}
        
        status:{type:String, enum:["Active","Inactive"], default:"Active"}
    
        timestamps:true


5. counterModel:
        name:{type: String, required: true, unique: true}

        sequence:{type: Number, default: 0}

        timestamps: true


6. employeeModel:
        employeeId: {type: String, unique: true, required: true, trim: true, uppercase: true}

        schoolId: {type: mongoose.Schema.Types.ObjectId, ref: "School", required: true}

        firstName: {type: String, required: true, trim: true}

        lastName: {type: String, required: true, trim: true}

        gender: {type: String, enum: ["Male", "Female", "Other"], default: null}

        dob: {type: Date, default: null}

        email: {type: String, unique: true, required: true, lowercase: true, trim: true}

        mobileNumber: {type: String, unique: true, required: true, trim: true}

        address: {type: String, default: null, trim: true}

        qualification: {type: String, default: null, trim: true}

        experience: {type: String, default: null, trim: true}

        joiningDate: {type: Date, default: null}

        designation: {type: String, required: true, trim: true}

        department: {type: String, default: null, trim: true}

        salary: {type: Number, default: null}

        status: {type: String, enum: ["Active", "Inactive"], default: "Active"}

        timestamps: true


7. examModel:
        examId:{type:String, unique:true, required:true, trim:true}
        
        examName:{type:String, required:true, trim:true}
        
        classIds:[
            {
                type:mongoose.Schema.Types.ObjectId, ref:"Class", required:true
            }
        ]
        
        academicYearId:{type:mongoose.Schema.Types.ObjectId, ref:"AcademicYear", required:true}
        
        startDate:{type:Date, required:true}
        
        endDate:{type:Date, required:true}
        
        resultPublished:{type:Boolean, default:false}
        
        status:{type:String, enum:["Active", "Inactive"], default:"Active"}
    
        timestamps:true


8.  idCounterModel:
        counterId:{type:String, unique:true, required:true}

        entityName:{type:String, unique:true, required:true}

        prefix:{type:String, required:true}

        lastSequenceNumber:{type:Number, default:0}
    
        timestamps:true
    

9.  markModel:
        markId:{type:String, unique:true, required:true}

        studentId:{type:mongoose.Schema.Types.ObjectId, ref:"Student", required:true}
        
        examId:{type:mongoose.Schema.Types.ObjectId, ref:"Exam", required:true}
        
        classId:{type:mongoose.Schema.Types.ObjectId, ref:"Class", required:true}
        
        academicYearId:{type:mongoose.Schema.Types.ObjectId, ref:"AcademicYear", required:true}
        
        subjects:[
            {
                subjectId:{type:mongoose.Schema.Types.ObjectId, ref:"Subject", required:true}
            
                marks:{type:Number, required:true, min:0}
            
                grade:{type:String, required:true}
            }
        ]
        
        totalMarks:{type:Number, required:true, min:0}
        
        percentage:{type:Number, required:true, min:0, max:100}
        
        behavior:{type:String, required:true}
        
        isLocked:{type:Boolean, default:false}
    
        timestamps:true
    

10.  notificationModel:
        notificationId: { type: String, unique: true, required: true }

        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

        title: { type: String, required: true, trim: true }

        message: { type: String, required: true, trim: true }

        type: { type: String, enum: ["GENERAL", "ACADEMIC", "EXAM", "ASSIGNMENT", "ATTENDANCE", "FEE", "LEAVE", "HOLIDAY", "SYSTEM"], default: "GENERAL" }

        isRead: { type: Boolean, default: false }

        readAt: { type: Date, default: null }
    
        timestamps: true
    

11. otpModel:
        email: { type: String, required: true, lowercase: true, trim: true }

        otp: { type: String, required: true }

        purpose: { type: String, enum: ["REGISTER", "LOGIN", "FORGOT_PASSWORD", "EMAIL_VERIFICATION"], required: true }

        expiresAt: { type: Date, required: true }

        isVerified: { type: Boolean, default: false }
    
        timestamps: true

    
12.  roleModel:
         roleCode: { type: String, required: true, unique: true, uppercase: true, trim: true }

        roleName: { type: String, required: true, unique: true, trim: true }

        description: { type: String, default: null }

        isActive: { type: Boolean, default: true }
  
        timestamps: true


13. schoolModel:
        schoolId: { type: String, required: true, unique: true, trim: true }

        schoolName: { type: String, required: true, trim: true }

        email: { type: String, required: true, unique: true, lowercase: true, trim: true }

        password: { type: String, required: true }

        phone: { type: String, required: true, trim: true }

        address: { type: String, required: true, trim: true }

        establishedYear: { type: Number, required: true }

        website: { type: String, default: null, trim: true }

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    
        timestamps: true


14. sectionModel:
        sectionId:{type:String, unique:true, required:true}
        
        classId:{type:mongoose.Schema.Types.ObjectId, ref:"Class", required:true}
        
        section:{type:String, required:true, trim:true, uppercase:true}
        
        classTeacherId:{type:mongoose.Schema.Types.ObjectId, ref:"Employee", required:true}
        
        maximumCapacity:{type:Number, required:true, min:1}
        
        status:{type:String, enum:["Active","Inactive"], default:"Active"}
    
        timestamps:true
    


15. studentModel:
        studentId: {type:String, unique:true, required:true}
        
        schoolId: {type:mongoose.Schema.Types.ObjectId, ref:"School", required:true}

        admissionNo:{type:String, unique:true, required:true}
        
        admissionClass:{type: String, required:true}
        
        admissionDate:{type:Date, required:true}
        
        admissionAcademicYearId:{type:mongoose.Schema.Types.ObjectId, ref:"AcademicYear", required:true}
        
        firstName:{type:String, required:true}
        
        lastName:{type:String, required:true}
        
        gender:{type:String, enum:["Male","Female","Other"], required:true}
        
        dob:{type:Date, required:true}
        
        bloodGroup:{type:String, enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"], required:true}
        
        religion:{type:String, required:true}
        
        address:{type:String, required:true}
        
        fatherName:{type:String, required:true}
        
        fatherOccupation:{type:String, required:true}
        
        fatherContact:{type:String, required:true}
        
        motherName:{type:String, required:true}
        
        motherOccupation:{type:String, required:true}
        
        motherContact:{type:String, required:true}
        
        classId:{type:mongoose.Schema.Types.ObjectId, ref:"Class", required:true}
        
        sectionId:{type:mongoose.Schema.Types.ObjectId, ref:"Section", required:true}
        
        rollNo:{type:String, required:true}
        
        academicYearId:{type:mongoose.Schema.Types.ObjectId, ref:"AcademicYear", required:true}
        
        status:{type:String, enum:["Active", "Inactive", "Left", "Completed"], default:"Active"}

        timestamps:true
    
    
16. subjectModel: 
        subjectId:{type:String, unique:true, required:true}

        subjectCode:{type:String, unique:true, required:true, trim:true, uppercase:true}
        
        subjectName:{type:String, unique:true, required:true, trim:true}

        description:{type:String, default:null, trim:true}

        passingMarks:{type:Number, required:true, min:0}
        
        status:{type:String, enum:["Active","Inactive"], default:"Active"}
    
        timestamps:true
    

17. userModel:
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true, unique: true }

        userId: { type: String, required: true, unique: true, uppercase: true, trim: true }

        userName: { type: String, required: true, trim: true },

        roleIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        }]

        password: { type: String, required: true }

        accountStatus: { type: String, enum: ["Active", "Inactive", "Suspended"], default: "Active" }

        lastLogin: { type: Date, default: null }

        failedLoginAttempts: { type: Number, default: 0 }

        passwordChangedAt: { type: Date, default: null }
  
        timestamps: true,
  