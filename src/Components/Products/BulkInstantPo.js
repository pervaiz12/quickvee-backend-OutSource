import React, { useEffect, useMemo, useState } from "react";
import { bulkInstantPo } from "./data";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  saveBulkInstantPo,
  saveSingleVarientPO,
} from "../../Redux/features/Product/ProductSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { Box, CircularProgress } from "@mui/material";

const BulkInstantPo = ({
  productData,
  modalType,
  varientIndex,
  varientData,
  handleCloseEditModal,
  fetchProductDataById,
}) => {
  const dispatch = useDispatch();
  const productId = useParams();
  const { LoginGetDashBoardRecordJson } = useAuthDetails();
  const [instantPoSingle, setInstantPoSingle] = useState({
    qty: "",
    cost: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const [instancePoMultiple, setInstancePoMultiple] = useState({
    instantPoState: [],
    description: "",
  });

  const instantPoForm = useMemo(() => {
    if (modalType === "bulk-edit") {
      return [...new Set(varientData)]?.map(() => ({
        qty: "",
        cost: "",
      }));
    }
    return [];
  }, [modalType]);

  useEffect(() => {
    if (modalType === "bulk-edit") {
      setInstancePoMultiple({
        instantPoState: instantPoForm,
        description: "",
      });
    }
  }, [modalType, instantPoForm]);

  const handleChangeSinglePo = (e, index) => {
    const { name, value } = e.target;

    /// allowed value in 0.00 format
    let fieldValue;
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

    setInstantPoSingle((prev) => ({
      ...prev,
      [name]: name !== "description" && name !== "qty" ? fieldValue : value,
    }));
  };

  const handleChangeMultiplePo = (e, index) => {
    const { name, value } = e.target;

    /// allowed value in 0.00 format
    let fieldValue;
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

    if (name !== "description") {
      const multiplePoData = [...instancePoMultiple?.instantPoState];
      multiplePoData[index][name] = name !== "qty" ? fieldValue : value;
      setInstancePoMultiple((prev) => ({
        instantPoState: multiplePoData,
        description: prev?.description,
      }));
    } else {
      setInstancePoMultiple((prev) => ({
        instantPoState: prev?.instantPoState,
        description: value,
      }));
    }
  };

  const handlSumbitInstantPo = () => {
    const formData = new FormData();
    setLoading(true);
    if (modalType !== "bulk-edit") {
      formData.append("product_id", productId?.id);
      formData.append(
        "variant_id",
        !Boolean(+productData?.isvarient)
          ? ""
          : modalType === "bulk-edit"
            ? ""
            : varientData[varientIndex]?.id
      );
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
      formData.append("description", instantPoSingle?.description);
      formData.append("qty", instantPoSingle?.qty);
      formData.append("price", instantPoSingle?.cost);

      dispatch(saveSingleVarientPO(formData))
        .then((res) => {
          if (res?.payload?.status) {
            setInstantPoSingle({
              qty: "",
              cost: "",
              description: "",
            });
            ToastifyAlert("Instance PO Updated!", "success");
            fetchProductDataById();
            handleCloseEditModal();
          }
        })
        .catch((err) => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      formData.append("product_id", productId?.id);
      formData.append(
        "variant_id",
        !Boolean(+productData?.isvarient)
          ? ""
          : modalType === "bulk-edit"
            ? varientData?.map((i) => i?.id)?.toString()
            : varientData[varientIndex]?.id
      );
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
      formData.append("description", instancePoMultiple?.description);
      formData.append(
        "qty",
        instancePoMultiple?.instantPoState?.map((i) => i?.qty)?.toString()
      );
      formData.append(
        "price",
        instancePoMultiple?.instantPoState?.map((i) => i?.cost)?.toString()
      );

      dispatch(saveBulkInstantPo(formData))
        .then((res) => {
          if (res?.payload?.status) {
            setInstancePoMultiple({
              instantPoState: [],
              description: "",
            });
            ToastifyAlert("Instance PO Updated!", "success");
            fetchProductDataById();
            handleCloseEditModal();
          }
        })
        .catch((err) => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div>
        <div class="bulk-instant-po">
          <div class="varient-form ">
            {/* for bulk instant PO */}
            {modalType !== "single_instant" ? (
              <>
                {varientData?.map((varient, index) => {
                  return (
                    <div class="varient-container">
                      <div class="varientform ">
                        <p className="varientName">{varient?.variant}</p>
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
                                            instancePoMultiple
                                              ?.instantPoState?.[index]?.[
                                              inp?.name
                                            ]
                                          }
                                          placeholder={inp?.placeholder}
                                          onChange={(e) =>
                                            handleChangeMultiplePo(e, index)
                                          }
                                          maxLength={9}
                                        />
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
                          onChange={(e) => handleChangeMultiplePo(e, null)}
                          value={instancePoMultiple?.description}
                          placeholder="Type here..."
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
                          {varientData?.[varientIndex]?.variant}
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
                                          value={instantPoSingle?.[inp?.name]}
                                          placeholder={inp?.placeholder}
                                          onChange={(e) =>
                                            handleChangeSinglePo(e, index)
                                          }
                                          maxLength={9}
                                        />
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
                          value={instantPoSingle?.["description"]}
                          onChange={handleChangeSinglePo}
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
                      onClick={handlSumbitInstantPo}
                      disabled={loading}
                    >
                      {loading ? (
                        <Box className="loader-box">
                          <CircularProgress />
                        </Box>
                      ) : (
                        "Update"
                      )}
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
        </div>
      </div>
    </>
  );
};

export default BulkInstantPo;
