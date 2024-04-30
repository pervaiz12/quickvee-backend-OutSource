import React from "react";
import { formData } from "./data";

const GeneratePUC = ({
  handleVarientTitleBasedItemList,
  handleOnChange,
  formValue,
  handleGenerateUPC,
  handleBlur,
  isMultipleVarient,
  productInfo,
}) => {
  const varientTitle = handleVarientTitleBasedItemList();
  const setInputMaxLength = (fieldname) => {
    switch (fieldname) {
      case "costPerItem":
      case "compareAtPrice":
      case "price":
      case "Profit":
      case "margin":
        return 9;
      case "reorderQty":
      case "qty":
      case "reorderLevel":
        return 6;
      case "upcCode":
      case "customCode":
        return 20;
      default:
        return 9;
    }
  };
  const disabledFields = ["margin", "Profit"];
  return (
    <>
      <div className="mx-0">
        <div className="q-add-categories-single-input">
          {formValue?.length ? (
            <div className="q-category-bottom-header">
              <span>
                {isMultipleVarient
                  ? "Variants"
                  : productInfo?.title
                    ? productInfo?.title
                    : "ProductName"}
              </span>
              <p onClick={() => handleGenerateUPC(20)}>
                Generate UPC
                {/* <img src={AddIcon} alt="add-icon" />{" "} */}
              </p>
            </div>
          ) : (
            ""
          )}
          {varientTitle?.length && isMultipleVarient
            ? varientTitle?.map((_, index) => {
                return (
                  <div className="qvrow">
                    {isMultipleVarient ? (
                      <div className="mx-4 my-4">
                        {productInfo?.title
                          ? productInfo?.title + "  -  " + varientTitle[index]
                          : varientTitle[index]}
                      </div>
                    ) : (
                      ""
                    )}
                    {formData?.length
                      ? formData?.map((inp, i) => {
                          return (
                            <div className="col-qv-3" key={i}>
                              <div className="q-add-categories-single-input">
                                <label>{inp?.label}</label>
                                <div className="input_area">
                                  <input
                                    class="varient-input-field"
                                    type={inp?.type}
                                    name={inp?.name}
                                    value={formValue?.[index]?.[inp?.name]}
                                    placeholder={inp?.placeholder}
                                    onChange={(e) => handleOnChange(e, index)}
                                    onBlur={(e) => handleBlur(e, index)}
                                    maxLength={setInputMaxLength(inp?.name)}
                                    disabled={disabledFields.includes(
                                      inp?.name
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                    <div className="flex flex-wrap gap-3 ">
                      <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Track Quantity
                        <input
                          type="checkbox"
                          name="trackQuantity"
                          value={formValue?.[index]?.["trackQuantity"]}
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["trackQuantity"] ? true : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Continue selling when out of stock
                        <input
                          type="checkbox"
                          name="sellOutOfStock"
                          value={formValue?.[index]?.["sellOutOfStock"]}
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["sellOutOfStock"]
                              ? true
                              : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Check ID
                        <input
                          type="checkbox"
                          name="checkId"
                          value={formValue?.[index]?.["checkId"]}
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["checkId"] ? true : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Disable
                        <input
                          type="checkbox"
                          name="disable"
                          value={formValue?.[index]?.["disable"]}
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["disable"] ? true : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Food Stampable
                        <input
                          type="checkbox"
                          name="isFoodStamble"
                          value={formValue?.[index]?.["isFoodStamble"]}
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["isFoodStamble"] ? true : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      {/* <label
                        class="q_resigter_setting_section"
                        style={{ color: "#000", fontSize: "18px" }}
                      >
                        Create this item for all linked locations
                        <input
                          type="checkbox"
                          name="itemForAllLinkedLocation"
                          value={
                            formValue?.[index]?.["itemForAllLinkedLocation"]
                          }
                          onChange={(e) => handleOnChange(e, index)}
                          checked={
                            formValue?.[index]?.["itemForAllLinkedLocation"]
                              ? true
                              : false
                          }
                        />
                        <span class="checkmark"></span>
                      </label> */}
                    </div>
                  </div>
                );
              })
            : ""}
          {!isMultipleVarient ? (
            <div className="qvrow">
              <div className="mx-4 my-4">{varientTitle[0]}</div>
              {formData?.length
                ? formData?.map((inp, i) => {
                    return (
                      <div className="col-qv-3" key={i}>
                        <div className="q-add-categories-single-input">
                          <label>{inp?.label}</label>
                          <div className="input_area">
                            <input
                              class="varient-input-field"
                              type={inp?.type}
                              name={inp?.name}
                              value={formValue?.[0]?.[inp?.name]}
                              placeholder={inp?.placeholder}
                              onChange={(e) => handleOnChange(e, 0)}
                              onBlur={(e) => handleBlur(e, 0)}
                              maxLength={setInputMaxLength(inp?.name)}
                              disabled={disabledFields.includes(inp?.name)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
              <div className="flex flex-wrap gap-3 ">
                <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Track Quantity
                  <input
                    type="checkbox"
                    name="trackQuantity"
                    value={formValue?.[0]?.["trackQuantity"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["trackQuantity"] ? true : false}
                  />
                  <span class="checkmark"></span>
                </label>
                <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Continue selling when out of stock
                  <input
                    type="checkbox"
                    name="sellOutOfStock"
                    value={formValue?.[0]?.["sellOutOfStock"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["sellOutOfStock"] ? true : false}
                  />
                  <span class="checkmark"></span>
                </label>
                <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Check ID
                  <input
                    type="checkbox"
                    name="checkId"
                    value={formValue?.[0]?.["checkId"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["checkId"] ? true : false}
                  />
                  <span class="checkmark"></span>
                </label>
                <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Disable
                  <input
                    type="checkbox"
                    name="disable"
                    value={formValue?.[0]?.["disable"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["disable"] ? true : false}
                  />
                  <span class="checkmark"></span>
                </label>
                <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Food Stampable
                  <input
                    type="checkbox"
                    name="isFoodStamble"
                    value={formValue?.[0]?.["isFoodStamble"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["isFoodStamble"] ? true : false}
                  />
                  <span class="checkmark"></span>
                </label>
                {/* <label
                  class="q_resigter_setting_section"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Create this item for all linked locations
                  <input
                    type="checkbox"
                    name="itemForAllLinkedLocation"
                    value={formValue?.[0]?.["itemForAllLinkedLocation"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={
                      formValue?.[0]?.["itemForAllLinkedLocation"]
                        ? true
                        : false
                    }
                  />
                  <span class="checkmark"></span>
                </label> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default GeneratePUC;
