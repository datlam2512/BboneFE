import create from "zustand";
const useAuth = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  infoUser: JSON.parse(localStorage.getItem("userInfo")), 

  // Hàm để xác nhận đăng nhập
  login: (token, userInfo) => {
    // Save the token and user info to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Set the state to authenticated
    set({ isAuthenticated: true, infoUser: userInfo });
  },
  setInfoUser: (userInfo) => {
    console.log("User Info:", userInfo); 
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); 
    set({ infoUser: userInfo });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    set({ isAuthenticated: false, infoUser: null });
  },
  isLoggedIn: () => {
    return !!localStorage.getItem("token"); 
  },
  confirmAccount: async (token) => {
    try {
      const response = await confirm(token);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Lỗi xác nhận tài khoản:", error);
      return { success: false, error: error?.response?.data?.message || "Lỗi xác nhận" };
    }
  }
}));

export default useAuth;
