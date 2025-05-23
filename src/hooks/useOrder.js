import { create } from "zustand";
import { getAllOrder } from "../api/orderapi";
import { gettotalOrdermonth } from "../api/orderapi";
import  {gettotalOrder} from "../api/orderapi"
const useOrder = create((set) => ({
  orderData: [],
 OrderTotalElement: "",
  isLoadingOrderData: false,
  fetchOrderData: async () => {
    try {
      set({ isLoadingOrderData: true });
      const response = await getAllOrder();
      if (response && response.status === 200) {
        set({ orderData: response?.data?.Data?.ListData || [] });
        set({ isLoadingOrderData: response?.data?.totalElements || "" });
      }
      set({ isLoadingOrderData: false });
    } catch (error) {
      set({ isLoadingOrderData: false });
      console.error("Error fetching data:", error);
    }
  },
  ordertotalData: [],
  OrdersucessTotalElement: "",
   isLoadingOrdertptalData: false,
   fetchOrderTotalData: async () => {
     try {
       set({ isLoadingOrdertptalData: true });
       const response = await gettotalOrdermonth();
       if (response && response.status === 200) {
         set({ ordertotalData: response?.data?.Data|| [] });
         set({ isLoadingOrdertptalData: response?.data?.totalElements || "" });
       }
       set({ isLoadingOrdertptalData: false });
     } catch (error) {
       set({ isLoadingOrdertptalData: false });
       console.error("Error fetching data:", error);
     }
   },
   ordertotalsucessData: [],
   ordertotalsucessElement: "",
    isLoadingOrdersucesstptalData: false,
    fetchOrderSucessTotalData: async () => {
      try {
        set({ isLoadingOrdersucesstptalData: true });
        const response = await gettotalOrder();
        if (response && response.status === 200) {
          set({ ordertotalsucessData: response?.data?.Data|| [] });
          set({ isLoadingOrdersucesstptalData: response?.data?.totalElements || "" });
        }
        set({ isLoadingOrdertptalData: false });
      } catch (error) {
        set({ isLoadingOrdersucesstptalData: false });
        console.error("Error fetching data:", error);
      }
    },
}));
export default useOrder;
