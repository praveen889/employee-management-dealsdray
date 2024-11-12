const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Employee = require('./model/Employee')
const User = require('./model/User')
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


app.post('/login', (req, res) =>{
    const{ email, password } = req.body;
    User.findOne({email : email})
    .then( users =>{
        if(users){
            if(users.password === password){
                res.json("Successfully Login")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json('User not found')
        }
    })
})


app.get('/getEmployee/:id', (req, res) => {
    const { id } = req.params;
    Employee.findById(id)
      .then(employee => {
        if (employee) {
          res.json(employee);
        } else {
          res.status(404).json({ message: 'Employee not found' });
        }
      })
      .catch(error => res.status(500).json({ message: 'Error fetching employee data', error }));
  });
  


app.put('/updateEmployee/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const updatedData = { ...req.body };
    
    if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.course) {
        updatedData.course = JSON.parse(req.body.course);
    }

    Employee.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedEmployee => res.json(updatedEmployee))
        .catch(error => res.status(500).json({ message: 'Failed to update employee', error }));
});

  


app.post('/signup', (req, res) =>{
    User.create(req.body)
    .then( users => res.json(users))
    .catch(err => res.json(err))
})


app.post('/addEmployee', upload.single('image'), (req, res) => {
    const { id, name, email, phone, designation, gender, createdDate } = req.body;
    const course = JSON.parse(req.body.course); 
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newEmployee = new Employee({
        id,
        name,
        email,
        phone,
        designation,
        gender,
        course,
        createdDate,
        image: imagePath
    });

    newEmployee.save()
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});

app.get('/getEmployee', (req, res) =>{
    Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res(err))
})

app.delete('/deleteEmployee/:id', (req, res) => {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
    .then(() => res.status(200).send('Employee deleted successfully'))
    .catch((error) => res.status(500).send('Error deleting employee'));
});
  


app.listen(5000, () =>{
    console.log('Server is running')
})