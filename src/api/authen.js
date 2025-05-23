
import axiosClient from "../config/axiosClient";
const login = (Email, Password) => {
  return axiosClient.post('/authentication/login', { Email, Password }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
const register = (Email, Password,FullName,GenderId,TelephoneNumber) => {
  return axiosClient.post('/authentication/register', { Email, Password,FullName,GenderId,TelephoneNumber }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export { login,register};
