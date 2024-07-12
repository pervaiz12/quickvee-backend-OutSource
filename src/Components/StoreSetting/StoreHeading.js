import { Alert, Grid } from "@mui/material";
import ChangePasswordModal from "./ChangePasswordModal";

const StoreHeading = ({ hideSucess, successsMessage, infoRecord }) => {
  return (
    <Grid container className="box_shadow_div">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="q-coupon-bottom-header"
      >
        <Grid item>
          <div className="StoreSetting_heading">
            <span>Store Info</span>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* {hideSucess ? <Alert severity="success">{successsMessage}</Alert> : ""} */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pl: 2.5, pr: 2.5, pb: 2.5 }}
        >
          <Grid item>
            <p className="store-name">{infoRecord.store}</p>
          </Grid>
          <Grid item>
            <p className="inforecord-email">{infoRecord.email}</p>
          </Grid>
        </Grid>
        <Grid container sx={{ px: 2.5, pb: 2.5 }}>
          <Grid item xs={12}>
            <ChangePasswordModal />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StoreHeading;
