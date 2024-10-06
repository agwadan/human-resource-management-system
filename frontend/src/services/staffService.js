import axios from 'axios';

const BASE_STAFF_URL = 'http://localhost:3000/api/staff';
const BASE_ADMIN_URL = 'http://localhost:3000/api/admin';

/* ===== Register new staff member =====*/
export const registerStaff = async (formData) => {
 
    try {
      const response = await axios.post(`${BASE_STAFF_URL}/register`, formData);
      return response.data;
    } catch (error) {
      console.error("Error registering staff:", error);
      throw error.response ? error.response.data : new Error("Failed to register staff");
    }
  };

/* ===== Retrieve one or all staff members =====*/
export const retrieveStaff = async (employeeNumber = null) => {
  
    try {
        const url = employeeNumber ? `${BASE_STAFF_URL}/retrieve?employeeNumber=${employeeNumber}` : `${BASE_URL}/retrieve`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to retrieve staff');
    }
};

/* ===== Update staff details =====*/
export const updateStaff = async (employeeNumber, staffData) => {
    try {
        const response = await axios.put(`${BASE_STAFF_URL}/update/${employeeNumber}`, staffData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to update staff');
    }
};

/*===== Fetch Admin Metrics =====*/
export const getMetrics = async () => {
    try {
        const response = await axios.get(`${BASE_ADMIN_URL}/metrics`);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        return response.data;
        
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to retrieve metrics');
    }
};