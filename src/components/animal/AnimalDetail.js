import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams } from "react-router-dom"

export const AnimalDetail = () => {
    const { getAnimalById } = useContext(AnimalContext)

    const [animal, setAnimal] = useState({})

    const { animalId } = useParams() //matches the parameter. The parameter is an object, hence the object destructuring to get the id only.

    useEffect(() => {
        getAnimalById(animalId)
            .then((response) => {
                setAnimal(response)
            })
    }, [])

    return (
        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">{animal.breed}</div>
            <div className="animal__location">Location: {animal.location?.name}</div>
            <div className="animal__owner">Customer: {animal.customer?.name}</div>
        </section>
    )
}