import { Alert, Grid } from "@mui/material";

const StoreHeading = ({hideSucess,successsMessage,infoRecord}) => {
  return (
    <Grid container className="box_shadow_div">
      <Grid item xs={12}>
        {hideSucess ? <Alert severity="success">{successsMessage}</Alert> : ""}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: 2.5 }}
        >
          <Grid item>
            <p className="store-name">{infoRecord.store}</p>
          </Grid>
          <Grid item>
            <p className="inforecord-email">{infoRecord.email}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StoreHeading;
