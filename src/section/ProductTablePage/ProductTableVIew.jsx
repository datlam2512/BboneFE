import React, { useState, useEffect,useRef } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import useProduct from "../../hooks/useProduct";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
} from "../../api/product";

function ProductTableView() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageProductId, setImageProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { productData, fetchProductrData, totalProducts } = useProduct(); // Assuming totalProducts is provided
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    Id: 0,
    nameproduct: "",
    descriptionproduct: "",
    Price: 0,
    Quantity: 0,
    CategoryId: 1,
    MaterialId: 1,
    Level: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
const fileInputRef = useRef(null);
  const showAddModal = () => {
    setNewProductData({
      Id: 0,
      nameproduct: "",
      descriptionproduct: "",
      Price: 0,
      Quantity: 0,
      CategoryId: 1,
      MaterialId: 1,
      Level: "",
    });
    setIsAddModalVisible(true);
  };
  const handleCancelAddImage = () => {
    setIsImageModalVisible(false);
    setImageProductId(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const showEditModal = (product) => {
    setSelectedProduct(product);
    setNewProductData({
      Id: product.Id,
      nameproduct: product.nameproduct,
      descriptionproduct: product.descriptionproduct,
      Price: product.Price,
      Quantity: product.Quantity,
      CategoryId: 1,
      MaterialId: 1,
      Level: product.Level,
    });
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    const loadProductDetail = async () => {
      setLoading(true);
      await fetchProductrData(currentPage);
      setLoading(false);
    };
    loadProductDetail();
  }, [fetchProductrData, currentPage]);

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = async () => {
    await addProduct(newProductData);
    await fetchProductrData(currentPage);
    setIsAddModalVisible(false);
  };
  const handleUploadImage = async () => {
    if (!imageProductId || !imageFile) {
      alert("Vui lòng nhập ID và chọn hình ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("files", imageFile);

    try {
      await uploadProductImages(imageProductId, formData);
      setIsImageModalVisible(false);
      setImageProductId(null);
      setImageFile(null);
      fetchProductrData(currentPage);
    } catch (error) {
      console.error("Upload thất bại:", error);
    }
  };
  const handleUpdateProduct = async () => {
    await updateProduct(newProductData.Id, newProductData);
    await fetchProductrData(currentPage);
    setIsEditModalVisible(false);
  };

  const handleDeleteProduct = async (Id) => {
    await deleteProduct(Id);
    await fetchProductrData(currentPage);
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameproduct",
      key: "nameproduct",
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
      title: "Giá",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Tồn kho",
      dataIndex: "Quantity",
      key: "Quantity",
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
            okText="Xóa"
            cancelText="Hủy"
          >
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div>
        <Button type="primary" onClick={showAddModal} className="w-[150px]">
          Thêm sản phẩm
        </Button>
        <Button
          type="primary"
          onClick={() => setIsImageModalVisible(true)}
          className="w-[150px]"
        >
          Thêm hình ảnh
        </Button>
      </div>
      <Table
        dataSource={productData}
        columns={columns}
        rowKey="Id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalProducts,
          onChange: (page) => {
            setCurrentPage(page);
          },
          showSizeChanger: false, // You can enable this if you want to allow changing page size
        }}
        bordered
      />

      {/* Add Product Modal */}
      <Modal
        title="Thêm sản phẩm"
        visible={isAddModalVisible}
        onOk={handleAddProduct}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Tên sản phẩm">
            <Input
              value={newProductData.nameproduct}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  nameproduct: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Mô tả sản phẩm">
            <Input
              value={newProductData.descriptionproduct}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  descriptionproduct: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Giá">
            <Input
              type="number"
              value={newProductData.Price}
              onChange={(e) =>
                setNewProductData({ ...newProductData, Price: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Tồn kho">
            <Input
              type="number"
              value={newProductData.Quantity}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  Quantity: e.target.value,
                })
              }
            />
          </Form.Item>
          <Input type="hidden" value={newProductData.CategoryId} />
          <Input type="hidden" value={newProductData.MaterialId} />
          <Form.Item label="Cấp độ">
            <Input
              value={newProductData.Level}
              onChange={(e) =>
                setNewProductData({ ...newProductData, Level: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm hình ảnh sản phẩm"
        visible={isImageModalVisible}
        onOk={handleUploadImage}
        onCancel={handleCancelAddImage}
      >
        <Form layout="vertical">
          <Form.Item label="ID sản phẩm">
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
        title="Sửa sản phẩm"
        visible={isEditModalVisible}
        onOk={handleUpdateProduct}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Mã sản phẩm">
            <Input value={newProductData.Id} disabled />
          </Form.Item>
          <Form.Item label="Tên sản phẩm">
            <Input
              value={newProductData.nameproduct}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  nameproduct: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Mô tả sản phẩm">
            <Input
              value={newProductData.descriptionproduct}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  descriptionproduct: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Giá">
            <Input
              type="number"
              value={newProductData.Price}
              onChange={(e) =>
                setNewProductData({ ...newProductData, Price: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Tồn kho">
            <Input
              type="number"
              value={newProductData.Quantity}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  Quantity: e.target.value,
                })
              }
            />
          </Form.Item>
          <Input type="hidden" value={newProductData.CategoryId} />
          <Input type="hidden" value={newProductData.MaterialId} />
          <Form.Item label="Cấp độ">
            <Input
              value={newProductData.Level}
              onChange={(e) =>
                setNewProductData({ ...newProductData, Level: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductTableView;
