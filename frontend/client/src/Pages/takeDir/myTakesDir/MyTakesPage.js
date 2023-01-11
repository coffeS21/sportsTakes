import React from "react"
import MyTakesList from "../../../components/takeDir/myTakeDir/MyTakesList"
export default function MyTakesPage(props){
    const {myTakes} = props
    return(
        <div>
            <MyTakesList myTakes={myTakes}/>
        </div>
    )
}