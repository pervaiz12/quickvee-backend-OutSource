import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";
import attributesReducer from "../features/Attributes/attributesSlice";
import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";


const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    attributes: attributesReducer,
    settingstoreoption: settingstoreoptionReducer,
  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});


export default store;