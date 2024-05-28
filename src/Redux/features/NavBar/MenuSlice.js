import { createSlice } from '@reduxjs/toolkit';
// Define initial state
const initialState = {
    
  isMenuOpen: false, // Initial value based on your useState
  isDropdownOpen: true,
  isNestedDropdown: false
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
    },
    setIsDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    setNestedDropdown: (state, action) => {
      state.isNestedDropdown = action.payload;
    }
  }
});

// Export actions
export const { toggleMenu, setMenuOpen,setIsDropdownOpen,setNestedDropdown } = MenuSlice.actions;

// Export reducer
export default MenuSlice.reducer;
