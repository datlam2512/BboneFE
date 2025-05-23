import React, { useEffect, useState } from "react";
import { Select, Button, Spin,Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { PhoneOutlined, CalendarOutlined } from "@ant-design/icons";
import useHospital from "../../hooks/useHospital";
import { Link } from "react-router-dom";
import "./HospitalDetail.css";
import useAuth  from "../../hooks/useAuth"; 

const { Option } = Select;

function HospitalDetailView() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn } = useAuth(); 
  const handleLoginRedirect = () => {
    setIsModalVisible(false); // Hide the modal
    navigate('/login'); // Redirect to login page
  };

  const [selectedDay, setSelectedDay] = useState(""); 
  const [selectedTime, setSelectedTime] = useState("");// Trạng thái lưu ngày được chọn
  const scheduleTimes = [
    "8h-8h30",
    "8h30-9h00",
    "9h-9h30",
    "9h30-10h",
    "10h-10h30",
    "10h30-11h",
    "11h-11h30",
    "11h30-12h",
    "13h-13h30",
    "13h30-14h",
    "14h-14h30",
    "14h30-15h",
    "15h-15h30",
    "15h30-16h",
    "16h-16h30",
  ];
  const { hospitalDetailData, fetchHospitalDetail } = useHospital();

  // Bản đồ chứa các ngày trong tuần và giá trị tương ứng
  const dayMap = {
    "Thứ 2": "Thứ 2",
    "Thứ 3": "Thứ 3",
    "Thứ 4": "Thứ 4",
    "Thứ 5": "Thứ 5",
    "Thứ 6": "Thứ 6",
    "Thứ 7": "Thứ 7",
    "Chủ nhật": "Chủ nhật",
  };

  useEffect(() => {
    const loadProductDetail = async () => {
      await fetchHospitalDetail(Id);
      setLoading(false);
    };
    loadProductDetail();
  }, [Id, fetchHospitalDetail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Lấy danh sách các ngày từ `dayMap`
  const dayOptions = Object.keys(dayMap); // Lấy các ngày (Thứ 2, Thứ 3, ...) từ `dayMap`

  // Hàm xử lý khi người dùng chọn ngày
  const handleDayChange = (value) => {
    setSelectedDay(value); // Lưu giá trị ngày được chọn
  };

  // Filter scheduleTimes for Sunday (Chủ nhật)
  const filteredTimes =
    selectedDay === dayMap["Chủ nhật"]
      ? scheduleTimes.filter((time) => !time.includes("16h30"))
      : scheduleTimes;

  return (
    <div className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8 bg-white w-full text-[#1079B1]">
      {/* Clinic Info */}
      <div className="grid grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={hospitalDetailData.imageurls} // Replace with actual image URL
            alt="Doctor"
            className="w-[530px] h-[381px] rounded-lg"
          />
        </div>

        {/* Clinic Details */}
        <div className="space-y-4">
          {/* Schedule Selector */}
          <div className="mb-4 ml-[18px]">
            <Select
              placeholder="Hãy lựa chọn ngày"
              className="w-48 border-[#1079B1] border-[1px] rounded-lg text-[#1079B1] custom-select-placeholder"
              style={{ color: "#1079B1" }}
              dropdownClassName="custom-dropdown"
              onChange={handleDayChange}
              value={selectedDay} // Hiển thị giá trị ngày được chọn
            >
              {/* Tạo các `Option` từ `dayMap` */}
              {dayOptions.map((day) => (
                <Option key={day} value={dayMap[day]}>
                  {day} {/* Hiển thị tên ngày như "Thứ 2", "Thứ 3" */}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex items-center mb-2 ml-5">
            <CalendarOutlined className="text-[#1079B1] mr-2 text-3xl" />
            <span className="text-lg font-semibold">LỊCH KHÁM</span>
          </div>

          <div className="grid grid-cols-4 gap-2 ml-2">
            {/* Hiển thị các thời gian theo lịch khám */}
            {filteredTimes.map((time) => (
              <Button
                key={time}
                className="w-[80%] bg-[#D2E6F0] text-[#1079B1] border  rounded-md m-1"
                onClick={() => {
                  if (!isLoggedIn()) {
                    setIsModalVisible(true); // Show modal if not logged in
                  }else{
                  setSelectedTime(time); // Lưu thời gian được chọn
                  navigate(`/Hospital/detail/booking/${hospitalDetailData.Id}`, {
                    state: { selectedDay, selectedTime: time }, // Gửi cả selectedDay và selectedTime
                  });
                }}}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-10">
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[#1079B1]">
            {hospitalDetailData.hosname}
          </h1>
          <p className="text-[#1079B1] mt-4">
            {hospitalDetailData.shortDescription}
          </p>
          <p className="text-[#1079B1] mt-4">Địa chỉ phòng khám:</p>
          <p className="text-[#1079B1] mt-4">{hospitalDetailData.Address}</p>
          <p className="text-[#1079B1] mt-4">
            Giá khám: <span className="font-semibold">350.000₫</span>
          </p>
          <div className="h-0.5 w-[1181px] bg-[#D2E6F0] mb-7 ml-16 mt-8"></div>
        </div>
        <h2 className="text-2xl font-bold text-[#1079B1] mt-5">
          {hospitalDetailData.hosname}
        </h2>
        <p className="mt-5 text-[#1079B1]">{hospitalDetailData.Description}</p>

        <h2 className="text-2xl font-bold text-[#1079B1] mt-5">
          Đội ngũ bác sĩ nước ngoài
        </h2>
        <p className="mt-5 text-[#1079B1]">
          Đội ngũ của chúng tôi gồm các bác sĩ nước ngoài (đến từ Mỹ, New
          Zealand, Pháp và Hàn Quốc) thuộc chuyên khoa Thần kinh cột sống...
        </p>

        <h2 className="text-2xl font-bold text-[#1079B1] mt-5">
          Dịch vụ theo tiêu chuẩn quốc tế
        </h2>
        <ul className="list-disc list-inside text-[#1079B1] mt-5">
          <li>Cơ sở vật chất khang trang</li>
          <li>Máy móc, thiết bị hiện đại</li>
          <li>Chuyên gia bệnh chuyên nghiệp</li>
          <li>Phục vụ tận tâm</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1079B1] mt-5">
          Các bệnh điều trị ACC
        </h2>
        <ul className="list-disc list-inside text-[#1079B1] mt-5">
          <li>Thoái hóa đốt sống cổ</li>
          <li>Vẹo cột sống</li>
          <li>Gai cột sống - thần kinh tọa</li>
          <li>Đau vai, đau đầu</li>
          <li>Đau thắt lưng</li>
          <li>Đau khớp gối</li>
        </ul>
      </div>
      
      <Modal
          title="Cần đăng nhập"
          visible={isModalVisible}
          onOk={handleLoginRedirect} // Redirect to login on OK
          onCancel={() => setIsModalVisible(false)} // Close modal on Cancel
          okText="Đăng nhập"
          cancelText="Hủy"
        >
          <p>Vui lòng đăng nhập để tiến hành đặt lịch.</p>
        </Modal>
    </div>
  );
}

export default HospitalDetailView;
