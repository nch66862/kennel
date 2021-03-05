import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import "./Location.css"
import { useHistory } from "react-router-dom"

export const LocationList = () => {
    // This state changes when `getLocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)

    const history = useHistory()

    //useEffect - reach out to the world for something
    useEffect(() => {
        getLocations()
    }, [])


    return (
        <div className="locations">
            <h3>Locations</h3>
            {
                locations.map(location => {
                    return <LocationCard key={location.id} location={location} />
                })
            }
            <button onClick={() => { history.push("/locations/create") }}>Create New Location</button>
        </div>
    )
}