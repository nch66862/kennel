import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"
import { useHistory } from "react-router-dom"

export const EmployeeList = () => {
    // This state changes when `getEmployees()` is invoked below
    const { employees, getEmployees } = useContext(EmployeeContext)

    const history = useHistory()

    //useEffect - reach out to the world for something
    useEffect(() => {
        getEmployees()
    }, [])


    return (
        <div className="employees">
            <h3>Employees</h3>
            {
                employees.map(employee => {
                    return <EmployeeCard key={employee.id} employee={employee} />
                })
            }
            <button onClick={() => { history.push("/employees/create") }}>Input New Hire</button>
        </div>
    )
}