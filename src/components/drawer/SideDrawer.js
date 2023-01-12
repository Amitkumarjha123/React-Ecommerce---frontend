import React from "react";
import { Drawer,Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

const SideDrawer =() =>{

    const dispatch=useDispatch();
    const {drawer,cart} = useSelector((state) => ({...state}));

    return (
        <Drawer 
        className="text-center"
        title={`Cart / ${cart.length} Product`}
        placement="right"
        visible={drawer}
        onClose = {() =>{
            dispatch({
                    type:"SET_VISIBLE",
                    payload:false
                });
        }}
        >
            {cart.map((p) => (
                <div classNam="row" key={p._id}>
                    <div className="col">
                        {p.images[0] ?  (
                            <>
                            <img src={p.images[0].url} style={{width:"100%",height:"150px", objectFit:"cover"}} />
                            <p className="text-center bg-info text-light">
                                {p.title} x {p.count}
                            </p>
                            </>
                        ):(
                            <>
                            <img style={{width:"100%",height:"50px", objectFit:"cover"}} src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80"  />
                            <p className="text-center bg-info text-light">
                                {p.title} x {p.count}
                            </p>
                            </>
                        )}
                    </div>

                </div>
            ))}
            <br></br>
            <Link to="/cart" >
                <button className="text-center btn btn-primary" onClick={() =>(
                    dispatch({
                       type:"SET_VISIBLE",
                       payload:false  
                    })
                )}>
                Go To Cart
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer;