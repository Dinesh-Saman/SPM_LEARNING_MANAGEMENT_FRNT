import React, {useEffect, useState} from 'react'
import './Login.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, loginUserValidation} from "../../Action/Users";
import {useHistory} from "react-router";
import axios from "axios";
import AuthClass from "../../Validation/AuthClass";
import SucessPopUp from "../PopupModel/SucessPopUp";
import PopupModel from "../PopupModel/PopupModel";

function LoginComponent(props) {


    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupName, setPopupName] = useState("");
    const [popupLocation, setPopupLocaion] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    function SubmitPressed(e) {
        e.preventDefault();
        const newUser = {
            username,
            password
        }
        console.log(newUser);
        axios.post("http://localhost:8073/api/validate", newUser)
            .then(response => {
                let values = response.data;
                console.log('res1 ', response.data);
                // console.log('res1 ', values[0]);
                // console.log('res3 ', values[2]);
                if (values.type == null){
                    console.log('111')
                    alert('Invalid login')
                    history.push("/login");
                    setName("");
                    setPassword("");
                }else if (values.type == "student"){
                    console.log('1112')
                    AuthClass.login(values)
                    setButtonPopup(true);
                    setPopupName("login");
                    setPopupLocaion("/home");

                }else if (values.type == "teacher"){
                    if (values.status == "valid"){
                        console.log('111w')
                        AuthClass.login(values)
                        setPopupName("login");
                        setPopupLocaion("/tutordash");
                        setButtonPopup(true);
                        //history.push();
                    }else{
                        console.log('111s')
                        AuthClass.login(values)
                        setName("");
                        setPassword("");
                        alert('Teacher Status pending')
                        history.push("/login");
                    }

                }
            });
        // dispatch(loginUserValidation(newUser));
        // const response = useSelector((state) => state.userDetails1.loginUser);
    }
    const NavigateToRegistration = () => {
        history.push("/registration");
    }

    return (
        <div className="loginbackground">
                <PopupModel show={buttonPopup} buttondisble = {false}>
                    <SucessPopUp setBackground={props.setBackground} trigger={buttonPopup} setTrigger = {setButtonPopup} name1 = {popupName} name2 = {popupLocation}></SucessPopUp>
                </PopupModel>
                <div className="login-info4">
                    <h2 className="login-info4-main">Login</h2>
                    <h4 className="login-info4-second">Login to get access to premium features and discounts</h4>
                </div>
                <form onSubmit={SubmitPressed} className="form-login">
                    <div className="login-body">
                        <div className="input-field-login">
                            <lable className="input-wrapper">Name</lable><br/>
                            <input className="input-field"
                                   placeholder="Enter Name..."
                                   value={username}
                                   type="text"
                                   onChange = {(e) =>{
                                       setName(e.target.value);
                                   }}
                                   required
                            />
                            <br/>
                        </div>
                        <div className="input-field-login">
                            <lable className="input-wrapper">Password</lable><br/>
                            <input className="input-field"
                                   placeholder="Enter Password..."
                                   type="password"
                                   value={password}
                                   onChange = {(e) =>{
                                       setPassword(e.target.value);
                                   }}
                                   required
                            />
                        </div>
                        <div className="input-field-login">
                            <input type="checkbox" className="input-field1" value="Remember me"/>
                            <lable className="input-wrapper">Remember me</lable><br/>
                        </div>
                        <div className="button-group">
                            <button className="auth-button" type="submit">Login</button><br/>
                        </div>


                        <div className="login-info5">
                            <h2 className="login-info5-main">New to the site?</h2>
                            <h4 className="login-info5-second" onClick={NavigateToRegistration}>Sign up</h4>
                        </div>
                        <div className="login-info6">
                            <h2 className="login-info6-main">Forgot Password?</h2>
                        </div>
                    </div>
                </form>

        </div>
    )
}

export default LoginComponent
