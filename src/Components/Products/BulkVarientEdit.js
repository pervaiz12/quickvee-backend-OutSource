import React, { useState } from "react";
import { bulkVarientEdit } from "./data";
import "../../Styles/ProductPage.css";

import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const BulkVarientEdit = ({
  formData,
  handleCopyAllVarientValue,
  handleCloseEditModal,
  inventoryData,
}) => {
  const notDecimal = ["costPerItem", "compareAtPrice", "price"];

  const [bulkVarient, setBulkVarient] = useState({
    costPerItem: "",
    compareAtPrice: "",
    price: "",
    reorderQty: "",
    reorderLevel: "",
  });


  const setInputMaxLength = (fieldname) => {
    switch (fieldname) {
      case "costPerItem":
      case "compareAtPrice":
      case "price":
        return 9;
      case "reorderQty":
      case "reorderLevel":
        return 6;
      default:
        return 9;
    }
  };

  const handleOnChange = (e, index) => {
    const { name, value } = e.target;
    const bulkDataUpdate = { ...bulkVarient };
    let fieldValue;
    if (notDecimal.includes(name)) {
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      inputStr = inputStr.replace(/^0+/, "");

      if (inputStr.length == "") {
        fieldValue = "";
      } else if (inputStr.length === 1) {
        fieldValue = "0.0" + inputStr;
      } else if (inputStr.length === 2) {
        fieldValue = "0." + inputStr;
      } else {
        fieldValue =
          inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
      }
      bulkDataUpdate[name] = fieldValue;
    } else {
      bulkDataUpdate[name] = value;
    }

    setBulkVarient(bulkDataUpdate);
  };

  const hasDynamicPriceComparison = (formData, firstKey, lastKey, type) => {
    return formData?.some((item) => {
      // Get the nested object (e.g., "small/red", "large/green")
      const nestedObjectKey = Object.keys(item)[0];
      const nestedObject = item[nestedObjectKey];

      // Check if the dynamic priceKey is greater than the dynamic compareAtPriceKey
      if (type === "isCompareAtGreaterThanAllPrice") {
        return +nestedObject[firstKey] >= +bulkVarient[lastKey];
      } else if (type === "isPriceLessThanAllCompareAtPrice") {
        return +nestedObject[firstKey] <= +bulkVarient[lastKey];
      } 
    });
  };

  const handleCopyAll = () => {
    // if cmpareAt and notprice check in forminside and show error if errr else success duplicate
    // if price and notcompareAt check inside form and show error if errr else success duplicate
    // if price and compareAtPrice check if compareAT greater than price if success go inside and check all form price is less than compare or not if errro then error if success then sucesss
    // compareAT and price check if comapre

    const copyValue = {
      costPerItem: bulkVarient["costPerItem"],
      reorderQty: bulkVarient["reorderQty"],
      reorderLevel: bulkVarient["reorderLevel"],
    };

    const copyAllValue = {
      costPerItem: bulkVarient["costPerItem"],
      reorderQty: bulkVarient["reorderQty"],
      reorderLevel: bulkVarient["reorderLevel"],
      compareAtPrice: bulkVarient["compareAtPrice"],
      price: bulkVarient["price"],
    };

    // copyValue object send every time
    if (!Object.values(bulkVarient).every((value) => value === "")) {
      handleCopyAllVarientValue(copyValue);
    }

    // compareAtPrice check inside form with all price // compareAtPrice must be greater than price value
    if (bulkVarient["compareAtPrice"] && !bulkVarient["price"]) {
      if (
        // formData?.some((i) => +i?.["price"] > +bulkVarient["compareAtPrice"])
        hasDynamicPriceComparison(
          formData,
          "price",
          "compareAtPrice",
          "isCompareAtGreaterThanAllPrice"
        )
      ) {
        alert("compareAtPrice must be greater than price.");
        handleCopyAllVarientValue(copyValue);
      } else {
        handleCopyAllVarientValue(copyAllValue);
        ToastifyAlert(
          "Copied values! Plase Click on Update for Save!",
          "success"
        );
        handleCloseEditModal();
      }
    }
    // price value check inside form with all compareAtPrice value // price must be less than compareAtPrice
    else if (!bulkVarient["compareAtPrice"] && bulkVarient["price"]) {
      if (
        // formData?.some((i) => +i?.["compareAtPrice"] < +bulkVarient["price"])
        hasDynamicPriceComparison(
          formData,
          "compareAtPrice",
          "price",
          "isPriceLessThanAllCompareAtPrice"
        )
      ) {
        alert("compareAtPrice must be greater than price.");
        handleCopyAllVarientValue(copyValue);
      } else {
        handleCopyAllVarientValue(copyAllValue);
        ToastifyAlert(
          "Copied values! Plase Click on Update for Save!",
          "success"
        );
        handleCloseEditModal();
      }
    }

    // if both value exist then check compareAtPrice must be greater than price and check inside form that compare value is greater than all price
    else if (bulkVarient["compareAtPrice"] && bulkVarient["price"]) {
      // compare inside modal
      if (+bulkVarient["compareAtPrice"] < +bulkVarient["price"]) {
        alert("compareAtPrice must be greater than price.");
        handleCopyAllVarientValue(copyValue);
      }
      // compare inside form
      else {
        handleCopyAllVarientValue(copyAllValue);
        ToastifyAlert(
          "Copied values! Plase Click on Update for Save!",
          "success"
        );
        handleCloseEditModal();
      }
    }

    // if any from reorderQty or reorderLevel is not empty
    else if (
      bulkVarient["reorderQty"] !== "" ||
      bulkVarient["reorderLevel"] !== ""
    ) {
      handleCopyAllVarientValue(copyValue);
      ToastifyAlert(
        "Copied values! Plase Click on Update for Save!",
        "success"
      );
      handleCloseEditModal();
    }
  };

  return (
    <>
      <div class="bulk-varient-edit-form">
        <div class="qvrow">
          {bulkVarientEdit?.length
            ? bulkVarientEdit?.map((inp, index) => {
                return (
                  <div className="col-qv-5" key={index}>
                    <div className="q-add-categories-single-input">
                      <label>{inp?.label}</label>
                      <div className="input_area">
                        <input
                          class="varient-input-field"
                          type={inp?.type}
                          name={inp?.name}
                          value={bulkVarient?.[inp?.name]}
                          placeholder={inp?.placeholder}
                          onChange={(e) => handleOnChange(e, index)}
                          //   onBlur={(e) => handleBlur(e, 0)}
                          maxLength={setInputMaxLength(inp?.name)}
                          disabled={
                            inp?.name === "costPerItem" &&
                            +inventoryData?.cost_method === 1
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        <div className="box">
          <div className="variant-attributes-container">
            {/* Your existing JSX for variant attributes */}
            <div className="q-add-categories-section-middle-footer  ">
              <p className="bulk-edit-note">
                <span className="note">Note:</span>
                By clicking on update, it will update values of all Variants
              </p>
              <div className="q-category-bottom-header">
                <button
                  className="quic-btn quic-btn-update"
                  style={{
                    backgroundColor: "#0A64F9",
                  }}
                  onClick={() => handleCopyAll()}
                >
                  Copy ALL
                </button>
                <button
                  className="quic-btn quic-btn-cancle"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkVarientEdit;
