import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";
import attributesReducer from "../features/Attributes/attributesSlice";
import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";
 
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    attributes: attributesReducer,
    employeelistData:addEmployeeReducer
  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;