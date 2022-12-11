import React, { createContext, useReducer } from 'react';


export const StoreContext = createContext();
const initialState = {
    cart: {
        cartItems: []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // add to cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                item => item._id === newItem._id
            );
            const cartItems = existItem ?
                state.cart.cartItems.map(item => item._id === existItem._id ? newItem : item)
                :
                [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems } };
        default:
            return state;
    }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;