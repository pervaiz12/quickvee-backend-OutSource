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
} from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const BulkVendorEdit = ({
  productData,
  varientData,
  varientIndex,
  modalType,
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

  const handleVendorCostPerItem = (e, index, vendorId) => {
    const { name, value, type, checked } = e.target;
    let updateVandorItems;

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
          toast.success("Updated Preferred Vendor!", {
            position: "top-right",
          });
        })
        .catch((err) => {
          toast.error("Error!", {
            position: "top-right",
          });
        });
    } else {
      updateVandorItems = [...vendorItems];
      updateVandorItems[index]["costPerItem"] = value;
    }

    setVendorItems(updateVandorItems);
  };

  // fetch vendor data here...

  useEffect(() => {
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

  const fetchBulkVendorData = () => {
    let isVarient = Boolean(+productData?.isvarient);

    // if (!isVarient) {
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
            return {
              ...vendor,
              costPerItem: assignedVendorValues[vendor.id] || 0,
              isPreferred: +productData?.prefferd_vendor == +vendor?.id,
            };
          });
        console.log("foundVendors", foundVendors);
        setVendorItems(foundVendors);
      }
    });
    // }
  };

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
              costPerItem: "",
              isPreferred: false,
            })),
          ]);
          // calles product API when vendor is added
          const formData = new FormData();
          formData.append("merchant_id", "MAL0100CA");
          formData.append("id", productId?.id);
          dispatch(fetchProductsDataById(formData));
          toast.success("Vendor Added Successfully!", {
            position: "top-right",
          });
          setSelectedVendor([]);
          // fetchBulkVendorData();
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
    fetchBulkVendorData();
  }, [productData]);

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
          toast.success("Vendor deleted successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error("Error!", {
          position: "top-right",
        });
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                          checked={vendorItems[index]["isPreferred"] || false}
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
                          onClick={() => handleDeleteVendor(row?.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : "No Vendor Selected"}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
              >
                Update
              </button>
              <button className="quic-btn quic-btn-cancle">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkVendorEdit;
