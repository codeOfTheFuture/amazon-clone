import { Product } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BasketState {
	items: Product[];
}

const initialState: BasketState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			state.items = state.items.filter(item => item.uuid !== action.payload);
		},
	},
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: RootState) => state.basketReducer.items;
export const selectTotal = (state: RootState) =>
	state.basketReducer.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
