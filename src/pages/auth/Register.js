import React,{useState,useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

function Register ({history}){
    const [email,setEmail]=useState("");

    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {
        if (user && user.token)
        history.push("/");
    },[user,history])

const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!email) {
        toast.error("Email required");
    }
    const config = {
        url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true
    };
    await auth.sendSignInLinkToEmail(email,config)
    .then(() => {
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
    window.localStorage.setItem('emailForRegistration',email);
    setEmail("");
    })
    .catch((error) => {
       
        toast.error(error.message);
    })
    
 }



    function registerForm(){
        
        return (
            <>
            <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control mb-2" 
            placeholder="Enter email"
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus="true"></input>
            <button type="submit" className="btn btn-dark">Register</button>
            </form>
            </>
        )

    }
    
return (
    <>
   
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                
                {registerForm()}
                
            </div>
        </div>
    </div>
    </>
);
}
export default Register;