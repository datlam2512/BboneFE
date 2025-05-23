import { create } from "zustand";
import { getAllStaff } from "../api/user";
import {getAllCustomer} from "../api/user"
import { getCountCustomer } from "../api/user";
const useUser = create((set) => ({
  StaffData: [],
  StaffTotalElement: 0,  // Tổng số staff
  isLoadingStaffData: false,
  fetchStaffData: async (page = 1, pageSize = 10) => {
    try {
      set({ isLoadingStaffData: true });
      const response = await getAllStaff(page, pageSize);  // Gọi API với trang và kích thước trang
      if (response && response.status === 200) {
        set({ 
          StaffData: response.data.Data.ListData || [],  // Cập nhật dữ liệu staff
          StaffTotalElement: response.data.Data.totalElements || 0,  // Tổng số staff
        });
      }
      set({ isLoadingStaffData: false });
    } catch (error) {
      set({ isLoadingStaffData: false });
      console.error("Error fetching data:", error);
    }
  },
  CustomerData: [],
  CustomerTotalElement: 0,  // Tổng số staff
  isLoadingCustomerData: false,
  fetchCustomer: async (page = 1, pageSize = 30) => {
    try {
      set({ isLoadingCustomerData: true });
      const response = await getAllCustomer(page, pageSize);  // Gọi API với trang và kích thước trang
      if (response && response.status === 200) {
        set({ 
          CustomerData: response.data.Data.ListData || [],  // Cập nhật dữ liệu staff
          CustomerTotalElement: response.data.Data.totalElements || 0,  // Tổng số staff
        });
      }
      set({ isLoadingCustomerData: false });
    } catch (error) {
      set({ isLoadingCustomerData: false });
      console.error("Error fetching data:", error);
    }
  },
  CustomercountData: [],
  CustomerCountElement: 0,  // Tổng số staff
  isLoadingCustomercountData: false,
  fetchCountCustomer: async () => {
    try {
      set({ isLoadingCustomercountData: true });
      const response = await getCountCustomer();  // Gọi API với trang và kích thước trang
      if (response && response.status === 200) {
        set({ 
          CustomercountData: response.data.Data || [],  // Cập nhật dữ liệu staff
          CustomerCountElement: response.data.Data || 0,  // Tổng số staff
        });
      }
      set({ isLoadingCustomercountData: false });
    } catch (error) {
      set({ isLoadingCustomercountData: false });
      console.error("Error fetching data:", error);
    }
  },
}));

export default useUser;
