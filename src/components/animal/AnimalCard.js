import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <p className="animal__breed">{animal.breed}</p>
        <p className="animal__title">Location:</p>
        <address className="location__address">{location.name}</address>
        <p className="customer_title">Customer:</p>
        <p className="customer_name">{customer.name}</p>
    </section>
)