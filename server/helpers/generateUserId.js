const Counter = require("../models/counterModel");

const generateRandomLetters = (length = 3) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return result;
};

const getSchoolInitials = (schoolName) => {
    return schoolName
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase())
        .join("");
};

const generateUserId = async (schoolName, firstName, lastName) => {
    // School Initials
    const schoolInitials = getSchoolInitials(schoolName);

    // Employee Initials
    const firstInitial = firstName.trim().charAt(0).toUpperCase();
    const lastInitial = lastName.trim().charAt(0).toUpperCase();

    // Random Characters
    const randomLetters = generateRandomLetters(3);

    // Counter
    const counter = await Counter.findOneAndUpdate(
        { name: "employee" },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true }
    );

    const sequence = String(counter.sequence).padStart(3, "0");

    // Final User ID
    return `${schoolInitials}${firstInitial}${lastInitial}${randomLetters}${sequence}`;
};

module.exports = generateUserId;