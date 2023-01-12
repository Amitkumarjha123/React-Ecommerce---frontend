
import React,{useState,useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {createOrUpdateUser} from "../../functions/auth";


const RegisterComplete = ({history}) => {
    

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {
        if (user && user.token)
        history.push("/");
    },[user,history])

    let dispatch = useDispatch();

    useEffect(()=> {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    },[])

const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!email || !password){
        toast.error("Email & password required");
        return;
    }
    if (password.length<6){
        toast.error("Password must be at least 6 characters long");
        return;
    }

    try {
        const result = await auth.signInWithEmailLink(email,window.location.href);
        if (result.user.emailVerified) {
            window.localStorage.removeItem("emailForRegistration");
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
        .then((res) => {

        dispatch({
            type : "LOGGED_IN_USER",
            payload : {
            name : res.data.name,
              email : res.data.email,
              token : idTokenResult.token,
              role : res.data.role,
              _id : res.data._id  
            }
        }); 
        })
        .catch(err => console.log(err));
         history.push("/");
        }

        
    } catch (error){
        
        toast.error(error.message);
    }

    
 }



    function completeRegistrationForm(){
        
        return (
            <>
            <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control mb-2" 
            value={email} 
            disabled="true"></input>

            <input 
            type="password" 
            className="form-control mb-2" 
            placeholder="Enter password"
            value={password} 
            autofocus
            onChange={e => setPassword(e.target.value)}></input>
            <button type="submit" className="btn btn-dark">Complete Registration</button>
            </form>
            </>
        )

    }
    
return (
    <>
   
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register Complete</h4>
                
                {completeRegistrationForm()}
                
            </div>
        </div>
    </div>
    </>
);
}
export default RegisterComplete;