import React, {useEffect,useState} from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { productStar } from "../functions/product";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product=({match})=>{
    const [product,setProduct] = useState([]);
    const [star,setStar]=useState(0);
    const [related,setRelated] = useState([]);

    const {user}=useSelector((state) =>({...state}));

    const {slug}= match.params;

    useEffect (() =>{
        loadSingleProduct();
    },[slug])

    useEffect(()=>{
        if (product.rating && user){
            let existingRatingObject = product.rating.find((element) => (element.postedBy.toString()===user._id.toString()));
            existingRatingObject && setStar(existingRatingObject.star);
        }
        
    })

    const loadSingleProduct = () =>{
        getProduct(slug).then((res) => {
            setProduct(res.data);
            //load related
            getRelated(res.data._id).then((res) => setRelated(res.data))
        })
        
     }

     const onStarClick=(newRating,name)=>{
        setStar(newRating);
        
        productStar(name,newRating,user.token)
        .then((res) =>{
            loadSingleProduct();
            
        })
        .catch((err) =>{
            console.log(err);
        })
     }

return (
    <>
        <div className="container-fluid">
             <div className="row pt-4 ">
                <SingleProduct product={product} onStarClick={onStarClick} star={star}/>
             </div>

             <div className="row">
                <div className="col text-center pt-5 p-5">
                <hr ></hr>
                    <h4 className="bg-info p-3" >Related Products</h4>
                    <hr></hr>
                </div>
             </div>

             <div className="row pb-5">
                {related.length>0 ? related.map((r)=>(
                    <div key={r._id} className="col-md-4">
                       <ProductCard product={r} />
                    </div>
                    )) :
                     <div className="text-center col">No related products to show</div>}
             </div>
        </div>
    </>
);
}

export default Product;
