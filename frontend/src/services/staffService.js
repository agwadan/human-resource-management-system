import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/staff';


/* Register new staff member
----------------------------*/
export const registerStaff = async (formData) => {
 
    try {
      // Make the request using multipart/form-data
      const response = await axios.post(`${BASE_URL}/register`, formData);
      return response.data;
    } catch (error) {
      console.error("Error registering staff:", error);
      throw error.response ? error.response.data : new Error("Failed to register staff");
    }
  };

/* Retrieve one or all staff members
------------------------------------*/
export const retrieveStaff = async (employeeNumber = null) => {
  
    try {
        const url = employeeNumber ? `${BASE_URL}/retrieve?employeeNumber=${employeeNumber}` : `${BASE_URL}/retrieve`;
        const response = await axios.get(url);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        return response.data;  // This should include the Base64 image string in `idPhoto`
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
