import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {UserContext} from "./context/UserProvider"
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"
import Nav from "./components/appDir/Nav"
import ProfilePage from "./Pages/authDir/ProfilePage"
import LoginPage from "./Pages/authDir/LoginPage"
import HotTakesPage from "./Pages/takeDir/publicTakesDir/HotTakesPage"
export default function App(props){
   const {token,
          signup,
          login,
          restAuthErr,
          logout,
          user,
          deleteAccount,
          ...newUserState
  }= useContext(UserContext)
  console.log(newUserState)
 
  return (
    <div className="app">
        { token && <Nav/> }
      <Routes>
        <Route 
          path="/" 
          element={token ? <Navigate to="/profilePage"/> : 
          <LoginPage 
            signup={signup}
            login={login}
            err={restAuthErr}
            errMsg={newUserState.errMsg}
           />}
        />
        <Route 
          path="/profilePage" 
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <ProfilePage 
              logout={logout} 
              deleteAccount={deleteAccount}
              username={user.username}
              _id={user._id}
               />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/hotTakesPage" 
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <HotTakesPage 
                publicTakes={newUserState.allTakes}
               />
            </ProtectedRoute>
          }
        />
      
      </Routes>
    </div>
  )
}
/** */