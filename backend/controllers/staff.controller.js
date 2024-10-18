const Staff = require('../models/staff.model');
const multer = require('multer');

const storage = multer.memoryStorage();//--------- Setting up Multer to store file in memory as buffer
console.log('====================================');
console.log(storage);
console.log('====================================');
const upload = multer({ storage: storage });//---- Multer middleware

/* ====== Register new staff members ======*/
const registerStaff = async (req, res) => {

    try {
        const { surname, otherNames, dateOfBirth, authCode } = req.body;
        const idPhotoFile = req.file; 
        console.log('====================================');
        console.log(req.file);
        console.log('====================================');

        if (authCode.length !== 10) {
            return res.status(400).json({ message: 'Invalid auth code.' });
        }

        let idPhoto = null;
        if (idPhotoFile) {
            idPhoto = idPhotoFile.buffer.toString('base64');
        }

        
        const employeeNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        console.log('====================================');
        console.log(`success`);
        console.log('====================================');

        const newStaff = await Staff.create({
            surname,
            otherNames,
            dateOfBirth,
            idPhoto,
            employeeNumber,
            authCode,
        });

        res.status(201).json({
            message: 'Staff registered successfully.',
            employeeNumber: newStaff.employeeNumber,
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed.', error });
    }
};

/* ===== Retrieve staff member(s) =====*/
const getStaff = async (req, res) => {
    try {
        const { employeeNumber } = req.query;  

        if (employeeNumber) {
            const staffMember = await Staff.findOne({ where: { employeeNumber } });
            if (!staffMember) {
                return res.status(404).json({ message: 'Staff member not found.' });
            }
            res.status(200).json(staffMember);
        } else {
            const staffMembers = await Staff.findAll();
            res.status(200).json(staffMembers);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve staff member(s).', error });
    }
};

/* ====== Update staff member's details ===== */
const updateStaff = async (req, res) => {
    try {
        const { employeeNumber } = req.params;
        const { dateOfBirth } = req.body; 
        const idPhotoFile = req.file;

        const staffMember = await Staff.findOne({ where: { employeeNumber } });
        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }

        if (dateOfBirth) {
            staffMember.dateOfBirth = dateOfBirth;
        }

        if (idPhotoFile) {
            staffMember.idPhoto = idPhotoFile.buffer.toString('base64');
        }

        await staffMember.save();

        res.status(200).json({ message: `Staff member updated successfully.`, staffMember });
    } catch (error) {
        console.error('Error updating staff member:', error); 
        res.status(500).json({ message: 'Failed to update staff member.', error });
    }
};

module.exports = { registerStaff, getStaff, updateStaff, upload };
