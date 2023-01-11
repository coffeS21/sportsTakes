import React from "react"


export default function LoginForm(props){
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        formInputs: {
            username,
            password
        }
    } =props
    return(
        <form  onSubmit={handleSubmit}>
            
            <label className="label">
                username
                <input
                type="text"
                autocomplete="off"
                value={username}
                name="username"
                onChange={handleChange}
                palceholder="username"/>
            </label>
            <label className="label">
                password
                <input
                type="text"
                autocomplete="off"
                value={password}
                name="password"
                onChange={handleChange}
                palceholder="password"/>
            </label>
            <div id="buttonContainer">
                <button className="button-74" >{btnText}</button>
            </div>
            <div>
                <p >{errMsg}</p>
            </div>
        </form>
    )
}