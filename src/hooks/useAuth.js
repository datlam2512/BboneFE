import create from "zustand";

// Tạo store Zustand cho thông tin xác thực và người dùng
const useAuth = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"), // Restore from localStorage
  infoUser: JSON.parse(localStorage.getItem("userInfo")), // Restore user info from localStorage

  // Hàm để xác nhận đăng nhập
  login: (token, userInfo) => {
    // Save the token and user info to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Set the state to authenticated
    set({ isAuthenticated: true, infoUser: userInfo });
  },

  // Hàm để lưu thông tin người dùng
  setInfoUser: (userInfo) => {
    console.log("User Info:", userInfo); // Log the userInfo to console
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Persist user info
    set({ infoUser: userInfo });
  },

  // Hàm đăng xuất
  logout: () => {
    // Remove token and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // Reset the authentication state
    set({ isAuthenticated: false, infoUser: null });
  },
  isLoggedIn: () => {
    return !!localStorage.getItem("token"); // Checks if token exists in localStorage
  }
}));

export default useAuth;
