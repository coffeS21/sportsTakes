import React from "react"
import Take from "../takeDir/Take"
export default function myTakesPage(props){
    const {myTakes} = props
    const mapped = myTakes.map(take => <Take{...take} key={take._id}/>)
    return(
        <div>
            {mapped}
        </div>
    )
}
