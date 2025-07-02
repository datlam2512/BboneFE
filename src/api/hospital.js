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
const addHospital = (hospitalData) => {
  return axiosClient.post(`/hospitals`, hospitalData);
};
const updateHospital = (Id, hospitalData) => {
  return axiosClient.put(`/hospitals/${Id}`, hospitalData);
};
const deleteHospital = (Id) => {
  return axiosClient.delete(`/hospitals/${Id}`);
};
const uploadHospitalImages = (hospitalId, formData) => {

  return axiosClient.post(`/imagehospital/${hospitalId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
  export{getAllHospital,getHospitalDetail,createBooking,getAllBooking,confirmbooking,Canclebooking,addHospital,updateHospital,deleteHospital,uploadHospitalImages}