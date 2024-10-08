import axios from 'axios';

const BASE_ADMIN_URL = 'http://localhost:3000/api/admin';

/*===== Register Admin =====*/
export const registerAdmin = async (employeeNumber) => {
  try {
      const response = await axios.post(`${BASE_ADMIN_URL}/register`, { employeeNumber });
      return response.data; 
  } catch (error) {
      console.error("Error registering admin:", error);
      throw error.response ? error.response.data : new Error("Failed to register admin");
  }
};

/*===== Login Admin =====*/
export const loginAdmin = async (employeeNumber, password) => {
  try {
      const response = await axios.post(`${BASE_ADMIN_URL}/login`, {
          employeeNumber,
          password,
      });
      return response.data;
  } catch (error) {
      console.error("Error logging in admin:", error);
      throw error.response ? error.response.data : new Error("Failed to log in admin");
  }
};

/*===== Fetch Admin Metrics =====*/
export const getMetrics = async () => {
  try {
      const response = await axios.get(`${BASE_ADMIN_URL}/metrics`);
      return response.data;
      
  } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to retrieve metrics');
  }
};