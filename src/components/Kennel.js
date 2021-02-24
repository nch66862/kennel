import React from "react"
import "./Kennel.css"
import { AnimalCard } from "./animal/AnimalCard"

export const Kennel = () => {
const kennel = {
    title: "Nashville Kennels",
    locations: [
        {
            name: "Nashville North"
        }
    ]
}
return (
    <>
        <h2 className="spinngingTitle">{kennel.title}</h2>
        <small>Loving care when you're not there.</small>
        <address>
            <div>Visit Us at the {kennel.locations[0].name} Location</div>
            <div>500 Puppy Way</div>
        </address>

        <h2>Animals</h2>
        <article className="animals">
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
        </article>
    </>
)
}