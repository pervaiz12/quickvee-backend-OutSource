import React, { useState } from "react";

import PurchaseTable from "./PurchaseTable";
import AddPo from "./AddPo";

const MainPurchase = () => {
  const [visible, seVisible] = useState("PurchaseTable");

  return (
    <>
      <div className="q-category-main-page">
        <div className="box">
          {visible === "PurchaseTable" && (
            <PurchaseTable seVisible={seVisible} />
          )}
          {visible === "AddPo" && <AddPo seVisible={seVisible} />}
        </div>
      </div>
    </>
  );
};

export default MainPurchase;
