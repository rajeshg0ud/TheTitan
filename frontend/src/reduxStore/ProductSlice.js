import { createSlice } from "@reduxjs/toolkit";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("productState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("productState", serializedState);
  } catch (err) {
    console.error("Error saving state to local storage:", err);
  }
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: loadState() || { // Load initial state from local storage
    product: ""
  },
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
      // Save state to local storage whenever state changes
      saveState(state);
    }
  }
});

export const { addProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
