const Role = require("../models/roleModel");
const roles = [
  {
    roleCode: "ADMIN",
    roleName: "Administrator",
    description: "Complete access to the system",
  },
  {
    roleCode: "HEAD_TEACHER",
    roleName: "Head Teacher",
    description: "Manage academic operations",
  },
  {
    roleCode: "CLASS_TEACHER",
    roleName: "Class Teacher",
    description: "Manage assigned classes",
  },
  {
    roleCode: "SUBJECT_TEACHER",
    roleName: "Subject Teacher",
    description: "Manage subjects and marks",
  },
  {
    roleCode: "OFFICE_STAFF",
    roleName: "Office Staff",
    description: "Administrative office work",
  },
];



const seedRoles = async () => {
  try {
    for (const role of roles) {
      await Role.updateOne(
        { roleCode: role.roleCode },
        role,
        { upsert: true }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seedRoles;