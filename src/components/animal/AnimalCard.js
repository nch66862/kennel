import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name"><Link to={`/animals/detail/${animal.id}`}>{animal.name}</Link></h3>
        <p className="animal__breed">{animal.breed}</p>
    </section>
)