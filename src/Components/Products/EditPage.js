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

const EditPage = ({
  openEditModal,
  handleCloseEditModal,
  editVarient,
  handleVarientTitleBasedItemList,
  bulkEditPo,
  productData,
  modalType,
  varientData,
  varientIndex,
}) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (modalType === "single_vendor") {
      setValue("2");
    } else if (modalType === "single_instant") {
      setValue("3");
    } else {
      setValue("1");
    }
  }, [modalType]);

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="product-edit-modal">
          <div class="cancel-btn">
            <img
              src={CloseIcon}
              className="cancel-image"
              onClick={handleCloseEditModal}
            />
          </div>
          <div class="modal-content">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {modalType !== "single_vendor" &&
                    modalType !== "single_instant" ? (
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
                      <Tab label="Bulk Instant PO" value="3" />
                    ) : (
                      ""
                    )}
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <BulkVarientEdit editVarient={editVarient} />
                </TabPanel>

                <TabPanel value="2">
                  <BulkVendorEdit
                    productData={productData}
                    varientData={varientData}
                    varientIndex={varientIndex}
                    modalType={modalType}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <BulkInstantPo
                    bulkEditPoState={bulkEditPo}
                    handleVarientTitleBasedItemList={
                      handleVarientTitleBasedItemList
                    }
                    modalType={modalType}
                    varientIndex={varientIndex}
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
