import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategories} from "../../../functions/category";
import {createSub,getSubs,removeSub} from "../../../functions/sub";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {

    const {user} = useSelector(state => ({...state}));

    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [keyword,setKeyword] = useState("");
    const [parent,setParent] = useState("");
    const [subs,setSubs] = useState([]);
    

    useEffect(() => {
        loadCategories(); 
        loadSubs();
        
    },[]);

    const loadCategories =() => {
        getCategories().then((e) => setCategories(e.data));
    }
    const loadSubs =() => {
        getSubs().then((s) => setSubs(s.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        createSub({name, parent:parent},user.token)
        .then(res => {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`);  
            loadSubs();
        })
        .catch(err =>{
           setLoading(false);
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
            removeSub(slug,user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`${slug} is deleted`); 
                loadSubs();            
            })
            .catch(err => {
                if (err.response.status === 400){
                    setLoading(false);
                    toast.error(err.response.data);
                }
            });          
        }
    }

   const searched = (keyword) => (c) => {
    if (parent==="1"){
        return c.name.toLowerCase().includes(keyword);
    }
    return c.name.toLowerCase().includes(keyword)  && c.parent===parent;
    }

//    const filtered = subs.filter((c) => c.data.parent===parent);
    
    const categoryForm = () => {
       
        return(
        <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6">
                <label>Sub category name</label>
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
           {loading ? <h4>Loading...</h4> : <h4>Create Sub Category </h4>}

            <div className="form-group">
              <label>Parent category</label>
              <select name="parent" className="form-control mb-2"
               onChange={(e)=> {
                setParent(e.target.value);
                
                }}>
    
              <option>Select</option>
              <option value="1">All</option>
              {categories.length>0 && categories.map((c)=> (<option key={c._id} value={c._id}>{c.name}</option>) )}

             </select>

            </div>

            {categoryForm()}

            <br></br>

            <LocalSearch 
           handleSearchChange={handleSearchChange}
           keyword={keyword} />
            <hr></hr>
           
            {subs.filter(searched(keyword)).map((s) => (

                <div className="alert alert-secondary col-md-6 d-flex" key={s._id}>
                {s.name}
                <div className="ms-auto">
                <span 
                className=" btn btn-sm"
                 onClick={() => handleRemove(s.slug)}><DeleteOutlined />
                 </span>
                 <span className=" btn btn-sm">
                <Link  to = {`/admin/sub/${s.slug}`}><EditOutlined /></Link>
                </span>
                </div>
                
                
                </div>

            ))}
            </div>
        </div>
    </div>
);
}

export default SubCreate;