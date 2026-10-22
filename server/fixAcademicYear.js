require('dotenv').config();
const mongoose = require('mongoose');
const academicYearService = require('./services/academicYearService');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected. Syncing...');
    const result = await academicYearService.syncAcademicYearStatus();
    console.log('Done. Current year is now:', result?.year);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});