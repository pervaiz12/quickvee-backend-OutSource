import React, { useState } from "react";

export default function PasswordShow() {
  const [showpPassword, setShowPassword] = useState(false);
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

  return { showpPassword, handleMouseDown, handleMouseUp, jsxData };
}
