import React from "react";
import { bulkInstantPo } from "./data";

const BulkInstantPo = ({
  bulkEditPoState,
  handleVarientTitleBasedItemList,
  modalType,
  varientIndex,
}) => {
  console.log("vartient bukllllll", modalType, varientIndex);
  const varientTitle = handleVarientTitleBasedItemList();
  return (
    <>
      <div>
        <div class="bulk-instant-po">
          <div class="varient-form ">
            {/* for bulk instant PO */}
            {modalType !== "single_instant" ? (
              <>
                {varientTitle?.map((varient, index) => {
                  return (
                    <div class="varient-container">
                      <div class="varientform ">
                        <p className="varientName">{varient}</p>
                        <div class="form">
                          {bulkInstantPo?.length
                            ? bulkInstantPo?.map((inp, formindex) => {
                                return (
                                  <div
                                    className="col-qv-6 inputs"
                                    key={formindex}
                                  >
                                    <div className="varient-input-wrapper">
                                      <label>{inp?.label}</label>
                                      <div className="input_area">
                                        <input
                                          class="varient-input-field"
                                          type={inp?.type}
                                          name={inp?.name}
                                          value={
                                            bulkEditPoState?.[formindex]?.[
                                              inp?.name
                                            ]
                                          }
                                          placeholder={inp?.placeholder}
                                          // onChange={(e) => handleOnChange(e, index)}
                                          // onBlur={(e) => handleBlur(e, index)}
                                          // maxLength={setInputMaxLength(inp?.name)}
                                          // disabled={
                                          //   pageUrl !== "product-edit"
                                          //     ? disabledFields.includes(inp?.name)
                                          //     : disabledFieldsOnEdit.includes(
                                          //         inp?.name
                                          //       )
                                          // }
                                        />

                                        {/* {error[
                                      `formValue[${index}].${inp?.name}`
                                    ] ? (
                                      <span className="error-alert">
                                        {
                                          error[
                                            `formValue[${index}].${inp?.name}`
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      ""
                                    )} */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div class="po-description-area ">
                  <div className="col-qv-12 inputs">
                    <div className="varient-input-wrapper">
                      <label className="varientName">Description</label>
                      <div className="input_area">
                        <textarea
                          class="varient-input-field"
                          type="text"
                          name="description"
                          style={{ height: "140px" }}
                          // value={bulkEditPoState?.[formindex]?.[inp?.name]}
                          // placeholder={inp?.placeholder}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {Array.from({ length: 1 })?.map((_, index) => {
                  return (
                    <div class="varient-container">
                      <div class="varientform ">
                        <p className="varientName">
                          {varientTitle?.[varientIndex]}
                        </p>
                        <div class="form">
                          {bulkInstantPo?.length
                            ? bulkInstantPo?.map((inp, formindex) => {
                                return (
                                  <div
                                    className="col-qv-8 inputs"
                                    key={formindex}
                                  >
                                    <div className="varient-input-wrapper">
                                      <label>{inp?.label}</label>
                                      <div className="input_area">
                                        <input
                                          class="varient-input-field"
                                          type={inp?.type}
                                          name={inp?.name}
                                          value={
                                            bulkEditPoState?.[formindex]?.[
                                              inp?.name
                                            ]
                                          }
                                          placeholder={inp?.placeholder}
                                          // onChange={(e) => handleOnChange(e, index)}
                                          // onBlur={(e) => handleBlur(e, index)}
                                          // maxLength={setInputMaxLength(inp?.name)}
                                          // disabled={
                                          //   pageUrl !== "product-edit"
                                          //     ? disabledFields.includes(inp?.name)
                                          //     : disabledFieldsOnEdit.includes(
                                          //         inp?.name
                                          //       )
                                          // }
                                        />

                                        {/* {error[
                                      `formValue[${index}].${inp?.name}`
                                    ] ? (
                                      <span className="error-alert">
                                        {
                                          error[
                                            `formValue[${index}].${inp?.name}`
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      ""
                                    )} */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div class="po-description-area ">
                  <div className="col-qv-12 inputs">
                    <div className="varient-input-wrapper">
                      <label className="varientName">Description</label>
                      <div className="input_area">
                        <textarea
                          class="varient-input-field"
                          type="text"
                          name="description"
                          style={{ height: "140px" }}
                          // value={bulkEditPoState?.[formindex]?.[inp?.name]}
                          // placeholder={inp?.placeholder}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* for single varient instant PO */}

            <div className="box">
              <div className="variant-attributes-container">
                {/* Your existing JSX for variant attributes */}
                <div className="q-add-categories-section-middle-footer  ">
                  {!!!varientIndex ? (
                    <p className="bulk-edit-note">
                      <span className="note">Note:</span>
                      By clicking on update, Cost & Quantity of each variant
                      will be updated
                    </p>
                  ) : (
                    ""
                  )}
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
        </div>
      </div>
    </>
  );
};

export default BulkInstantPo;
