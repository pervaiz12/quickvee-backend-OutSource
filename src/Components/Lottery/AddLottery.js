import { Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import LotteryForm from "./LotteryForm";
import LotteryCategory from "./LotteryCategory";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const characters = "0123456789";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default function AddLottery() {
  const [UPCCode, setUPCCode] = React.useState("");
    const [loader, setLoader] = React.useState(false);
  const handleGenerateUPC = () => {
    setUPCCode(generateString(20));
  };
  const handleInputUPC = (event) => {
    setUPCCode(event.target.value);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <SwitchToBackButton title={"Add New Lottery"} linkTo={-1} />
            </Grid>
            <Grid item xs={12} sx={{ p: 2.5 }}>
              <LotteryForm />
            </Grid>
            <Grid item xs={12} sx={{ px: 2.5, pb: 2.5 }}>
              <LotteryCategory />
            </Grid>
            <Grid
              item
              xs={12}
              className="flex items-center gap-2"
              sx={{ px: 2.5, pb: 2.5 }}
            >
              <Checkbox
                defaultChecked
                sx={{
                  color: "grey",
                  "&.Mui-checked": {
                    color: "#1ec26b",
                  },
                  width: "20px",
                }}
              />
              <p style={{ marginBottom: 0 }} className="heading">
                Track Quantity
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              className="flex items-center gap-2"
              sx={{ px: 2.5, pb: 2.5 }}
            >
              <Grid container direction={"row"} alignItems="center">
                <Grid item xs sx={{ mr: 2 }}>
                  <BasicTextFields
                    sx={{ mt: 0.5 }}
                    type={"email"}
                    name="email"
                    value={UPCCode}
                    placeholder="Lottery Name"
                    onChangeFun={handleInputUPC}
                  />
                  {/* {errorMessage.email && (<span className="error">{errorMessage.email}</span>)} */}
                </Grid>
                <Grid item alignSelf="end">
                  <button
                    onClick={handleGenerateUPC}
                    className="quic-btn quic-btn-save attributeUpdateBTN"
                  >
                    Generate UPC
                  </button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ pt: 2.5 }}>
              <div className="q-add-categories-section-middle-footer">
                <button
                  className="quic-btn quic-btn-save attributeUpdateBTN"
                //   onClick={handleSubmit}
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />{" "}
                      Submit
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
                {/* <Link to={`/category`}> */}
                <button
                  // onClick={() => seVisible("CategoryDetail")}
                //   onClick={back}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
                {/* </Link> */}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
