import React, { useContext, useEffect, useState } from "react"
import "./Location.css"
import { useHistory, useParams } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})

    const { locationId } = useParams()
    const history = useHistory()

    let commaListOfEmployees = ""
    if (location.employees) {
        commaListOfEmployees = location.employees.map(employee => {
            return `${employee.name}, `
        }).join("")
    }

    useEffect(() => {
        getLocationById(locationId)
            .then((response) => {
                setLocation(response)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            <div className="location__address">{location.address}</div>
            <h5 className="location__employees">Employees</h5>
            <p className="location__employee">{commaListOfEmployees}</p>
            <h5 className="location__animals">Current Residents</h5>
            <ul>
                {location.animals ? location.animals.map(animal => <li key={animal.id}>{animal.name}</li>): console.log("ignore this")}
            </ul>
            <button onClick={() => {history.push(`/locations/edit/${location.id}`)}}>Edit</button>
        </section>
    )
}