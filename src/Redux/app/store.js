import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";

import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";

import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";
import systemAccessListingReducer from "../features/SystemAccess/systemAccessSlice";



const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

    employeelistData:addEmployeeReducer,
    systemAccessList:systemAccessListingReducer,

   

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;