import React from "react";
import { formData } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import AddNewCategory from "../../Assests/Dashboard/Left.svg";

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
  isVarientEdit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProductEdit = location.pathname.includes("/products/edit");
  const isProductVariant = location.pathname.includes("/products/varient-edit");

  const findVarientName = productData?.product_name?.split("~");

  const varientTitle = handleVarientTitleBasedItemList();
  const setInputMaxLength = (fieldname) => {
    switch (fieldname) {
      case "costPerItem":
      case "compareAtPrice":
      case "price":
      case "profit":
      case "margin":
        return 9;
      case "reorderQty":
      case "qty":
      case "reorderLevel":
        return 6;
      case "upcCode":
        return 20;
      case "customCode":
        return 30;
      default:
        return 9;
    }
  };
  const disabledFields = ["margin", "profit"];
  const disabledFieldsOnEdit = ["margin", "profit", "qty"];

  const disabledInput = (inp, formDisabledKey) => {
    if (!isProductEdit && disabledFields.includes(inp?.name)) {
      return true;
    } else if (
      isProductEdit &&
      inp?.name === "qty" &&
      !formDisabledKey?.notEditable
    ) {
      return false;
    } else if (
      (isProductEdit && disabledFieldsOnEdit.includes(inp?.name)) ||
      (isProductVariant && disabledFieldsOnEdit.includes(inp?.name))
    ) {
      return true;
    } else if (
      (isProductEdit &&
        +inventoryData?.cost_method === 1 &&
        inp?.name === "costPerItem" &&
        !!formDisabledKey?.notEditable) ||
      (isProductVariant &&
        +inventoryData?.cost_method === 1 &&
        inp?.name === "costPerItem" &&
        !!formDisabledKey?.notEditable)
    ) {
      return true;
    }
    return false;
  };

  const handleRedirectHistory = (varientIndex, varientTitle) => {
    const varientName = varientTitle ? Object.keys(varientTitle)?.[0] : "";
    if (varientIndex === null) {
      window.open(
        `/merchants/inventory/products/saleshistory/${productData?.id}?title=${productInfo?.title}`
      );
    } else if (isVarientEdit) {
      window.open(
        `/merchants/inventory/products/saleshistory/${
          productData?.product_id
        }/${productData?.id}?title=${
          productData?.product_name?.split("~")?.[0]
        }&varientName=${varientTitle}`
      );
    } else {
      window.open(
        `/merchants/inventory/products/saleshistory/${productData?.id}/${varientIndex}?title=${productInfo?.title}&varientName=${varientName}`
      );
    }
  };
  let count = 0;

  return (
    <>
      <Grid container className="mx-0">
        <Grid item xs={12} className="">
          {isVarientEdit ? (
            <div className="q-category-bottom-header">
              <span
                onClick={() => {
                  navigate("/inventory/products");
                }}
                className="varient-edit-text"
              >
                <img src={AddNewCategory} alt="Add-New-Category" />
                <span className="title">Variants </span>
              </span>
            </div>
          ) : (
            ""
          )}

          {formValue?.length ? (
            <div className="q-category-bottom-header varient-generateUpc-row ">
              <span className="variant-title px-2.5">
                {isMultipleVarient
                  ? "Variants"
                  : productInfo?.title
                    ? productInfo?.title
                    : isVarientEdit
                      ? productData?.product_name
                      : "ProductName"}
              </span>
              <span></span>
              {!isVarientEdit ? (
                <p
                  onClick={() => handleGenerateUPC(20)}
                  className="generateUpc px-2.5"
                >
                  Generate UPC
                </p>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {varientTitle?.length && isMultipleVarient
            ? varientTitle?.map((title, index) => {
                count++;

                return (
                  <>
                    <div
                      className="qvrow product-varient-form px-5"
                      key={index}
                    >
                      {isMultipleVarient ? (
                        <div className="my-2 varient-title-name">
                          {productInfo?.title
                            ? productInfo?.title + "  -  " + varientTitle[index]
                            : varientTitle[index]}
                        </div>
                      ) : (
                        ""
                      )}
                      <Grid container spacing={2}>
                        {formData?.length
                          ? formData?.map((inp, i) => {
                              return (
                                <>
                                  <Grid
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    lg={2.4}
                                    sx={{ paddingTop: 0 }}
                                    className="varient-form"
                                  >
                                    <div className="">
                                      <label clas>{inp?.label}</label>
                                      <div className="input_area">
                                        <input
                                          class="varient-input-field"
                                          type={inp?.type}
                                          name={inp?.name}
                                          value={
                                            formValue?.[index]?.[title]?.[
                                              inp?.name
                                            ]
                                          }
                                          placeholder={inp?.placeholder}
                                          onChange={(e) =>
                                            handleOnChange(e, index, title)
                                          }
                                          onBlur={(e) =>
                                            handleBlur(e, index, title)
                                          }
                                          maxLength={setInputMaxLength(
                                            inp?.name
                                          )}
                                          disabled={disabledInput(
                                            inp,
                                            formValue?.[index]?.[title]
                                          )}
                                        />
                                        {!!formValue?.[index]?.[title]?.[
                                          "comparePriceError"
                                        ] && inp?.name === "compareAtPrice" ? (
                                          <span className="error-alert">
                                            {
                                              formValue?.[index]?.[title]?.[
                                                "comparePriceError"
                                              ]
                                            }
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {!!formValue?.[index]?.[title]?.[
                                          "upcError"
                                        ] && inp?.name === "upcCode" ? (
                                          <span
                                            className="error-alert"
                                            style={{ display: "block" }}
                                          >
                                            {
                                              formValue?.[index]?.[title]?.[
                                                "upcError"
                                              ]
                                            }
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {error[
                                          `formValue[${index}].${title}.${inp?.name}`
                                        ] ? (
                                          <span className="error-alert">
                                            {
                                              error[
                                                `formValue[${index}].${title}.${inp?.name}`
                                              ]
                                            }
                                          </span>
                                        ) : (
                                          ""
                                        )}

                                        {formValue &&
                                        formValue[index] &&
                                        typeof formValue[index] === "object" &&
                                        Object.keys(formValue[index]) &&
                                        Object.keys(formValue[index])[0] &&
                                        formValue[index][
                                          Object.keys(formValue[index])[0]
                                        ] &&
                                        Object.keys(
                                          formValue[index]
                                        )[0].includes(".") ? (
                                          <span className="error-alert">
                                            {
                                              error[
                                                `formValue[${index}][\"${
                                                  Object.keys(
                                                    formValue[index]
                                                  )[0]
                                                }\"].${inp?.name}`
                                              ]
                                            }
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </Grid>
                                </>
                              );
                            })
                          : ""}
                      </Grid>
                      <div className="flex flex-wrap gap-3 check-box-area mb-3">
                        <label
                          class="q_resigter_setting_section"
                          style={{ color: "#000", fontSize: "18px" }}
                        >
                          Track Quantity
                          <input
                            type="checkbox"
                            name="trackQuantity"
                            value={
                              formValue?.[index]?.[title]?.["trackQuantity"]
                            }
                            onChange={(e) => handleOnChange(e, index, title)}
                            checked={
                              formValue?.[index]?.[title]?.["trackQuantity"]
                            }
                            className="checkbox-input"
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
                            value={
                              formValue?.[index]?.[title]?.["sellOutOfStock"]
                            }
                            onChange={(e) => handleOnChange(e, index, title)}
                            checked={
                              formValue?.[index]?.[title]?.["sellOutOfStock"]
                                ? true
                                : false
                            }
                            className="checkbox-input"
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
                            value={formValue?.[index]?.[title]?.["checkId"]}
                            onChange={(e) => handleOnChange(e, index, title)}
                            checked={
                              formValue?.[index]?.[title]?.["checkId"]
                                ? true
                                : false
                            }
                            className="checkbox-input"
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
                            value={formValue?.[index]?.[title]?.["disable"]}
                            onChange={(e) => handleOnChange(e, index, title)}
                            checked={
                              formValue?.[index]?.[title]?.["disable"]
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
                          Food Stampable
                          <input
                            type="checkbox"
                            name="isFoodStamble"
                            value={
                              formValue?.[index]?.[title]?.["isFoodStamble"]
                            }
                            onChange={(e) => handleOnChange(e, index, title)}
                            checked={
                              formValue?.[index]?.[title]?.["isFoodStamble"]
                                ? true
                                : false
                            }
                          />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      {isProductEdit &&
                      formValue?.[index]?.[title]?.notEditable ? (
                        <div class="edit-profile-btns">
                          <button
                            className="quic-btn quic-btn-save vendor-btn"
                            style={{
                              backgroundColor: "#0A64F9",
                            }}
                            onClick={() =>
                              handleCloseEditModal(
                                "single_vendor",
                                formValue?.[index]?.[title]?.productEditId
                              )
                            }
                          >
                            Vendors
                          </button>
                          <button
                            className="quic-btn quic-btn-save"
                            style={{
                              backgroundColor: "#0A64F9",
                            }}
                            onClick={() =>
                              handleRedirectHistory(
                                formValue?.[index]?.[title]?.productEditId,
                                formValue?.[index]
                              )
                            }
                          >
                            Sales History
                          </button>
                          <button
                            className="quic-btn quic-btn-save edit"
                            style={{
                              backgroundColor: "#0A64F9",
                            }}
                            onClick={() =>
                              handleCloseEditModal(
                                "single_instant",
                                formValue?.[index]?.[title]?.productEditId
                              )
                            }
                          >
                            Instant PO
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {varientTitle?.length > count && (
                      <>
                        <div
                          style={{
                            borderBottom: "1px solid #E8E8E8",
                            marginBottom: "30px",
                            marginTop: "30px",
                          }}
                        ></div>
                      </>
                    )}
                  </>
                );
              })
            : ""}

          {!isMultipleVarient ? (
            <div className="qvrow px-5">
              <div className="mx-4 my-4">{varientTitle?.[0]}</div>

              <Grid container spacing={2}>
                {formData?.length
                  ? formData?.map((inp, i) => {
                      return (
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <div className="">
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
                                disabled={disabledInput(inp, formValue?.[0])}
                              />
                              {!!formValue?.[0]?.["comparePriceError"] &&
                              inp?.name === "compareAtPrice" ? (
                                <span className="error-alert">
                                  {formValue?.[0]?.["comparePriceError"]}
                                </span>
                              ) : (
                                ""
                              )}
                              {!!formValue?.[0]?.["upcError"] &&
                              inp?.name === "upcCode" ? (
                                <span
                                  className="error-alert"
                                  style={{ display: "block" }}
                                >
                                  {formValue?.[0]?.["upcError"]}
                                </span>
                              ) : (
                                ""
                              )}
                              {error[`formValue[0].${inp?.name}`] ? (
                                <span className="error-alert">
                                  {error[`formValue[0].${inp?.name}`]}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </Grid>
                      );
                    })
                  : ""}
              </Grid>
              <div
                style={{ marginTop: "20px" }}
                className="flex flex-wrap gap-3 mb-2"
              >
                <label
                  class="q_resigter_setting_section check-box-area"
                  style={{ color: "#000", fontSize: "18px" }}
                >
                  Track Quantity
                  <input
                    type="checkbox"
                    name="trackQuantity"
                    value={formValue?.[0]?.["trackQuantity"]}
                    onChange={(e) => handleOnChange(e, 0)}
                    checked={formValue?.[0]?.["trackQuantity"]}
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
              </div>

              {isProductEdit || isVarientEdit ? (
                <div class="edit-profile-btns">
                  <button
                    className="quic-btn quic-btn-save vendor-btn"
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() =>
                      handleCloseEditModal(
                        "single_vendor",
                        formValue?.[0]?.productEditId
                      )
                    }
                  >
                    Vendors
                  </button>
                  <button
                    className="quic-btn quic-btn-save"
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() =>
                      handleRedirectHistory(
                        !isVarientEdit ? null : formValue?.[0]?.productEditId,
                        findVarientName?.length === 3
                          ? findVarientName?.[2]
                          : findVarientName?.[1]
                      )
                    }
                  >
                    Sales History
                  </button>
                  <button
                    className="quic-btn quic-btn-save edit"
                    style={{
                      backgroundColor: "#0A64F9",
                    }}
                    onClick={() =>
                      handleCloseEditModal(
                        "single_instant",
                        formValue?.[0]?.productEditId
                      )
                    }
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
        </Grid>
      </Grid>
    </>
  );
};

export default GeneratePUC;
