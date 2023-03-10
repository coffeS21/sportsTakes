import React from 'react'
import { Link } from 'react-router-dom'
import Header from "./Header.js"


export default function Navbar(props){
  return (
    <div id="navContainer">
      <div id="profileHeaderContainer">
         <Header header="rock the rim"/>
      </div>
      <div id="linkContainer">
        <Link className="navLikinks" to="/profilePage">
          <button className="button-30">profile page</button>
        </Link>
        <Link className="navLikinks" to="/hotTakesPage">
          <button className="button-30">hot takes page</button>
        </Link>
        <Link className="navLikinks" to="/myTakesPage">
          <button className="button-30">my takes page</button>
        </Link>
      </div>
       
    </div>
  )
}