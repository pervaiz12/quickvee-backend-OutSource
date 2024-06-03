import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

const DelveryPickupDetails = ({ DeliveryPickupData }) => {
  const dispatch = useDispatch();
  const [delverypickup, setDelverypickup] = useState(true);
  const [pickupDefaultTip, setPickupDefaultTip] = useState("");
  const [deliveryDefaultTip, setDeliveryDefaultTip] = useState("");
  const [pickupTipDropDownTitle, setPickupTipDropDownTitle] = useState("None");
  const [deliveryTipDropDownTitle, setDeliveryTipDropDownTitle] =
    useState("None");

  const handleCheckedenbale = (e) => {
    setDelverypickup(!delverypickup);
  };
  const TipList = [
    {
      title: "None",
      value: "0",
    },
    {
      title: "10%",
      value: "10",
    },
    {
      title: "15%",
      value: "15",
    },
    {
      title: "20%",
      value: "20",
    },
    {
      title: "25%",
      value: "25",
    },
  ];

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  
  useEffect(() => {
    if (setupDataState?.default_tip_d) {
      setDeliveryDefaultTip(setupDataState.default_tip_d);
      const selectedTip = TipList.find(
        (item) => item.value === setupDataState.default_tip_d
      )?.title;
      if (selectedTip) setDeliveryTipDropDownTitle(selectedTip);
    }


    if (setupDataState?.default_tip_p) {
      setPickupDefaultTip(setupDataState.default_tip_p);
      const selectedTip = TipList.find(
        (item) => item.value === setupDataState.default_tip_p
      )?.title;
      if (selectedTip) setPickupTipDropDownTitle(selectedTip);
    }
  }, [setupDataState]);

  const handlePickupDefaultTipChange = (option) => {
    setPickupTipDropDownTitle(option.title);
    setPickupDefaultTip(option.value);
  };

  const handleDeliveryDefaultTipChange = (option) => {
    setDeliveryTipDropDownTitle(option.title);
    setDeliveryDefaultTip(option.value);
  };

  useEffect(() => {
    DeliveryPickupData(delverypickup, pickupDefaultTip, deliveryDefaultTip);
  }, [delverypickup, pickupDefaultTip, deliveryDefaultTip]);

  return (
    <>
      <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h5 className="box_shadow_heading">Delivery & Pickup Details</h5>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <h5 style={{ marginBottom: 0 }} className="box_shadow_heading">
                Enable Tip
              </h5>
            </Grid>
            <Grid item>
              <div className="fr">
                <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedenbale}
                  checked={delverypickup}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label>Pickup Default Tip</label>
              <SelectDropDown
                listItem={TipList}
                title={"title"}
                selectedOption={pickupTipDropDownTitle}
                onClickHandler={handlePickupDefaultTipChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Delivery Default Tip</label>
              <SelectDropDown
                listItem={TipList}
                title={"title"}
                selectedOption={deliveryTipDropDownTitle}
                onClickHandler={handleDeliveryDefaultTipChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div class="box_shadow_div" style={{ padding: "20px" }}>
          <div className="">
            <h5 class="box_shadow_heading">Delivery & Pickup Details</h5>
          </div>

          <div class="qvrow">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="">
                <h5 class="box_shadow_heading">Enable Tip</h5>
              </div>

              <div className="fr">
                <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedenbale}
                  checked={delverypickup}
                />
              </div>
            </div>
          </div>
          <div className="qvrow">
            <div className="col-qv-6">
              <div className="input_area">
                <label>Pickup Default Tip</label>

                <select
                  name="default_tip_d"
                  value={pickupDefaultTip}
                  onChange={handlePickupDefaultTipChange}
                >
                  <option value="0" selected={pickupDefaultTip == 0}>
                    None
                  </option>
                  <option value="10" selected={pickupDefaultTip == 10}>
                    10%
                  </option>
                  <option value="15" selected={pickupDefaultTip == 15}>
                    15%
                  </option>
                  <option value="20" selected={pickupDefaultTip == 20}>
                    20%
                  </option>
                  <option value="25" selected={pickupDefaultTip == 25}>
                    25%
                  </option>
                </select>
              </div>
            </div>
            <div className="col-qv-6">
              <div className="input_area">
                <label>Delivery Default Tip</label>

                <select
                  name="end_day_Allow"
                  value={deliveryDefaultTip}
                  onChange={handleDeliveryDefaultTipChange}
                >
                  <option value="0" selected={deliveryDefaultTip == 0}>
                    None
                  </option>
                  <option value="10" selected={deliveryDefaultTip == 10}>
                    10%
                  </option>
                  <option value="15" selected={deliveryDefaultTip == 15}>
                    15%
                  </option>
                  <option value="20" selected={deliveryDefaultTip == 20}>
                    20%
                  </option>
                  <option value="25" selected={deliveryDefaultTip == 25}>
                    25%
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DelveryPickupDetails;
