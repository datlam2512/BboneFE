import axiosClient from "../config/axiosClient";
const getAllArticel = () => {
    return axiosClient.get(`/articles?page=1&pageSize=10&sort=id`, {
    }
    );
  };
  const getDetailArticle=(Id)=>{
    return axiosClient.get(`/articles/${Id}`);
  };
  
  export{getAllArticel,getDetailArticle}