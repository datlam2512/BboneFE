import { create } from "zustand";
import { getDetailCustomer } from "../api/user";
import { getAllCustomer } from "../api/user";
const useCustomer = create((set) => ({
  customerData: [],
  customerDataDetail:[],
 CustomerTotalElement: "",
  isLoadingCustomerData: false,
  fetchCustomerData: async () => {
    try {
      set({ isLoadingCustomerData: true });
      const response = await getAllCustomer();
      if (response && response.status === 200) {
        set({ customerData: response?.data?.Data?.ListData || [] });
        set({ isLoadingCustomerData: response?.data?.totalElements || "" });
      }
      set({ isLoadingCustomerData: false });
    } catch (error) {
      set({ isLoadingCustomerData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchCustomerDetail: async (Id) => {
    try {
      const response = await getDetailCustomer(Id);
      if (response && response.status === 200) {
        set({ customerDataDetail: response.data.Data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
export default useCustomer;
