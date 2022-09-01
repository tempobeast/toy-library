import React, { useState } from 'react'

const CartContext = React.createContext();

function CartProvider ({ children }) {
    const [cart, setCart] = useState([]);

    console.log(cart)

    return (
        <CartContext.Provider value = {{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider }