import React,{useState,useEffect} from "react";
import {auth,googleAuthProvider} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";
import {useLocation} from 'react-router-dom'





function Login ({history}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);

    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {
        // let f=0;
        let intended=history.location.state;
        if (intended){
            return;
        }
        else {
        if (user && user.token)
        history.push("/");
        
        }
    },[history])

    let dispatch = useDispatch();
    const location = useLocation() ;
    
    const roleBasedRedirect = (res) =>{
        let intended=history.location.state;
        if (intended){
            history.push(intended.from);
            
        } 
        
        else {
            if (res.data.role === "admin"){
                history.push("/admin/dashboard");
            }
            else {
                history.push("/user/history");
            }
        }
    }

    const handleSubmit = async(e) =>{
       
    setLoading(true);
    e.preventDefault();
    try {
        const result = await auth.signInWithEmailAndPassword(email,password);
        const {user}=result;
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
    roleBasedRedirect(res);
})
.catch(err => console.log(err));
// history.push("/");


    
 } catch (err){
    {toast.error(err.message)}
    setLoading(false);
 }
}
    const googleLogin = async() =>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async(result)=>{

            const {user} = result;
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
                roleBasedRedirect(res);
        })
        .catch(err => console.log(err));
        // history.push("/");


        })
        .catch((err)=>{
            toast.error(err.message);
        });
        }

    
    function loginForm(){
        
        return (
            <>
            <div className="d-flex">
                <form  onSubmit={handleSubmit}>
                <input 
                type="email" 
                className="form-control mb-2" 
                placeholder="Enter email"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus="true"></input>

                <input 
                type="password" 
                className="form-control mb-2" 
                placeholder="Enter password"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}>
                </input>
                
                
                <button 
                onClick={handleSubmit} 
                type="submit" 
                style={{width:"510px"}} 
                disabled = {!email || password.length<6}
                className="btn btn-dark rounded-pill mb-2">
                <i class="fa fa-envelope p-1"></i>Login with Email/Password
                
                </button>

                
                </form>
            </div>
            <div>
                <button 
                onClick={googleLogin} 
                type="submit" 
                style={{width:"510px"}} 
                // disabled = {!email || password.length<6}
                className="btn btn-danger rounded-pill form-control mb-2">
                <i class="fa-brands fa-google p-1"></i>Login with Google
                </button>
            </div>
            
            <div><Link to="/forgot/password" className="text-danger d-flex flex-row-reverse">Forgot Password</Link></div>
         </>   
        );

    }
    
return (
    <>
   
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
               {loading ?<h4>Loading...</h4>: <h4>Login</h4>}
                {loginForm()}
                
            </div>
        </div>
    </div>
    </>
    );
}
export default Login;