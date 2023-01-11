import React, {useState} from "react"
import axios from "axios"

export const UserContext = React.createContext()

//this var lets us create a personal axios
const userAxios = axios.create()

//this is the token to be used when making a request to a api protected route
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const newUser = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        takes: [],
        allTakes: [],
        comments: [],
        errMsg: "",
        upvote: "",
        downvote: ""
    }
    const [newUserState, setNewUserState] = useState(newUser)

    //auth section
    function handleAuthErr(errMsg){
        setNewUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function restAuthErr(){
        setNewUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }
    
    function signup(credentials){
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setNewUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    function login(credentials){
        axios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getMyTakes()
            getAllTakes()
           
            setNewUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setNewUserState({
            user: {},
            token: "",
            takes: [],
            allTakes: [],
            comments:[]
        })
    }

    function deleteAccount(userId){
        userAxios.delete(`/api/user/${userId}`)
        .then(res => console.log(res))
        localStorage.removeItem("user")
        setNewUserState({
            user: {},
            token: "",
            takes: [],
            comments: []
        })
        .catch(err => console.log(err))
    }

//take section
    function getMyTakes( ){
        userAxios.get("/api/take/user")
        .then(res => {
            setNewUserState(prevState => ({
                ...prevState,
                takes: res.data
            }))
            
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllTakes( ){
        userAxios.get("/api/take")
        .then(res => {
            setNewUserState(prevState => ({
                ...prevState,
                allTakes: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    function addTake(newTake){
        userAxios.post("api/take", newTake)
         .then(res => {
            console.log(res.data)
            setNewUserState(prevState => ({
                 ...prevState,
                 takes: [...prevState.takes, res.data],
                 allTakes: [...prevState.allTakes, res.data]
             }))
         })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function editTake(update, takeId){
        userAxios.put(`/api/take/${takeId}`, update)
        .then(res => {
            getMyTakes()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteTake(takeId){
        userAxios.delete(`/api/take/${takeId}`)
        .then(res => {
            console.log("this is the delete function")
             newUser.takes.filter(take => take._id !== takeId)
             newUser.allTakes.filter(take => take._id !== takeId)
            getMyTakes()
            getAllTakes()
        })
        .catch(err => console.log(err))
    }

    return(
        <UserContext.Provider
            value ={{
                ...newUserState,
                signup,
                login,
                logout,
                restAuthErr,
                deleteAccount,
                addTake,
                editTake,
                deleteTake
            
            }}>
            {props.children}
        </UserContext.Provider>
    )
}
