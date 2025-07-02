import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import useHospital from "../../hooks/useHospital";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  addHospital,
  updateHospital,
  deleteHospital,
  uploadHospitalImages,
} from "../../api/hospital";

function HospitalListTable() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageProductId, setImageProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newHospitalData, setNewHospitalData] = useState({
    HosName: "",
    Phone: "",
    Address: "",
    Zone: "",
    Price: 0,
    Description: "",
    shortDescription: "",
    Type: "",
    OpenTime: "08:00",
    CloseTime: "17:00",
    Level: "1",
    Status: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { hospitalData, fetchHospitalrData } = useHospital();
  const pageSize = 5;
  const fileInputRef = useRef(null);
  const showAddModal = () => {
    setNewHospitalData({
      HosName: "",
      Phone: "",
      Address: "",
      Zone: "",
      Price: 0,
      Description: "",
      shortDescription: "",
      Type: "",
      OpenTime: "08:00",
      CloseTime: "17:00",
      Level: "1",
      Status: 1,
    });
    setIsAddModalVisible(true);
  };
  const handleCancelAddImage = () => {
    setIsImageModalVisible(false);
    setImageProductId(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const showEditModal = (hospital) => {
    setSelectedProduct(hospital);
    setNewHospitalData({
      Id: hospital.Id,
      hosname: hospital.hosname,
      Description: hospital.Description,
      Address: hospital.Address,
      Phone: hospital.Phone,
      Status: 1,
    });
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    const loadProductDetail = async () => {
      setLoading(true);
      await fetchHospitalrData(currentPage);
      setLoading(false);
    };
    loadProductDetail();
  }, [fetchHospitalrData, currentPage]);

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = async () => {
    setAddLoading(true);
    try {
      await addHospital(newHospitalData);
      await fetchHospitalrData(currentPage);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Thêm thất bại:", error);
    } finally {
      setAddLoading(false);
    }
  };
  const handleUploadImage = async () => {
    if (!imageProductId || !imageFile) {
      alert("Vui lòng nhập ID và chọn hình ảnh.");
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("files", imageFile);
    try {
      await uploadHospitalImages(imageProductId, formData);
      setIsImageModalVisible(false);
      setImageProductId(null);
      setImageFile(null);
      fetchHospitalrData(currentPage);
    } catch (error) {
      console.error("Upload thất bại:", error);
    } finally {
      setUploadLoading(false);
    }
  };
  const handleUpdateProduct = async () => {
    setUpdateLoading(true);
    try {
      await updateHospital(newHospitalData.Id, newHospitalData);
      await fetchHospitalrData(currentPage);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Sửa thất bại:", error);
    } finally {
      setUpdateLoading(false);
    }
  };
  const handleDeleteProduct = async (Id) => {
    setDeleteLoading(true);
    try {
      await deleteHospital(Id);
      await fetchHospitalrData(currentPage);
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Xóa thất bại:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Tên bệnh viện",
      dataIndex: "hosname",
      key: "hosname",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img src={record.imageurls} alt={text} className="w-10 h-10" />
          <Button type="link" onClick={() => showEditModal(record)}>
            {text}
          </Button>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => setDeleteModalVisible(true)}
          >
            Xóa
          </Button>
          <Modal
            title="Xác nhận xóa"
            visible={deleteModalVisible}
            onOk={() => handleDeleteProduct(record.Id)}
            onCancel={handleCancel}
            confirmLoading={deleteLoading}
            okText="Xóa"
            cancelText="Hủy"
          >
            Bạn có chắc chắn muốn xóa Bệnh Viện này không?
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-4 py-5 w-full">
      <div className="w-full">
        <div className="w-full flex my-4">
          <Button type="primary" onClick={showAddModal} className="w-[150px]">
            Thêm Bệnh Viện
          </Button>
          <Button
            type="primary"
            onClick={() => setIsImageModalVisible(true)}
            className="w-[150px]"
          >
            Thêm hình ảnh
          </Button>
        </div>
        <div className="w-[2000px]">
          <Table
            dataSource={hospitalData}
            columns={columns}
            rowKey="Id"
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: (page) => {
                setCurrentPage(page);
              },
              showSizeChanger: false, // You can enable this if you want to allow changing page size
            }}
            bordered
          />
        </div>
        {/* Add Product Modal */}
        <Modal
          title="Thêm Bệnh Viện"
          visible={isAddModalVisible}
          onOk={handleAddProduct}
          confirmLoading={addLoading}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Tên Bệnh Viện">
              <Input
                value={newHospitalData.hosname}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    hosname: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Mô tả Bệnh Viện">
              <Input
                value={newHospitalData.Description}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Description: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input
                value={newHospitalData.Address}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Address: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                value={newHospitalData.Phone}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Phone: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Thêm hình ảnh Bệnh Viện"
          visible={isImageModalVisible}
          onOk={handleUploadImage}
          confirmLoading={uploadLoading}
          onCancel={handleCancelAddImage}
        >
          <Form layout="vertical">
            <Form.Item label="ID Bệnh Viện">
              <Input
                type="number"
                value={imageProductId}
                onChange={(e) => setImageProductId(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item label="Chọn hình ảnh">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* Edit Product Modal */}
        <Modal
          title="Sửa Bệnh Viện"
          visible={isEditModalVisible}
          onOk={handleUpdateProduct}
          confirmLoading={updateLoading}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Mã Bệnh Viện">
              <Input value={newHospitalData.Id} disabled />
            </Form.Item>
            <Form.Item label="Tên Bệnh Viện">
              <Input
                value={newHospitalData.HosName}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    HosName: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Mô tả Bệnh Viện">
              <Input
                value={newHospitalData.Description}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Description: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Mô tả Bệnh Viện">
              <Input
                value={newHospitalData.Address}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Address: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Mô tả Bệnh Viện">
              <Input
                value={newHospitalData.Phone}
                onChange={(e) =>
                  setNewHospitalData({
                    ...newHospitalData,
                    Phone: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default HospitalListTable;
