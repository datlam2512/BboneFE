import React, { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import Logohighquality from "../../assets/images/Logohighquality.png";
import logoDelivery from "../../assets/images/DeliveryLogi.png";
import logoBaohanh from "../../assets/images/logoBaohanh.png";
import { Button, InputNumber, Spin } from "antd";
import {
  ShoppingCartOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useCartStore } from "../../hooks/useCart";
function ProductDetailView() {
  const { Id } = useParams();
  const { productDataDetail, fetchProductDetail } = useProduct();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  useEffect(() => {
    // Fetch product details and set loading to false when done
    const loadProductDetail = async () => {
      await fetchProductDetail(Id);
      setLoading(false);
    };
    loadProductDetail();
  }, [Id, fetchProductDetail]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    ); // Display a spinner while loading
  }

  console.log("check Data detail", ProductDetailView);
  return (
    <div className="max-w-7xl  mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-white w-full">
      {/* Product Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={productDataDetail.imageurls} // replace this with your image
            alt="product"
            className="w-full h-[100%] rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6 text-[#1079B1] relative ml-14">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {productDataDetail.nameproduct}
            </h1>

            {/* Star Icon */}
            <button className="focus:outline-none">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full">
                <StarOutlined className="text-xl text-gray-400" />
              </div>
            </button>
          </div>

          <p className="text-sm text-[#1079B1] mt-4">
            {Number(productDataDetail.Price).toLocaleString("vi-VN")} đ
          </p>

          <p className="text-[#1079B1] font-bold mt-4">Kho tại Hồ Chí Minh</p>

          {/* Promotion Countdown */}
          <div className="mt-4">
            <p className="text-sm text-[#348DBD] flex mb-5 items-center">
              Chỉ còn{" "}
              <span className="font-bold mx-2">
                {productDataDetail.Quantity}
              </span>{" "}
              sản phẩm khuyến mãi
            </p>
            <div className="w-full bg-gray-300 h-2 rounded-lg">
              <div className="bg-[#1079B1] h-2 rounded-lg w-1/4"></div>
            </div>
          </div>

          {/* Size and Quantity */}
          <div className="flex-row ">
            <p className="font-semibold text-[#1079B1] mb-4">Kích cỡ:</p>
            <span className="px-4 py-1 border border-[#1079B1] text-white rounded-lg bg-[#1079B1] my-4">
              FREE SIZE
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="items-center">
            <p className="font-semibold text-[#1079B1]">Số lượng:</p>

            <div className="flex my-4 items-center space-x-4 ">
              {/* Quantity Control */}
              <div className="flex items-center border border-gray-300 rounded-md w-[20%] align-middle justify-center">
                <button
                  className="border-none px-2 text-lg flex items-center justify-center" // Center the button
                  style={{ borderRadius: "0", height: "40px" }} // Adjust height to match InputNumber
                  size="middle"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <InputNumber
                  min={1}
                  value={quantity}
                  size="middle"
                  className="border-none text-center w-8"
                  style={{ border: "none", pointerEvents: "none" }}
                />

                <button
                  className="border-none px-2 text-lg flex items-center justify-center" // Center the button
                  style={{ borderRadius: "0", height: "40px" }} // Adjust height to match InputNumber
                  size="middle"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              <button
                type="default"
                icon={<ShoppingCartOutlined />}
                className="border-[#1176AE]  bg-[#1176AE] hover:text-white text-white hover:bg-[#1176AE] w-[70%] h-[40px] border-[1px] rounded-md"
                onClick={() => addToCart({ ...productDataDetail, quantity })}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-3 gap-6 my-16">
        {/* Feature 1 */}
        <div className="flex items-center">
          <img
            src={Logohighquality}
            alt="quality"
            className="w-[60px] h-[60px] mr-4"
          />
          <div className="text-[#1079B1]">
            <h3 className="font-semibold">Chất lượng cao</h3>
            <p className="text-sm">Được chế tác từ vật liệu hàng đầu</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center ml-28">
          <img
            src={logoBaohanh}
            alt="warranty"
            className="w-[60px] h-[60px] mr-4"
          />
          <div className="text-[#1079B1]">
            <h3 className="font-semibold">Bảo hành</h3>
            <p className="text-sm ">Đến 2 năm</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center ml-20">
          <img
            src={logoDelivery}
            alt="shipping"
            className="w-[60px] h-[60px] mr-4"
          />
          <div className="text-[#1079B1]">
            <h3 className="font-semibold">Miễn phí giao hàng</h3>
            <p className="text-sm">Cho đơn trên 1.500.000 vnd</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailView;
