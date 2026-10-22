const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "@#$%&*!";

const getRandomCharacter = (characters) => {
    return characters[Math.floor(Math.random() * characters.length)];
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const generatePassword = (schoolName) => {

    const initials = schoolName
        .trim()
        .split(/\s+/)
        .map(word => word[0].toUpperCase())
        .join("");

    const firstInitial = initials[0] || "S";

    const secondInitial = initials[1] || getRandomCharacter(UPPERCASE);

    const passwordArray = [
        firstInitial,
        secondInitial,
        getRandomCharacter(LOWERCASE),
        getRandomCharacter(NUMBERS),
        getRandomCharacter(SPECIAL),
        getRandomCharacter(LOWERCASE)
    ];

    return shuffle(passwordArray).join("");
};

module.exports = generatePassword;