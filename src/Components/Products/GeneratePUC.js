import React from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { formData } from "./data";

const GeneratePUC = ({
  handleVarientTitleBasedItemList,
  handleOnChange,
  formValue,
  handleGenerateUPC,
  handleBlur,
}) => {
  const varientList = handleVarientTitleBasedItemList();

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
          <div className="q-category-bottom-header">
            <span>Pax 3</span>
            <p onClick={() => handleGenerateUPC(20)}>
              Generate UPC
              {/* <img src={AddIcon} alt="add-icon" />{" "} */}
            </p>
          </div>
          {varientList?.length
            ? varientList?.map((_, index) => {
                return (
                  <div className="qvrow">
                    <div className="mx-4 my-4">{varientList[index]}</div>
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
                      </label>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default GeneratePUC;
