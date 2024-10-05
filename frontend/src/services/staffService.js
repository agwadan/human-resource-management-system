import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/staff';

/* Register new staff member
----------------------------*/
export const registerStaff = async (staffData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, staffData);
        return response.data;
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        throw error.response ? error.response.data : new Error('Failed to register staff');
    }
};

/* Retrieve one or all staff members
------------------------------------*/
export const retrieveStaff = async (employeeNumber = null) => {
    console.log('====================================');
    console.log(employeeNumber);
    console.log('====================================');
    try {
        const url = employeeNumber ? `${BASE_URL}/retrieve?employeeNumber=${employeeNumber}` : `${BASE_URL}/retrieve`;
        console.log('====================================');
        console.log(url);
        console.log('====================================');
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to retrieve staff');
    }
};

/* Update staff details
-----------------------*/
export const updateStaff = async (employeeNumber, staffData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${employeeNumber}`, staffData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to update staff');
    }
};
