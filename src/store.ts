import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/order/orderSlice';

const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});

export default store;
