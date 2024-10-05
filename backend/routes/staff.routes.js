const express = require('express');
const { registerStaff, getStaff, updateStaff, upload } = require('../controllers/staff.controller');

const router = express.Router();

/* Route to register new staff
------------------------------ */
router.post('/register', upload.single('idPhoto'), registerStaff);

/* Route to retrieve staff member(s)
------------------------------------*/
router.get('/retrieve', getStaff);  

/* Route to update staff details
---------------------------------- */
router.put('/update/:employeeNumber', upload.single('idPhoto'), updateStaff); 

module.exports = router;
