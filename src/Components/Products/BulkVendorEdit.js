import React, { useEffect, useRef, useState } from "react";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
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
  deleteProductVendor,
  fetchProductsDataById,
  fetchVendorList,
  filterVendorAPI,
  saveVendorList,
} from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../CommonComponents/Loader";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const BulkVendorEdit = ({
  productData,
  varientData,
  varientIndex,
  modalType,
  fetchDataLoadingVendor,
}) => {
  const dispatch = useDispatch();
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const handleVendorCostPerItem = (e, index, vendorId) => {
    const { name, value, type, checked } = e.target;
    let updateVandorItems;

    // when type is checkbox run block of code
    if (type === "checkbox") {
      updateVandorItems = vendorItems.map((item, i) => ({
        ...item,
        isPreferred: i === index ? checked : false,
      }));
      const formData = new FormData();
      formData.append(
        "single_product",
        !Boolean(+productData?.isvarient) ? 1 : 0
      );
      formData.append(
        "varient_id",
        !Boolean(+productData?.isvarient)
          ? productData?.id
          : modalType === "bulk-edit"
            ? productData?.id
            : varientData[varientIndex]?.id
      );
      formData.append("vendor_id", vendorId);

      dispatch(assignPrefferedVendor(formData))
        .then((res) => {
          if (res?.payload?.status) {
            ToastifyAlert("Updated Preferred Vendor!", "success");
          }
        })
        .catch((err) => {
          ToastifyAlert("Error!", "error");
        });
    }
    // when type is input run block of code
    else {
      updateVandorItems = [...vendorItems];
      updateVandorItems[index]["costPerItem"] = value;
    }

    setVendorItems(updateVandorItems);
  };

  // fetch vendor data here...
  useEffect(() => {
    // initially fetch data from vendor API and fill the dropdown list data
    let isVarient = Boolean(+productData?.isvarient);
    const formData = new FormData();
    formData.append(
      "varient_id",
      !isVarient
        ? productData?.id
        : modalType === "bulk-edit" && Boolean(+productData?.isvarient)
          ? productData?.id
          : varientData[varientIndex]?.id
    );
    formData.append("merchant_id", "MAL0100CA");
    formData.append("single_product", isVarient ? 0 : 1);

    dispatch(fetchVendorList(formData)).then((res) => {
      if (res?.payload?.status) {
        setVendor(res?.payload?.result);
      }
    });
  }, []);

  // fetch data when modal open
  const fetchBulkVendorData = () => {
    let isVarient = Boolean(+productData?.isvarient);

    // when product has single varient filter here
    if (!isVarient) {
      const parseJson = JSON.parse(productData?.assigned_vendors);
      let assignedVendorId;
      let assignedVendorValues;
      if (parseJson) {
        assignedVendorId = Object.keys(parseJson);
        assignedVendorValues = Object.values(parseJson);
      }

      // formdata
      const formData = new FormData();
      formData.append("merchant_id", "MAL0100CA");
      let foundVendors = [];
      dispatch(filterVendorAPI(formData)).then((res) => {
        if (res?.payload?.status) {
          const vendorNameList = res?.payload?.vendor_name_list;
          const foundVendors = vendorNameList
            ?.filter((filtered) => {
              return assignedVendorId?.some((item) => +item === +filtered.id);
            })
            .map((vendor) => {
              console.log("single single", parseJson);
              return {
                ...vendor,
                costPerItem: assignedVendorValues[vendor.id] || 0,
                isPreferred: +productData?.prefferd_vendor == +vendor?.id,
              };
            });
          setVendorItems(foundVendors);
        }
      });
    }
    // when product has multiple varient
    else {
      const parseJson = JSON.parse(
        varientData?.[varientIndex]?.assigned_vendors
      );
      let assignedVendorId;
      let assignedVendorValues;
      if (parseJson) {
        assignedVendorId = Object.keys(parseJson);
        assignedVendorValues = Object.values(parseJson);
      }
      console.log(
        "all mall",
        varientData?.[varientIndex]?.assigned_vendors,
        assignedVendorId,
        assignedVendorValues
      );

      // formdata
      const formData = new FormData();
      formData.append("merchant_id", "MAL0100CA");
      let foundVendors = [];
      dispatch(filterVendorAPI(formData)).then((res) => {
        if (res?.payload?.status) {
          const vendorNameList = res?.payload?.vendor_name_list;
          const foundVendors = vendorNameList
            ?.filter((filtered) => {
              return assignedVendorId?.some((item) => +item === +filtered.id);
            })
            .map((vendor) => {
              console.log("vendorrrr", assignedVendorValues);
              return {
                ...vendor,
                costPerItem: assignedVendorValues[vendor.id] || 0,
                isPreferred:
                  +varientData?.[varientIndex]?.prefferd_vendor == +vendor?.id,
              };
            });
          setVendorItems(foundVendors);
        }
      });
    }
  };

  // when add vendor button is click
  const handleAddVendor = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append(
      "single_product",
      !Boolean(+productData?.isvarient) ? 1 : 0
    );
    formData.append(
      "varient_id",
      !Boolean(+productData?.isvarient)
        ? productData?.id
        : modalType === "bulk-edit"
          ? productData?.id
          : varientData[varientIndex]?.id
    );
    formData.append(
      "vendor_id",
      selectedVendor?.map((item) => item?.id)?.toString()
    );

    dispatch(assignProductVendor(formData))
      .then((res) => {
        if (res?.payload?.status) {
          setVendorItems((prev) => [
            ...prev,
            ...selectedVendor.map((vendor) => ({
              ...vendor,
              costPerItem: 0,
              isPreferred: false,
            })),
          ]);
          const formData = new FormData();
          formData.append("merchant_id", "MAL0100CA");
          formData.append("id", productId?.id);

          ToastifyAlert("Vendor Added Successfully!", "success");

          setSelectedVendor([]);
        }
      })
      .catch((err) => {
        console.log("error for assign vendor", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // fetch vendor data intially when modal open
    fetchBulkVendorData();
  }, [productData]);

  // when click on delete icon // delete vendor by Id
  const handleDeleteVendor = (vendorId) => {
    // formData
    const formData = new FormData();
    formData.append(
      "single_product",
      !Boolean(+productData?.isvarient) ? 1 : 0
    );
    formData.append(
      "varient_id",
      !Boolean(+productData?.isvarient)
        ? productData?.id
        : modalType === "bulk-edit"
          ? productData?.id
          : varientData[varientIndex]?.id
    );
    formData.append("vendor_id", vendorId);
    dispatch(deleteProductVendor(formData))
      .then((res) => {
        if (res?.payload?.status) {
          const filtervendorList = vendorItems?.filter(
            (item) => +item?.id !== +vendorId
          );
          setVendorItems(filtervendorList);

          ToastifyAlert("Vendor deleted successfully!", "success");
        }
      })
      .catch((err) => {
        ToastifyAlert("Error!", "error");
      });
  };

  // when click on save vendor
  // save all the selected vendor
  const handleSaveVendorList = () => {
    const formData = new FormData();
    formData.append(
      "single_product",
      !Boolean(+productData?.isvarient) ? 1 : 0
    );
    formData.append(
      "variant_id",
      !Boolean(+productData?.isvarient)
        ? productData?.id
        : modalType === "bulk-edit"
          ? productData?.id
          : varientData[varientIndex]?.id
    );
    formData.append(
      "costperItem",
      vendorItems?.map((i) => i?.costPerItem).toString()
    );
    formData.append("vendor_id", vendorItems?.map((i) => i?.id).toString());
    dispatch(saveVendorList(formData))
      .then((res) => {
        if (res?.payload?.status) {
          ToastifyAlert("Updated successfully!", "success");
        }
      })
      .catch(() => {
        ToastifyAlert("Error!", "error");
      });
  };

  return (
    <div class="bulk-vendor-edit">
      <div class="add-vendor-area">
        <div className="q-add-categories-single-input">
          <div class="vendor-add-input">
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
            />
            <button
              className="quic-btn quic-bulk-vendor-edit"
              onClick={handleAddVendor}
              style={{
                backgroundColor: "#0A64F9",
              }}
              disabled={!selectedVendor?.length}
            >
              {loading ? (
                <Box className="vendor-add-loading">
                  <CircularProgress />
                </Box>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>

        {fetchDataLoadingVendor ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <TableContainer
              component={Paper}
              className="bulkvendor-table-container"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Vendors</TableCell>
                    <TableCell align="center">Cost Per Item</TableCell>
                    <TableCell align="center">Preferred Vendor</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendorItems?.length
                    ? vendorItems.map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            <input
                              type="text"
                              className="vendor-cost-input"
                              placeholder="$10.00"
                              name="costPerItem"
                              onChange={(e) =>
                                handleVendorCostPerItem(e, index, row?.id)
                              }
                              value={vendorItems[index]["costPerItem"]}
                            />
                          </TableCell>
                          <TableCell align="center">
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
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            <img
                              src={DeleteIcon}
                              alt=""
                              className=" m-auto d-grid place-content-center"
                              width="30px"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteVendor(row?.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : "No Vendor Selected"}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="box">
              <div className="variant-attributes-container">
                {/* Your existing JSX for variant attributes */}
                <div className="q-add-categories-section-middle-footer  ">
                  {!!!varientIndex ? (
                    <p className="bulk-edit-note">
                      <span className="note">Note:</span>
                      By clicking on update, it will assign selected vendor as
                      Preferred vendor to all Variants
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
                      onClick={handleSaveVendorList}
                    >
                      Update
                    </button>
                    <button className="quic-btn quic-btn-cancle">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BulkVendorEdit;
