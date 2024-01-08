import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";

import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";

import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";



import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";

import systemAccessListingReducer from "../features/SystemAccess/systemAccessSlice";



import couponListReducer from "../features/Coupon/couponSlice";

import settingstorealtersReducer from "../features/SettingStoreAlters/SettingStoreAltersSlice"

import SettingReceiptReducer from "../features/StoreSettings/SettingsReceipt/SettingsReceiptSlice";
import PurchaseOrderReducer from "../features/PurchaseOrder/purchaseOrderSlice"


const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,
    purchase:PurchaseOrderReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

    employeelistData:addEmployeeReducer,


    couponList:couponListReducer,

    systemAccessList:systemAccessListingReducer,
    settingstoreoption: settingstoreoptionReducer,
    settingstorealters: settingstorealtersReducer,


    SettingReceiptList: SettingReceiptReducer,


   

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;