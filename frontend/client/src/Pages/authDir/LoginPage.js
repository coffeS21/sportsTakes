import React, {useState} from "react"
import Header from "../../components/appDir/Header"
import LoginForm from "../../components/authDir/LoginForm"

export default function LoginPage(props){
    const {signup, login,err, errMsg} = props
    const authInputs = {
        username: "",
        password: ""
    }

    const [formInputs, setFormInputs] = useState(authInputs)
    const [loginToggle, setLoginToggle] = useState(false)

    function handleChange (e){
        const {name, value} = e.target
        setFormInputs(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
       signup(formInputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(formInputs)
    }

    function toggleForm(){
        setLoginToggle(prev => !prev)
        err()
      }

    return(
        <div id="authContainer">
            <div id="headerContainer">
                <Header header="Rock The Rim"/>
            </div>
            <div id="formContainer">
            {!loginToggle ?
            <>
                <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleSignup}
                formInputs={formInputs}
                errMsg={errMsg}
                btnText="Sign up"
                />
                
                <p onClick={toggleForm}>Already a member?</p>
            </>
            :
            <>
                <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleLogin}
                formInputs={formInputs}
                errMsg={errMsg}
                btnText="Login"
            />
                <p onClick={toggleForm}>Not a member?</p>
            </>
            }
            </div>
        </div>
    )
}