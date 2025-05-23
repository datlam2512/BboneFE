import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Radio } from 'antd';
import useUser from "../../hooks/useUser";
import { addStaff, updateStaff, softDeleteStaff } from '../../api/user'; // Import APIs

function UserTableView() {
  const { StaffData, fetchStaffData } = useUser();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    const loadStaffDetail = async () => {
      await fetchStaffData();
      setLoading(false);
    };
    loadStaffDetail();
  }, [fetchStaffData]);

  const handleAddStaff = () => {
    setIsModalVisible(true);  // Show the modal
    setEditingStaff(null);    // Clear editing staff to add new staff
    form.resetFields();       // Reset the form fields
  };

  const handleEditStaff = (staff) => {
    setIsModalVisible(true);
    setEditingStaff(staff);   // Set the staff to edit
    form.setFieldsValue(staff); // Populate form with staff details
  };

  const handleDeleteStaff = async (Id) => {
    try {
      await softDeleteStaff(Id);
      message.success('Xóa Staff thành công');
      fetchStaffData(); // Refresh data
    } catch (error) {
      message.error('Thất bại khi xóa Staff');
    }
  };

  const handleSave = async (values) => {
    try {
      // Automatically set RoleName to "Staff" and Status to 0
      const staffData = { ...values, RoleName: 'Staff', Status: 1 };

      if (editingStaff) {
        // Update staff
        await updateStaff(editingStaff.Id, staffData);
        message.success('Cập nhật Staff thành công');
      } else {
        // Add new staff
        await addStaff(staffData);
        message.success('Thêm Staff thành công');
      }
      setIsModalVisible(false);
      fetchStaffData(); // Refresh data
    } catch (error) {
      message.error('Thất bại khi lưu Staff');
    }
  };

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'Id',
      key: 'Id',
      render: (id) => `#${id}`, // Prefix with '#'
    },
    {
      title: 'Tài khoản',
      dataIndex: 'FullName',
      key: 'FullName',
    },
    {
      title: 'Loại',
      dataIndex: 'RoleName',
      key: 'RoleName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'blue'}>
          {status === 1 ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (staff) => (
        <>
          <Button onClick={() => handleEditStaff(staff)}>Cập nhật</Button>
          <Button danger onClick={() => handleDeleteStaff(staff.Id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-management py-6">
      <div className="toolbar mb-6">
        <Button type="default" onClick={handleAddStaff}>Thêm staff</Button>
      </div>

      <Table
        dataSource={StaffData}
        columns={columns}
        rowKey="Id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Staff Form Modal */}
      <Modal
        title={editingStaff ? 'Cập nhật staff' : 'Thêm staff mới'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}  // Link the form instance
          layout="vertical"
          initialValues={{ FullName: '', Email: '', TelephoneNumber: '', GenderId: 0, Status: 1 }}
          onFinish={handleSave}
        >
          {editingStaff && (
            <Form.Item name="Id" hidden>
              <Input />
            </Form.Item>
          )}
          
          <Form.Item
            name="FullName"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TelephoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="GenderId" label="Giới tính">
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={0}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item name="Status" hidden>
            <Input />
          </Form.Item>

          {!editingStaff && ( // Conditionally render password field when adding a new staff
            <Form.Item
              name="Password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Button type="primary" htmlType="submit">
            {editingStaff ? 'Cập nhật' : 'Lưu'}
          </Button>
        </Form>
      </Modal>

    </div>
  );
}

export default UserTableView;
