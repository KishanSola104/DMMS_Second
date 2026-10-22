require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = express();
const employeeRoute = require('./routes/employeeRoute');
const userRoute = require('./routes/userRoute');
const roleRoutes = require("./routes/roleRoute");
const studentRoute = require('./routes/studentRoute');
const classRoute = require('./routes/classRoute');
const academicYearRoute = require('./routes/academicYearRoute');
const subjectRoute = require('./routes/subjectRoute');
const classSubjectRoute = require('./routes/classSubjectRoute');
const adminDashboardRoute = require('./routes/adminDashboardRoute');
const sectionRoute = require('./routes/sectionRoute');
const { startAcademicYearCron } = require('./jobs/academicYearJob');

// after your DB connection is established
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
    startAcademicYearCron(); // <-- add this line
});

// Kishan Import Seeder
const seedRoles = require("./seeders/roleSeeder");

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],      
    credentials: true                                          
};

/* Import By Kishan */
// Routes
const authRoutes = require("./routes/authRoutes");

app.use(cors(corsOptions));

app.use(express.json());


//DB Connection
connectDB();
 
seedRoles(); 


app.get('/', (req, res) => {
    res.send('Server is running');
});


//Routes

app.use("/api/employees", employeeRoute);
// app.use("/api/login", userRoute);
app.use("/api/students", studentRoute);
app.use("/api/roles", roleRoutes);
app.use("/api/admin/classes", classRoute);
app.use("/api/academic-years", academicYearRoute);
app.use("/api/admin/subjects", subjectRoute);
app.use('/api/admin/class-subjects', classSubjectRoute);
app.use('/api/adminDashboard', adminDashboardRoute);
app.use('/api/admin/sections',sectionRoute);


/* Added By Kishan */
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
    startAcademicYearCron();
});