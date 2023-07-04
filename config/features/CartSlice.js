import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addItemCart: (state, action) => {
            const { sessionId, ...item } = action.payload;
            const itemsOnState = state?.items || [];
            const cartItems = [...itemsOnState];

            if (cartItems.length > 0) {
                const index = cartItems.findIndex(cartItem => cartItem.product_id === item.product_id);
                if (index > -1) {
                    cartItems.splice(index, 1);
                }
            }

            cartItems.push(item);

            const cart = {
                sessionCartId: sessionId,
                countItems: cartItems?.length || 0,
                items: cartItems,
            }
            Object.assign(state, cart);
        },
        removeItemCart: (state, action) => {
            const { sessionId, ...item } = action.payload;
            const itemsOnState = state?.items || [];
            const cartItems = [...itemsOnState];

            if (cartItems.length > 0) {
                const index = cartItems.findIndex(cartItem => cartItem.cart_id === item.cart_id);
                if (index > -1) {
                    cartItems.splice(index, 1);
                }
            }

            const cart = {
                sessionCartId: sessionId,
                countItems: cartItems?.length || 0,
                items: cartItems,
            }
            Object.assign(state, cart);
        },
        updateQuantityOfItem: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { addItemCart, removeItemCart, updateQuantityOfItem } = cartSlice.actions;

export default cartSlice.reducer;