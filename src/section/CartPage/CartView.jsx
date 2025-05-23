import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputNumber, Spin, Modal } from "antd";
import { useCartStore } from "../../hooks/useCart";
import useAuth  from "../../hooks/useAuth"; 

function CartView() {
  const { cartItems, totalPrice, totalQuantity, incrementQuantity, decrementQuantity } = useCartStore();
  const { isLoggedIn } = useAuth(); // Get login status from the auth store
  const navigate = useNavigate(); // For navigation
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoginRedirect = () => {
    setIsModalVisible(false); // Hide the modal
    navigate('/login'); // Redirect to login page
  };

  const handleCheckout = () => {
    if (!isLoggedIn()) {
      setIsModalVisible(true); // Show modal if not logged in
    } else {
      navigate('/Payment'); // Redirect to payment if logged in
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 w-full text-[#1079B1] py-28">
      <h2 className="text-2xl font-semibold text-[#1079B1] mb-6 border-b pb-2">
        Giỏ hàng <span className="text-base font-normal">({totalQuantity || 0} sản phẩm)</span>
      </h2>
      <div className="flex justify-around">
        <div className="space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md w-[190%]"
                key={item.Id}
              >
                {/* Product Image */}
                <img
                  className="w-24 h-24 rounded-lg object-cover"
                  src={item.imageurls}
                  alt={item.categoryname}
                />
                {/* Product Details */}
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-medium text-[#1079B1]">{item.categoryname}</h3>
                  <p className="text-[#1079B1] font-semibold mt-5">{(item.Price || 0).toLocaleString()}₫</p>
                  <div className="flex items-center border border-gray-300 rounded-md w-[50%] align-middle justify-center mt-4 bg-white">
                    <button
                      className="border-none px-2 text-lg flex items-center justify-center" // Center the button
                      style={{ borderRadius: "0", height: "40px" }} // Adjust height to match InputNumber
                      onClick={() => decrementQuantity(item.Id)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-white rounded-md">{item.quantity}</span>
                    <button
                      className="border-none px-2 text-lg flex items-center justify-center" // Center the button
                      style={{ borderRadius: "0", height: "40px" }} // Adjust height to match InputNumber
                      onClick={() => incrementQuantity(item.Id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Total Price */}
                <p className="text-lg text-[#1079B1] font-semibold ml-4">
                  {(item.Price * item.quantity || 0).toLocaleString()}₫
                </p>
              </div>
            ))
          ) : (
            <p className="text-[#1079B1]">Không có sản phẩm trong giỏ hàng</p>
          )}
        </div>

        <div className="mt-1 px-6 py-8 bg-blue-50 rounded-lg shadow-md ml-64 w-[100%] h-[250px]">
          <div className="space-y-2">
            <p className="flex justify-between text-lg text-[#1079B1]">
              <span>Tạm tính:</span>
              <span>{(totalPrice || 0).toLocaleString()}₫</span>
            </p>
            <p className="flex justify-between text-lg text-[#1079B1]">
              <span>Phí ship:</span>
              <span>0₫</span>
            </p>
            <p className="flex justify-between text-lg font-semibold text-[#1079B1]">
              <span>Tổng tính:</span>
              <span>{(totalPrice || 0).toLocaleString()}₫</span>
            </p>
          </div>
          <button
            className="w-full mt-4 py-3 bg-[#1079B1] text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={handleCheckout} // Handle checkout click
          >
            Tới phần thanh toán
          </button>
        </div>

        <Modal
          title="Cần đăng nhập"
          visible={isModalVisible}
          onOk={handleLoginRedirect} // Redirect to login on OK
          onCancel={() => setIsModalVisible(false)} // Close modal on Cancel
          okText="Đăng nhập"
          cancelText="Hủy"
        >
          <p>Vui lòng đăng nhập để tiến hành thanh toán.</p>
        </Modal>
      </div>
    </div>
  );
}

export default CartView;
