import React from 'react'




export default function ProfilePage(props){
  const {logout, deleteAccount, username, _id} = props

  function remove(){
    deleteAccount(_id)
  }

  return (
    <div id="profilePageContainer">
      <div id="profileInfoContainer">
            <p>hello : {username}</p>
        <div id="profileButtonContainer">
          <button onClick={logout} className="button-74" >logout</button>
          <button onClick={remove} className="button-74" >delete account</button>
        </div>
      </div>
    
    </div>
  )
}