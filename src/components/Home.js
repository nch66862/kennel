import { React, useContext, useEffect, useState } from "react";
import { CustomerContext } from "./customer/CustomerProvider";

export const Home = () => {
    // const userId = parseInt(localStorage.getItem("kennel_customer"))
    // console.log('userId: ', userId);
    const [user, setUser] = useState({})

    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => getCustomers().then(() => {
        const userId = parseInt(localStorage.getItem("kennel_customer"))
        console.log("customers", customers)
        const newestUser = customers.find(customer => customer.id === userId)
        newestUser ? setUser(newestUser) : console.log('nobody home')
    }), [])

    console.log("customers", customers)
    
    return (
        <>
            <h2>Nashville Kennels</h2>
            <small>Loving care when you're not there.</small>

            <address>
                <div>Visit Us at the Nashville North Location</div>
                <div>500 Puppy Way</div>
            </address>
            <h3>Welcome, {user.name}</h3>
        </>
    )
}
    // useEffect(() => {
    //     console.log(customers)
    //     const newestUser = customers.find(customer => customer.id === userId)
    //     newestUser ? setUser(newestUser):console.log("no data")
    // }, [customers])