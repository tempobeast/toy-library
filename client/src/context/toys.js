import React, { useState } from 'react'

const ToysContext = React.createContext();

function ToysProvider ({ children }) {
    const [toys, setToys] = useState([]);

    return (
        <ToysContext.Provider value = {{ toys, setToys }}>
            {children}
        </ToysContext.Provider>
    )
}
export { ToysContext, ToysProvider }