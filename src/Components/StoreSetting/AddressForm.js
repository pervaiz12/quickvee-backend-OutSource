import { Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";

const AddressForm = ({
  infoRecord,
  onChangeHandle,
  errors,
  handleKeyPress,
  stateList,
  onDropDownChangeHandle,
}) => {
  return (
    <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className="info-menu">Address</h1>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <BasicTextFields
              type={"text"}
              name={"address_1"}
              placeholder="Address Line1"
              value={infoRecord.address_1}
              onChangeFun={onChangeHandle}
            />
            {errors.address_1Error && (
              <span className="error">{errors.address_1Error}</span>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={12}>
            <BasicTextFields
              type="text"
              name="address_2"
              placeholder="Address Line2"
              value={infoRecord.address_2}
              onChangeFun={onChangeHandle}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              className="store-info"
              type="text"
              name="city"
              placeholder="City"
              value={infoRecord.city}
              onChangeFun={onChangeHandle}
            />
            {errors.cityError && (
              <span className="error">{errors.cityError}</span>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="zip"
              placeholder="zip"
              value={infoRecord.zip}
              onChangeFun={onChangeHandle}
            />
            {errors.zipCodeError && (
              <span className="error">{errors.zipCodeError}</span>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <label>
              State <span className="Asterisk_error">*</span>
            </label> */}
            <SelectDropDown
              placeholder="state"
              name="state"
              listItem={stateList.map((state) => ({
                title: state.State,
                name: "state",
              }))}
              selectedOption={infoRecord.state}
              title={"title"}
              onClickHandler={onDropDownChangeHandle}
            />
            {errors.stateNameError && (
              <span className="error">{errors.stateNameError}</span>
            )}
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="state"
              placeholder="State"
              value={infoRecord.state}
              onChangeFun={onChangeHandle}
            />
            {errors.stateNameError && (
              <span className="error">{errors.stateNameError}</span>
            )}
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="phone"
              placeholder="Phone"
              value={infoRecord.phone}
              maxLength={10}
              onChangeFun={onChangeHandle}
              onKeyPressFun={handleKeyPress}
            />
            {errors.phoneError && (
              <span className="error">{errors.phoneError}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressForm;
