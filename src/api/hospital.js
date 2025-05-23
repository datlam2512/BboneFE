import axiosClient from "../config/axiosClient";
const getAllHospital = () => {
    return axiosClient.get(`/hospitals?page=1&pageSize=5&sort=id`, {
    }
    );
  };
  const getHospitalDetail=(Id)=>{
    return axiosClient.get(`/hospitals/${Id}`);
  };
  const createBooking = (userId, Hosid,Date,Price,Status) => {
    return axiosClient.post(`/bookings`, {
      userId,
      Hosid,
      Date,
      Price,
      Status
      ,
    });
  };
  const confirmbooking = (Id) => {
    return axiosClient.put(`/bookings/successs/${Id}`);
  };
  
  const Canclebooking = (Id) => {
    return axiosClient.put(`/bookings/disable/${Id}`);
  };
  
  const getAllBooking = () => {
    return axiosClient.get(`/bookings?page=1&pageSize=50&sort=id`, {
    }
    );
  };

  export{getAllHospital,getHospitalDetail,createBooking,getAllBooking,confirmbooking,Canclebooking}