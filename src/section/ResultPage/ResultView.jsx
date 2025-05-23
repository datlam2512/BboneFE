import React, { useState, useEffect } from "react";
import { Button, Card, Spin, Image } from "antd";
import { useLocation } from "react-router-dom";
import { EnvironmentOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useProduct from "../../hooks/useProduct";
import useHospital from "../../hooks/useHospital";
import viemgoi from "../../assets/images/gối.png";
import viemco from "../../assets/images/viemco.jpg";
import cotsong from "../../assets/images/cotsongresult2.webp";
import { ArrowDownOutlined } from "@ant-design/icons"; // Import the down arrow icon
import gaytay from "../../assets/images/gaytay.jpg";
import { Link } from "react-router-dom";
import './ResultView.css'
// Mapping body parts to their respective images
const bodyPartImages = {
  Gối: viemgoi, // Remove the curly braces here
  Tay: gaytay,
  Cổ: cotsong,
  Lưng: viemco,
};
// Detailed diagnosis messages for each body part and severity level
const diagnosisMessages = {
  Gối: {
    low: "Bạn đang gặp các dấu hiệu nhẹ của tổn thương khớp gối, bao gồm một chút đau nhức hoặc khó chịu khi di chuyển. Đây có thể là những triệu chứng ban đầu của viêm khớp hoặc căng cơ, và việc nghỉ ngơi cùng với luyện tập nhẹ nhàng có thể giúp giảm thiểu tình trạng này.",
    medium: "Chẩn đoán cho thấy khớp gối của bạn đang bị viêm tương đối , có thể dẫn đến sưng tấy và đau khi di chuyển. Nếu tình trạng này không được kiểm soát kịp thời, nó có thể làm giảm khả năng di chuyển và ảnh hưởng đến các hoạt động hàng ngày của bạn. Hãy tham khảo ý kiến bác sĩ để có phương pháp điều trị phù hợp.",
    high: "Tình trạng khớp gối của bạn khá nghiêm trọng, với các triệu chứng rõ rệt như sưng lớn, đau nhức kéo dài và khó khăn trong việc di chuyển. Điều này có thể là dấu hiệu của viêm khớp nặng hoặc thoái hóa khớp, đòi hỏi sự can thiệp y tế kịp thời để ngăn ngừa tổn thương vĩnh viễn.",
  },
  Cổ: {
    low: "Vai của bạn có biểu hiện căng cứng nhẹ, thường gặp sau khi vận động quá mức hoặc duy trì tư thế sai trong thời gian dài. Cảm giác khó chịu này có thể tự giảm nếu bạn thực hiện các bài tập kéo giãn nhẹ nhàng hoặc nghỉ ngơi hợp lý.",
    medium: "Bạn đang có dấu hiệu viêm gân vai, khiến vai trở nên cứng và đau khi cử động. Nguyên nhân có thể là do căng thẳng kéo dài, làm việc sai tư thế hoặc vận động quá sức. Nếu không được điều trị kịp thời, tình trạng này có thể dẫn đến viêm gân mãn tính hoặc hạn chế khả năng di chuyển của vai.",
    high: "Tình trạng của bạn rất nặng, với những cơn đau dữ dội và cử động hạn chế đáng kể. Đây có thể là dấu hiệu của viêm gân nặng hoặc thậm chí rách gân, đòi hỏi can thiệp y tế ngay lập tức để tránh tình trạng xấu đi và mất chức năng vận động của vai.",
  },
  Lưng: {
    low: "Cột sống của bạn có dấu hiệu căng thẳng nhẹ, thường xuất hiện khi bạn duy trì tư thế không đúng trong thời gian dài hoặc không vận động đủ. Cảm giác đau lưng nhẹ này thường sẽ giảm nếu bạn thực hiện các bài tập giãn cơ và cải thiện tư thế ngồi, đứng.",
    medium: "Bạn có dấu hiệu của căng cơ lưng, gây ra cơn đau và khó chịu khi cử động. Nguyên nhân có thể đến từ việc bạn nâng vật nặng sai cách hoặc vận động không hợp lý. Nếu tình trạng này không được khắc phục, nó có thể dẫn đến các vấn đề nghiêm trọng hơn liên quan đến đĩa đệm hoặc cột sống.",
    high: "Tình trạng lưng của bạn nghiêm trọng, có thể do thoát vị đĩa đệm hoặc các tổn thương cột sống khác. Điều này có thể dẫn đến đau nhức liên tục và hạn chế khả năng di chuyển. Việc điều trị ngay lập tức và tuân thủ các liệu pháp điều trị là rất cần thiết để tránh tình trạng trở nên tồi tệ hơn.",
  },
  Tay: {
    low: "Bạn có dấu hiệu nhẹ của căng cơ tay, có thể là do làm việc với cường độ cao hoặc lặp lại một động tác trong thời gian dài. Những cơn đau nhẹ này có thể tự khỏi nếu bạn dành thời gian để nghỉ ngơi và thực hiện các bài tập giãn cơ phù hợp.",
    medium: "Tay của bạn đang có dấu hiệu bị viêm cơ tay do vận động quá sức, khiến bạn cảm thấy đau nhức khi sử dụng tay cho các hoạt động hàng ngày. Nếu không điều trị, viêm cơ có thể trở thành mãn tính, gây ảnh hưởng đến hiệu suất làm việc và chất lượng cuộc sống của bạn.",
    high: "Tình trạng tay của bạn nghiêm trọng, có thể do viêm cơ nặng hoặc tổn thương gân. Bạn có thể cảm thấy cơn đau lan rộng, thậm chí không thể cử động tay một cách bình thường. Để tránh tổn thương lâu dài, việc gặp bác sĩ và áp dụng phương pháp điều trị kịp thời là rất quan trọng.",
  },
};

function ResultView() {
  const location = useLocation();
  const { totalScore, selectedBodyPart = "" } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [products, setProducts] = useState([]);
  const { Meta } = Card;
  // Determine severity level based on score
  const determineSeverity = (level, totalScore) => {
    if (level <= 5 && totalScore <= 5) return "low";
    if (level <= 10 && totalScore <= 10) return "medium";
    return "high";
  };
 
  console.log("check body", totalScore);
  console.log("check body part",selectedBodyPart)
  const { hospitalData, fetchHospitalrData } = useHospital();
  const { productData, fetchProductrData } = useProduct();
 
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchProductrData();
      await fetchHospitalrData();
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !productData || !hospitalData) {
    return <Spin size="large" />;
  }

  // Filter clinics based on score level
  const filteredClinics = hospitalData.map((clinic) => ({
    ...clinic,
    severity: determineSeverity(clinic.level, totalScore),
  }));
  // Filter products based on body part and score level
  // Filter products based on body part and score level
  const severity = determineSeverity(totalScore, totalScore);
const filteredProducts = productData
.filter(
  (product) =>
    selectedBodyPart &&
    product.nameproduct.toLowerCase().includes(selectedBodyPart.toLowerCase()) &&
    product.Level > totalScore // Ensure product level is >= totalScore
)
.map((product) => {
  console.log("filtered products", product.Level); // Log the product level here
  return {
    ...product,
    severity: determineSeverity(product.Level, totalScore),
  };
});
const arrowPositionStyle = {
  low: { left: '14%' },
  medium: { left: '47%' },
  high: { left: '78.3%' }
}[severity];


  return (
    <div className="flex flex-col items-center justify-center min-h-screen  pt-28 pb-32 ">
      <h1 className="text-3xl font-bold mb-7 text-[#1079B1] uppercase mr-3">
        Test bệnh về tư thế
      </h1>
      <div className="flex justify-center my-9 items-center mr-[15px]">
        <div className="flex-col align-middle justify-center text-center">
          <div className="w-11 h-11 rounded-full bg-[#1079B1] mx-1"></div>
          <p className="mt-3 text-[#1079B1]">Câu hỏi</p>
        </div>

        <div className="h-0.5 w-10 bg-gray-400 mb-7"></div>
        <div className="flex-col align-middle justify-center text-center">
          <div className="w-11 h-11 rounded-full bg-[#1079B1] mx-1 "></div>
          <p className="mt-3 text-[#1079B1]">Kết quả</p>
        </div>
      </div>

      {/* Second Circle (Kết quả) */}
      <h2 className="text-3xl font-bold mb-7 text-[#1079B1] mr-4">KẾT QUẢ</h2>

      {/* Body Part Diagnosis Section */}
      <div className="w-full max-w-md mb-6 mr-[19px]">
        <Image
          src={bodyPartImages[selectedBodyPart]} // Dynamically show image based on selected body part
          alt={`Diagnosed ${selectedBodyPart}`}
          className="rounded-md"
        />
      </div>
      <div className="w-full max-w-lg h-12 mb-8 relative">
  <div className="flex h-10 relative mr-[19px]">
    {/* Low (Green) */}
    <div className="flex-row w-[34%] text-center">
    <div className="flex-1 bg-green-500 h-full"></div>
    <p className="mt-1 text-[#1079B1] textcheck">Nhẹ</p>
    </div>
    {/* Medium (Yellow) */}
    <div className="flex-row w-[34%] text-center">
    <div className="flex-1 bg-yellow-500 h-full"></div>
    <p className="mt-1 text-[#1079B1] textcheck">Bình thường</p>
    </div>
    {/* High (Red) */}
    <div className="flex-row w-[34%] text-center">
    <div className="flex-1 bg-red-500 h-full"></div>
    <p className="mt-1 text-[#1079B1] textcheck">Nặng</p>
    </div>
  </div>

  {/* Arrow pointing to the correct severity level */}
  <div
  className="absolute"
  style={{
    position: "absolute",
    top: "-30px", // Adjust vertical position
    fontSize: "20px", // Size of the icon
    color: "black", // Color of the arrow
    ...arrowPositionStyle,
  }}
>
  <ArrowDownOutlined /> {/* Downward pointing arrow icon */}
</div>

</div>
      {/* Diagnostic Text */}
      <p className="text-xl font-semibold mb-6 text-[#1079B1] mx-64 diagnotictext">
        {
          diagnosisMessages[selectedBodyPart][
            determineSeverity(totalScore, totalScore)
          ]
        }{" "}
        {/* Display detailed diagnosis */}
      </p>
      <div>
        {/* Suggested Clinics Section */}
        <h4 className="text-xl font-bold mb-10 mt-10 text-[#1079B1] text-center">
          Các phòng khám giúp cải thiện vấn đề của bạn
        </h4>
        <div className="flex justify-center gap-8 mr-6">
  {hospitalData.slice(0, 3).map((hospital, index) => (
    <div key={hospital.id} className="w-60 h-100 relative">
      <Link to={index === 2 ? "#" : `/Hospital/detail/${hospital.Id}`}>
        <Card
          hoverable={index !== 2}
          style={{
            width: "107%",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            filter: index === 2 ? "blur(5px)" : "none", // Apply blur to the third card
            pointerEvents: index === 2 ? "none" : "auto", // Disable interaction for the third card
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
              <div>
                <h1  className="font-bold text-white text-xl"
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflow: "hidden", // Hide any overflow
                    }}>
                  {hospital.hosname}
                </h1>
                <h1 className="text-white">{hospital.Zone}</h1>
              </div>
            }
            description={
              <div>
                <p className="text-white text-sm truncate">
                  {hospital.Address}
                </p>
              </div>
            }
          />
        </Card>
      </Link>
      {index === 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Link to="/Hospital">
          <span className="text-[#1079B1] text-lg mt-6">Xem thêm</span>
          </Link>
        </div>
      )}
    </div>
  ))}
</div>
      </div>
      <div className="mt-40 flex-row justify-center align-middle">
  {/* Suggested Products Section */}
  <h4 className="text-xl font-bold mb-4 text-[#1079B1] text-center w-[70%] ml-[110px]">
    Các sản phẩm dưới đây có thể hỗ trợ vấn đề mà bạn đang gặp phải
  </h4>

  {filteredProducts.length > 0 ? (
    <div className="flex justify-center gap-8 mr-6">
      {filteredProducts.slice(0, 4).map((product) => (
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
  ) : (
    <p className="text-center text-lg text-red-500">Không có sản phẩm phù hợp.</p>
  )}
</div>
    </div>
  );
}

export default ResultView;
