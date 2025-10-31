import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],          // [{ name, image, cost:number, quantity }]
  totalAmount: 0,     // suma de (cost * quantity)
};

// Recalcula total del carrito
const recompute = (state) => {
  state.totalAmount = state.items.reduce(
    (acc, it) => acc + Number(it.cost) * Number(it.quantity),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Normaliza costo a número (acepta "14", 14, "$14", "14.00", etc.)
      const costNum =
        typeof cost === "string" ? Number(cost.replace(/[^0-9.]/g, "")) : Number(cost);

      const existing = state.items.find((it) => it.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, cost: costNum, quantity: 1 });
      }
      recompute(state);
    },

    removeItem: (state, action) => {
      const nameToRemove = action.payload; // string
      state.items = state.items.filter((it) => it.name !== nameToRemove);
      recompute(state);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // { name, quantity:number }
      const item = state.items.find((it) => it.name === name);
      if (!item) return;

      const q = Number(quantity);
      if (q <= 0) {
        state.items = state.items.filter((it) => it.name !== name);
      } else {
        item.quantity = q;
      }
      recompute(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, removeItem: deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
