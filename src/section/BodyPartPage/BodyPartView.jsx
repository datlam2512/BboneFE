import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cotsong from '../../assets/images/cotsong.png';
import goi from '../../assets/images/goi.png';
import tay from '../../assets/images/tay.png';
import vaigay from '../../assets/images/vaigay.png';

function BodyPartView() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (part) => {
    setSelectedBodyPart(part);
    navigate('/questions', { state: { selectedBodyPart: part } }); // Navigate with state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-xl font-bold mb-16 text-[#1079B1] w-[70%] text-center">
        Trước khi tiến vào bài test, hãy cho tôi biết tình trạng của bạn thuộc bộ phận nào dưới đây:
      </h2>
      <div className="grid grid-cols-2 gap-12"> {/* Giảm khoảng cách giữa các hình */}
        <div onClick={() => handleSelection('Cổ')}>
          <img src={vaigay} alt="Cổ vai gáy" className="w-[180%] h-48 mx-1 mb-4 rounded-xl cursor-pointer" /> {/* Phóng to hình ảnh */}
          <p className="text-center text-lg font-medium text-[#1079B1]">Cổ vai gáy</p>
        </div>
        <div onClick={() => handleSelection('Lưng')}>
          <img src={cotsong} alt="Cột sống" className="w-[180%] h-48 mx-auto mb-4 rounded-xl cursor-pointer" /> {/* Phóng to hình ảnh */}
          <p className="text-center text-lg font-medium text-[#1079B1]">Cột sống</p>
        </div>
        <div onClick={() => handleSelection('Tay')}>
          <img src={tay} alt="Tay" className="w-[140%] h-48 mx-auto mb-4 rounded-xl cursor-pointer" /> {/* Phóng to hình ảnh */}
          <p className="text-center text-lg font-medium text-[#1079B1]">Tay</p>
        </div>
        <div onClick={() => handleSelection('Gối')}>
          <img src={goi} alt="Gối" className="w-[140%] h-48 mx-auto mb-4 rounded-xl cursor-pointer" /> {/* Phóng to hình ảnh */}
          <p className="text-center text-lg font-medium text-[#1079B1]">Gối</p>
        </div>
      </div>
    </div>
  );
}

export default BodyPartView;
