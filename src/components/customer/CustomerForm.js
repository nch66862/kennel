import React, { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { useHistory } from 'react-router-dom';

export const CustomerForm = () => {
    const { addCustomer, getCustomers } = useContext(CustomerContext)

    const [customer, setCustomer] = useState({
        name: "",
        address: "",
    });

    const history = useHistory();

    useEffect(() => {
        getCustomers()
    }, [])

    //Controlled component
    const handleControlledInputChange = (event) => {
        const newCustomer = { ...customer }
        let selectedVal = event.target.value
        newCustomer[event.target.id] = selectedVal
        setCustomer(newCustomer)
    }

    const handleClickSaveCustomer = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        addCustomer(customer)
            .then(() => history.push("/customers"))
    }

    return (
        <form className="customerForm">
            <h2 className="customerForm__title">New Customer</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="name" value={customer.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Customer address:</label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="address" value={customer.address} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveCustomer}>Save Customer</button>
        </form>
    )
}