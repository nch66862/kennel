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
import { AnimalDetail } from "./animal/AnimalDetail"
import { EmployeeDetail } from "./employee/EmployeeDetail"
import { LocationDetail } from "./location/LocationDetail"
import { AnimalSearch } from "./animal/AnimalSearch"

export const ApplicationViews = () => {
    return (
        <>
            <CustomerProvider>
                <Route exact path="/">
                    <Home />
                </Route>
            </CustomerProvider>
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route path="/locations/create">
                    <LocationForm />
                </Route>
                <Route path="/locations/edit/:locationId(\d+)">
                    <LocationForm />
                </Route>
                <Route exact path="/location/detail/:locationId(\d+)">
                    <LocationDetail />
                </Route>
            </LocationProvider>
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalSearch />
                            <AnimalList />
                        </Route>
                        <Route path="/animals/create">
                            <AnimalForm />
                        </Route>
                        <Route exact path="/animals/detail/:animalId(\d+)">{/* animalId specifies parameter. It is a new object with a key named animalId. If you add more /'s you can add more keys to your object. (\d+) means it is a number */}
                            <AnimalDetail />
                        </Route>
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
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
                    <Route path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employee/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}