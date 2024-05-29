import React, { useState } from "react";
import { bulkVarientEdit } from "./data";
import "../../Styles/ProductPage.css";

const BulkVarientEdit = ({ editVarient }) => {
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
                          value={editVarient?.[0]?.[inp?.name]}
                          placeholder={inp?.placeholder}
                          //   onChange={(e) => handleOnChange(e, 0)}
                          //   onBlur={(e) => handleBlur(e, 0)}
                          //   maxLength={setInputMaxLength(inp?.name)}
                          //   disabled={disabledFields.includes(inp?.name)}
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
                >
                  Update
                </button>
                <button className="quic-btn quic-btn-cancle">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkVarientEdit;
