import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVerifiedMerchant } from "../../../Redux/features/user/verifiedMerchantSlice";
import {
  getUnVerifiedMerchant,
  handleMoveDash,
} from "../../../Redux/features/user/unverifiedMerchantSlice";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { Grid } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";

export default function Verified() {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VerifiedMerchantList = useSelector(
    (state) => state.verifiedMerchantRecord.verifiedMerchantData
  );
  const data = { type: "approve" };
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    dispatch(getVerifiedMerchant({ type: "approve", ...userTypeData }));
  }, []);
  // ====================================
  const [searchRecord, setSearchRecord] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };
  const filteredAdminRecord =
    VerifiedMerchantList && Array.isArray(VerifiedMerchantList)
      ? VerifiedMerchantList.filter(
          (result) =>
            (result.owner_name &&
              result.owner_name
                .toLowerCase()
                .includes(searchRecord.toLowerCase())) ||
            (result.name &&
              result.name.toLowerCase().includes(searchRecord.toLowerCase())) ||
            (result.email &&
              result.email
                .toLowerCase()
                .includes(searchRecord.toLowerCase())) ||
            (result.phone && result.phone.includes(searchRecord)) ||
            (result.a_state && result.a_state.includes(searchRecord))
        )
      : [];

      console.log("filteredAdminRecord : ",filteredAdminRecord)
  // ====================================
  const handleEditMerchant = (data) => {
    
  
    // Assuming 'result' is the data you want to pass to the editMerchant route
    // Navigate to the editMerchant route and pass 'result' as state
    navigate(`/users/editMerchant/${data}`);
  };

  

  const handleGetVerifiedMerchant = (merchant_id) => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };
    // const formdata = new FormData();

    dispatch(handleMoveDash(data)).then((result) => {
   
      if (result?.payload?.status == true) {
        if (result?.payload?.final_login == 1) {
          navigate(`/`);
        } else {
          console.log("store page called");
        }
      } else {
        console.log("hhhhhh");
        Cookies.remove("loginDetails");
        Cookies.remove("user_auth_record");
        // Cookies.remove('token_data');
        dispatch(getAuthInvalidMessage(result?.payload?.msg));
        navigate("/login");
      }
    });
  };

  //  ====================================
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Verified Merchant</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <div className="flex q-category-bottom-header ">
                    <p className="me-2">Export Last Transaction</p>
                  </div>
                </Grid>
                <Grid
                  style={{
                    borderLeft: "1px solid #E8E8E8",
                    height: "30px",
                  }}
                ></Grid>
                <Grid item>
                  <Link
                    to="/users/addMerchant"
                    className="flex q-category-bottom-header "
                  >
                    <p className="me-2">ADD</p>
                    <img src={AddIcon} />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <InputTextSearch
                className=""
                type="text"
                value={searchRecord}
                handleChange={handleSearchInputChange}
                placeholder="Search..."
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_div">
            <div className="qvrow">
              <div className="col-qv-8">
                <div className="btn-area">
                  <Link to="/users/addMerchant" className="blue_btn">
                    ADD
                  </Link>
                </div>
              </div>
              <div className="col-qv-4">
                <div className="seacrh_area">
                  <div className="input_area">
                    <input
                      className=""
                      type="text"
                      value={searchRecord}
                      onInput={handleSearchInputChange}
                      placeholder="Search..."
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table_main_area">
              <div className="table_header_sticky">
                <div className="table_header_top">
                  {/* <h1>Table Area</h1> */}
                </div>
                <div className="table_header">
                  <p className="table12">Owner Name</p>
                  <p className="table12">Name</p>
                  <p className="table19">Email</p>
                  <p className="table10">Phone</p>
                  <p className="table5">State</p>
                  <p className="table12">Payment Mode</p>
                  <p className="table10">Merchant ID</p>
                  <p className="table10">OTP</p>
                  <p className="table10">Action</p>
                </div>
              </div>
              <div className="table_body">
                {Array.isArray(VerifiedMerchantList) &&
                  VerifiedMerchantList &&
                  filteredAdminRecord.map((result, index) => {
                    // console.log(result.a_state)
                    return (
                      <div className="table_row" key={index}>
                        <p className="table12">{result.owner_name}</p>
                        <p className="table12">{result.name}</p>
                        <p className="table19 txt_ellipsis">{result.email}</p>
                        <p className="table10">{result.a_phone}</p>
                        <p className="table5">{result.a_state}</p>
                        <p className="table12">{result.paymentmode}</p>
                        <p className="table10">{result.merchant_id}</p>
                        <p className="table10">{result.ver_code}</p>

                        <div className="table10">
                          <div className="verifiedTableIcon">
                            {/* <div 
                          onClick={()=>handleEditMerchant(result.id)}
                          // to={`/users/editMerchant/${result.id}`} 
                          ><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></div> 
                          <Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link> */}

                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Action
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={""}
                                label="Age"
                                onChange={""}
                              >
                                <MenuItem
                                  value={10}
                                  onClick={() =>
                                    handleGetVerifiedMerchant(
                                      result.merchant_id
                                    )
                                  }
                                >
                                  view
                                </MenuItem>
                                <MenuItem value={20}>
                                  <div
                                    // to={`/users/editMerchant/${result.id}`}
                                    onClick={() =>
                                      handleEditMerchant(result.id)
                                    }
                                  >
                                    <img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img>
                                  </div>
                                </MenuItem>
                                <MenuItem value={30}>
                                  <Link>
                                    <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                                  </Link>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        {/* <p className='table5'><Link to={`/user/editmerchant/${result.id}`}>Action</Link></p> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
