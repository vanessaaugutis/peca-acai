import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  sizeValue: number | null;
  fruitValue: number | null;
  toppings: string[];
  total: number;
  prevision: number;
}

const initialState: OrderState = {
  sizeValue: null,
  fruitValue: null,
  toppings: [],
  total: 0,
  prevision: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSizeValue(state, action: PayloadAction<number>) {
      state.sizeValue = action.payload;
    },
    setFruitValue(state, action: PayloadAction<number>) {
      state.fruitValue = action.payload;
    },
    setToppings(state, action: PayloadAction<string[]>) {
      state.toppings = action.payload;
    },
    setPrevision(state, action: PayloadAction<number>) {
      state.prevision = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
        state.total = action.payload;
      },
    resetOrder(state) {
      return initialState;
    },
  },
});

export const { setSizeValue, setFruitValue, setToppings, setPrevision, setTotal, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
