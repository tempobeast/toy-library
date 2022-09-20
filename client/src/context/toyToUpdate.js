import React, { useState } from 'react'

const ToyToUpdateContext = React.createContext();

function ToyToUpdateProvider ({ children }) {
    const [toyToUpdate, setToyToUpdate] = useState(null);

    return (
        <ToyToUpdateContext.Provider value = {{ toyToUpdate, setToyToUpdate }}>
            {children}
        </ToyToUpdateContext.Provider>
    )
}
export { ToyToUpdateContext, ToyToUpdateProvider }