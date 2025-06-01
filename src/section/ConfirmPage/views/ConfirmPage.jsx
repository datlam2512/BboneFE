import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ConfirmPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const confirmAccount = useAuth((state) => state.confirmAccount);
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = async () => {
      if (token) {
        const result = await confirmAccount(token);
        if (result.success) {
          alert("Xác nhận thành công!");
          navigate("/login");
        } else {
          alert("Xác nhận thất bại: " + result.error);
        }
      }
    };
    confirm();
  }, [token, confirmAccount, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg">
        <div className="text-2xl font-semibold text-green-700">Đang xác nhận tài khoản...</div>
      </div>
    </div>
  );
}

export default ConfirmPage;