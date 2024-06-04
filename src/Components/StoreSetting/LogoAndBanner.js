import { Grid } from "@mui/material";
import { BASE_URL } from "../../Constants/Config";
import infoImage from "../../image/Group 196.svg";
const LogoAndBanner = ({
  BannersBoolean,
  infoRecord,
  handleDelete,
  onChangeHandle,
  imageBoolean,
  errors,
}) => {
  return (
    <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container sx={{ mb: 1 }}>
          <Grid item xs={12}>
            <h1 className="info-menu">Logo & Banner</h1>
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
                <div className="info-delete-banner">
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
              <div className="info-banner-image-div">
                {infoRecord.image ? (
                  <div className="info-delete">
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
                        htmlFor="file-input2"
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
                        id="file-input2"
                        name="image"
                        style={{ display: "none" }}
                        type="file"
                        onChange={onChangeHandle}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="info-upload-image-button">
                <label htmlFor="fileInput3" className="inforecord-email">
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
            {errors.imageErrors && (
              <span className="error">{errors.imageErrors}</span>
            )}
            {errors.bannerErrors && <br />}
            {errors.bannerErrors && (
              <span className="error">{errors.bannerErrors}</span>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
           
              <div className="qvrow">
                <div className="col-qv-12">
                  <h1 className="info-menu info-menu-margin">QR Code</h1>
                  <div
                    className={"info-banner"}
                    style={{ background: "none" }}
                    // style={{
                    //   backgroundImage: !BannersBoolean
                    //     ? `url('${BASE_URL}upload/banner/${
                    //         infoRecord.banners ? infoRecord.banners : ""
                    //       }')`
                    //     : `url('${infoRecord.banners}')`,
                    //   backgroundSize: "cover",
                    // }}
                  >
                    {/* {infoRecord.banners ? (
                  <div className="info-delete-banner">
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
                )} */}
                    <div className="info-banner-image-div">
                      {infoRecord.image ? (
                        <div className="info-delete">
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
                        {
                          infoRecord.image == "" ? (
                            <>
                              <label
                                htmlFor="file-input1"
                                className="file-input1"
                              >
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
                            ""
                          )
                          // (
                          //   <>
                          //     <label
                          //       htmlFor="file-input2"
                          //       className="file-input1 info-background"
                          //       style={{
                          //         backgroundImage: `url(${
                          //           !imageBoolean
                          //             ? BASE_URL + "upload/" + infoRecord.image
                          //             : infoRecord.image
                          //         })`,
                          //       }}
                          //     ></label>
                          //     <input
                          //       id="file-input2"
                          //       name="image"
                          //       style={{ display: "none" }}
                          //       type="file"
                          //       onChange={onChangeHandle}
                          //     />
                          //   </>
                          // )
                        }
                      </div>
                    </div>
                    {/* <div className="info-upload-image-button">
                  <label htmlFor="fileInput3" className="inforecord-email">
                    Add Banner
                  </label>
                  <input
                    type="file"
                    id="fileInput3"
                    style={{ display: "none" }}
                    name="banners"
                    onChange={onChangeHandle}
                  />
                </div> */}
                  </div>
                  {/* <span className="error">{errors.imageErrors}</span>
              <br />
              <span className="error">{errors.bannerErrors}</span> */}
                </div>
              </div>
          
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogoAndBanner;
