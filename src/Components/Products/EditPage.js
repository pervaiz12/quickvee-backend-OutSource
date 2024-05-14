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

const EditPage = ({
  openEditModal,
  handleCloseEditModal,
  editVarient,
  formData,
  handleVarientTitleBasedItemList,
}) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                    <Tab label="Bulk Variant Edit" value="1" />
                    <Tab label="Bulk Vendor Edit" value="2" />
                    <Tab label="Bulk Instant PO" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <BulkVarientEdit editVarient={editVarient} />
                </TabPanel>
                <TabPanel value="2">
                  <BulkVendorEdit />
                </TabPanel>
                <TabPanel value="3">
                  <BulkInstantPo
                    formData={formData}
                    handleVarientTitleBasedItemList={
                      handleVarientTitleBasedItemList
                    }
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
