import React from "react";
import { Link } from "react-router-dom";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import SwitchLabel from "../../reuseableComponents/SwitchLabel";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";

const AddMixAndMatchDeal = () => {
  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section">
            <SwitchToBackButton linkTo={"/mix-and-match"} title={"Add Deal"} />
            <form
            // onSubmit={handleAddButtonClick}
            >
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-coupon-single-input mb-2">
                  <label htmlFor="coupon_name">Deal Name</label>
                  <div className="input_area input">
                    <BasicTextFields
                      type={"text"}
                      value={""}
                      //   onChangeFun={handleInputChange}
                    />
                  </div>
                  {/* {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )} */}
                </div>

                <div className="q-add-coupon-single-input mb-6">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="mt-1"
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={""}
                    // onChange={(e) =>
                    //   setCoupon({ ...coupon, description: e.target.value })
                    // }
                  ></textarea>
                </div>

                <Grid container spacing={2}>
                  <Grid item md={5} xs={12}>
                    <div className="q_coupon_minium input_area">
                      <label htmlFor="minorder_amt">Minimum Quantity</label>
                      <BasicTextFields
                        type={"number"}
                        value={0}
                        // onChangeFun={handleMinAmountChange}
                        placeholder="Enter Minimum Quantity"
                      />
                      {/* {minOrderAmountError && (
                        <p className="error-message">{minOrderAmountError}</p>
                      )} */}
                    </div>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <div className="q_coupon_minium  dicount_per_amo">
                      <Grid container>
                        <Grid item xs={5}>
                          {/* {activeTab === "amount" && ( */}
                          <div className="q_coupon_minium input_area">
                            <label htmlFor="discount_amt">
                              Discount Per Item ($)
                            </label>
                            <BasicTextFields
                              type={"number"}
                              value={0}
                              placeholder="Enter Discount Amount"
                              // onChangeFun={handleDiscountAmountChange}
                            />

                            {/* {discountError && (
                                <p className="error-message">{discountError}</p>
                              )} */}
                          </div>
                          {/* )} */}
                        </Grid>
                        <Grid item xs={7}>
                          <div className="AMT_PER_button">
                            <Grid container>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center   ${
                                    false
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  //   onClick={() => handleTabChange("amount")}
                                >
                                  Amount ($)
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center  ${
                                    true
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  style={{ whiteSpace: "nowrap" }}
                                  //   onClick={() => handleTabChange("percentage")}
                                >
                                  Percentage (%)
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="q-add-categories-single-input">
                      <SearchableDropdown
                        title="Products"
                        keyName="product"
                        name="title"
                        //   optionList={dropdownData?.categoryList}
                        //   handleSelectProductOptions={
                        //     handleSelectProductOptions
                        //   }
                        //   handleDeleteSelectedOption={
                        //     handleDeleteSelectedOption
                        //   }
                        //   selectedOption={productInfo?.category}
                        //   error={error}
                        //   handleUpdateError={handleUpdateError}
                        placeholder="Search Products"
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save" disabled={false}>
                  {" "}
                  {false ? (
                    <>
                      <CircularProgress
                        color={"inherit"}
                        width={15}
                        size={15}
                      />
                      Add
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
                <Link to={`/mix-and-match`}>
                  <button
                    // onClick={() => seVisible("CouponDiscount")}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMixAndMatchDeal;
