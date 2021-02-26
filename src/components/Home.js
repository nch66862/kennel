import { React, useContext, useEffect, useState } from "react";
import { CustomerContext } from "./customer/CustomerProvider";
import { PropsAndState } from './PropsAndState'

export const Home = () => {
    let [loggedInUser, setUser] =  useState({
        name: "you are not logged in"
    })
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
            .then(() => {
                const userId = parseInt(localStorage.getItem("kennel_customer"))
                console.log(userId)
                console.log(loggedInUser)
                console.log(customers)
                const newestUser = customers.find(customer => customer.id === userId)
                if (userId) {
                    if (newestUser !== undefined){
                        setUser(newestUser)
                    }
                }
                console.log(newestUser)
            })
    }, [])

    return (
        <>
            <h2>Nashville Kennels</h2>
            <small>Loving care when you're not there.</small>
            
            <address>
                <div>Visit Us at the Nashville North Location</div>
                <div>500 Puppy Way</div>
            </address>
            <PropsAndState yourName={loggedInUser} />
        </>
    )
}