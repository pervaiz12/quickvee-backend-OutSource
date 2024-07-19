import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "../../Assests/Dashboard/cross.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BulkVarientEdit from "./BulkVarientEdit";
import BulkVendorEdit from "./BulkVendorEdit";
import BulkInstantPo from "./BulkInstantPo";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

const EditPage = ({
  openEditModal,
  handleCloseEditModal,
  productData,
  modalType,
  varientData,
  varientIndex,
  formData,
  handleCopyAllVarientValue,
  inventoryData,
  fetchProductDataById,
  isVarientEdit,
  fetchSingleVarientData,
}) => {
  const [value, setValue] = React.useState("");

  const handleChange = useCallback((event, newValue) => {
    console.log("handleChange", newValue);
    setValue(newValue);
  }, []);

  useEffect(() => {
    if (modalType === "single_vendor") {
      setValue("2");
    } else if (modalType === "single_instant") {
      setValue("3");
    } else {
      setValue("1");
    }
  }, [modalType]);

  useEffect(() => {
    return () => setValue("");
  }, []);

  const renderTabList = useMemo(
    () => (
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          className="tab-list"
        >
          {modalType !== "single_vendor" && modalType !== "single_instant" ? (
            <Tab label="Bulk Variant Edit" value="1" />
          ) : (
            ""
          )}

          {modalType !== "single_instant" ? (
            <Tab
              label={`${
                modalType !== "single_vendor"
                  ? "Bulk Vendor Edit"
                  : "Vendor Edit"
              }`}
              value="2"
            />
          ) : (
            ""
          )}
          {modalType !== "single_vendor" ? (
            <Tab
              label={`${
                modalType !== "single_instant"
                  ? "Bulk Instant PO"
                  : "Instant PO"
              }`}
              value="3"
            />
          ) : (
            ""
          )}
        </TabList>
      </Box>
    ),
    [modalType, handleChange]
  );

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="product-edit-modal custom-scroll">
          <div class="cancel-btn" onClick={handleCloseEditModal}>
            <img src={CloseIcon} className="cancel-image" />
          </div>
          <div class="modal-content">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                {renderTabList}
                <TabPanel value="1">
                  <BulkVarientEdit
                    formData={formData}
                    handleCopyAllVarientValue={handleCopyAllVarientValue}
                    handleCloseEditModal={handleCloseEditModal}
                    inventoryData={inventoryData}
                  />
                </TabPanel>

                <TabPanel value="2">
                  <BulkVendorEdit
                    productData={productData}
                    varientIndex={varientIndex}
                    isVarientEdit={isVarientEdit}
                    modalType={modalType}
                    handleCloseEditModal={handleCloseEditModal}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <BulkInstantPo
                    productData={productData}
                    modalType={modalType}
                    varientIndex={varientIndex}
                    isVarientEdit={isVarientEdit}
                    varientData={varientData}
                    handleCloseEditModal={handleCloseEditModal}
                    fetchProductDataById={fetchProductDataById}
                    fetchSingleVarientData={fetchSingleVarientData}
                    inventoryData={inventoryData}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditPage;
