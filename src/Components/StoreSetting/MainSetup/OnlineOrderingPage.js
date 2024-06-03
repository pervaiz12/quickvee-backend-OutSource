import { useState, useEffect } from "react";
import React from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

const OnlineOrderingPage = ({ onlineorderstatus }) => {
  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(true);
  const dispatch = useDispatch();

  const handleCheckedSwitch = (e) => {
    setisEnableOrderNumber(!isEnableOrderNumber);
  };

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  useEffect(() => {
    // console.log(setupDataState?.clover_customer_id)
    onlineorderstatus(isEnableOrderNumber);
  }, [setupDataState, isEnableOrderNumber]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2.5 }}
        className="box_shadow_div"
      >
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <h5 style={{ marginBottom: 0 }} className="box_shadow_heading">
                Online Ordering
              </h5>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <label className="text-[12px]">
                Select Default Image if in case some color image is not
                available.
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
        <div className="fr">
                <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedSwitch}
                  checked={isEnableOrderNumber}
                />
              </div>
        </Grid>
      </Grid>
     
    </>
  );
};

export default OnlineOrderingPage;
