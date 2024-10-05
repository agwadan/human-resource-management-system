const Staff = require('../models/staff.model');
const multer = require('multer');

const storage = multer.memoryStorage();//--------- Setting up Multer to store file in memory as buffer
const upload = multer({ storage: storage });//---- Multer middleware

/* Register new staff members
---------------------------- */
const registerStaff = async (req, res) => {

    try {
        const { surname, otherNames, dateOfBirth, authCode } = req.body;
        const idPhotoFile = req.file; 

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
        const { dateOfBirth } = req.body; // Get dateOfBirth from request body
        const idPhotoFile = req.file; // Access the uploaded file (handled by Multer)

        // Find the staff member by employee number
        const staffMember = await Staff.findOne({ where: { employeeNumber } });
        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }

        // Update the date of birth if provided
        if (dateOfBirth) {
            staffMember.dateOfBirth = dateOfBirth;
        }

        // If a new image file is uploaded, convert it to Base64 and update
        if (idPhotoFile) {
            // Convert file buffer to Base64
            staffMember.idPhoto = idPhotoFile.buffer.toString('base64');
        }

        // Save the updated staff member
        await staffMember.save();

        // Respond with success message and updated staff member details
        res.status(200).json({ message: 'Staff member updated successfully.', staffMember });
    } catch (error) {
        console.error('Error updating staff member:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to update staff member.', error });
    }
};

module.exports = { registerStaff, getStaff, updateStaff, upload };
