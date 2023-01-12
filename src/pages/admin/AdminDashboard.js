import React, {useEffect,useState} from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders,updateStatus } from "../../functions/admin";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify"
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
    const [orders,setOrders] = useState([]);

    const {user} = useSelector((state) =>({...state}));

    useEffect(()=>{
        getOrders(user.token).then((res)=> {
            console.log(res.data);
            setOrders(res.data);
        })
    },[]);

    const handleStatusChange = (orderId,orderStatus) => {
        updateStatus(orderId,orderStatus,user.token).then((res) =>{
            toast.success("Status updated");
            getOrders(user.token).then((res) => setOrders(res.data));
            
        })
    }
    
   return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
    
            <div className="col-md-10">
            <div className="row">
                <h4>Admin Dashboard</h4>
                <Orders orders={orders} handleStatusChange ={handleStatusChange} />
            </div>
         </div>
        </div>
    </div>
    );
    }

export default AdminDashboard;