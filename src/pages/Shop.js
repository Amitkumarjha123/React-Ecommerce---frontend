import React, { useEffect,useState } from "react";
import { getProductsByCount,getProductsByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector,useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import {LoadingOutlined, DownSquareOutlined} from "@ant-design/icons";
import {Menu,Slider,Checkbox, Radio} from "antd";
import StarRating from "react-star-ratings";

const Shop = () =>{
    const [products,setProducts] =  useState([]);
    const [price,setPrice] = useState([0,0]);  
    const [loading,setLoading] = useState(false);
    const [ok,setOk] = useState(false);
    const [categories,setCategories] = useState([]);
    const [subs,setSubs] = useState([]);
    const [categoryIds,setCategoryIds] = useState([]);
    const [subId,setSubId] = useState([]);
    const [star,setStar] = useState(0);
    const [brands,setBrands] = useState(["Apple", "Samsung", "Microsoft","Lenovo","Asus"]);
    const [brandSelect, setBrandSelect]= useState("");
    const [colors,setColors] = useState(["Black", "Brown", "Silver","White","Blue"]);
    const [colorSelect,setColorSelect] = useState("");
    const [shipping,setShipping] = useState("");

    const {search} = useSelector((state) => ({...state}));
    const {text} = search;
    const {SubMenu,ItemGroup}= Menu;

    let dispatch = useDispatch();

    //2. load products on query
    useEffect (()=>{
        
        const delayed = setTimeout(()=>{
            fetchProducts({query : text}); 
            setPrice([0,0]); 
            setCategoryIds([]);
            setStar(0);
            setSubId("");
            setBrandSelect("");
            setColorSelect("");
            setShipping("");
        },300);

        
       return () => clearTimeout(delayed); 
    },[text])

    //3. load products on price
    useEffect(() =>{
        fetchProducts({price})
    },[ok]);

    const fetchProducts = (arg)=>{
        getProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    }

    const handleSlider =(value)=>{
        dispatch({
            type: "SEARCH_QUERY",
            payload :{text : ""}
        });
        setCategoryIds([]);
        setStar(0);
        setSubId("");
        setBrandSelect("");
        setColorSelect("");
        setShipping("");

        setPrice(value);
        setTimeout(() =>{
            setOk(!ok);
        },300);
    }

    //4. load products based on category - show categories in a list of checkbox
        const showCategories = () => (
            categories.map((c)=> <div  key={c._id}>
                <Checkbox 
                className="pb-2 pe-4 ps-4" 
                name="category" 
                value={c._id}
                checked={categoryIds.includes(c._id)}
                onChange={handleCheck}
                >
                {c.name}
                </Checkbox>
            </div>)
        )

        const handleCheck =(e)=>{

            dispatch({
                type: "SEARCH_QUERY",
                payload :{text : ""}
            })
            setPrice([0,0]);
            setStar(0);
            setSubId("");
            setBrandSelect("");
            setColorSelect("");
            setShipping("");

            let inTheState = [...categoryIds];
            let justChecked = e.target.value;
            let foundInTheState = inTheState.indexOf(justChecked); //returns index || -1

            if (foundInTheState === -1){
                inTheState.push(justChecked);
            } else {
                inTheState.splice(foundInTheState,1);
            }

            setCategoryIds(inTheState);
            fetchProducts({category:inTheState});
        }

         // 5. load products on star filter
        const showStarRating = () =>(
            <div className="me-4 ms-4">
            <StarRating
                name={star} starRatedColor="red" isSelectable={true}
                rating={star} 
                changeRating ={onStarClick}
                numberOfStars={5}
                starDimension="20px" starSpacing="2px"
                
            />
            </div>
        )

        const onStarClick =(newRating,name)=>{
            
                dispatch({
                    type: "SEARCH_QUERY",
                    payload :{text : ""}
                });
                setCategoryIds([]);
                setPrice([0,0]);
                setSubId("");
                setBrandSelect("");
                setColorSelect("");
                setShipping("");

            setStar(newRating);
            
            fetchProducts({stars:newRating});
        }

        //6 load products on sub categories
        const showSubs = () => {
            return (
                <div className="me-4 ms-4">
                    {subs.map((sub) => (<div key={sub._id} onClick={()=> handleSub(sub)} 
                    className="p-1 m-1 badge bg-secondary"   
                    style ={{cursor :"pointer"}}>
                    {sub.name}
                    </div>))}
                </div>
            );
        }

        const handleSub= (sub) =>{
            dispatch({
                type: "SEARCH_QUERY",
                payload :{text : ""}
            });
            setCategoryIds([]);
            setPrice([0,0]);
            setStar(0);
            setBrandSelect("");
            setColorSelect("");
            setShipping("");

            setSubId(sub);
            fetchProducts({sub:sub});
        }

        //7 load products based on Brands
        const showBrands = () => (
            brands.map((b) => (
                <div className="me-4 ms-4">
                <Radio
                    value={b}
                    name={b}
                    checked={b===brandSelect}
                    onChange={handleBrand}
                    className="pb-1" >
                    {b}
                </Radio>
                </div>
                ))
        );

        const handleBrand =(e) =>{
            dispatch({
                type: "SEARCH_QUERY",
                payload :{text : ""}
            });
            setCategoryIds([]);
            setPrice([0,0]);
            setStar(0);
            setColorSelect("");
            setShipping("");

            setBrandSelect(e.target.value);
            fetchProducts({brand:e.target.value});
        }

        //8 load products based on Colors
        const showColors = () => (
            colors.map((b) => (
                <div className="me-4 ms-4">
                <Radio
                    value={b}
                    name={b}
                    checked={b===colorSelect}
                    onChange={handleColor}
                    className="pb-1" >
                    {b}
                </Radio>
                </div>
                ))
        );
        
        const handleColor =(e) =>{
            dispatch({
                type: "SEARCH_QUERY",
                payload :{text : ""}
            });
            setCategoryIds([]);
            setPrice([0,0]);
            setStar(0);
            setBrandSelect("");
            setShipping("");

            setColorSelect(e.target.value);
            fetchProducts({color:e.target.value});
        }


        //8 load products based on Colors
        const showShipping = () => (
           
                <div className="me-4 ms-4">
                    <Radio
                        value="Yes"
                        name="Yes"
                        checked= {shipping==="Yes"}
                        onChange={handleShipping}
                        className="pb-1 " >
                        Yes
                    </Radio>

                    <Radio
                        value="No"
                        name="No"
                        checked={shipping==="No"}
                        onChange={handleShipping}
                        className="pb-1" >
                        No
                    </Radio>
                </div>          
        );

        const handleShipping =(e) =>{
            dispatch({
                type: "SEARCH_QUERY",
                payload :{text : ""}
            });
            setCategoryIds([]);
            setPrice([0,0]);
            setStar(0);
            setBrandSelect("");
            setColorSelect("");

            setShipping(e.target.value);
            fetchProducts({shipping:e.target.value});
        }
        
        

         //1. load products on default
        useEffect(() =>{
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
        getSubs().then((res) => setSubs(res.data));
        
        },[]);

        const loadAllProducts =() =>{
        getProductsByCount(12).then((p) =>{
            setProducts(p.data);
            setLoading(false);
        });
    }

       
    
        

    return (
        <div className="container-fluid">
            <div className="row"> 
                <div className="col-md-3 pt-3">
                    <h4>Search/Filter menu</h4>

                    <Menu defaultOpenKeys={["1","2","3","4","5","6","7"]} mode="inline">
                        {/* price */}
                        <SubMenu key="1" title ={<span className="h6"><i class="fa fa-inr"></i>{" "}Price</span>}>
                            <div>
                                <Slider className="me-4 ms-4" 
                                key="2"
                                tipFormatter={(v)=> `₹ ${v}`}
                                range 
                                value={price}
                                onChange={handleSlider}
                                max="8000" />
                            </div>
                        </SubMenu>
                        
                        {/* category */}
                        <SubMenu key="2" 
                            title ={
                            <span className="h6">
                            <DownSquareOutlined /> Category
                            </span>}>

                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        {/* star rating */}
                        <SubMenu key="3" 
                            title ={
                            <span className=" h6">
                            <DownSquareOutlined /> Star rating
                            </span>}>

                            <div  >
                                {showStarRating()}
                            </div>
                        </SubMenu>

                        {/* sub category */}
                        <SubMenu key="4" 
                            title ={
                            <span className="h6">
                            <DownSquareOutlined /> Sub Categories
                            </span>}>

                            <div>
                                {showSubs()}
                            </div>
                        </SubMenu>

                        <SubMenu key="5" 
                            title ={
                            <span className="h6">
                            <DownSquareOutlined /> Brands
                            </span>}>

                            <div>
                               {showBrands()}
                            </div>
                        </SubMenu>

                        <SubMenu key="6" 
                            title ={
                            <span className="h6">
                            <DownSquareOutlined /> Colors
                            </span>}>

                            <div>
                               {showColors()} 
                            </div>
                        </SubMenu>

                        <SubMenu key="7" 
                            title ={
                            <span className="h6">
                            <DownSquareOutlined /> Shipping
                            </span>}>

                            <div>
                               {showShipping()} 
                               
                            </div>
                        </SubMenu>
                            
                    </Menu>
                    <br></br>
                    <br></br>
                </div>

                <div className="col-md-9 pt-3">
                    {loading ? (<LoadingOutlined className="h1 text-danger text-center" />) :
                     (<h4 className="text-danger text-center">Products</h4>)}

                     {products.length<1 && <p>No products found</p>}

                     <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-4">
                                <ProductCard product={p} />
                            </div>
                            ))}
                     </div>

                </div>
            </div>
        </div>
    );
}

export default Shop;