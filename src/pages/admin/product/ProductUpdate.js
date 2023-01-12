import React, {useState,useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { getProduct,updateProduct } from "../../../functions/product";
import {Select} from "antd";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons";
import { getCategories } from "../../../functions/category";
import { getSubs } from "../../../functions/sub";

const {Option} = Select;

const initialState = {title:"",
description:"",
price:"",
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


const ProductUpdate = ({history,match}) => {
    
    const {user} = useSelector(state => ({...state}));
    const [values,setValues] = useState(initialState);
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const {title,description,price,category,subs,shipping,quantity,images,colors,brands,color,brand} = values;
    const [parent,setParent] = useState("");
    const [suboptions,setSuboptions] = useState([]);
    const [categories,setCategories] = useState([]);
    const [subId,setSubId] = useState([]);
    
   
    
    useEffect(() => {
        loadProduct();
        loadCategories();
        loadSubs();
        },[]);


    const loadProduct =() => {
        getProduct(match.params.slug).then((e) => {
           setValues({...values, ...e.data});
            console.log(e.data);
        })
       }

       const loadCategories =() => {
        getCategories().then((c) => setCategories(c.data));
             
    }

    const loadSubs =() => {
        getSubs().then((s) => setSuboptions(s.data));
        let arr=[];
        subs.map((item) => {
            arr.push(item._id);
    });
        setSubId((prev) => arr);
        console.log(subId);
        console.log(suboptions);
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        values.subs=subId;
        values.category=category._id;
        updateProduct(match.params.slug,values,user.token)
        .then(res => {
           setLoading(false);
            toast.success(`"${res.data.title}" is updated`);
            
        })
        .catch(err => {
            
           setLoading(false);
           console.log(err);
        //    toast.success(`"${match.params.slug}" is updated`);
        //    if (err.response.status===400) toast.error(err.response.data);
        });
        
        history.push(`/admin/products`);
    }

    

    
    

 return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
            {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Update product</h4>}

            
            
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
                <select name="shipping" className="form-control" onChange ={handleChange}
                value={shipping==="Yes" ? "Yes" : "No"}>
                
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
                <select name="color" value={color} className="form-control" onChange ={handleChange}>
                
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                </div>

                <div className="form-group">
                <label>Brand</label>
                <select name="brand" value={brand} className="form-control" onChange ={handleChange}>
                
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                </div>

                <div className="form-group">
              <label>Category</label>
              <select name="category"  className="form-control mb-2"
               onChange={handleChange} >
              <option value={category._id}>{category.name}</option>
              {categories.map((c)=> (category._id!==c._id) && (<option key={c._id} value={c._id}>{c.name}</option>) )}

             </select>

            </div> 

            
            <div className="form-group">
              <label>Sub category</label>
              {subs && (<Select mode="multiple" value={subId} placeholder="Please select"
              style={{width:"100%"}}
               onChange={value => setSubId(value)} 
                >

              {suboptions.filter((e) => e.parent===category).map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>) )}

             </Select>)}

            </div> 
            
            <br></br>
            
               <button className="btn btn-outline-info"> Save</button>
               <br></br>
            </form>

          
            
          </div>
        </div>
    </div>
);
}

export default ProductUpdate;