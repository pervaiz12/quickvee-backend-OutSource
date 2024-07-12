import { Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const SocialMediaForm = ({
  infoRecord,
  onChangeHandle,
  handleSubmitInfo,
  errors,
}) => {
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
            <label>Facebook</label>
            <BasicTextFields
              type={"text"}
              name={"facebookUrl"}
              placeholder="Facebook Url"
              value={infoRecord.facebookUrl}
              onChangeFun={onChangeHandle}
            />
            <span className="error">{errors.facebookUrlError}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>instagram</label>
            <BasicTextFields
              type={"text"}
              name={"instagramUrl"}
              placeholder="Instagram Url"
              value={infoRecord.instagramUrl}
              onChangeFun={onChangeHandle}
            />
            <span className="error">{errors.instagramUrlError}</span>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={12}>
            <label>Promotional</label>
            <BasicTextFields
              type={"text"}
              name={"promotionalUrl"}
              placeholder="Promotional Url"
              value={infoRecord.promotionalUrl}
              onChangeFun={onChangeHandle}
            />
            <span className="error">{errors.promotionalUrlError}</span>
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
            
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SocialMediaForm;
