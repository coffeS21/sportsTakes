import React from "react"
import Take from "../takeDir/Take"
export default function PublicTakeList(props){
    const {publicTakes} = props
    
    const mapped = publicTakes.map(take => <Take {...take} key={take._id}/>) 
    return(
            <div>
                {mapped}
            </div>
    )
}