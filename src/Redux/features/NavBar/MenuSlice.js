import { createSlice } from '@reduxjs/toolkit';
import { useMediaQuery } from "@mui/material";
// Define initial state
const initialState = {
    
  isMenuOpen: false // Initial value based on your useState
};

// Create a slice
const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Reducer function for toggling menu
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    // Reducer function for setting menu state
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    }
  }
});

// Export actions
export const { toggleMenu, setMenuOpen } = MenuSlice.actions;

// Export reducer
export default MenuSlice.reducer;
