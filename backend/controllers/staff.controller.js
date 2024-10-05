const Staff = require('../models/staff.model');

/* Register new staff members
---------------------------- */
const registerStaff = async (req, res) => {
    try {
        const { surname, otherNames, dateOfBirth, idPhoto, authCode } = req.body;

        
        if (authCode.length !== 10) {
            return res.status(400).json({ message: 'Invalid auth code.' });
        }

        const employeeNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

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
        res.status(500).json({ message: 'Registration failed : (', error });
    }
};

/* Retrieve staff member(s)
-------------------------- */
const getStaff = async (req, res) => {
    try {
        const { employeeNumber } = req.query;  // Employee Number passed as a query parameter

        if (employeeNumber) {
            // Retrieve a single staff member by employee number
            const staffMember = await Staff.findOne({ where: { employeeNumber } });
            
            if (!staffMember) {
                return res.status(404).json({ message: 'Staff member not found.' });
            }

            res.status(200).json(staffMember);
        } else {
            // Retrieve all staff members
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
        const { dateOfBirth, idPhoto } = req.body;

        const staffMember = await Staff.findOne({ where: { employeeNumber } });

        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }

        if (dateOfBirth) staffMember.dateOfBirth = dateOfBirth;
        if (idPhoto) staffMember.idPhoto = idPhoto;

        await staffMember.save();

        res.status(200).json({ message: 'Staff member updated successfully.', staffMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update staff member.', error });
    }
};

module.exports = { registerStaff, getStaff, updateStaff };
