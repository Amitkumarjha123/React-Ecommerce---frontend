import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckOut from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart =({history})=>{

    const { cart,user  } = useSelector((state)=> ({...state}));
    const dispatch = useDispatch();
    

    const getTotal = () =>{
        let total=0;
        cart.map((p) => total+=p.price*p.count);
        return total;
    }

    const showCartItems =()=>(
        <table className="table table-bordered" >
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>

            </thead>
            {cart.map((p) => (
                <ProductCardInCheckOut key={p._id} p={p} />
            ))}

        </table>
    );

    const saveOrderToDb = () =>{
        //
        userCart(cart,user.token)
        .then((res) => {
            // console.log("CART POST RES",res);
            if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => console.log("cart save err",err));
     }

     const saveCashOrderToDb = () =>{
        //
        userCart(cart,user.token)
        .then((res) => {
            // console.log("CART POST RES",res);
            dispatch({
                type : "COD",
                payload:true
            });

            if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => console.log("cart save err",err));
     }

return (
    <div className="container-fluid pt-2">

        <div className="row">
            <div className="col-md-8">
            <h4>Cart / {cart.length} Product</h4>
                {!cart.length ? <p>No Products in Cart.<Link to="/shop">Continue Shopping</Link></p> :
                showCartItems()}
            </div>

            <div className="col-md-4">
                <h4>Order Summary</h4>
                <hr></hr>
                <p>Products</p>
                {cart.map((c,i)=>(
                    <div key={i}>
                        <p>{c.title} x {c.count} = ₹{c.price * c.count}</p>
                    </div>
                ))}
                <hr></hr>
                Total : <b>₹{getTotal()}</b>
                <hr></hr>
                {
                    user ? (
                        <>
                        <button onClick={saveOrderToDb} 
                        className="btn btn-sm btn-primary mt-2"
                        disabled={!cart.length}
                        >Proceed to Checkout</button>

                        <br></br><br></br>

                        <button onClick={saveCashOrderToDb} 
                        className="btn btn-sm btn-warning mt-2"
                        disabled={!cart.length}
                        >Pay Cash on Delivery</button>

                        </>
                        
                        ) :
                    (
                        <Link to={
                            {pathname:"/login",
                            state : {from : "/cart"}
                        }}>
                        <button className="btn btn-sm btn-primary mt-2">
                         Login to Checkout
                        </button>
                        </Link>
                    )
                }
            </div>

        </div>

    </div>
);
}

export default Cart;
