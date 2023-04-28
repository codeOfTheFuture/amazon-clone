import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "@/redux/slices/basketSlice";

export const createStore = () =>
	configureStore({
		reducer: {
			basketReducer,
		},
		devTools: process.env.NODE_ENV !== "production",
	});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
