import React,{useState} from "react";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined,CloseOutlined} from "@ant-design/icons"

const ProductCardInCheckOut =({p}) => {
const colors=["Black", "Brown", "Silver","White","Blue"];
const [quantity,setQuantity] = useState(1);

let dispatch = useDispatch();
// const {cart,user} = useSelector((state)=> ({...state}));

const handleColorChange =(e) =>{
    
    let cart=[];
    
        if (typeof (window) !== "undefined"){

            if (localStorage.getItem("cart")) {
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            
            cart.map((product,i) =>{
                
                if (product._id ===p._id) {
                    cart[i].color = e.target.value;
                }
            });

            
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch ({
                type :"ADD_TO_CART",
                payload:cart
            });
        }
 }

 

 const handleQuantityChange =(e) =>{

    
    setQuantity(e.target.value);
    console.log(quantity);

    let cart=[];
        if (typeof (window) !== "undefined"){

            if (localStorage.getItem("cart")) {
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            
            cart.map((product,i) =>{
                if (product._id ===p._id) {
                    cart[i].count = e.target.value;
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch ({
                type :"ADD_TO_CART",
                payload:cart
            });
        }
 }

 const handleRemove = (e) =>{

    let cart=[];
        if (typeof (window) !== "undefined"){

            if (localStorage.getItem("cart")) {
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            
            cart.map((product,i) =>{
                if (product._id ===p._id) {
                    cart.splice(i,1);
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch ({
                type :"ADD_TO_CART",
                payload:cart
            });
        }
 }


    return (
        <tbody>
            <tr>
                <td>
                    <div style={{width:"100px" , height:"auto"}}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />
                            ) : (
                                <ModalImage small="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80" large="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80" />
                            )
                        }
                    </div>
                </td>
                <td>{p.title}</td>
                <td>₹{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name="color" className="form-control-md">
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                        {colors.filter((c)=> c!==p.color).map((p) => <option key={p} value={p} >{p}</option>)}
                    </select>
                </td>

                <td >
                 
                   <input type="number" id="quantity" name="quantity" min="1" max={p.quantity} 
                    onChange={handleQuantityChange}
                    step="1" autofocus="autofocus"
                    value={quantity}
                   />
                  
                    
                </td>

                <td className="text-center">
                    {p.shipping ==="Yes" ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />} 
                </td>

                <td className="text-center">
                    <CloseOutlined 
                     style={{cursor:"pointer"}}
                     onClick={handleRemove }
                     className="text-danger text-center"
                     />
                </td>
            </tr>
        </tbody>
    );
}

export default ProductCardInCheckOut;