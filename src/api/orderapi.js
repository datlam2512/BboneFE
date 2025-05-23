import axiosClient from "../config/axiosClient";
const CreateOrder = (userid, productid) => {
  return axiosClient.post(`/orders/${userid}/${productid}`)};
  const CreateupdateOrder = (userid, products) => {
    return axiosClient.post(`/orders/add-or-update-product`, {
      UserId: userid,
      Products: products
    });
  };
  
  const purchaseconfirm = (Id) => {
    return axiosClient.put(`/orders/${Id}/complete-payment`);
  };
  
  const Cancle = (Id) => {
    return axiosClient.put(`/orders/${Id}`);
  };
  
  const getAllOrder = () => {
    return axiosClient.get(`/orders?page=1&pageSize=100&sort=id`, {
    }
    );
  };
  const gettotalOrder = () => {
    return axiosClient.get(`/orders/orderSuccess`, {
    }
    );
  };

  const gettotalOrdermonth = () => {
    return axiosClient.get(`/orders/sales-overYear?year=2024`, {
    }
    );
  };
export { CreateOrder,getAllOrder,CreateupdateOrder,purchaseconfirm,Cancle,gettotalOrder,gettotalOrdermonth};
