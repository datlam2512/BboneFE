import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Progress } from 'antd';
import './QuestionView.css'
function QuestionView() {
  const bodyPartQuestions = {
    'Cổ': [
      {
        question: 'Bạn có thường xuyên cảm thấy đau hoặc căng thẳng ở vùng cổ và vai không?',
        answers: [
          { text: 'a) Hiếm khi (1-2 lần/tháng)', score: 1 },
          { text: 'b) Thỉnh thoảng (1-2 lần/tuần)', score: 2 },
          { text: 'c) Thường xuyên (3-4 lần/tuần)', score: 3 },
          { text: 'd) Liên tục, gần như mỗi ngày', score: 4 }
        ]
      },
      {
        question: 'Cơn đau cổ vai gáy của bạn kéo dài bao lâu mỗi lần?',
        answers: [
          { text: 'a) Vài phút', score: 1 },
          { text: 'b) Vài giờ', score: 2 },
          { text: 'c) Cả ngày nhưng giảm sau khi nghỉ ngơi', score: 3 },
          { text: 'd) Kéo dài cả ngày và không cải thiện khi nghỉ ngơi', score: 4 }
        ]
      },
      {
        question: 'Cơn đau có lan ra các vùng khác như cánh tay hoặc lưng trên không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi, nhưng không ảnh hưởng nhiều', score: 2 },
          { text: 'c) Có, thường xuyên lan ra vai và cánh tay', score: 3 },
          { text: 'd) Có, lan rộng và gây khó khăn trong cử động', score: 4 }
        ]
      },
      {
        question: 'Bạn có cảm giác tê hoặc ngứa ran ở vai, cổ hoặc cánh tay không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi cảm thấy tê nhẹ', score: 2 },
          { text: 'c) Tê nhiều và kéo dài', score: 3 },
          { text: 'd) Tê, mất cảm giác ở vai và cánh tay', score: 4 }
        ]
      },
      // Add more 'Cổ vai gáy' questions from the document here
    ],
    'Lưng': [
      {
        question: 'Bạn có thường xuyên bị đau lưng hoặc đau dọc cột sống không?',
        answers: [
          { text: 'a) Hiếm khi (1-2 lần/tháng)', score: 1 },
          { text: 'b) Thỉnh thoảng (1-2 lần/tuần)', score: 2 },
          { text: 'c) Thường xuyên (3-4 lần/tuần)', score: 3 },
          { text: 'd) Liên tục, gần như mỗi ngày', score: 4 }
        ]
      },
      {
        question: 'Cơn đau kéo dài bao lâu mỗi lần?',
        answers: [
          { text: 'a) Vài phút', score: 1 },
          { text: 'b) Vài giờ', score: 2 },
          { text: 'c) Cả ngày nhưng giảm sau khi nghỉ ngơi', score: 3 },
          { text: 'd) Kéo dài cả ngày và không cải thiện khi nghỉ ngơi', score: 4 }
        ]
      },
      {
        question: 'Cơn đau có lan xuống chân hoặc tay không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Thỉnh thoảng, nhưng không quá ảnh hưởng', score: 2 },
          { text: 'c) Có, thường xuyên lan xuống chân/tay', score: 3 },
          { text: 'd) Có, lan rộng và gây khó khăn trong di chuyển hoặc cử động', score: 4 }
        ]
      },
      {
        question: 'Bạn có cảm giác tê hoặc mất cảm giác ở chân, tay hoặc vùng lưng không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi, nhưng chỉ tê nhẹ', score: 2 },
          { text: 'c) Tê nhiều và kéo dài', score: 3 },
          { text: 'd) Tê hoặc mất cảm giác hoàn toàn ở một số vùng cơ thể', score: 4 }
        ]
      },
      // Add more 'Cột sống' questions from the document here
    ],
    'Tay': [
      {
        question: 'Bạn có thường xuyên cảm thấy đau hoặc mệt mỏi ở cánh tay không?',
        answers: [
          { text: 'a) Hiếm khi (1-2 lần/tháng)', score: 1 },
          { text: 'b) Thỉnh thoảng (1-2 lần/tuần)', score: 2 },
          { text: 'c) Thường xuyên (3-4 lần/tuần)', score: 3 },
          { text: 'd) Liên tục, gần như mỗi ngày', score: 4 }
        ]
      },
      {
        question: 'Cơn đau kéo dài bao lâu mỗi lần?',
        answers: [
          { text: 'a) Vài phút', score: 1 },
          { text: 'b) Vài giờ', score: 2 },
          { text: 'c) Cả ngày nhưng giảm sau khi nghỉ ngơi', score: 3 },
          { text: 'd) Kéo dài cả ngày và không cải thiện khi nghỉ ngơi', score: 4 }
        ]
      },
      {
        question: 'Cơn đau có lan ra vai, ngực hoặc ngón tay không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi, nhưng không quá nghiêm trọng', score: 2 },
          { text: 'c) Có, thường xuyên lan ra các vùng khác', score: 3 },
          { text: 'd) Có, lan rộng và ảnh hưởng nghiêm trọng đến cử động', score: 4 }
        ]
      },
      {
        question: 'Bạn có cảm thấy tê hoặc mất cảm giác ở cánh tay hoặc ngón tay không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi tê nhẹ', score: 2 },
          { text: 'c) Tê kéo dài và khó chịu', score: 3 },
          { text: 'd) Mất cảm giác hoàn toàn ở một phần của cánh tay hoặc ngón tay', score: 4 }
        ]
      },
      // Add more 'Tay' questions from the document here
    ],
    'Gối': [
      {
        question: 'Bạn có cảm thấy đau hoặc khó chịu ở chân không?',
        answers: [
          { text: 'a) Hiếm khi (1-2 lần/tháng)', score: 1 },
          { text: 'b) Thỉnh thoảng (1-2 lần/tuần)', score: 2 },
          { text: 'c) Thường xuyên (3-4 lần/tuần)', score: 3 },
          { text: 'd) Liên tục, gần như mỗi ngày', score: 4 }
        ]
      },
      {
        question: 'Cơn đau kéo dài bao lâu mỗi lần?',
        answers: [
          { text: 'a) Vài phút', score: 1 },
          { text: 'b) Vài giờ', score: 2 },
          { text: 'c) Cả ngày nhưng giảm sau khi nghỉ ngơi', score: 3 },
          { text: 'd) Kéo dài cả ngày và không cải thiện khi nghỉ ngơi', score: 4 }
        ]
      },
      {
        question: 'Cơn đau có lan xuống đầu gối, mắt cá hoặc bàn chân không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi, nhưng không quá nghiêm trọng', score: 2 },
          { text: 'c) Có, thường xuyên lan xuống đầu gối hoặc mắt cá', score: 3 },
          { text: 'd) Có, lan rộng và gây khó khăn trong cử động', score: 4 }
        ]
      },
      {
        question: 'Bạn có cảm thấy tê hoặc mất cảm giác ở chân hoặc bàn chân không?',
        answers: [
          { text: 'a) Không', score: 1 },
          { text: 'b) Đôi khi tê nhẹ', score: 2 },
          { text: 'c) Tê kéo dài và khó chịu', score: 3 },
          { text: 'd) Mất cảm giác hoàn toàn ở một phần chân hoặc bàn chân', score: 4 }
        ]
      },
      // Add more 'Chân' questions from the document here
    ]
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  // Retrieve the selected body part from the location state
  useEffect(() => {
    const state = location.state || {};
    const selectedPart = state.selectedBodyPart || '';
    setSelectedBodyPart(selectedPart);
    setQuestions(bodyPartQuestions[selectedPart] || []);
  }, [location.state]);

  const handleAnswerChange = (questionIndex, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleNext = () => {
    const totalScore = Object.keys(selectedAnswers).reduce((sum, key) => {
      const questionIndex = parseInt(key);
      const selectedAnswer = selectedAnswers[questionIndex];
      return sum + questions[questionIndex].answers[selectedAnswer].score;
    }, 0);
    navigate('/Result', { state: { totalScore, selectedBodyPart, selectedAnswers } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 relative">
      {/* Progress bar */}
      <h2 className="text-3xl font-bold mb-4 text-[#1079B1]">TEST BỆNH VỀ TƯ THẾ</h2>
      <div className="w-full max-w-lg mb-6 my-7">
        <Progress
          percent={(Object.keys(selectedAnswers).length / questions.length) * 100}
          showInfo={false}
          strokeWidth={20}
          strokeColor="#6AAAEA"
          className="rounded-full "
        />
      </div>
      <div className="flex justify-center my-9 items-center mr-2">
  <div className="flex-col align-middle justify-center text-center">
    <div
      className={`w-11 h-11 rounded-full ${
        Object.keys(selectedAnswers).length > 0 ? 'bg-[#1079B1]' : 'bg-[#D2E6F0]'
      } mx-1`}
    ></div>
    <p className='text-[#1079B1] mt-3'>Câu hỏi</p>
  </div>

  <div className="h-0.5 w-10 bg-[#D2E6F0] mb-7"></div>
  <div className="flex-col align-middle justify-center text-center text-[#1079B1]">
    <div className="w-11 h-11 rounded-full bg-[#D2E6F0] mx-1 text-[#1079B1]"></div>
    <p className='mt-3'>Kết quả</p>
  </div>
</div>


<div className="mt-10">
{questions.length > 0 ? (
          questions.map((questionObj, index) => (
            <div key={index} className="mb-24">
              <p className="text-lg font-semibold mb-3 text-[#1079B1]">{`Câu hỏi ${index + 1}: ${questionObj.question}`}</p>
              <div className="grid grid-cols-2 gap-4">
                {questionObj.answers.map((answer, value) => (
                  <div
                    key={value}
                    className={`p-7 rounded-xl cursor-pointer text-center font-medium bg-[#D2E6F0] ${selectedAnswers[index] === value ? 'bg-blue-200' : 'bg-[#D2E6F0]'}`}
                    onClick={() => handleAnswerChange(index, value)}
                  >
                    {answer.text}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#1079B1]">Không có câu hỏi cho bộ phận này. Vui lòng quay lại và chọn bộ phận khác.</p>
        )}
  {/* Next button */}
  <button
   type="primary"
   className="mt-6 absolute right-0 top-[1640px] mr-10 p-3 rounded-3xl text-white"
   style={{ backgroundColor: '#1079B1', borderColor: '#1079B1' }}
   onClick={handleNext}
   disabled={Object.keys(selectedAnswers).length !== questions.length}
  >
    Tiếp theo
  </button>
</div>

      {/* Disclaimer */}
      <p className="text-sm text-center mb-12 text-[#1079B1]">
        Lưu ý: Các câu trả lời chỉ mang tính tham khảo. Bạn có thể gặp bác sĩ để được chẩn đoán chính xác.
      </p>
    </div>
  );
}

export default QuestionView;
