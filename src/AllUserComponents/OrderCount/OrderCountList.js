import React, { useState } from "react";

import { BASE_URL, EXPORT_ORDER_COUNT_DATA } from "../../Constants/Config";
import axios from "axios";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { CircularProgress, FormControl, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import caleIcon from "../../Assests/Filter/Calender.svg";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { useAuthDetails } from "./../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const OrderCountList = () => {
  const OrderStatus = [
    {
      title: "Paid",
    },
    {
      title: "Unpaid",
    },
    {
      title: "Both",
    },
  ];

  const orderType = [
    {
      title: "Online Order",
    },
    {
      title: "Store Order",
    },
  ];
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("Paid");
  const [selectedOrderType, setSelectedOrderType] = useState("Online Order");

  const currentDate = dayjs().format("YYYY-MM-DD");
  const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
  const [selectedEndDate, setSelectedEndDate] = useState(currentDate);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "OrderStatus":
        setSelectedOrderStatus(option.title);
        setOrderStatusDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option.title);
        setOrderTypeDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  // const validateDates = (start, end) => {
  //   console.log(start);
  //   console.log(end);
  //   if (start && end && new Date(start) > new Date(end)) {
  //     setError("Please Enter Vaild Start Date and End Date");
  //   } else {  
  //     setError("");
  //   }
  // };

  const validateDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      return false;
    }
    else if(dayjs(end).diff(dayjs(start), "day") > 60) {
      console.log("Date Diff",dayjs(end).diff(dayjs(start), "day"))
      setError("Start Date cannot be more than 60 days before End Date.");
      return false;
    }
    // const differenceInTime = endDate.getTime() - startDate.getTime();
    // const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // console.log("differenceInDays",differenceInDays)
    // if (differenceInDays > 60) {
    //   setError("The date range cannot exceed 60 days.");
    //   return false;
    // }
    else{
      setError(""); // Clear error if validation passes
      return true;
    }
  };
  const { userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const handleSubmitData = async () => {
    if (!validateDates(selectedStartDate, selectedEndDate)) {
      return; // Stop if validation fails
    }
    if (
      selectedStartDate &&
      selectedEndDate &&
      new Date(selectedStartDate) > new Date(selectedEndDate)
    ) {
      setError("Please Enter Vaild Start Date and End Date");
    } else {
      setError("");
      const orderType = (type) => {
        if (type === "Online Order") {
          return "Online";
        }
        if (type === "Store Order") {
          return "Offline";
        }
      };
      const data = {
        start_date: selectedStartDate,
        end_date: selectedEndDate,
        order_source: orderType(selectedOrderType),
        order_status: selectedOrderStatus,
        token_id: userTypeData.token_id,
        login_type: userTypeData.login_type,
      };
      // console.log(data);
      try {
        setLoader(true);
        const response = await axios.post(
          BASE_URL + EXPORT_ORDER_COUNT_DATA,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userTypeData.token}`,
            },
          }
        );

        if (response && response.data) {
          // console.log(response);
          const csvData = response.data;
          // Convert the data to a Blob
          const blob = new Blob([csvData], { type: "text/csv" });

          // Create a URL for the Blob
          const fileUrl = URL.createObjectURL(blob);

          // Create a temporary anchor element and trigger a download
          const a = document.createElement("a");
          a.href = fileUrl;
          a.download = selectedStartDate + "-to-" + selectedEndDate + ".csv"; // Name of the downloaded file
          document.body.appendChild(a);
          a.click();

          // Cleanup: remove the anchor element and revoke the Blob URL
          document.body.removeChild(a);
          URL.revokeObjectURL(fileUrl);

          setTimeout(() => {
            setLoader(false);
            ToastifyAlert("Download Successfully", "success");
          }, 2000);
          // setLoader(false);
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
        setLoader(false);
        ToastifyAlert("Something wents wrong", "error");
      }
    }
  };

  const handleDateChange = (setter) => (newValue) => {
    // setter(newValue.format("YYYY-MM-DD"));
    // validateDates(selectedStartDate, selectedEndDate);

    setter(newValue.format("YYYY-MM-DD"));
    const start = setter === setSelectedStartDate ? newValue.format("YYYY-MM-DD") : selectedStartDate;
    const end = setter === setSelectedEndDate ? newValue.format("YYYY-MM-DD") : selectedEndDate;
    if (!dayjs(start).isValid() || !dayjs(end).isValid()) {
      setError("Invalid date. Please select a valid date.");
      return;
    }else (
      setError("")
    )
    validateDates(start, end);
  };

  return (
    <>

      <div className="box_shadow_div_order">
        <Grid item className="q-category-bottom-header" xs={12}>
          <h1 className="text-xl font-medium">Order Count</h1>
        </Grid>

        <div className="px-6  ">
          <Grid container spacing={4} className="">
            <Grid item xs={6}>
              <label className=""> Order Status</label>
              <SelectDropDown
                sx={{ fontFamily: "inherit" }}
                listItem={OrderStatus}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedOrderStatus}
                dropdownFor={"OrderStatus"}
              />
            </Grid>
            <Grid item xs={6}>
              <label className=""> Order Type</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderType}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedOrderType}
                dropdownFor={"orderType"}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="q-category-bottom-detail-section mt-5 pb-5 box_shadow_div_order">
        <div className="store-setting-flex"></div>

        <div className="px-6  ">
          <Grid container spacing={4} className="">
            <Grid item xs={6}>

              <label>Start Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth className="" components={["DatePicker"]}>
                  <DatePicker
                    // sx={{pt:0.2}}

                    value={dayjs(selectedStartDate)}
                    onChange={handleDateChange(setSelectedStartDate)}
                    maxDate={dayjs()}
                    style={{ border: "none" }} // Remove border
                    size="small"
                    format={"MMMM DD, YYYY"}
                    views={["year", "month", "day"]}
                    slotProps={{
                      textField: {
                        placeholder: "Start Date",
                        size: "small",
                      },
                    }}
                    components={{
                      OpenPickerIcon: () => (
                        <img
                          src={caleIcon}
                          alt="calendar-icon"
                          style={{ width: 20, height: 20 }}
                        />
                      ),
                    }}
                    className="orderCount_StartDate date-picker-font"
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>

              <label>End Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth components={["DatePicker"]}>
                  <DatePicker
                    style={{ border: "none" }} // Remove border
                    size="small"
                    value={dayjs(selectedEndDate)}
                    onChange={handleDateChange(setSelectedEndDate)}
                    maxDate={dayjs()}
                    format={"MMMM DD, YYYY"}
                    views={["year", "month", "day"]}
                    slotProps={{
                      textField: {
                        placeholder: "End Date",
                        size: "small",
                      },
                    }}
                    shouldDisableDate={(date) => {
                      const start = selectedStartDate;
                      return date.format("YYYY-MM-DD") < start;
                    }}
                    components={{
                      OpenPickerIcon: () => (
                        <img
                          src={caleIcon}
                          alt="calendar-icon"
                          style={{ width: 20, height: 20 }}
                        />
                      ),
                    }}
                    className="orderCount_StartDate date-picker-font"
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </div>

        {error && (
          <p
            style={{
              fontSize: "14px",
              color: "red",
              marginLeft: "2rem",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            paddingLeft: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <button
            className="save_btn attributeUpdateBTN"
            onClick={handleSubmitData}
            disabled={loader}
          >
            {loader ? (
              <>
                <CircularProgress
                  color={"inherit"}
                  className="loaderIcon"
                  width={15}
                  size={15}
                />
                Export
              </>
            ) : (
              "Export"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderCountList;
