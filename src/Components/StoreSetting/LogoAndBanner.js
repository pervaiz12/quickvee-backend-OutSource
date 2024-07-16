import { Grid } from "@mui/material";
import { BASE_URL } from "../../Constants/Config";
import infoImage from "../../image/Group 196.svg";
const LogoAndBanner = ({
  BannersBoolean,
  infoRecord,
  handleDelete,
  onChangeHandle,
  imageBoolean,
  qrCodeBoolean,
  errors,
  receieptLogoBool,
}) => {
  return (
    <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container>
          <Grid item sx={{ mr: 2.5 }}>
            <Grid container sx={{ mb: 1 }}>
              <h1 className="info-menu">Logo</h1>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div className="info-banner-image-div">
                  {infoRecord.image ? (
                    <div className="info-delete cursor-pointer">
                      <div
                        className="verifiedTableIcon"
                        onClick={() => handleDelete("image")}
                      >
                        {" "}
                        <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="info-file-upload">
                    {infoRecord.image == "" ? (
                      <>
                        <label htmlFor="file-input1" className="file-input1">
                          <img
                            src={infoImage}
                            alt="Upload Image"
                            className="info-image-icon"
                          />
                          <div className="info-image-logo-position">
                            <p className="inforecord-email">Add Logo</p>
                          </div>
                        </label>
                        <input
                          id="file-input1"
                          name="image"
                          style={{ visibility: "hidden" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="file-input-1"
                          className="file-input1 info-background"
                          style={{
                            backgroundImage: `url(${
                              !imageBoolean
                                ? BASE_URL + "upload/" + infoRecord.image
                                : infoRecord.image
                            })`,
                          }}
                        ></label>
                        <input
                          id="file-input-1"
                          name="image"
                          style={{ display: "none" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
            {errors.imageErrors && (
              <span className="error">{errors.imageErrors}</span>
            )}
          </Grid>
          <Grid item sx={{ mx: 2.5 }}>
            <Grid container sx={{ mb: 1 }}>
              <Grid item xs={12}>
                <h1 className="info-menu">QR Code</h1>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div className="info-qrCodeDiv-image-div">
                  {infoRecord.qrCode ? (
                    <div className="info-delete-qr cursor-pointer">
                      <div
                        className="verifiedTableIcon"
                        onClick={() => handleDelete("qrCode")}
                      >
                        {" "}
                        <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="info-file-upload">
                    {infoRecord.qrCode === "" ? (
                      <>
                        <label htmlFor="file-input2" className="file-input1">
                          <img
                            src={infoImage}
                            alt="Upload Image"
                            className="info-image-icon"
                          />
                          <div className="info-image-logo-position">
                            <p className="inforecord-email whitespace-nowrap">
                              Add QR code
                            </p>
                          </div>
                        </label>
                        <input
                          id="file-input2"
                          name="qrCode"
                          style={{ display: "none" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="file-input5"
                          className="file-input1 info-background"
                          style={{
                            backgroundImage: `url(${
                              !qrCodeBoolean
                                ? BASE_URL +
                                  "upload/qr_code/" +
                                  infoRecord.qrCode
                                : infoRecord.qrCode
                            })`,
                          }}
                        ></label>
                        <input
                          id="file-input5"
                          name="qrCode"
                          style={{ display: "none" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    )}
                  </div>
                </div>

                {errors.imageErrors && (
                  <div className="error">{errors.qrCodeError}</div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mx: 2.5 }}>
            <Grid container sx={{ mb: 1 }}>
              <Grid item xs={12}>
                <h1 className="info-menu">Receipt Logo</h1>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div className="info-qrCodeDiv-image-div">
                  {infoRecord.receieptLogo ? (
                    <div className="info-delete-qr cursor-pointer">
                      <div
                        className="verifiedTableIcon"
                        onClick={() => handleDelete("receieptLogo")}
                      >
                        {" "}
                        <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="info-file-upload">
                    {infoRecord.receieptLogo === "" ? (
                      <>
                        <label htmlFor="file-input4" className="file-input1">
                          <img
                            src={infoImage}
                            alt="Upload Image"
                            className="info-image-icon"
                          />
                          <div className="info-image-logo-position">
                            <p className="inforecord-email whitespace-nowrap">
                              Add Receipt Logo
                            </p>
                          </div>
                        </label>
                        <input
                          id="file-input4"
                          name="receieptLogo"
                          style={{ display: "none" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="file-input4"
                          className="file-input1 info-background"
                          style={{
                            backgroundImage: `url(${
                              !receieptLogoBool
                                ? BASE_URL + "upload/" + infoRecord.receieptLogo
                                : infoRecord.receieptLogo
                            })`,
                          }}
                        ></label>
                        <input
                          id="file-input4"
                          name="receieptLogo"
                          style={{ display: "none" }}
                          type="file"
                          onChange={onChangeHandle}
                        />
                      </>
                    )}
                  </div>
                </div>

                {errors.imageErrors && (
                  <div className="error">{errors.qrCodeError}</div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 1, mt: 2.5 }}>
          <Grid item xs={12}>
            <h1 className="info-menu">Banner</h1>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <div
              className={"info-banner"}
              style={{
                backgroundImage: !BannersBoolean
                  ? `url('${BASE_URL}upload/banner/${
                      infoRecord.banners ? infoRecord.banners : ""
                    }')`
                  : `url('${infoRecord.banners}')`,
                backgroundSize: "cover",
              }}
            >
              {infoRecord.banners ? (
                <div className="info-delete-banner cursor-pointer">
                  <div
                    className="verifiedTableIcon"
                    onClick={() => handleDelete("banners")}
                  >
                    {" "}
                    <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="info-upload-image-button ">
                <label
                  htmlFor="fileInput3"
                  className="inforecord-email cursor-pointer"
                >
                  Add Banner
                </label>
                <input
                  type="file"
                  id="fileInput3"
                  style={{ display: "none" }}
                  name="banners"
                  onChange={onChangeHandle}
                />
              </div>
            </div>

            {errors.bannerErrors && <br />}
            {errors.bannerErrors && (
              <span className="error">{errors.bannerErrors}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogoAndBanner;
