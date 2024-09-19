// import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";
// import { useSelector, useDispatch } from "react-redux";
import DownlIcon from "../../Assests/Dashboard/download.svg";
import OnlineData from "../../Assests/Dashboard/online.svg";
import SynkData from "../../Assests/Dashboard/sync.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import {
  setMenuOpen,
  setIsDropdownOpen,
  setIsStoreActive,
} from "../../Redux/features/NavBar/MenuSlice";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import UserLogo from "../../Assests/Dashboard/UserLogo.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaChevronDown } from "react-icons/fa";
import {
  getAuthSessionRecord,
  handleGetStoreRecord,
  getAuthInvalidMessage,
  getUserRecordData,
  getUserDashboardRecord,
} from "../../Redux/features/Authentication/loginSlice";
import { display, useMediaQuery } from "@mui/system";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { Button, InputBase } from "@mui/material";
import logoutLogo from "../../Assests/Dashboard/logout.svg";
import userLogo from "../../Assests/Dashboard/userLogoDropDown.svg";
import { BASE_URL, SYNC_DATA, SEND_FOR_APPROVAL } from "../../Constants/Config";
import axios from "axios";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../Common/passwordShow";
import CircularProgress from "@mui/material/CircularProgress";
import needHelpLogo from "../../Assests/Dashboard/need_help.svg";
export default function Header() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    GetSessionLogin,
    userTypeData,
    inventory_approval,
  } = useAuthDetails();
  const isTablet = useMediaQuery("(max-width:831px)");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
  const isDropdownOpen = useSelector(
    (state) => state.NavBarToggle.isDropdownOpen
  );
  let allStoresData = LoginAllStore?.data?.stores;
  let storenameCookie =
    LoginGetDashBoardRecordJson !== ""
      ? LoginGetDashBoardRecordJson?.data?.name
      : LoginGetDashBoardRecordJson?.data?.name;
  useEffect(() => {
    setStoreName(storenameCookie);
    setSelection(storenameCookie);
  }, [LoginGetDashBoardRecordJson]);

  // useEffect for all when update data in coockie-----------------

  // useEffect for all when update data in coockie--------------

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [storename, setStoreName] = useState(storenameCookie);

  const [anchorElForDropDown, setAnchorElForDropDown] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorElForDropDown(event.currentTarget);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleCloseForDropDown = (e) => {
    if (e.target.innerText !== selection && e.target.innerText !== "") {
      setSelection(e.target.innerText);
    }
    setSelection("");
    setAnchorElForDropDown(null);
  };
  // console.log("isDropdownOpen",isDropdownOpen)
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleDropdownToggle = () => {
    dispatch(setMenuOpen(!isMenuOpenRedux));
    dispatch(setIsDropdownOpen(!isDropdownOpen));
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("user_auth_record");
    Cookies.remove("token_data");
    localStorage.removeItem("AllStore");
    navigate("/login");
    dispatch(setIsStoreActive(false));
    dispatch(getAuthInvalidMessage(""));
  };

  const handleNavigate = () => {
    navigate("/");
    handleClose();
  };
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChangeMerchant = (merchant_id) => {
    setSearchText("");
    const data = {
      username: GetSessionLogin?.username,
      password: GetSessionLogin.password,
      login_type: LoginGetDashBoardRecordJson?.login_type,
      merchant_id: merchant_id,
    };
    dispatch(handleGetStoreRecord(data)).then((result) => {
      if (result?.payload?.status == true) {
        if (result?.payload?.final_login == 1) {
          navigate(`/`);
        } else {
          console.log("store page called");
        }
      } else {
        Cookies.remove("loginDetails");
        Cookies.remove("user_auth_record");
        // Cookies.remove('token_data');
        dispatch(getAuthInvalidMessage(result?.payload?.msg));
        navigate("/login");
      }
    });
  };

  function renderDashboardDropDown() {
    const displayOptions = (
      JSON.parse(localStorage.getItem("AllStore")) || allStoresData
    )
      ?.map((item) => {
        if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      })
      .filter((item) => item !== undefined);

    function renderOption(value) {
      if (selection === value) {
        return <div>{value}</div>;
      }
      return value;
    }

    return (
      <>
        <Menu
          anchorEl={anchorElForDropDown}
          keepMounted={true}
          open={!!anchorElForDropDown}
          onClose={handleCloseForDropDown}
          // anchorReference="anchorPosition"
          // anchorPosition={{ top: 0, left: 0 }}
          PaperProps={{
            style: {
              marginTop: 17,
            },
          }}
          MenuListProps={{
            style: {
              paddingTop: 0,
            },
          }}
        >
          <MenuItem
            // sx={{ fontFamily: "CircularSTDBook",position:"sticky",top:"0", left:"0",right:"0",zIndex:"99999",background:"#fff" }}
            disableTouchRipple={true}
            className="Searchmarchant"
          >
            
              <InputBase
                placeholder="Search..."
                onChange={handleSearchChange}
                value={searchText}
                inputRef={inputRef}
              />
        
          </MenuItem>
          {displayOptions.map((item, index) => {
            return (
              <div key={index}>
                <MenuItem
                  sx={{ fontFamily: "CircularSTDBook" }}
                  onClick={(e) => {
                    handleCloseForDropDown(e);
                    handleChangeMerchant(item?.merchant_id);
                  }}
                >
                  {renderOption(item.name)}
                </MenuItem>
              </div>
            );
          })}
        </Menu>
      </>
    );
  }

  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [loader, setLoader] = useState(false);

  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const SyncData = async (e) => {
    const Syncdata = {
      merchant_id: merchant_id,
      token_id: userTypeData?.token_id,
      login_type: userTypeData?.login_type,
    };
    setLoader(true);

    try {
      const res = await axios.post(BASE_URL + SYNC_DATA, Syncdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });

      const data = await res.data.status;
      const update_message = await res.data.msg;
      if (data === true) {
        ToastifyAlert(update_message, "success");
      } else {
        ToastifyAlert(update_message, "warn");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setLoader(false);
  };

  const handleSendForApproval = async (e) => {
    const Syncdata = {
      token_id: userTypeData?.token_id,
      login_type: userTypeData?.login_type,
      merchant_id: merchant_id,
      store_name: storename,
    };
    setLoader(true);

    try {
      const res = await axios.post(BASE_URL + SEND_FOR_APPROVAL, Syncdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });

      const data = await res.data.status;
      const update_message = await res.data.message;
      if (data === true) {
        ToastifyAlert(update_message, "success");
      } else {
        ToastifyAlert(update_message, "warn");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setLoader(false);
  };
  const handleNavigateToNeedHelp = () => [
    // navigate("/users/view/unapprove/need-help"),
    navigate("/need-help"),
  ];

  return (
    <>
      <div
        className={`q_header_section sticky bg-white  border-b-4 border-black ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2">
          {LoginGetDashBoardRecordJson?.final_login == 1 ? (
            <BiMenu
              className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out cursor-pointer`}
              onClick={(e) => {
                // setIsMenuOpen(!isMenuOpen); || AdminRocord?.final_login==1
                // (LoginSuccessJson?.final_login==1 || AuthDecryptDataDashBoardJSONFormat?.final_login==1 )
                handleDropdownToggle();
              }}
            />
          ) : (
            ""
          )}
          <Link to="/">
            <img
              src={Quick}
              alt="Logo"
              className={`${isTablet ? "ml-2" : "ml-6"} `}
              width={isTablet ? "80%" : "auto"}
            />
          </Link>
          {
            //  console.log(localStorage.getItem("AllStore"))
            LoginGetDashBoardRecordJson?.final_login == 1 ? (
              LoginAllStore?.data?.stores !== undefined ||
              (localStorage.getItem("AllStore") !== "" &&
                localStorage.getItem("AllStore") !== null) ? (
                <div className="relative flex mx-4 cursor-pointer">
                  <div className="flex lg:text-[20px]">
                    <div className="flex items-center" onClick={handleMenuOpen}>
                      <p className="admin_medium">
                        {storename.length >= 15
                          ? `${storename.slice(0, 17)} ...`
                          : storename}
                      </p>
                      <div className="ms-2">
                        <img src={DownIcon} alt="" />
                      </div>
                    </div>
                    <div>{renderDashboardDropDown()}</div>
                  </div>

                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {storename}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={storename}
                      label={storename}
                      // onChange={handleChangeStore}
                    >
                      {
                        // console.log(JSON.parse(localStorage.getItem("AllStore")))

                        JSON.parse(localStorage.getItem("AllStore")) !== "" ||
                        Array.isArray(allStoresData)
                          ? (
                              JSON.parse(localStorage.getItem("AllStore")) ||
                              allStoresData
                            )?.map((result, index) => {
                              return (
                                <MenuItem
                                  onClick={() =>
                                    handleChangeMerchant(result?.merchant_id)
                                  }
                                  value={result?.name}
                                >
                                  {result?.name}
                                </MenuItem>
                              );
                            })
                          : ""
                      }
                  
                    </Select>
                  </FormControl> */}

                  {/* <div
              className="flex items-center ml-6 px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
              onClick={handleDropdownToggle}
            >
              Vape Store
              <img src={DownIcon} alt="" className="w-8 h-10 ml-2" />
            </div>

            
            {showDropdown && (
              <div className="absolute mt-2 bg-white border rounded shadow-lg">
               
                <div className="p-4">
                 
                        <div>Category 1</div>
                  <div>Category 2</div>
                  <div>Category 3</div>
                
                </div>
              </div>
            )} */}
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )
          }
          <div className="flex items-center lg:text-[20px] text-black ml-auto sm:text-xs md:text-sm">
            {/* Download App section */}
            {/* ================================ */}
            {LoginGetDashBoardRecordJson?.final_login == 1 ? (
              <>
                {/* <div className="ml-5 flex items-center">
                  <img src={DownlIcon} alt="icon" className="ml-2" />
                  <p className="cursor-pointer ml-2 admin_medium">
                    Download App
                  </p>
                </div> */}

                {/* Online Store and Sync Data section */}
                <Link
                  to={`https://frontend.quickvee.com/merchant/${LoginGetDashBoardRecordJson?.data?.merchant_id}?orderMethod=pickup`}
                  // to={`https://www.quickvee.com/merchant/${LoginGetDashBoardRecordJson?.data?.merchant_id}?orderMethod=pickup`}
                  target="_blank"
                >
                  <div
                    className={`cursor-pointer ${
                      isTablet ? "" : "ml-5"
                    } flex items-center`}
                  >
                    <img
                      src={OnlineData}
                      alt="icon"
                      className={`${isTablet ? "" : "ml-2"}`}
                    />
                    <p className={`${isTablet ? "" : "ml-2"} admin_medium `}>
                      Online Store
                    </p>
                  </div>
                </Link>
                {userTypeData?.login_type !== "superadmin" &&
                inventory_approval === "1" ? (
                  <button
                    className={`cursor-pointer ${
                      isTablet ? "mx-2" : "mx-5"
                    } flex items-center syncConatiner`}
                    onClick={handleSendForApproval}
                  >
                    <CircularProgress
                      color={"inherit"}
                      className={` rotaicions ${
                        loader ? "opacity-1" : "opacity-0"
                      }`}
                      width={18}
                      size={18}
                    />
                    <img
                      src={SynkData}
                      alt="icon"
                      className={` syncIcon ${
                        loader ? "opacity-0" : "opacity-1"
                      }`}
                    />
                    <p className="ml-2 admin_medium">Send For Approval</p>
                  </button>
                ) : (
                  <button
                    className={`cursor-pointer ${
                      isTablet ? "mx-2" : "mx-5"
                    } flex items-center syncConatiner`}
                    onClick={SyncData}
                    disabled={loader}
                  >
                    <CircularProgress
                      color={"inherit"}
                      className={` rotaicions ${
                        loader ? "opacity-1" : "opacity-0"
                      }`}
                      width={18}
                      size={18}
                    />

                    <img
                      src={SynkData}
                      alt="icon"
                      className={` syncIcon ${
                        loader ? "opacity-0" : "opacity-1"
                      }`}
                    />
                    <p className="ml-2 admin_medium">Sync Data</p>
                  </button>
                )}
              </>
            ) : (
              ""
            )}
            {/* ======================================== */}
            <div
              className="flex items-center cursor-pointer"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img
                style={{ height: "24px", width: "24px" }}
                src={UserLogo}
                alt="icon"
                className="mx-2"
              />
              {/* <p className="admin_medium">{storename?.slice(0, 1)?.toUpperCase()}</p> */}
              <img src={DownIcon} alt="" />
            </div>

            <Menu
              PaperProps={{
                style: {
                  // width: 150,
                  marginTop: 20,
                },
              }}
              MenuListProps={{
                style: {
                  padding: 0,
                },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {storename && (
                <MenuItem onClick={handleNavigate}>
                  <div className="flex justify-items-start items-center">
                    <img src={userLogo} alt="" className="w-6 h-6 mr-2" />
                    {storename}
                  </div>{" "}
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <div
                  className="flex justify-items-start items-center"
                  onClick={handleNavigateToNeedHelp}
                >
                  <img src={needHelpLogo} alt="" className="w-6 h-6 mr-2" />
                  <p>Need Help</p>
                </div>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                {" "}
                <div className="flex justify-items-start items-center">
                  <img src={logoutLogo} alt="" className="w-6 h-6 mr-2" />
                  Logout
                </div>{" "}
              </MenuItem>
            </Menu>

            {/* </div> */}

            {/* Vertical line separator */}
            <div className="border-t-3 border-b-2 border-black bg-black mb-16"></div>
          </div>
        </div>
      </div>
    </>
  );
}
