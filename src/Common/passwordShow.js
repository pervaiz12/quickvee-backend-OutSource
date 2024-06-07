import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function PasswordShow() {
  const [showpPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const jsxData = (value) => (
    <>
      <span
        className="Show-password"
        // onClick={handleClick}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        {value !== "" ? (showpPassword ? "Hide" : "Show") : "Show"}
      </span>
    </>
  );

  const handleCoockieExpire = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("token_data");
    Cookies.remove("user_auth_record");
    localStorage.removeItem("AllStore");
    navigate("/login");
  };

  return {
    showpPassword,
    handleMouseDown,
    handleMouseUp,
    jsxData,
    handleCoockieExpire,
  };
}
