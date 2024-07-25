import React, { useState } from "react";
import AtrDataList from "./AtrDataList";
import AttriContent from "./AttriContent";

const MainCategory = () => {
  const [visible, seVisible] = useState("AtrDataList");
  return (
    <>
      <div className="q-attributes-main-page">
        <AttriContent />
        {visible === "AtrDataList" && <AtrDataList seVisible={seVisible} />}
      </div>
    </>
  );
};

export default MainCategory;
