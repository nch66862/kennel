import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import { useHistory } from 'react-router-dom';
import { EmployeeContext } from "./EmployeeProvider"

export const EmployeeForm = () => {
    const { addEmployee, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
        name: "",
        role: "",
        locationId: 0,
    });

    const history = useHistory();

    useEffect(() => {
        getEmployees().then(getLocations)
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newEmployee = { ...employee }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newEmployee[event.target.id] = selectedVal
        // update state
        setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const locationId = employee.locationId

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            //invoke addAnimal passing animal as an argument.
            //once complete, change the url and display the animal list
            addEmployee(employee)
                .then(() => history.push("/employees"))
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="employee name" value={employee.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="role">Employee role:</label>
                    <input type="text" id="role" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="employee position" value={employee.breed} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveEmployee}>Save Employee</button>
        </form>
    )
}