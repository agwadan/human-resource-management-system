const express = require('express');
const { registerStaff, getStaff, updateStaff } = require('../controllers/staff.controller');

const router = express.Router();

/* Route to register new staff
------------------------------ */
router.post('/register', registerStaff);

/* Route to retrieve staff member(s)
------------------------------------*/
router.get('/retrieve', getStaff);  

/* Route to update staff details
---------------------------------- */
router.put('/update/:employeeNumber', updateStaff);  

module.exports = router;
