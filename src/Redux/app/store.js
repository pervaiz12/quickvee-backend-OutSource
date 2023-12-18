import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";
 


const store = configureStore({
  reducer: {
    categories: categoriesReducer,

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});


export default store;