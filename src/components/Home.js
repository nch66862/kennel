import { React, useContext, useEffect, useState } from "react";
import { CustomerContext } from "./customer/CustomerProvider";
import { PropsAndState } from './PropsAndState'

let i = 0
export const Home = () => {
    const userId = parseInt(localStorage.getItem("kennel_customer"))
    const [user, setUser] = useState({})

    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        console.log("useEffect")
        // debugger
        getCustomers()
    }, [])

    const newestUser = customers.find(customer => customer.id === userId)

    if (newestUser !== undefined && i < 2) {
        console.log(newestUser)
        // debugger
        setUser(newestUser)
        i++
    }

    return (
        <>
            <h2>Nashville Kennels</h2>
            <small>Loving care when you're not there.</small>

            <address>
                <div>Visit Us at the Nashville North Location</div>
                <div>500 Puppy Way</div>
            </address>
            <PropsAndState yourName={user} />
        </>
    )
}