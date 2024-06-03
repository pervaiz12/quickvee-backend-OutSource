import { Grid } from "@mui/material";

const MenuLink = ({ infoRecord, onChangeHandle }) => {
  return (
    <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <ul className="info-unorder inforecord-email">
              <li>
                Pick an easy to remember name and verify if it's available to be
                used for your store
              </li>
              <li>
                Please enter your store name in the input field above so that we
                can create a menu link for your store
              </li>
              <li>
                If you select "abcstore" as the name, the URL or website address
                for your store will be abcstore.quickvee.com
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <div className="info-menu info-menu-margin ms-2">
              <h1>Menu Link</h1>
            </div>
          </Grid>
        </Grid>
        <Grid container sx={{ paddingLeft: 1 }} spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <div className="input_area">
              <input
                className="infoInput store-info merchant-disabled"
                type="text"
                name="menuLink"
                value={infoRecord.menuLink}
                disabled
              />
              <span className="info-span store-info">@.com</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="input_area">
              <input
                className="infoInput store-info"
                type="text"
                name="domain"
                value={infoRecord.domain}
                onChange={onChangeHandle}
              />
              <span className="info-span store-info">@.com</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MenuLink;
