import React from "react";
import { formData } from "./data";
import { useNavigate } from "react-router-dom";

const GeneratePUC = ({
  handleVarientTitleBasedItemList,
  handleOnChange,
  formValue,
  handleGenerateUPC,
  handleBlur,
  isMultipleVarient,
  productInfo,
  error,
  inventoryData,
  handleCloseEditModal,
  productData,
  varientData,
}) => {
  const navigate = useNavigate();
  const pageUrl = window.location.pathname?.split("/")[1];
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
  const disabledFieldsOnEdit = ["margin", "Profit", "qty"];

  const disabledInput = (inp) => {
    if (pageUrl !== "product-edit" && disabledFields.includes(inp?.name)) {
      return true;
    } else if (
      pageUrl === "product-edit" &&
      disabledFieldsOnEdit.includes(inp?.name)
    ) {
      return true;
    } else if (
      pageUrl === "product-edit" &&
      +inventoryData?.cost_method === 1 &&
      inp?.name === "costPerItem"
    ) {
      return true;
    }

    return false;
  };

  const handleRedirectHistory = (varientIndex) => {
    if (varientIndex === null) {
      navigate(`/product/saleshistory/${productData?.id}`);
    } else {
      navigate(
        `/product/saleshistory/${productData?.id}/${varientData[varientIndex]?.id}`
      );
    }
  };
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
                  <div className="qvrow" key={index}>
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
                                    disabled={disabledInput(inp)}
                                  />

                                  {error[`formValue[${index}].${inp?.name}`] ? (
                                    <span className="error-alert">
                                      {
                                        error[
                                          `formValue[${index}].${inp?.name}`
                                        ]
                                      }
                                    </span>
                                  ) : (
                                    ""
                                  )}
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

                    {pageUrl === "product-edit" ? (
                      <div class="edit-profile-btns">
                        <button
                          className="quic-btn quic-btn-save vendor-btn"
                          // onClick={handleSubmitForm}
                          // disabled={isLoading}
                          style={{
                            backgroundColor: "#0A64F9",
                          }}
                          onClick={() =>
                            handleCloseEditModal("single_vendor", index)
                          }
                        >
                          Vendors
                        </button>
                        <button
                          className="quic-btn quic-btn-save"
                          // onClick={handleSubmitForm}
                          // disabled={isLoading}
                          style={{
                            backgroundColor: "#0A64F9",
                          }}
                          onClick={() => handleRedirectHistory(index)}
                        >
                          Sales History
                        </button>
                        <button
                          className="quic-btn quic-btn-save edit"
                          // onClick={handleSubmitForm}
                          // disabled={isLoading}
                          style={{
                            backgroundColor: "#0A64F9",
                          }}
                          onClick={() =>
                            handleCloseEditModal("single_instant", index)
                          }
                        >
                          Instant PO
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            : ""}
          {!isMultipleVarient ? (
            <div className="qvrow">
              <div className="mx-4 my-4">{varientTitle?.[0]}</div>
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
                              disabled={disabledInput(inp)}
                            />
                            {error[`formValue[0].${inp?.name}`] ? (
                              <span className="error-alert">
                                {error[`formValue[0].${inp?.name}`]}
                              </span>
                            ) : (
                              ""
                            )}
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

              {pageUrl === "product-edit" ? (
                <div class="edit-profile-btns">
                  <button
                    className="quic-btn quic-btn-save vendor-btn"
                    // onClick={handleSubmitForm}
                    // disabled={isLoading}
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() => handleCloseEditModal("single_vendor", 0)}
                  >
                    Vendors
                  </button>
                  <button
                    className="quic-btn quic-btn-save"
                    // onClick={handleSubmitForm}
                    // disabled={isLoading}
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() => handleRedirectHistory(null)}
                  >
                    Sales History
                  </button>
                  <button
                    className="quic-btn quic-btn-save edit"
                    // onClick={handleSubmitForm}
                    // disabled={isLoading}
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() => handleCloseEditModal("single_instant", 0)}
                  >
                    Instant PO
                  </button>
                </div>
              ) : (
                ""
              )}
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
