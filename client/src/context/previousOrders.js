import React, { useState } from 'react'

const PreviousOrdersContext = React.createContext();

function PreviousOrdersProvider ({ children }) {
    const [previousOrders, setPreviousOrders] = useState([]);

    return (
        <PreviousOrdersContext.Provider value = {{ previousOrders, setPreviousOrders }}>
            {children}
        </PreviousOrdersContext.Provider>
    )
}
export { PreviousOrdersContext, PreviousOrdersProvider }