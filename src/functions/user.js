import axios from "axios";

export const userCart = async (cart,authtoken) =>
 await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart},{
    headers : {
        authtoken : authtoken
    } 
 }); 


 export const getUserCart = async (authtoken) =>
 await axios.get(`${process.env.REACT_APP_API}/user/cart`,{
    headers : {
        authtoken : authtoken
    } 
 }); 

 export const emptyCart = async (authtoken) =>
 await axios.delete(`${process.env.REACT_APP_API}/user/cart`,{
    headers : {
        authtoken : authtoken
    } 
 });

 export const saveUserAddress = async (address,authtoken) =>
 await axios.post(`${process.env.REACT_APP_API}/user/address`,{address},{
    headers : {
        authtoken : authtoken
    } 
 });

 export const applyCoupon = async (coupon, authtoken) =>
 await axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`,{coupon},{
    headers : {
        authtoken
    }
 });

 export const createOrder = async (stripeResponse, authtoken) =>
 await axios.post(`${process.env.REACT_APP_API}/user/order`,{stripeResponse},{
    headers : {
        authtoken
    }
 });

 export const getOrders = async (authtoken) =>
 await axios.get(`${process.env.REACT_APP_API}/user/order`,{
    headers : {
        authtoken
    }
 });


 //wishlist

 export const getWishList = async(authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist` , {
    headers :{
        authtoken
    }
  });

  export const removeWishList = async(productId,authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}` , {productId},{
    headers :{
        authtoken
    }
  });

  export const addToWishList = async(productId,authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/user/wishlist` , {productId},{
    headers :{
        authtoken
    }
  });

  export const createCODOrder = async (COD,authtoken,coupon) =>
 await axios.post(`${process.env.REACT_APP_API}/user/cash-order`,{COD,coupon},{
    headers : {
        authtoken
    }
 });