import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createCategory,getCategories,removeCategory} from "../../../functions/category";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {

    const {user} = useSelector(state => ({...state}));

    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [keyword,setKeyword] = useState("");
    

    useEffect(() => {
        loadCategories(); 
    },[]);

    const loadCategories =() => {
        getCategories().then((e) => setCategories(e.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        createCategory({name},user.token)
        .then(res => {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`);
            loadCategories();
        })
        .catch(err =>{
            
            setLoading(false)
           if (err.response.status===400) toast.error(err.response.data);
        });
        
       
    }
    const handleSearchChange = (e) =>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    const handleRemove = async(slug) =>{
        if (window.confirm("Delete ?")) {
            setLoading(true);
            removeCategory(slug,user.token)
            .then((res) => {
                loadCategories();
                
                setLoading(false);
                toast.success(`${slug} is deleted`);
                
            })
            .catch(err => {
                if (err.response.status === 400){
                    setLoading(false);
                    toast.error(err.response.data);
                }
            });
            
        }
    }

    

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
    
    

    const categoryForm = () => {
       
        return(
        <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6">
                <label>Name</label>
                <input type="text" 
                className="form-control mb-2" 
                onChange={e => setName(e.target.value)}
                autoFocus
                value={name}>
                </input>

                <button type="submit" className="btn btn-outline-primary">Save</button>
            </div>
        </form>
        );
        }
    

 return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
           {loading ? <h4>Loading...</h4> : <h4>Create Category </h4>}
            {categoryForm()}

            <br></br>

            <LocalSearch 
           handleSearchChange={handleSearchChange}
           keyword={keyword} />
            <hr></hr>
           
          

            
            {categories.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary col-md-6 d-flex" key={c._id}>
                {c.name}
                <div className="ms-auto">
                <span 
                className=" btn btn-sm"
                 onClick={() => handleRemove(c.slug)}><DeleteOutlined />
                 </span>
                 <span className=" btn btn-sm">
                <Link  to = {`/admin/category/${c.slug}`}><EditOutlined /></Link>
                </span>
                </div>
                
                
                </div>

            ))}
            </div>
        </div>
    </div>
);
}

export default CategoryCreate;