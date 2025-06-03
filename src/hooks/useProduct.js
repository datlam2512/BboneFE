import { create } from "zustand";
import { getDetailProduct } from "../api/product";
import { getAllProduct } from "../api/product";
import { uploadProductImages } from "../api/product";
const useProduct = create((set) => ({
  productData: [],
  productDataDetail:[],
 ProductTotalElement: "",
  isLoadingProductData: false,
  fetchProductrData: async () => {
    try {
      set({ isLoadingProductData: true });
      const response = await getAllProduct();
      if (response && response.status === 200) {
        set({ productData: response?.data?.Data?.ListData || [] });
        set({ isLoadingProductData: response?.data?.totalElements || "" });
      }
      set({ isLoadingProductData: false });
    } catch (error) {
      set({ isLoadingProductData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchProductDetail: async (Id) => {
    try {
      const response = await getDetailProduct(Id);
      if (response && response.status === 200) {
        set({ productDataDetail: response.data.Data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  
  uploadImages: async (productId, files) => {
    try {
      const response = await uploadProductImages(productId, files);
      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  }
}));
export default useProduct;
