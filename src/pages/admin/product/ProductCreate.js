import React, {useState,useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories } from "../../../functions/category";
import { getSubs } from "../../../functions/sub";
import {Select} from "antd";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons";

const {Option} = Select;

const initialState = {
title:"",
description:"",
price:"",
categories:[],
category:"",
subs:[],
shipping :"",
quantity :"",
images:[],
colors: ["Black", "Brown", "Silver","White","Blue"],
brands : ["Apple", "Samsung", "Microsoft","Lenovo","Asus"],
color:"",
brand:""
}
// 637f60e51f4a7ae3f1a978a7
const ProductCreate = () => {

    const [values,setValues] = useState(initialState);
    const {user} = useSelector((state) => ({...state}));
    const {title,description,price,categories,category,subs,shipping,quantity,images,colors,brands,color,brand} = values;
    const [parent,setParent] = useState("");
    const [suboptions,setSuboptions] = useState([]);
    const [loading,setLoading] = useState(false);
    
    
    useEffect(() => {
        loadCategories(); 
        loadSubs();
        
    },[]);

    const loadCategories =() => {
        getCategories().then((c) => setValues({...values,categories:c.data}));
        // console.log(values.categories);     
    }

    const loadSubs =() => {
        getSubs().then((s) => setSuboptions(s.data));
    
    }
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        createProduct(values,user.token)
        .then(res => {
            // console.log(res);
            window.alert(`${res.data.title} is created`);
            window.location.reload();
        })
        .catch((err) => {
            // console.log(err);
            toast.error(err.response.data.err);
        });
    }

    const handleChange = (e) => {
        // console.log("IMAGES",e.target.images);
        // console.log("Names",e.target.name);
        setValues({...values,[e.target.name]:e.target.value,subs:[]});
        // console.log(e.target.name,"---->",e.target.value);
        // console.log(JSON.stringify(values));
        // console.log(category);
        // console.log(subs);
    }

    // const searched = (category) => (c) => {
        
    //     return c.parent===category;
    //     }


 return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
            {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Create product</h4>}

            
            
            <div>
                <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                <br></br>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" value={description} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                <label>Price</label>
                <input type="text" name="price" className="form-control" value={price} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange ={handleChange}>
                <option>Please select </option>
                <option value="No"> No </option>
                <option value="Yes"> Yes </option>
                </select>
                </div>

                <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange ={handleChange}>
                <option>Please select </option>
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                </div>

                <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange ={handleChange}>
                <option>Please select </option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                </div>

                <div className="form-group">
              <label>Category</label>
              <select name="category" className="form-control mb-2"
               onChange={handleChange}>
    
              <option>Select</option>
              
              {categories.map((c)=> (<option key={c._id} value={c._id}>{c.name}</option>) )}

             </select>

            </div> 

            {category && (
            <div className="form-group">
              <label>Sub category</label>
              <Select mode="multiple" value={subs} placeholder="Please select"
              style={{width:"100%"}}
               onChange={value => setValues({...values,subs:value})} 
                >

              {suboptions.filter((c) => c.parent===category).map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>) )}

             </Select>

            </div> 
            )}
            <br></br>
            
               <button className="btn btn-outline-info"> Save</button>
               <br></br>
            </form>

          
            
          </div>
        </div>
    </div>
     );
 }  
        

export default ProductCreate;