const Counter = require("../models/counterModel");

const RANDOM_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateRandomLetters = (length = 3) => {
    let result = "";

    for (let i = 0; i < length; i++) {
        result += RANDOM_CHARACTERS.charAt(
            Math.floor(Math.random() * RANDOM_CHARACTERS.length)
        );
    }

    return result;
};

const getSchoolInitials = (schoolName) => {
    return schoolName
        .trim()
        .split(/\s+/)
        .map((word) => word[0].toUpperCase())
        .join("");
};

const generateSchoolId = async (schoolName) => {

    const counter = await Counter.findOneAndUpdate(
        { name: "school" },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true }
    );

    const initials = getSchoolInitials(schoolName);

    const randomLetters = generateRandomLetters(3);

    const serial = String(counter.sequence).padStart(3, "0");

    return `${initials}${randomLetters}${serial}`;
};

module.exports = generateSchoolId;