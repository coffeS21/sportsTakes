import React from "react"

export default function Take(props){
    const {takeTitle,takeBody, upvote, downvote} = props
    return(
        <div>
            <h1>{takeTitle}</h1>
            <h1>{takeBody}</h1>
            <p>{upvote}</p>
            <p>{downvote}</p>
        </div>
    )
}