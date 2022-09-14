import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import { ToysContext } from "../context/toys"
import ToyCard from "./ToyCard"

function ToyContainer() {

    const { toys, setToys } = useContext(ToysContext)

    const toysToDisplay = toys.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    
    console.log(toysToDisplay)

    return(
        <div>
            <Outlet/>
            <h2>Toys!!!</h2>
            <div className='toy-container'>
                {toysToDisplay.map((toy) => (
                    <ToyCard key={toy.id} toy={toy}/>
                    )
                )}
            </div>
        </div>
    )
}

export default ToyContainer