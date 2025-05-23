import React, { useState, useEffect } from 'react';
import { Descriptions, Spin, Row, Col, Button, Avatar, Modal, Form, Input, message } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, EditOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from "../../hooks/useAuth";
import useCustomer from "../../hooks/useCustomer";
import { updateCustomerDetail } from '../../api/user';
import './CustomerInfoView.css';

function CustomerInfoView() {
  const { isAuthenticated, infoUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { customerDataDetail, fetchCustomerDetail } = useCustomer();

  useEffect(() => {
    const loadCustomerDetail = async () => {
      setLoading(true);
      try {
        await fetchCustomerDetail(infoUser.hint);
        message.success("Hiển thị thông tin thành công!");
      } catch (error) {
        message.error("Hiển thị thông tin thất bại!");
      } finally {
        setLoading(false);
      }
    };
    loadCustomerDetail();
  }, [infoUser.hint, fetchCustomerDetail]);

  const handleEdit = () => {
    form.setFieldsValue({
      FullName: customerDataDetail.FullName,
      TelephoneNumber: customerDataDetail.TelephoneNumber,
      Email: customerDataDetail.Email,
      Address: customerDataDetail.Address,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Add the fixed RoleName and Status fields
      const updatedData = {
        ...values,
        RoleName: 'Customer', // Keep RoleName as 'Customer'
        Status: 1,           // Set Status to 1
        Id: 2022,            // Ensure the correct customer ID
      };

      await updateCustomerDetail(updatedData); // API call to update customer data
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      message.error("Cập nhật thông tin thất bại.");
    }
  };

  if (loading) {
    return (
      <Spin tip="Loading customer details..." size="large" style={{ width: '100%', marginTop: '50px' }} />
    );
  }

  return (
    <Row justify="center" style={{ marginTop: '30px', width: '100%' ,paddingTop:"30px", paddingBottom:"70px"}}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div
          style={{
            backgroundColor: '#fff', 
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
          className='text-white'
        >
          <div className="customer-info-header">
            <Avatar icon={<UserOutlined />} /> Thông tin khách hàng
            <Button icon={<EditOutlined />} onClick={handleEdit} style={{ float: 'right' }}>Chỉnh sửa</Button>
          </div>
          {customerDataDetail ? (
            <Descriptions bordered column={1} layout="vertical">
              <Descriptions.Item label="Name"><UserOutlined /> {customerDataDetail.FullName}</Descriptions.Item>
              <Descriptions.Item label="Phone"><PhoneOutlined /> {customerDataDetail.TelephoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Email"><MailOutlined /> {customerDataDetail.Email}</Descriptions.Item>
              <Descriptions.Item label="Address"><HomeOutlined /> {customerDataDetail.Address}</Descriptions.Item>
              <Descriptions.Item label="Role"><SafetyOutlined /> {customerDataDetail.RoleName}</Descriptions.Item>
            </Descriptions>
          ) : (
            <p>Không tìm kiếm thấy thông tin phù hợp.</p>
          )}
        </div>

        {/* Modal for editing customer details */}
        <Modal
          title="Edit Customer Information"
          visible={isEditing}
          onCancel={() => setIsEditing(false)}
          onOk={handleSave}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Full Name"
              name="FullName"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="TelephoneNumber"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <Input prefix={<HomeOutlined />} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}

export default CustomerInfoView;
