import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";

import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";

import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";



import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";

import systemAccessListingReducer from "../features/SystemAccess/systemAccessSlice";



import couponListReducer from "../features/Coupon/couponSlice";


const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

    employeelistData:addEmployeeReducer,


    couponList:couponListReducer,
    settingStoreOption:settingstoreoptionReducer,

    systemAccessList:systemAccessListingReducer,


   

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;