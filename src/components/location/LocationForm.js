import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, updateLocation, getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    const { locationId } = useParams();
    const history = useHistory();

    //Controlled component
    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        setIsLoading(true)
        if (locationId) {
            updateLocation({
                id: location.id,
                name: location.name,
                address: location.address
            })
                .then(() => history.push(`/location/detail/${location.id}`))
        } else {
            addLocation(location)
                .then(() => history.push("/locations"))
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }

    useEffect(() => {
            if (locationId) {
                getLocationById(locationId)
                    .then(location => {
                        setLocation(location)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        }, [])

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">{locationId ? "Edit Location" : "New Location"}</h2>
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
            <button className="btn btn-primary" disabled={isLoading} onClick={handleClickSaveLocation}>{locationId ? "Submit Edit" : "Save New Location"}</button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
        </form>
    )
}