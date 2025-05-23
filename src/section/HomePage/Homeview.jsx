import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Spin, Modal } from "antd";
import { Card } from "antd";
import bannerbbone from "../../assets/images/bbonepage.jpg";
import useProduct from "../../hooks/useProduct";
import useArticle from "../../hooks/useArticle";
import useHospital from "../../hooks/useHospital";
import useAuth from "../../hooks/useAuth";

import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import ReactGA from "react-ga4";

function Homeview() {
  //track page view
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  const { Meta } = Card;
  const { isLoggedIn } = useAuth(); // Get login status from the auth store
  const carouselRefTop = useRef(null); // Reference for the top Carousel
  const carouselRefBottom = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const carouselRef = useRef(); // Reference for the Carousel
  const [direction, setDirection] = useState(0); // Direction state for animation
  const nextSlide = () => {
    carouselRef.current.next(); // Move to the next slide
  };
  // Function to show the previous article
  // Function to show the previous article
  // Function to show the previous article
  // Function to show the previous article
  const handlePrevArticle = () => {
    setCurrentArticleIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredArticleType1.length) %
        filteredArticleType1.length
    );
  };

  // Function to show the next article
  const handleNextArticle = () => {
    setCurrentArticleIndex(
      (prevIndex) => (prevIndex + 1) % filteredArticleType1.length
    );
  };
  // Function to show the next main article (move by 1)
  const handleMainNextArticle = () => {
    setMainArticleIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % filteredArticleType2.length;
      return nextIndex; // Move to the next article, loop back to 0 if at the end
    });
  };

  // Function to show the previous main article (move by 1)
  const handleMainPrevArticle = () => {
    setMainArticleIndex((prevIndex) => {
      const prevIndexSet =
        (prevIndex - 1 + filteredArticleType2.length) %
        filteredArticleType2.length;
      return prevIndexSet; // Move to the previous article, loop back to the last if at the start
    });
  };
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [mainArticleIndex, setMainArticleIndex] = useState(0);
  const { productData, fetchProductrData } = useProduct();
  const { hospitalData, fetchHospitalrData } = useHospital();
  const { articleData, fetchArticlelrData } = useArticle();

  useEffect(() => {
    const loadProductDetail = async () => {
      await fetchProductrData();
      await fetchHospitalrData();
      await fetchArticlelrData();
      setLoading(false);
    };
    loadProductDetail();

    // Check if the user has visited before and handle modal visibility
    if (isLoggedIn) {
      setIsModalVisible(true);
      localStorage.removeItem("hasVisitedHome"); // Clear the flag on login
    } else {
      const hasVisited = localStorage.getItem("hasVisitedHome");
      const hasClosedModal = localStorage.getItem("modalClosed");
      if (!hasVisited && !hasClosedModal) {
        setIsModalVisible(true);
        localStorage.setItem("hasVisitedHome", "true");
      }
    }
  }, [isLoggedIn]);

  const handleTestNowClick = () => {
    ReactGA.event({
      category: "Modal",
      action: "Click Test Now",
      label: "User clicked Test Now in modal",
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleModalCancel = () => {
    ReactGA.event({
      category: "Modal",
      action: "Close Modal",
      label: "User closed the modal",
    });
    setIsModalVisible(false); // Close the modal
    localStorage.setItem("modalClosed", "true"); // Set the flag in local storage
  };

  const prevSlide = () => {
    carouselRef.current.prev(); // Move to the previous slide
  };
  const filteredArticleType1 = articleData.filter(
    (article) => article.Type === "1"
  );
  const filteredArticleType2 = articleData.filter(
    (article) => article.Type === "2"
  );
  const displayedArticles =
    filteredArticleType2.length > 0
      ? filteredArticleType2.slice(mainArticleIndex, mainArticleIndex + 3)
      : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    ); // Display a spinner while loading
  }
  return (
    <div className="bg-white font-sans w-full homeviewlayout">
      <header className="w-screen relative overflow-hidden">
        <div className="w-full">
          <img src={bannerbbone} alt="Doctor" className="w-screen h-[490px]" />
        </div>
      </header>
      <div className="w-full flex-row align-middle justify-center ml-3">
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-[#1079B1]  mb-10 mr-7">
            Sản phẩm nổi bật
          </h2>
          <div className="flex justify-center gap-8 mr-6">
            {productData.slice(0, 4).map((product) => (
              <div key={product.Id} className="w-60">
                {/* Set a fixed width for each card container */}
                <Link to={`/San-pham/detail/${product.Id}`}>
                  <Card
                    hoverable
                    style={{
                      width: "100%", // Ensure the card fills the container
                      height: "350px", // Set a fixed height for the card
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Ensure content fills and spaces out properly
                    }}
                    cover={
                      <img
                        alt="example"
                        src={product.imageurls}
                        className="w-full h-60 object-cover" // Adjust image height
                      />
                    }
                  >
                    <Meta
                      title={
                        <div>
                          <h1 className="font-bold text-white text-xl"
                          >
                            {product.nameproduct}
                          </h1>
                          <h1 className="text-white">
                            {Number(product.Price).toLocaleString("vi-VN")} đ
                          </h1>
                        </div>
                      }
                      description={ 
                        <div>
                          <p className="text-white text-sm truncate"   style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflow: "hidden", // Hide any overflow
                          }}>
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
          <div className="text-center mt-20 mr-[10px]">
            <Link to="/san-pham" className="text-[#1079B1] underline">
              Xem thêm
            </Link>
          </div>
        </section>
        <section className="py-12 ml-3">
  <h2 className="text-3xl font-bold text-center text-[#1079B1] mb-10 ml-2">
    Phòng khám
  </h2>
  <div className="flex justify-center gap-8 mr-6">
    {hospitalData.slice(0, 4).map((hospital) => (
      <div key={hospital.id} className="w-60 h-[470px] flex flex-col justify-between">
        <Link to={`/Hospital/detail/${hospital.Id}`}>
          <Card
            hoverable
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            cover={
              <img
                alt="example"
                src={hospital.imageurls}
                className="w-full h-60 object-cover"
              />
            }
          >
            <Meta
              title={
                <div
                  style={{
                    minHeight: "80px",
                    maxHeight: "80px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "left", // Align title content to the left
                  }}
                >
                  <h1
                    className="font-bold text-white text-xl"
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {hospital.hosname}
                  </h1>
                  <h2 className="text-white">{hospital.Zone}</h2>
                </div>
              }
              description={
                <div
                  style={{
                    minHeight: "60px",
                    maxHeight: "60px",
                    overflow: "hidden",
                    paddingTop: "8px",
                    textAlign: "left", // Align description content to the left
                  }}
                >
                  <p className="text-white text-sm break-words">
                    {hospital.Address}
                  </p>
                </div>
              }
            />
          </Card>
        </Link>
      </div>
    ))}
  </div>
  <div className="text-center">
    <Link to="/Hospital">
      <div className="text-center mt-8 mr-[19px]">
        <Link to="/san-pham" className="text-[#1079B1] underline">
          Xem thêm
        </Link>
      </div>
    </Link>
  </div>
</section>





        <section className="py-12">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-[25px] font-bold text-center text-[#1079B1] mb-3">
                Ảnh hưởng của bệnh xương khớp đối với sức khỏe
              </h2>
              <div className="w-full text-center flex align-middle justify-center">
                <p className="text-center text-xl text-[#1079B1] w-1/2">
                  Bệnh xương khớp có thể gây ra nhiều tác động tiêu cực đến sức
                  khỏe tổng thể của mọi người
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center align-middle">
              <div className="flex justify-center gap-8 bg-[#e8f2f7] flex-wrap w-[90%] relative rounded-2xl py-8">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex align-middle justify-center">
                  <Button
                    className="bg-[#1079B1] hover:bg-[#59b3e4] flex align-middle justify-center pt-3 pb-6 rounded-full mr-9"
                    onClick={handleMainNextArticle}
                  >
                    <RightOutlined className="text-white" />
                  </Button>
                </div>

                {filteredArticleType2
                  .slice(mainArticleIndex, mainArticleIndex + 3)
                  .concat(
                    mainArticleIndex + 3 > filteredArticleType2.length
                      ? filteredArticleType2.slice(
                          0,
                          (mainArticleIndex + 3) % filteredArticleType2.length
                        )
                      : []
                  )
                  .map((article) => (
                    <div
                      key={article.Id}
                      className="w-[300px] h-[450px] bg-[#348DBD] rounded-lg shadow-lg overflow-hidden text-center pt-4 flex flex-col justify-between"
                    >
                      {/* Image Section */}
                      <div className="flex justify-center">
                        <img
                          src={article.imageurls[0]}
                          alt={article.Title}
                          className="w-[80%] h-[200px] object-cover rounded-xl"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col justify-between h-full">
                        <p className="font-bold text-white text-xl mt-3 text-left">
                          {article.Title}
                        </p>
                        <div className="mt-auto flex justify-center">
                          <Link to={`/Article/detail/${article.Id}`}>
                            <button className="w-[60%] bg-[#D2E6F0] text-[#348DBD] font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 ml-28">
                              Đọc ngay
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex align-middle justify-center">
                  <Button
                    className="bg-[#1079B1] hover:bg-[#59b3e4] flex align-middle justify-center pt-3 pb-6 rounded-full"
                    onClick={handleMainPrevArticle}
                  >
                    <LeftOutlined className="text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex-row py-28 relative">
          {/* Button container moved to the right, above the content */}
          <div className="absolute top-0 right-0 mr-[220px] flex mt-7">
            <Button
              className="bg-[#1079B1] hover:bg-[#59b3e4] flex align-middle justify-center pt-3 pb-6 pb rounded-full mr-4"
              onClick={handlePrevArticle}
            >
              <LeftOutlined className="text-white" />
            </Button>
            <Button
              className="bg-[#1079B1] hover:bg-[#59b3e4] flex align-middle justify-center pt-3 pb-6 pb rounded-full"
              onClick={handleNextArticle}
            >
              <RightOutlined className="text-white" />
            </Button>
          </div>

          {/* Main content section */}
          <div className="w-full flex justify-between items-start">
            {/* Text section */}
            <div className="w-[30%] pr-8 ml-[230px]">
              <h2 className="text-5xl font-bold text-[#1079B1] ">
                Sống khỏe, dáng đẹp
              </h2>
              <p className="mt-4 text-xl text-[#1079B1]">
                Sức khỏe xương khớp là yếu tố quan trọng để duy trì khả năng vận
                động và chất lượng cuộc sống.
              </p>
            </div>

            {/* Cards section */}
            {/* Cards section */}
            <div className="relative flex mr-[250px]">
              <AnimatePresence
                custom={direction}
                initial={false}
              ></AnimatePresence>
              {filteredArticleType1
                .slice(currentArticleIndex, currentArticleIndex + 3)
                .concat(
                  // If we reach the end, loop back to the start
                  currentArticleIndex + 3 > filteredArticleType1.length
                    ? filteredArticleType1.slice(
                        0,
                        (currentArticleIndex + 3) % filteredArticleType1.length
                      )
                    : []
                )
                .map((article, index) => (
                  <motion.div
                    key={article.Id}
                    className={`relative bg-[#348DBD] rounded-xl shadow-lg text-center pt-4 ${
                      index === 0
                        ? "z-30 w-[298px] h-[399px]"
                        : index === 1
                        ? "z-20 w-[260px] h-[349px] -ml-12 mt-6"
                        : "z-10 w-[216px] h-[289px] -ml-12 mt-14"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="flex justify-center">
                      <img
                        src={article.imageurls[0]}
                        alt={article.Title}
                        className="w-[80%] h-40 object-cover rounded-xl"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col justify-between h-[calc(100%-10rem)]">
                      <p className="text-white text-base font-semibold mb-4 line-clamp-2 mt-6">
                        {article.Title}
                      </p>
                      <div className="mt-auto">
                        <Link to={`/Article/detail/${article.Id}`}>
                          <button className="w-[50%] bg-[#D2E6F0] text-[#1079B1] font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300">
                            Đọc ngay
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            <Modal
              title=""
              visible={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              footer={null}
              className="custom-modal w-[100%]"
            >
              <div className="modal-content ">
                <h2 className="modal-title">
                  BÀI TEST GIÚP BẠN LỰA CHỌN NHỮNG GIẢI PHÁP PHÙ HỢP CHO VẤN ĐỀ
                  XƯƠNG KHỚP CỦA BẠN.
                </h2>
                <p className="modal-description">
                  Bằng cách nhấn vào ‘Test ngay’, bạn sẽ được BBONE cung cấp một
                  số câu hỏi liên quan đến vấn đề xương khớp của bản thân bạn.
                  Và thông qua các thông tin mà bạn đã cung cấp, chúng tôi có
                  thể đưa ra những lựa chọn liên quan tới phòng khám hay các sản
                  phẩm phù hợp dựa trên tình trạng xương khớp của bạn.
                </p>
                <button
                  type="primary"
                  className="test-button py-3 px-6"
                  onClick={handleTestNowClick}
                >
                  <Link to="/BodyPart">TEST NGAY</Link>
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homeview;
