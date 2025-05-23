import axiosClient from "../config/axiosClient";

// Get all customers
const getAllCustomer = () => {
  return axiosClient.get(`/users/customers`, {
    params: {
      page: 1,
      pageSize: 30,
    },
  });
};

// Get customer details by ID
const getDetailCustomer = (Id) => {
  return axiosClient.get(`/users/${Id}`);
};

// Update customer details
const updateCustomerDetail = async (data) => {
  try {
    const response = await axiosClient.put(`/users`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update customer data', error);
    throw error;
  }
};

// Get all staff with pagination
const getAllStaff = (page, pageSize = 10) => {
  return axiosClient.get('/users/staff', {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
// Get all staff with pagination
const getCountCustomer = () => {
  return axiosClient.get('/users/role/customer', {
  });
};
// Add a new staff
const addStaff = (data) => {
  return axiosClient.post('/authentication/staff', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Update staff details
const updateStaff = (Id, data) => {
  return axiosClient.put(`/users`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Soft delete staff
const softDeleteStaff = (Id) => {
  return axiosClient.delete(`/users/${Id}`);
};

export {
  getAllCustomer,
  getDetailCustomer,
  getAllStaff,
  updateCustomerDetail,
  addStaff,
  updateStaff,
  softDeleteStaff,
  getCountCustomer
};
