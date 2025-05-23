import React, { useState } from "react";
import { Router } from "./routes/sections";
import {
  FloatButton,
  Drawer,
  Input,
  Button,
  Upload,
  message as AntdMessage,
} from "antd";
import {
  PhoneOutlined,
  SendOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./App.css";
import ReactGA from "react-ga4";

const trackingId = "G-0G6NC8KCLT"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.send({ hitType: "Homepage", page: "/Homeview" });
function App() {
  const [isChatVisible, setIsChatVisible] = useState(false); // State to control chat visibility
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [message, setMessage] = useState(""); // State to handle input message
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [imageFile, setImageFile] = useState(null); // Store actual file for upload

  // Toggle Chat Drawer
  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);

    // If the chat is being opened for the first time, show the auto message
    if (!isChatVisible) {
      setChatMessages([
        {
          text: "Chào bạn. Cám ơn bạn đã quan tâm tới sản phẩm của bên mình ạ , bạn vui lòng đợi trong giây lát sẽ có người hỗ trợ ạ",
          sender: "system",
        },
      ]);
    }
  };

  // Handle image selection securely
  const handleImageUpload = (info) => {
    const file = info.file;

    if (!file) {
      AntdMessage.error("Không tìm thấy file.");
      return;
    }

    // Check for file size limit (2MB max, you can adjust as needed)
    const isImageSizeValid = file.size / 1024 / 1024 < 2;
    if (!isImageSizeValid) {
      AntdMessage.error("Kích thước hình ảnh không được vượt quá 2MB.");
      return;
    }

    // Validate file types to ensure security (accept only images)
    const isValidFileType = /\.(jpg|jpeg|png)$/i.test(file.name);
    if (!isValidFileType) {
      AntdMessage.error("Chỉ hỗ trợ định dạng JPG/PNG.");
      return;
    }

    const imageUrl = URL.createObjectURL(file); // Create a local URL for the image
    setSelectedImage(imageUrl); // Temporarily store image URL for preview
    setImageFile(file); // Store the actual file for sending later
  };

  // Handle removing the uploaded image
  const handleRemoveImage = () => {
    setSelectedImage(null); // Clear the image URL
    setImageFile(null); // Clear the actual file
  };

  // Handle sending messages and selected images
  const handleSendMessage = () => {
    if (message.trim() || selectedImage) {
      // Add the message and/or image to chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message || null,
          imageUrl: selectedImage || null,
          sender: "customer",
          timestamp: new Date(),
        },
      ]);

      // Clear inputs after sending
      setMessage("");
      setSelectedImage(null);
      setImageFile(null);
    } else {
      AntdMessage.warning("Vui lòng nhập tin nhắn hoặc tải lên một hình ảnh.");
    }
  };

  return (
    <>
      <Router />
      <FloatButton
        icon={<PhoneOutlined className="text-white" />}
        shape="circle"
        onClick={handleChatToggle} // Toggle chatbox on button click
      />

      {/* Chat Drawer */}
      <Drawer
        title="Hỗ trợ khách hàng"
        placement="right"
        onClose={handleChatToggle}
        visible={isChatVisible}
        height="400px" // Limit height
        width={300} // Adjust width
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }} // Ensure chat input is always at the bottom
        closable={false} // Disable close button to make it look like a widget
      >
        <div className="chat-content h-[1000px]">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="chat-input flex-col space-y-2">
          <Input
            placeholder="Nhập tin nhắn..."
            value={message} // Binding with state message
            onChange={(e) => setMessage(e.target.value)} // Update the message state
            onPressEnter={handleSendMessage}
            className="w-full"
          />

          <div className="flex items-center justify-between space-x-2">
            <Upload
              beforeUpload={(file) => {
                handleImageUpload({ file }); // Call handleImageUpload when a file is selected
                return false; // Prevent auto upload by Ant Design
              }}
              accept=".jpg,.jpeg,.png" // Restrict to image formats
              listType="picture"
              showUploadList={false} // Hide file list
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>

            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              className=""
            >
              Gửi
            </Button>
          </div>
        </div>

        {selectedImage && (
          <div
            style={{
              marginTop: "1px",
              textAlign: "center",
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src={selectedImage}
              alt="Selected Preview"
              style={{ maxWidth: "100%", maxHeight: "150px" }}
            />
            <CloseCircleOutlined
              style={{
                fontSize: "20px",
                color: "black",
                cursor: "pointer",
                position: "absolute",
                top: "1px",
                right: "14px",
              }}
              onClick={handleRemoveImage} // Handle removing the image
            />
            <p>Hình ảnh đã chọn</p>
          </div>
        )}
      </Drawer>
    </>
  );
}

export default App;
