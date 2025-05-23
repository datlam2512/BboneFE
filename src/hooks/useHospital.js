import { create } from "zustand";
import { getAllHospital } from "../api/hospital";
import { getHospitalDetail } from "../api/hospital";
import { getAllBooking } from "../api/hospital";
const useHospital = create((set) => ({
  hospitalData: [],
  bookingData: [],
  hospitalDetailData:[],
 HospitalTotalElement: "",
BookingTotalElement: "",
  isLoadingHospitalData: false,
  isLoadingBookingData: false,
  fetchHospitalrData: async () => {
    try {
      set({ isLoadingHospitalData: true });
      const response = await getAllHospital();
      if (response && response.status === 200) {
        set({ hospitalData: response?.data?.Data?.ListData || [] });
        set({ isLoadingHospitalData: response?.data?.totalElements || "" });
      }
      set({ isLoadingHospitalData: false });
    } catch (error) {
      set({ isLoadingHospitalData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchBookingData: async () => {
    try {
      set({ isLoadingBookingData: true });
      const response = await getAllBooking();
      if (response && response.status === 200) {
        set({ bookingData: response?.data?.Data?.ListData || [] });
        set({ isLoadingBookingData: response?.data?.totalElements || "" });
      }
      set({ isLoadingBookingData: false });
    } catch (error) {
      set({ isLoadingBookingData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchHospitalDetail: async (Id) => {
    try {
      const response = await getHospitalDetail(Id);
      if (response && response.status === 200) {
        set({ hospitalDetailData: response.data.Data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
export default useHospital;
