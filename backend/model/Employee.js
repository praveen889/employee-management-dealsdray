const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: String,
    designation: String,
    gender: String,
    course: [String], 
    createdDate: String,  
    image: String,
});

const Employee = mongoose.model('employees', EmployeeSchema);
module.exports = Employee;