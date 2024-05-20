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
import { fetchVendorList } from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";

const BulkVendorEdit = ({
  productData,
  varientData,
  varientIndex,
  modalType,
}) => {
  const dispatch = useDispatch();
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [vendor, setVendor] = useState([]);

  const handleSelectProductOptions = (value, name) => {
    setSelectedVendor((prev) => [...prev, value]);
  };

  const handleDeleteSelectedOption = (id, name) => {
    const filterOptionItems = selectedVendor.filter((item) => item?.id !== id);
    setSelectedVendor(filterOptionItems);
  };

  const [vendorItems, setVendorItems] = useState([]);

  const handleAddVendor = () => {
    setVendorItems((prev) => [
      ...prev,
      ...selectedVendor.map((vendor) => ({
        ...vendor,
        costPerItem: "",
        isPreferred: false,
      })),
    ]);
    setSelectedVendor([]);
  };

  const handleVendorCostPerItem = (e, index) => {
    const { name, value, type, checked } = e.target;
    let updateVandorItems;

    if (type === "checkbox") {
      updateVandorItems = vendorItems.map((item, i) => ({
        ...item,
        isPreferred: i === index ? checked : false,
      }));
    } else {
      updateVandorItems = [...vendorItems];
      updateVandorItems[index]["costPerItem"] = value;
    }

    setVendorItems(updateVandorItems);
  };

  // fetch vendor data here...
  console.log(
    "productdata  modaltype",
    modalType,
    Boolean(+productData?.isvarient)
  );
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
      if (res?.payload?.status === "true") {
        setVendor(res?.payload?.vendor_name_list);
      }
    });
  }, []);

  const handleDeleteVendor = (id) => {
    const filtervendorList = vendorItems?.filter((item) => +item?.id !== +id);
    setVendorItems(filtervendorList);
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
            >
              Add
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
                          onChange={(e) => handleVendorCostPerItem(e, index)}
                          value={vendorItems[index]["costPerItem"]}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          name="online"
                          id="online"
                          checked={vendorItems[index]["isPreferred"] || false}
                          onChange={(e) => handleVendorCostPerItem(e, index)}
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
