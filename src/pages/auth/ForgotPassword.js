import React,{useState,useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

const ForgotPassword = ({history}) =>{
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState(false);

    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {
        if (user && user.token)
        history.push("/");
    })

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);

        const config = {
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        };

        await auth.sendPasswordResetEmail(email,config)
        .then(() => {
            setEmail("")
            setLoading(false);
            toast.success(`Password reset link is sent to ${email}. Click the link to reset your password`);
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
        })
    }

    return (
        <>
        <div className = "container col-md-6 offset-md-3 p-5">
            {loading? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
        

        <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control mb-2" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autofocus>
            </input>

            <button 
            className="btn btn-dark" disabled={!email}>Submit</button>
        </form>
        </div>
        </>
    )

}
export default ForgotPassword;
