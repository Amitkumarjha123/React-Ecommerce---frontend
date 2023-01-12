import React, {useState,useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons,removeCoupon,createCoupon } from "../../../functions/coupon";
import {DeleteOutlined} from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";



const CreateCouponPage = () =>{
    const [name,setName] =  useState("");
    const [expiry,setExpiry] =  useState("");
    const [discount,setDiscount] =  useState("");
    const [loading,setLoading] =  useState(false);
    const [coupons,setCoupons] = useState([]);

    const {user} = useSelector((state) => ({...state}));

    useEffect(()=>{
        getCoupons().then((res) => {
            setCoupons(res.data);
        })
        .catch((err) => console.log("Load coupon err",err));
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        setLoading(true);
        createCoupon({name,expiry,discount},user.token)
        .then((res) =>{
            getCoupons().then((res) => setCoupons(res.data));
          setLoading(false);
          setName("");
          setDiscount("");
          setExpiry("");

          toast.success(`${name} is created`);
        })
        .catch((err)=> console.log("Create coupon error",err));
    }

    const handleRemove = (couponId) =>{
        setLoading(true);
        if (window.confirm("Delete ?")){
            removeCoupon(couponId,user.token).
            then ((res) =>{

                getCoupons().then((res) => setCoupons(res.data));
                setLoading(false);
                toast.success(`Coupon "${res.data.name}" deleted`);
            })
            .catch((err)=> console.log(err));
        }
    }

 

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                
                <div className="col-md-10">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Coupon</h4>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-muted">Name</label><br></br>
                            <input type="text" className="form-control" 
                            onChange={(e)=> setName(e.target.value)}
                            value={name}
                            autoFocus required
                            />
                        </div>
                        <br></br>
                        <div>
                            <label className="text-muted">Discount %</label><br></br>
                            <input type="text" className="form-control" 
                            onChange={(e)=> setDiscount(e.target.value)}
                            value={discount}
                            required
                            />
                        </div>
                        <br></br>
                        <div>
                            <label className="text-muted">Expiry</label><br></br>
                            <DatePicker 
                            className="form-control" 
                            required
                            selected={expiry}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date)=> setExpiry(date)} />
                        </div>
                        <br></br>
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                    <br></br>
                    <h4>{coupons.length} Coupons</h4>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Expiry</th>
                                <th>Discount%</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {coupons.map((c)=> <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                <td>{c.discount}</td>
                                <td><DeleteOutlined onClick={() => handleRemove(c._id)} style ={{cursor:"pointer"}} className="text-danger"/></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export  default CreateCouponPage;
