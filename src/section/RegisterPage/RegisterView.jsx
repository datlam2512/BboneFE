import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { register } from '../../api/authen.js';

function RegisterView() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleRegister = async (formValues) => {
    try {
      setLoading(true); 
      const { Email, Password, FullName, TelephoneNumber } = formValues;
      const GenderId = 1; // Set GenderId to 1
      const response = await register(Email, Password, FullName, GenderId, TelephoneNumber); // Call API to register

      if (response && response.status === 200) {
        notification.success({
          message: 'Đăng kí thành công',
          description: 'Bạn đã đăng kí thành công',
          duration: 2,
        });

        form.resetFields(); // Reset form fields
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Đăng kí thất bại',
        description: error.response?.data?.Message || 'Vui lòng nhập lại!',
        duration: 2,
      });
      console.log("check error",error.response.data.Message )
    }
  };

  const onFinish = (values) => {
    if (values.Email && values.Password) {
      handleRegister(values);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-[#1079B1]"></div>
      <div className="w-2/3 flex items-center justify-center">
        <div className="w-96">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#1079B1]">Đăng kí</h1>
          <Form form={form} className="space-y-6" onFinish={onFinish}>
            <Form.Item
              name="Email"
              rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
            >
              <Input placeholder="Tên tài khoản hoặc địa chỉ email *" />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="FullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item
              name="TelephoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#1079B1] text-white w-full rounded-xl"
                loading={loading} 
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
          <div className='flex mt-2'>
            <p className='text-[#1079B1]'>Bạn có tài khoản?</p>
            <p className='font-bold text-[#1079B1] ml-2'>
              <Link to='/login'>Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
