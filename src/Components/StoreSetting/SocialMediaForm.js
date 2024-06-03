import { Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const SocialMediaForm = ({ handleSubmitInfo }) => {
  return (
    <Grid sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className="info-menu">Social</h1>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <BasicTextFields
              type={"text"}
              name={"address_1"}
              placeholder="Facebook Url"
              // value={infoRecord.address_1}
              // onChangeFun={onChangeHandle}
            />
            {/* <span className='error'>{store.errors.ownerName}</span> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <BasicTextFields
              type={"text"}
              name={"address_1"}
              placeholder="Instagram Url"
              // value={infoRecord.address_1}
              // onChangeFun={onChangeHandle}
            />
            {/* <span className='error'>{store.errors.ownerName}</span> */}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ pt: 1 }}
        >
          <Grid item>
            <div className="info-update">
              <input
                type="button"
                className="blue_btn inforecord-email"
                value="Update"
                onClick={handleSubmitInfo}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SocialMediaForm;
