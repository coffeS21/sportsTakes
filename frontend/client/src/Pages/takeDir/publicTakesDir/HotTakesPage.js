import React from "react"
import PublicTakeList from "../../../components/takeDir/publicTakeDir/PublicTakeList"

export default function HotTakesPage(props){
    const {publicTakes} = props    
    return(
        <div>
            <PublicTakeList publicTakes={publicTakes}/>
        </div>
    )
}