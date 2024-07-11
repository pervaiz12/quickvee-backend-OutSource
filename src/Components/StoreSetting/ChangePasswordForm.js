import {
  Grid,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
const ChangePasswordForm = ({
  onPasswordInputChange,
  handleSubmitChangePassword,
  passwordInput,
  passwordError,
  handleBlurPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <h1 className="info-menu">Change Password</h1>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <OutlinedInput
                  name={"password"}
                  placeholder="New Password"
                  value={passwordInput.password}
                  onChange={onPasswordInputChange}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  onBlur={() => handleBlurPassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <p className="text-sm">Hide</p>
                        ) : (
                          <p className="text-sm">Show</p>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {passwordError.password && (
                <span className="error">{passwordError.password}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <OutlinedInput
                  name={"confirmPassword"}
                  placeholder="Confirm New Password"
                  value={passwordInput.confirmPassword}
                  onChange={onPasswordInputChange}
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <p className="text-sm">Hide</p>
                        ) : (
                          <p className="text-sm">Show</p>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {passwordError.confirmPassword && (
                <span className="error">{passwordError.confirmPassword}</span>
              )}
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
                  value="UPDATE PASSWORD"
                  onClick={handleSubmitChangePassword}
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordForm;
