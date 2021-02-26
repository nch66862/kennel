import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employee/EmployeeForm"
import { LocationForm } from "./location/LocationForm"
import { CustomerForm } from "./customer/CustomerForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route path="/locations/create">
                    <LocationForm />
                </Route>
            </LocationProvider>
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route>
                        <Route path="/animals/create">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
                <Route path="/customers/create">
                    <CustomerForm />
                </Route>
            </CustomerProvider>
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>
                    <Route path="/employees/create">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}