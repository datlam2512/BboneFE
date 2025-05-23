import React, { useState, startTransition } from 'react';
import useAuth from "../../hooks/useAuth"; // Hook Zustand
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { login } from "../../api/authen.js";

function LoginView() {
  const { login: setAuthenticated, setInfoUser } = useAuth(); // Gọi các hàm từ Zustand
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSignin = async (formValues) => {
    if (isLoggingIn) return;
      
    try {
      setLoading(true);
      setIsLoggingIn(true);
      const { Email, Password } = formValues;
      const response = await login(Email, Password);  // Gọi API login

      if (response && response.status === 200) {
        const { token, role, ...userInfo } = response.data;  // Lấy role và userInfo từ response
        console.log("Response data:", response.data);

        // Set token trong cookies
        Cookies.set("token", token, { expires: 1 });

        // Đặt trạng thái xác thực và lưu thông tin người dùng (bao gồm role) vào Zustand
        useAuth.getState().login();  // Đặt người dùng đã xác thực
        useAuth.getState().setInfoUser({ ...userInfo, role });  // Lưu thông tin người dùng bao gồm vai trò (role) vào Zustand

        // Wrap navigation and state updates in startTransition for smooth transitions
        startTransition(() => {
          // Điều hướng dựa trên vai trò (role) của người dùng
          if (role === 'Admin') {
            navigate("/admin");  // Điều hướng đến trang admin
          } else if (role === 'Staff') {
            navigate("/staff");  // Điều hướng đến trang nhân viên
          } else {
            navigate("/");  // Điều hướng về trang chủ
          }

          // Thông báo đăng nhập thành công
          notification.success({
            message: "Đăng nhập thành công",
            description: "Bạn đã đăng nhập thành công",
            duration: 2,
          });

          form.resetFields();  // Reset form
        });
      }
    } catch (error) {
      setLoading(false);
      setIsLoggingIn(false);
      notification.error({
        message: "Login Failed",
        description: error.response?.data?.message || "Something went wrong!",
        duration: 2,
      });
    }
  };

  const onFinish = (values) => {
    if (values.Email && values.Password) {
      handleSignin(values);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-[#1079B1]"></div>
      <div className="w-2/3 flex items-center justify-center">
        <div className="w-96">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#1079B1]">Đăng nhập</h1>
          <Form form={form} className="space-y-6" onFinish={onFinish}>
            <Form.Item
              name="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input placeholder="Tên tài khoản hoặc địa chỉ email *" />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[{ required: true, message: "Vui lập nhập Password!" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-[#1079B1] text-white w-full rounded-xl "   loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className='flex mt-2'>
            <p className='text-[#1079B1]'>Bạn chưa có tài khoản?</p>
            <p className='font-bold text-[#1079B1] ml-2'><Link to='/Register'>Đăng kí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
