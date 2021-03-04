import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';
import { EmployeeContext } from "./EmployeeProvider"

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
        name: "",
        role: "",
        locationId: 0,
    });

    const [isLoading, setIsLoading] = useState(true)
    const { employeeId } = useParams()
    const history = useHistory()


    const handleControlledInputChange = (event) => {
        const newEmployee = { ...employee }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newEmployee[event.target.id] = selectedVal
        setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
        event.preventDefault()

        const employeeId = employee.employeeId

        if (employeeId === 0) {
            window.alert("Please select a location")
        } else {
            setIsLoading(true)
            if (employeeId) {
                updateEmployee({
                    id: employee.id,
                    name: employee.name,
                    role: employee.role,
                    locationId: parseInt(employee.locationId),
                })
                    .then(() => history.push(`/employees/detail/${employee.id}`))
            }
            addEmployee(employee)
                .then(() => history.push("/employees"))
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }

    useEffect(() => {
        getLocations().then(() => {
            if (employeeId) {
                getEmployeeById(employeeId)
                    .then(employee => {
                        setEmployee(employee)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">{employeeId ? "Edit Employee" : "Add Employee"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="employee name" value={employee.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="role">Employee role:</label>
                    <input type="text" id="role" onChange={handleControlledInputChange} required className="form-control" placeholder="employee position" value={employee.role} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button disabled={isLoading} className="btn btn-primary" onClick={handleClickSaveEmployee}>{employeeId ? "Submit Edit" : "Save New Employee"}</button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
        </form>
    )
}