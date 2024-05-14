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
            {varientTitle?.map((varient, index) => {
              return (
                <div class="varient-container">
                  <div class="varientform">
                    <p>{varient}</p>
                    <div class="form">
                      {formData?.length
                        ? formData?.map((form, index) => {
                            return <>hellow</>;
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkInstantPo;
