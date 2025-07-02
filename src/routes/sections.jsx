import { Children, Suspense, lazy } from "react";
import {
  Error404,
  Loading,
  ScrollToTop,
  AdminError,
} from "../components";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import App from "../layout/index";
import DashboardLayout from "../layout/admin";
import DashboardLayoutStaff from "../layout/staff";
import useAuth from "../hooks/useAuth";
import { info } from "autoprefixer";

//User Page
export const HomePage = lazy(() => import("../page/HomePage"));
export const CartViewPage = lazy(() => import("../page/CartViewPage"));
export const ProductListPage = lazy(() => import("../page/ProductList"));
export const HospitalListPage = lazy(() => import("../page/HospitalListPage"));
export const HospitalBookingPage = lazy(() => import("../page/HospitalBookingPage"));
export const ProductDetailPage = lazy(() => import("../page/ProductDetailPage"));
export const HospitalDetail = lazy(() => import("../page/HospitalDetailpage"));
export const ArticleDetailPage = lazy(() => import("../page/ArticleDetailPage"));
export const BodyPart = lazy(() => import("../page/BodyPartPage"));
export const Login = lazy(() => import("../page/LoginPage"));
export const Register = lazy(() => import("../page/SignupPage"));
export const UserTable = lazy(() => import("../page/UserTableView"));
export const Question = lazy(() => import("../page/QuestionPage"));
export const ProducttablePage = lazy(() => import("../page/ProductTablePage"));
export const ResultPage = lazy(() => import("../page/ResultPage"));
export const ClinicPage = lazy(() => import("../page/ClinicPage"));
export const OrderTablePage = lazy(() => import("../page/OrderTablePage"));
export const ChatRoomPage = lazy(() => import("../page/ChatRoomPage"));
export const CustomerInfo = lazy(() => import("../page/CustomerInfoPage"));
export const PaymentPage = lazy(() => import("../page/PaymentPage"));
export const DashboardViewPage = lazy(() => import("../page/DashboardViewPage"));
export const ConfirmLoginPage= lazy(() => import("../page/ConfirmPage"));
export const HospitalListTable= lazy(() => import("../page/HospitalTableList"));
const checkAccess = (isAdmin) => {
  return isAdmin === "Admin";
};


export const Router = () => {
  const { isAuthenticated, infoUser } = useAuth();  // Lấy trạng thái từ Zustand

  // Kiểm tra quyền truy cập dựa trên vai trò
  const hasAdminAccess = infoUser && infoUser.role === "Admin";
  console.log("check", infoUser)
  const hasStaffAccess = infoUser && infoUser.role === "Staff";
  const routes = useRoutes([
    { path: "/Login",
      element: (
          <Suspense fallback={<Loading />}>
          <Login />
          </Suspense> )
    },
    { path: "/Register",
      element: (
        <Suspense fallback={<Loading />}>
      <Register />
        </Suspense> )

    },
    {
      path: "/",
      element: (
        <App>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </App>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/San-pham",
          element: <ProductListPage />,
        },
        {
          path: "/San-pham/detail/:Id",
          element: <ProductDetailPage />,
        },
        
        {
          path: "/Hospital",
          element: <HospitalListPage />,
        },
        {
          path: "/Result",
          element: <ResultPage />,
        },
        {
          path: "/BodyPart" ,
          element: <BodyPart />,
        },
        {
          path: "/Payment" ,
          element: <PaymentPage />,
        },
        {
          path: "/questions",
          element: <Question />,
        },
        {
          path: "/Hospital/detail/:Id",
          element: <HospitalDetail />,
        },
        {
          path: "/Hospital/detail/booking/:Id",
          element: <HospitalBookingPage />,
        },
        {
          path: "/Article/detail/:Id",
          element: <ArticleDetailPage />,
        },
        {
          path: "/gio-hang",
          element: <CartViewPage />,
        },
        // {
        //   path: "/ho-so",
        //   element: <ProfilePage />,
        // },
        {
          path: "/thongtin",
          element: <CustomerInfo />,
        },
        {
          path: "/confirm/:Token",
          element: <ConfirmLoginPage />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
    {
      path: "/admin",
      element: isAuthenticated && hasAdminAccess ? (
          <DashboardLayout>
            <ScrollToTop>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ScrollToTop>
          </DashboardLayout>
        ) : (
          <Navigate to="/login" replace />
        ),
      children: [
        {
          path: "*",
          element: <AdminError />,
        },
        {
          path: "/admin/User",
          element: <UserTable />,
        },
        {
          path: "/admin/dashboard",
          element: <DashboardViewPage />,
        },
        
      ],
    },
    {
      path: "/staff",
      element: isAuthenticated && hasStaffAccess  ? (
        <DashboardLayoutStaff>
        <ScrollToTop>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ScrollToTop>
      </DashboardLayoutStaff>   ) : (
          <Navigate to="/login" replace />
        ),
        children: [
          {
            path: "*",
            element: <AdminError />,
          },
          {
            path: "/staff/sanpham",
            element: <ProducttablePage />,
          },
          {
            path: "/staff/chat",
            element: <ChatRoomPage />,
          },
          {
            path: "/staff/dashboard",
            element: <DashboardViewPage />,
          },
          {
            path: "/staff/donhang",
            element: <OrderTablePage />,
          },
          {
            path: "/staff/datlich",
            element: <ClinicPage />,
          },
           {
            path: "/staff/benhvien",
            element: <HospitalListTable />,
          },
        ],
    },
  ]);
  return routes;
};
