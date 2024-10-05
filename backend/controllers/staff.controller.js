const Staff = require('../models/staff.model');
const multer = require('multer');

// Set up Multer to store the file in memory (as a buffer)
// You can configure this to store on disk if needed
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Multer middleware

/* Register new staff members
---------------------------- */
const registerStaff = async (req, res) => {

    console.log('====================================');
    console.log(req.body);
    console.log(req.file);
    console.log('====================================');

    try {
        const { surname, otherNames, dateOfBirth, authCode } = req.body;
        const idPhotoFile = req.file;  // Access the uploaded file

        if (authCode.length !== 10) {
            return res.status(400).json({ message: 'Invalid auth code.' });
        }

        // If there's a file, convert it to a Base64 string
        let idPhoto = null;
        if (idPhotoFile) {
            idPhoto = idPhotoFile.buffer.toString('base64');
        }

        // Generate the employee number
        const employeeNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

        // Create the new staff member with the Base64 encoded image (if any)
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
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ message: 'Registration failed.', error });
    }
};

/* Retrieve staff member(s)
-------------------------- */
const getStaff = async (req, res) => {
    try {
        const { employeeNumber } = req.query;  // Employee Number passed as a query parameter

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

/* Update staff member's details
--------------------- */
const updateStaff = async (req, res) => {
    try {
        const { employeeNumber } = req.params;
        const { dateOfBirth } = req.body;
        const idPhotoFile = req.file;  // Access the uploaded file

        const staffMember = await Staff.findOne({ where: { employeeNumber } });
        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }

        if (dateOfBirth) staffMember.dateOfBirth = dateOfBirth;

        // If there's a new image, convert it to Base64 and update
        if (idPhotoFile) {
            staffMember.idPhoto = idPhotoFile.buffer.toString('base64');
        }

        await staffMember.save();

        res.status(200).json({ message: 'Staff member updated successfully.', staffMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update staff member.', error });
    }
};

module.exports = { registerStaff, getStaff, updateStaff, upload };
