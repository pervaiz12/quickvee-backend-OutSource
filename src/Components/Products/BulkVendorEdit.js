import React, { lazy, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import {
  assignPrefferedVendor,
  assignProductVendor,
  bulkVendorAssign,
  deleteProductVendor,
  fetchVendorList,
  getAlreadyAssignVendor,
  saveVendorList,
} from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "../../CommonComponents/Loader";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useAuthDetails } from "../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";
import DeleteModal from "../../reuseableComponents/DeleteModal";

///////////////////////////////////////
import { styled } from "@mui/material/styles";

import { tableCellClasses } from "@mui/material/TableCell";
import { Suspense } from "react";

const SearchableDropdown = lazy(() => import("./SearchableDropdown"));

/////////////////////////////////////////////////

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: "#253338",
    // color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));
const BulkVendorEdit = ({
  productData,
  varientIndex,
  modalType,
  handleCloseEditModal,
  isVarientEdit,
}) => {
  const dispatch = useDispatch();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [fetchDataLoadingVendor, setFetchDataLoadingVendor] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();

  const productId = useParams();

  const handleSelectProductOptions = (value, name) => {
    setSelectedVendor((prev) => [...prev, value]);
  };

  const handleDeleteSelectedOption = (id, name) => {
    const filterOptionItems = selectedVendor.filter((item) => item?.id !== id);
    setSelectedVendor(filterOptionItems);
  };

  const [vendorItems, setVendorItems] = useState([]);

  // onchange of costperItem and
  const handleVendorCostPerItem = async (e, index, vendorId) => {
    const { name, value, type, checked } = e.target;

    let updateVandorItems;
    // when type is checkbox run block of code
    if (type === "checkbox" && modalType === "single_vendor") {
      updateVandorItems = vendorItems.map((item, i) => ({
        ...item,
        isPreferred: i === index ? checked : false,
      }));
      const formData = new FormData();
      formData.append(
        "single_product",
        isVarientEdit
          ? 0
          : !Boolean(+productData?.isvarient) && !isVarientEdit
            ? 1
            : 0
      );
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
      formData.append(
        "varient_id",
        !Boolean(+productData?.isvarient)
          ? productData?.id
          : modalType === "bulk-edit"
            ? productData?.id
            : varientIndex
      );
      formData.append("vendor_id", vendorId);

      try {
        const res = await dispatch(assignPrefferedVendor(formData)).unwrap();
        if (res?.status) {
          ToastifyAlert("Updated Successfully", "success");
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
    } else if (type === "checkbox" && modalType === "bulk-edit") {
      updateVandorItems = vendorItems.map((item, i) => ({
        ...item,
        isPreferred: i === index ? checked : false,
      }));
    }
    // when type is input run block of code
    else {
      /// allowed costPerItem value in 0.00
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

      updateVandorItems = [...vendorItems];
      updateVandorItems[index]["costPerItem"] = fieldValue;
    }

    setVendorItems(updateVandorItems);
  };

  // fetch data when modal open
  const fetchBulkVendorData = async () => {
    /// called vendor api for get already assign vendor
    setFetchDataLoadingVendor(true);
    let isVarient = Boolean(+productData?.isvarient);
    const formData = new FormData();
    formData.append(
      "varient_id",
      !isVarient
        ? productData?.id
        : modalType === "bulk-edit" && Boolean(+productData?.isvarient)
          ? productData?.id
          : varientIndex
    );
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );
    formData.append(
      "single_product",
      isVarientEdit ? 0 : isVarient && !isVarientEdit ? 0 : 1
    );
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);

    await dispatch(getAlreadyAssignVendor(formData))
      .then((res) => {
        if (res?.payload?.status) {
          const assign_vendor_data = res?.payload?.result?.map((item) => ({
            ...item,
            costPerItem: item?.cost_per_item,
            isPreferred: Boolean(+item?.pref_vendor),
          }));
          setVendorItems(assign_vendor_data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setFetchDataLoadingVendor(false));
  };

  const getVendorsList = async () => {
    // initially fetch data from vendor API and fill the dropdown list data
    let isVarient = Boolean(+productData?.isvarient);
    const formData = new FormData();
    formData.append(
      "varient_id",
      !isVarient
        ? productData?.id
        : modalType === "bulk-edit" && Boolean(+productData?.isvarient)
          ? productData?.id
          : varientIndex
    );
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );
    formData.append(
      "single_product",
      isVarientEdit ? 0 : isVarient && !isVarientEdit ? 0 : 1
    );
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);

    // called vendor api for dropdown vendor data
    try {
      const response = await dispatch(fetchVendorList(formData)).unwrap();

      if (response?.status) {
        setVendor(response?.result);
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // fetch vendor data here...

  useEffect(() => {
    getVendorsList();

    // called function for get already assign vendor data
    fetchBulkVendorData();
  }, []);

  // when add vendor button is click
  const handleAddVendor = async () => {
    setLoading(true);
    if (modalType !== "bulk-edit") {
      const formData = new FormData();

      formData.append(
        "single_product",
        isVarientEdit
          ? 0
          : !Boolean(+productData?.isvarient) && !isVarientEdit
            ? 1
            : 0
      );
      formData.append(
        "varient_id",
        !Boolean(+productData?.isvarient)
          ? productData?.id
          : modalType === "bulk-edit"
            ? productData?.id
            : varientIndex
      );
      formData.append(
        "vendor_id",
        selectedVendor?.map((item) => item?.id)?.toString()
      );
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );

      formData.append("login_type", userTypeData?.login_type);
      formData.append("token_id", userTypeData?.token_id);
      formData.append("token", userTypeData?.token);

      try {
        const res = await dispatch(assignProductVendor(formData)).unwrap();
        if (res?.status) {
          setVendorItems((prev) => [
            ...prev,
            ...selectedVendor.map((vendor) => ({
              ...vendor,
              costPerItem: "",
              isPreferred: false,
            })),
          ]);
          const formData = new FormData();
          formData.append(
            "merchant_id",
            LoginGetDashBoardRecordJson?.data?.merchant_id
          );
          formData.append("id", productId?.id);

          ToastifyAlert("Added Successfully", "success");
          getVendorsList();

          setSelectedVendor([]);
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      } finally {
        setLoading(false);
      }
    } else {
      setVendorItems((prev) => [...prev, ...selectedVendor]);
      setSelectedVendor([]);
      setLoading(false);
    }
  };

  const filterVensorListInBulk = () => {
    const filterVendorList = vendor?.reduce((acc, o) => {
      if (!vendorItems.some((p) => p.id === o.id)) {
        acc.push(o);
      }
      return acc;
    }, []);
    setVendor(filterVendorList);
  };

  useEffect(() => {
    if (modalType === "bulk-edit") {
      filterVensorListInBulk();
    }
  }, [vendorItems]);

  // for Delete
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteVendorItem, setDeleteVendorItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // when click on delete icon // delete vendor by Id
  const handleDeleteVendor = (vendorId, vendorItem) => {
    setDeleteCategoryId(vendorId);
    setDeleteVendorItem(vendorItem);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      setLoadingDelete(true);
      if (loading) return;

      if (deleteCategoryId) {
        if (modalType !== "bulk-edit") {
          const formData = new FormData();
          formData.append(
            "single_product",
            isVarientEdit
              ? 0
              : !Boolean(+productData?.isvarient) && !isVarientEdit
                ? 1
                : 0
          );
          formData.append(
            "varient_id",
            !Boolean(+productData?.isvarient)
              ? productData?.id
              : modalType === "bulk-edit"
                ? productData?.id
                : varientIndex
          );
          formData.append(
            "merchant_id",
            LoginGetDashBoardRecordJson?.data?.merchant_id
          );
          formData.append("vendor_id", deleteCategoryId);
          dispatch(deleteProductVendor(formData))
            .then((res) => {
              if (res?.payload?.status) {
                const filtervendorList = vendorItems?.filter(
                  (item) => +item?.id !== +deleteCategoryId
                );
                setVendorItems(filtervendorList);
                getVendorsList();
                ToastifyAlert("Deleted Successfully", "success");
              }
            })
            .catch((err) => {
              ToastifyAlert("Error!", "error");
              getUnAutherisedTokenMessage();
            });
        } else {
          const filtervendorList = vendorItems?.filter(
            (item) => +item?.id !== +deleteCategoryId
          );
          setVendorItems(filtervendorList);
          setVendor((prev) => [...prev, deleteVendorItem]);
        }
      }
      setDeleteCategoryId(null);
      setDeleteVendorItem(null);
      setDeleteModalOpen(false);
    } catch (error) {
      if (error.status === 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status === "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoadingDelete(false);
    }
    setDeleteModalOpen(false);
  };

  // when click on save vendor
  // save all the selected vendor
  const handleSaveVendorList = async () => {
    const formData = new FormData();
    const bulkFormData = new FormData();
    setSubmitLoading(true);

    /// send formData payload when single varient
    formData.append(
      "single_product",
      isVarientEdit
        ? 0
        : !Boolean(+productData?.isvarient) && !isVarientEdit
          ? 1
          : 0
    );
    formData.append(
      "variant_id",
      !Boolean(+productData?.isvarient)
        ? productData?.id
        : modalType === "bulk-edit"
          ? productData?.id
          : varientIndex
    );
    formData.append(
      "costperItem",
      vendorItems?.map((i) => i?.costPerItem).toString()
    );
    formData.append("vendor_id", vendorItems?.map((i) => i?.id).toString());
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );

    /// send bulkFormData when multiple varient and bulkModal is open
    bulkFormData.append("product_id", productId?.id);
    bulkFormData.append(
      "vendor_id",
      vendorItems?.map((i) => i?.id)?.toString()
    );
    bulkFormData.append(
      "costperItem",
      vendorItems?.map((i) => i?.costPerItem)?.toString()
    );
    bulkFormData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );
    bulkFormData.append(
      "prefferd_vendor",
      vendorItems?.filter((i) => Boolean(+i?.isPreferred))[0]?.id ?? ""
    );
    bulkFormData.append("login_type", userTypeData?.login_type);
    bulkFormData.append("token_id", userTypeData?.token_id);
    bulkFormData.append("token", userTypeData?.token);

    try {
      if (modalType === "bulk-edit") {
        formData.append("vendor_id", vendorItems?.map((i) => i?.id).toString());
        await dispatch(bulkVendorAssign(bulkFormData)).then((res) => {
          if (res?.payload?.status) {
            getVendorsList();
          }
        });
      } else {
        await dispatch(saveVendorList(formData)).then((res) => {
          if (res?.payload?.status) {
            getVendorsList();
          }
        });
      }

      ToastifyAlert("Updated successfully!", "success");
      handleCloseEditModal();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div class="bulk-vendor-edit">
      <div class="add-vendor-area">
        <div className="q-add-categories-single-input">
          <div class="vendor-add-input">
            <Suspense fallback={<div></div>}>
              <SearchableDropdown
                keyName="stores"
                optionList={vendor}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={selectedVendor}
                // error,
                // handleUpdateError,
                hideSelectedValue={true}
                hideSelectedList={vendorItems}
                name="name"
                placeholder="Enter vendor Name"
                modalType={modalType}
              />
            </Suspense>
            <button
              className="quic-btn quic-bulk-vendor-edit submit-btn-click"
              onClick={handleAddVendor}
              style={{
                backgroundColor: "#0A64F9",
              }}
              disabled={!selectedVendor?.length || loading}
            >
              {loading ? (
                <Box className="vendor-add-loading">
                  <CircularProgress />
                </Box>
              ) : (
                ""
              )}
              Add
            </button>
          </div>
        </div>

        {fetchDataLoadingVendor ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <Paper
              sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
            >
              <TableContainer
                sx={{ minWidth: 650, maxHeight: 300 }}
                className="bulkvendor-table-container custom-scroll"
              >
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className="bulk-vendor-table"
                >
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Vendors</StyledTableCell>
                      <StyledTableCell>Cost Per Item</StyledTableCell>
                      <StyledTableCell>Preferred Vendor</StyledTableCell>
                      <StyledTableCell>Delete</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {vendorItems?.length ? (
                      vendorItems.map((row, index) => (
                        <StyledTableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell>
                            <input
                              type="text"
                              className="vendor-cost-input"
                              placeholder="$ 0.00"
                              name="costPerItem"
                              onChange={(e) =>
                                handleVendorCostPerItem(e, index, row?.id)
                              }
                              value={vendorItems[index]["costPerItem"]}
                              maxLength={9}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Switch
                              name="online"
                              id="online"
                              checked={
                                vendorItems[index]["isPreferred"] || false
                              }
                              onChange={(e) =>
                                handleVendorCostPerItem(e, index, row?.id)
                              }
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#0A64F9",
                                },
                                "& .MuiSwitch-track": {
                                  backgroundColor: "#0A64F9",
                                },
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            <img
                              src={DeleteIcon}
                              alt=""
                              className="d-grid place-content-center"
                              width="30px"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteVendor(row?.id, row)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <p className="no-vendor-text">No Vendor Selected</p>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <div className="box">
              <div className="variant-attributes-container">
                {/* Your existing JSX for variant attributes */}
                <div
                  style={{
                    justifyContent: `${!!!varientIndex ? "space-between" : ""}`,
                    marginTop: "20px",
                  }}
                  className="q-add-categories-section-middle-footer flex justify-between"
                >
                  {!!!varientIndex ? (
                    <p
                      style={{ fontFamily: "CircularSTDBook" }}
                      className="bulk-edit-note"
                    >
                      <span className="note">Note:</span>
                      By clicking on update, it will assign selected vendor as
                      Preferred vendor to all Variants
                    </p>
                  ) : (
                    ""
                  )}
                  <div
                    style={{ padding: "0px" }}
                    className="q-category-bottom-header"
                  >
                    <button
                      className="quic-btn quic-btn-update submit-btn-click"
                      style={{
                        backgroundColor: "#0A64F9",
                      }}
                      onClick={handleSaveVendorList}
                      disabled={!vendorItems?.length || submitLoading}
                    >
                      {submitLoading ? (
                        <Box className="loader-box">
                          <CircularProgress />
                        </Box>
                      ) : (
                        ""
                      )}
                      Update
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
          </>
        )}
      </div>
      <DeleteModal
        headerText="Vendor"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteCategory}
        deleteloading={loadingDelete}
      />
    </div>
  );
};

export default BulkVendorEdit;
