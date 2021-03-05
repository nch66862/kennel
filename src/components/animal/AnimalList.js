import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"
import { useHistory } from "react-router-dom"

export const AnimalList = () => {
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    // Since you are no longer ALWAYS displaying all of the animals
    const [filteredAnimals, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getLocations()
            .then(getCustomers)
            .then(getAnimals)
    }, [])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all animals
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (
        <div className="animals">
            <h3>Animals</h3>
            {filteredAnimals.map(animal => {
                const owner = customers.find(c => c.id === animal.customerId)
                const location = locations.find(l => l.id === animal.locationId)
                return <AnimalCard key={animal.id} location={location} customer={owner} animal={animal} />
            })}
            <button onClick={() => { history.push("/animals/create") }}>Add Animal</button>
        </div>
    )
}