import axios from "axios";

export const getOrders = async(authtoken) =>
await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers : {
        authtoken
    }
});

export const updateStatus = async(orderId,orderStatus,authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/admin/orders`, {orderId,orderStatus},{
    headers : {
        authtoken
    }
});