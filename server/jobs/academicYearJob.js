const cron = require('node-cron');
const academicYearService = require('../services/academicYearService');

const startAcademicYearCron = () => {
    // Runs every day at 12:00 AM server time
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily academic year sync...');
        try {
            const current = await academicYearService.syncAcademicYearStatus();
            console.log('Current academic year set to:', current?.year || 'none found');
        } catch (error) {
            console.error('Academic year sync failed:', error.message);
        }
    });
};

module.exports = { startAcademicYearCron };