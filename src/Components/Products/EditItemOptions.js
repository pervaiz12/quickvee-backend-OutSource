import * as React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "../../Assests/Dashboard/cross.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { lazy } from "react";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const EditItemOptions = ({
  handleOpenItemOption,
  itemModal,
  handleCheckAllCheckBoxesOnName,
}) => {
  const [value, setValue] = React.useState("1");

  const [checkbox, setCheckbox] = React.useState({
    trackQuantity: false,
    // itemForAllLinkedLocation: false,
    sellOutOfStock: false,
    checkId: false,
    disable: false,
    isFoodStamble: false,
  });

  const clearAllCheckBoxes = () => {
    setCheckbox({
      trackQuantity: false,
      // itemForAllLinkedLocation: false,
      sellOutOfStock: false,
      checkId: false,
      disable: false,
      isFoodStamble: false,
    });
  };

  const labels = [
    "Track Quantity",
    // "Create this item for all linked locations",
    "Continue selling when out of stock",
    "check ID",
    "Disable",
    "Food Stampable",
  ];

  const showModalCheck = (i, status) => {
    console.log("status", status);
    if (status) {
      ToastifyAlert("All " + labels[i] + " Checked. ", "warn");
    } else {
      ToastifyAlert("All " + labels[i] + " UnChecked. ", "warn");
    }
  };
  const handleChangeCheckboxes = (e, i) => {
    const { value, name, checked } = e.target;
    handleCheckAllCheckBoxesOnName(name, checked);
    showModalCheck(i, checked);
    setCheckbox((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      <Modal
        open={itemModal}
        onClose={() => {
          handleOpenItemOption();
          clearAllCheckBoxes();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ margin: "6px" }}
      >
        <Box className="item-edit-modal custom-scroll">
          <div
            class="cancel-btn"
            onClick={() => {
              handleOpenItemOption();
              clearAllCheckBoxes();
            }}
          >
            <img src={CloseIcon} className="cancel-image" />
          </div>
          <div class="modal-content">
            <Box
              sx={{ width: "100%", typography: "body1" }}
              className="checkbox-for-all-form"
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    // onChange={handleChange}
                    aria-label="lab API tabs example"
                    className="modal-title-tab"
                  >
                    <Tab label="Bulk Edit Item Options" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Suspense fallback={<div></div>}>
                    <div class="checkbox-item-options" style={{ width: "8" }}>
                      <div class="options">
                        {Object.keys(checkbox)?.map((item, i) => {
                          return (
                            <>
                              <label
                                class="q_resigter_setting_section"
                                style={{ color: "#000", fontSize: "18px" }}
                              >
                                {labels[i]}
                                <input
                                  type="checkbox"
                                  name={item}
                                  value={checkbox?.[item]}
                                  onChange={(e) => handleChangeCheckboxes(e, i)}
                                  checked={checkbox?.[item]}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </Suspense>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditItemOptions;
