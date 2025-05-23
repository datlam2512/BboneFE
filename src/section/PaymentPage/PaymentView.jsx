import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Modal, message, notification, Spin } from "antd";
import { useCartStore } from "../../hooks/useCart";
import { CreateupdateOrder } from "../../api/orderapi";
import useAuth from "../../hooks/useAuth";
import useCustomer from "../../hooks/useCustomer";

function PaymentView() {
  const { cartItems, totalPrice, resetCart } = useCartStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { isAuthenticated, infoUser } = useAuth();
  const formRef = useRef(null);
  const { customerDataDetail, fetchCustomerDetail } = useCustomer();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}${month}${year}`;
  };

  const MY_BANK = {
    BANK_ID: "Vietcombank",
    ACCOUNT_NO: "1025210358",
    TEMPLATE: "compact2",
    DESCRIPTION: `${infoUser.hint || "DEFAULT"}${formatDate(new Date())} thanh toan don hang BBone`,
    ACCOUNT_NAME: "Bbone",
  };

  useEffect(() => {
    const loadCustomerDetail = async () => {
      setLoading(true);
      await fetchCustomerDetail(infoUser.hint);
      setLoading(false);
    };
    loadCustomerDetail();
  }, [infoUser.hint, fetchCustomerDetail]);

  // Function to handle payment success
  const handlePaymentSuccess = async () => {
    if (cartItems.length === 0) {
      message.warning("Vui lòng mua hàng để thanh toán!");
      return;
    }
  
    setLoading(true);
  
    try {
      // Create the order payload
      const products = cartItems.map(item => ({
        ProductId: item.Id,  // Assuming `Id` is the product ID in the cart item
        Quantity: item.quantity  // Assuming `quantity` is the quantity in the cart item
      }));
  
      // Call the API to create or update the order
      const response = await CreateupdateOrder(infoUser.hint, products);
  
      notification.success({
        message: 'Xác nhận thành công!',
        description: 'Đơn hàng của bạn đang được xử lý và xác nhận thông qua Email.',
      });
  
      resetCart(); // Clear the cart after successful payment
    } catch (error) {
      console.error("Error creating order: ", error);
      setLoading(false);
      notification.error({
        message: 'Xác nhận thất bại!',
        description: 'Đã xảy ra lỗi trong quá trình tạo đơn hàng.',
      });
    } finally {
      setLoading(false);
      setIsModalVisible(false); // Close the modal after the process is complete
    }
  };
  
  useEffect(() => {
    const formattedAmount = (totalPrice / 1000).toFixed(3).replace('.', '').replace(',', '.');
    const qrLink = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${formattedAmount}&addInfo=${MY_BANK.DESCRIPTION}&accountName=${MY_BANK.ACCOUNT_NAME}`;
    setQrCode(qrLink);
  }, [totalPrice]);

  return (
    <div className="w-[150%] flex items-center justify-center py-16 ">
      <div className="max-w-6xl w-full flex justify-between">
        {/* Form Section */}
        <div className="w-[300%] pr-4">
          <h2 className="text-center text-2xl font-bold text-[#1079B1] mb-8">Thông tin liên hệ</h2>
          <Spin spinning={loading}>
            <Form
              layout="vertical"
              ref={formRef}
              initialValues={{
                name: customerDataDetail?.FullName || '',
                phone: customerDataDetail?.TelephoneNumber || '',
                email: customerDataDetail?.Email || '',
                address: customerDataDetail?.Address || '',
              }}
            >
              <Form.Item label="Họ và tên" name="name" className='mt-3'>
                <Input className="rounded-lg mt-3" placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone" className='mt-3'>
                <Input className="rounded-lg mt-3" placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item label="Email" name="email" className='mt-3'>
                <Input className="rounded-lg mt-3" placeholder="Email" />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address" className='mt-3'>
                <Input className="rounded-lg mt-3" placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item>
                <button type="primary" className="w-full h-12 rounded-lg bg-[#1079B1] text-white mr-1" onClick={() => setIsModalVisible(true)}>
                  Thanh toán
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>

        {/* Payment Summary Section */}
        <div className="w-[250%] pl-4 mt-3">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{totalPrice.toLocaleString()} vnd</span>
              </div>
              <div className="flex justify-between">
                <span>Phí ship</span>
                <span>0 vnd</span>
              </div>
              <div className="flex justify-between font-bold text-lg w-full">
                <span>Tổng đơn hàng</span>
                <span>{totalPrice.toLocaleString()} vnd</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={<div className='text-center mt-7 ml-2'>
          <h1>Quét mã QR để thanh toán</h1>
        </div>}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className=''
      >
        <div className="text-center">
          <img src={qrCode} alt="QR Code" className='h-[550px] ml-2'/>
          <Button
            className="mt-1"
            type="primary"
            loading={loading}
            onClick={handlePaymentSuccess}
          >
            Đã thanh toán
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentView;
