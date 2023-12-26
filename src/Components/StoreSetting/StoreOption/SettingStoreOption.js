import React, { useState } from "react";
import "../../../Styles/StoreSetting.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FiCalendar } from "react-icons/fi";
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export default function SettingStoreOption() {

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const currentTime = dayjs(); // Get the current time using dayjs

  // const [SelectTime, setSelectTime] = useState(new Date());

  // const SelectTimeRef = React.useRef(null);

  // const handleSelectTimeIconClick = () => {
  //   SelectTimeRef.current.setOpen(true);
  // };

  // const handleSearch = () => {
  //   // Perform search logic here
  //   console.log("Selected Start Date:", SelectTime);
  // };

  // const [activeOption, setActiveOption] = useState("Today");

  // Function to set the active option
  // const setActive = (option) => {
  //   setActiveOption(option);
  // };

  // Function to check if an option is active
  // const isActive = (option) => {
  //   return option === activeOption;
  // };

  const [advDayCount, setAdvDayCount] = useState("");
  const [surchargeCount, setSurcharge] = useState("");

  return (
    <>
      <div className="mx-6 my-2">
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-inline-block"><b>Enable Order Number</b></h2>
          <span className="store-setting-switch">
            <Switch {...label} />
          </span>
          <p className="store-setting-p store-setting-pb-1-5">The store will be able to accept online orders.</p>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Select Time</div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'MobileTimePicker',
                  ]}
                >
                  <DemoItem>
                    <MobileTimePicker 
                      defaultValue={currentTime}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              {/* <DatePicker
                selected={SelectTime}
                onChange={(date) => setSelectTime(date)}
                selectsStart
                SelectTime={SelectTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full store-setting-px-4 store-setting-py-2 store-setting-input store-setting-border-radius"
                ref={SelectTimeRef}
              /> */}

              {/* <span
                className="absolute right-3 store-setting-top-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleSelectTimeIconClick}
                >
                <FiCalendar className="text-black" />
              </span> */}
          </div>
        </div>

        {/* Advance Day Count */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Future Order</b></h2>
          <span className="store-setting-switch">
            <Switch {...label} />
          </span>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Advance Day Count</div>
          </div>
          <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
            <input type="number" className="w-full store-setting-px-4 store-setting-py-2 store-setting-input" value={advDayCount} onChange={(e) => setAdvDayCount(e.target.value)} />
          </div>
        </div>

        {/* Payment Options */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5"><b>Payment Options</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Cash Payment For Delivery</div>
            <span className="store-setting-switch">
              <Switch {...label} />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Cash Payment For Pickup</div>
            <span className="store-setting-switch">
              <Switch {...label} />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Surcharge %</div>
          </div>
          <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
            <input type="number" className="w-full store-setting-px-4 store-setting-py-2 store-setting-input" value={surchargeCount} onChange={(e) => setSurcharge(e.target.value)} />
          </div>
        </div>

        {/* Payment Options */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5"><b>Payment Options</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Auto Print Orders To Order Printer ?</div>
            <span className="store-setting-switch">
              <Switch {...label} />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Auto Print Payment Receipt ?</div>
            <span className="store-setting-switch">
              <Switch {...label} />
            </span>
          </div>
        </div>

        {/* Guest Checkout */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Guest Checkout</b></h2>
          <span className="store-setting-switch">
              <Switch {...label} />
          </span>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Enable Guest Checkout for Online Order?</div>
          </div>
        </div>

        <button className="store-setting-btn">Update</button>
      </div>
    </>
  );
}
