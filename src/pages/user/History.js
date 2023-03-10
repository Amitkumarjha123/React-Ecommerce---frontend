import React, {useState,useEffect} from "react";
import UserNav from "../../components/nav/UserNav";
import { getOrders } from "../../functions/user";
import { useSelector,useDispatch } from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { Document, Page, Text, View, StyleSheet,PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
import Invoice from "../../components/order/Invoice";

const History = () =>{

    const [orders,setOrders] = useState([]);
    const {user} = useSelector((state)=> ({...state}));

    useEffect(() =>{
        getOrders(user.token).then((res) => {
            console.log("Orders", res.data);
            setOrders(res.data);
        });
    },[]);

    const productsInEachOrder = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p,i) =>(
                    <tr key={i}>
                        <td><b>{p.product.title}</b></td>
                        <td>₹{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping==="Yes" ? <CheckCircleOutlined style={{color:"green"}} /> : <CloseCircleOutlined style={{color:"red"}}/> }</td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const showDownloadLink = (order) =>(
        <PDFDownloadLink document ={
            <Invoice order={order} />
        }
        fileName="invoice.pdf"
        className="btn btn-sm btn-outline-primary"
        >
         Download PDF   
        </PDFDownloadLink>
    )

    const ordersList = () => 
        orders.reverse().map((order,i) => (
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} style={""} />

            {productsInEachOrder(order)}
            <div className="row">
                {showDownloadLink(order)}
            </div>
        </div>
    ));
    

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col text-center">
            <h4>{orders.length >0 ? "User purchased orders" : "No purchase orders"}</h4>
            {ordersList()}
            </div> 
        </div>
    </div>
    );
};

export default History;