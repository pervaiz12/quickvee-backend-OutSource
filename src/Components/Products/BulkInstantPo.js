import React from "react";

const BulkInstantPo = ({ formData, handleVarientTitleBasedItemList }) => {
  console.log("formData", formData, handleVarientTitleBasedItemList + "kkk");
  const varientTitle = handleVarientTitleBasedItemList();
  console.log(varientTitle);
  return (
    <>
      <div>
        <div class="bulk-instant-po">
          <div class="varient-form">
            {varientTitle?.map((pro, index) => {
              return <></>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkInstantPo;
