import axiosClient from "../config/axiosClient";
const getAllProduct = (page) => {
    return axiosClient.get(`/products`, {
      params: {
        page: page,
        pageSize: 10
      },
    }
    );
  };
  const getDetailProduct=(Id)=>{
    return axiosClient.get(`/products/${Id}`);
  };
  // Add new product
const addProduct = (productData) => {
  return axiosClient.post(`/products`, productData);
};

// Update product by Id
const updateProduct = (Id, productData) => {
  return axiosClient.put(`/products/${Id}`, productData);
};

// Delete product by Id
const deleteProduct = (Id) => {
  return axiosClient.delete(`/products/${Id}`);
};

  export{getAllProduct,getDetailProduct,addProduct,updateProduct,deleteProduct}