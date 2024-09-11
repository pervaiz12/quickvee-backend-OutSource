import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import Switch from "@mui/material/Switch";
import LoyaltyPointData from "./LoyaltyPointData";
import LoyaltyProgramLogic from "./loyaltyProgramLogic";
import AddLoyaltyPointModal from "./AddLoyaltyPointModal";

export default function LoyaltyProgram() {
  const {
    handleModalOpen,
    openAddModel,
    handleCloseAddModal,
    onDateRangeChange,
  } = LoyaltyProgramLogic();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="box_shadow_div"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="q-coupon-bottom-header"
        >
          <Grid item>
            <div>
              <span>Loyalty Program</span>
            </div>
          </Grid>
        </Grid>
        <Grid item sx={{ pl: 2.5, pr: 2.5, pb: 2.5 }}>
          <Grid container>
            <Grid item xs={12}>
              <h5
                style={{ marginBottom: 0 }}
                className="StoreSetting_heading-menu"
              >
                Enable/Disable
              </h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ pl: 2.5, pr: 2.5, pb: 2.5 }}>
          <div className="fr">
            {/* {loader ? (
              <CircularProgress width={20} size={20} />
            ) : ( */}
            <Switch
              // {...label}
              name="cost_method"
              // checked={isChecked === "0"}
              // onChange={handleCheckedSwitch}
            />
            {/* )} */}
          </div>
        </Grid>
      </Grid>
      <LoyaltyPointData handleModalOpen={handleModalOpen} />
      <AddLoyaltyPointModal
        openAddModel={openAddModel}
        handleCloseAddModal={handleCloseAddModal}
        onDateRangeChange={onDateRangeChange}
      />
    </>
  );
}
