import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Form,
  notification,
  Spin,
  Modal,
  Card
} from "antd";
import "./HospitalBookingView.css";
import { useParams, useLocation } from "react-router-dom";
import { createBooking } from "../../api/hospital";
import useProduct from "../../hooks/useProduct";
import useHospital from "../../hooks/useHospital";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import './HospitalBookingView.css'
import useAuth from "../../hooks/useAuth";
import useCustomer from "../../hooks/useCustomer";
const { Option } = Select;

function HospitalBookingView() {
  const { hospitalDetailData, fetchHospitalDetail } = useHospital();
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const { Meta } = Card;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = useRef(null);
  const location = useLocation();
  const { productData, fetchProductrData } = useProduct();
  const { customerDataDetail, fetchCustomerDetail } = useCustomer();
  const { selectedDay, selectedTime } = location.state || {};
  const { isAuthenticated, infoUser } = useAuth();
  useEffect(() => {
    fetchHospitalDetail(Id);
  }, [Id, fetchHospitalDetail]);

  const [form] = Form.useForm();
  useEffect(() => {
    const loadCustomerDetail = async () => {
      setLoading(true);
      await fetchCustomerDetail(infoUser.hint);
      setLoading(false);
      
      // After fetching customer details, set the form values
    };
    loadCustomerDetail();
  }, [infoUser.hint, fetchCustomerDetail, customerDataDetail]);
  // Handle form submission
  // Handle form submission
  
  const handleBookingSubmit = async () => {
    try {
      setLoading(true); 
      const values = await form.validateFields();
      const bookingDetails = {
        ...values,
        bookingTime: selectedTime || values.time.format("HH:mm"),
        bookingDate: selectedDay || values.date.format("YYYY-MM-DD"),
        Price: 350000, // Price of the booking (350.000đ)
        Status: 1, // Status is set to 1
      };

      // Call the API to create a booking
      await createBooking(
        infoUser.hint,
        hospitalDetailData.Id,
        Date,
        bookingDetails.Price,
        bookingDetails.Status
      );

      notification.success({
        message: "Đặt lịch thành công!",
        description: "Lịch của bạn đã được tạo thành công.",
      });
      setIsModalVisible(true);
    } catch (error) {
      setLoading(false);
      console.error("Lỗi đặt lịch: ", error);
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const loadProductDetail = async () => {
      await fetchProductrData();
      setLoading(false);
    };
    loadProductDetail();
  }, [fetchProductrData]);

  console.log("check id", selectedDay);
  return (
    <div className="py-24">
      <div>
        <div className="flex">
          <div>
            <img
              src={hospitalDetailData.imageurls}
              alt="Clinic"
              className="w-[500px] h-[200px]"
            />
          </div>
          <div className="ml-16">
            <h2 className="text-lg font-bold text-[#1079B1]">Đặt lịch khám</h2>
            <p className="text-[#1079B1]">Phòng khám ACC</p>
            <p className="text-[#1079B1]">{selectedTime}</p>
            <p className="text-[#1079B1]">{selectedDay}</p>
            <p className="text-[#1079B1]">Giá khám: 350.000đ</p>
          </div>
        </div>

        <div className="flex">
          <div>
          <Spin spinning={loading}>
          <Form
            layout="vertical"
            form={form}
            className="mt-8 custom-form"
            onFinish={handleBookingSubmit}
            ref={formRef}
            initialValues={{
              name: customerDataDetail?.FullName || '',
              phone: customerDataDetail?.TelephoneNumber || '',
              email: customerDataDetail?.Email || '',
              address: customerDataDetail?.Address || '',
            }}
            validateTrigger="onSubmit"
          >
            <Form.Item
              label={
                <>
                  <UserOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                  <p className="text-[#1079B1]">  Họ và tên </p>
                </>
              }
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Họ và tên" style={{ width: '400px' }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Radio.Group>
                <Radio value="male"> <p className="text-[#1079B1]"> Nam </p>  </Radio>
                <Radio value="female"><p className="text-[#1079B1]"> Nữ </p> </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <PhoneOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                  <p className="text-[#1079B1]">  Số điện thoại  </p>                  
                </>
              }
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input placeholder="Số điện thoại" style={{ width: '400px' }} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <MailOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                  <p className="text-[#1079B1]">  Địa chỉ email </p>
                </>
              }
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Địa chỉ email" style={{ width: '400px' }} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <CalendarOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                <p className="text-[#1079B1]"> Ngày tháng năm sinh </p>
                </>
              }
              name="birthdate"
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Ngày/Tháng/Năm sinh"
                style={{ width: '400px' }}
                className="text-[#1079B1]"
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <EnvironmentOutlined style={{ color: "#1079B1" }} className="mr-2 " /> 
            <p className="text-[#1079B1]">Chọn tỉnh/thành</p>          
                </>
              }
              name="city"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành" }]}
            >
              <Select placeholder="Chọn tỉnh/thành" style={{ width: '400px' }}>
                <Option value="hanoi" className="text-[#1079B1]"><p className="text-[#1079B1]">Hà Nội</p></Option>
                <Option value="hochiminh"><p className="text-[#1079B1]">hồ Chí Minh</p></Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <HomeOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                  <p className="text-[#1079B1]"> Chọn quận/huyện</p>
                </>
              }
              name="district"
              rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
            >
              <Select placeholder="Chọn quận/huyện" style={{ width: '400px' }}>
                <Option value="district1">   <p className="text-[#1079B1]"> Quận 1</p></Option>
                <Option value="district2"> <p className="text-[#1079B1]">Quận 2</p></Option>
                <Option value="district3"> <p className="text-[#1079B1]">Quận 3</p></Option>
                <Option value="district4"> <p className="text-[#1079B1]">Quận 4</p></Option>
                <Option value="district5"> <p className="text-[#1079B1]">Quận 5</p></Option>
                <Option value="district6"> <p className="text-[#1079B1]">Quận 6</p></Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <FormOutlined style={{ color: "#1079B1" }} className="mr-2" /> 
                  <p className="text-[#1079B1]"> Lý do khám</p>
                </>
              }
              name="reason"
              rules={[{ required: true, message: "Vui lòng nhập lý do khám" }]}
            >
              <Input.TextArea placeholder="Lý do khám" rows={4} style={{ width: '400px' }} />
            </Form.Item>
          </Form>
          </Spin>
          </div>

          <div className="mt-[100px] ml-60">
            <p className="mb-4 text-[#1079B1] font-bold ml-2">
              Hình thức thanh toán:
            </p>
            <Radio value="self" className="mb-4 text-[#1079B1] ml-2 my-3">
              Thanh toán tại phòng khám
            </Radio>

            <div className="bg-[#D2E6F0] p-5 rounded-3xl">
              <div className="flex justify-between">
                <p className="text-[#1079B1] font-bold">Giá khám:</p>
                <p className="text-[#1079B1]">350.000đ</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#1079B1] font-bold">Phí đặt lịch:</p>
                <p className="text-[#1079B1]">Miễn phí</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#1079B1] font-bold">Tổng cộng:</p>
                <p className="text-[#1079B1]">350.000đ</p>
              </div>
            </div>

            <div className="text-sm mt-11 bg-[#D2E6F0] p-5 rounded-3xl">
              <p className="text-[#1079B1]">
                <strong>Lưu ý:</strong> Thông tin bạn cung cấp sẽ được sử dụng
                làm hồ sơ khám bệnh.
              </p>
              <p className="text-[#1079B1]">
                Điền đầy đủ và kiểm tra lại thông tin trước khi nhấn "Xác nhận
                đặt khám".
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-6 bg-[#1079B1] w-[100%] rounded-3xl py-2 text-white"
              onClick={handleBookingSubmit} // Call handleBookingSubmit onClick
              loading={loading} 
            >
              Xác nhận đặt khám
            </Button>
          </div>
          <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        width={800}
        title={null}  // Remove default title
      >
        <div className="bg-[#D2E6F0] p-7 rounded-t-lg text-center w-full">
  <h2 className="text-[#1176AE] text-lg font-bold m-0 uppercase">
  Dưới đây là một số sản phẩm có thể phù hợp với nhu cầu của bạn
  </h2>
</div>
        <div className="flex justify-between mt-7 px-3">
        {productData.slice(0, 3).map((product) => (
              <div key={product.Id} className="w-60">
                {/* Set a fixed width for each card container */}
                <Link to={`/San-pham/detail/${product.Id}`}>
                  <Card
                    hoverable
                    style={{
                      width: "100%", // Set width to 100% to fill the parent div
                      height: "300px", // Set a fixed height for the card
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "", // Ensure content fills and spaces out properly
                    }}
                    cover={
                      <img
                        alt="example"
                        src={product.imageurls}
                        className="w-full h-30 object-cover" // Adjust image height
                      />
                    }
                  >
                    <Meta
                      title={
                        <div>
                          <h1 className="font-bold text-white text-xl">
                            {product.nameproduct}
                          </h1>
                          <h1 className="text-white">{product.Price}</h1>
                        </div>
                      }
                      description={
                        <div>
                          <p className="text-white text-sm truncate">
                            {product.descriptionproduct}
                          </p>
                        </div>
                      }
                    />
                  </Card>
                </Link>
              </div>
            ))}
        </div>
        <div className="text-center mt-6">
          <Button type="link" onClick={handleCloseModal}>
          <Link to="/san-pham" className="text-[#1079B1] underline">
              Xem thêm
            </Link>
          </Button>
        </div>
      </Modal>
        </div>
      </div>
    </div>
  );
}

export default HospitalBookingView;
