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
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload],
                },
            };
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