import React, { useState, createContext } from "react"

export const AnimalContext = createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
            .then(res => res.json())
            .then(setAnimals)
    }

    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
            .then(getAnimals)
    }

    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
    }

    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}