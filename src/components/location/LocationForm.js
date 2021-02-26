import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, getLocations } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: "",
    });

    const history = useHistory();

    useEffect(() => {
        getLocations()
    }, [])

    //Controlled component
    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        let selectedVal = event.target.value
        newLocation[event.target.id] = selectedVal
        setLocation(newLocation)
    }

    const handleClickSaveEmployee = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        addLocation(location)
            .then(() => history.push("/locations"))
    }

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="name" value={location.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Location address:</label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="address" value={location.address} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveEmployee}>Save Location</button>
        </form>
    )
}