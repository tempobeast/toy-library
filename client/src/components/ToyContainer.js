import React, {useContext} from 'react'
import { ToysContext } from "../context/toys"
import ToyCard from "./ToyCard"

function ToyContainer() {

    const { toys } = useContext(ToysContext)

    const toysToDisplay = toys.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

    console.log(toys)
    
    return(
        <div>
            <h2>Toys!!!</h2>
            {toysToDisplay.map((toy) => (
                <ToyCard key={toy.id} toy={toy}/>
                )
            )}
        </div>
    )
}

export default ToyContainer