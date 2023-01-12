import React, {useState,useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getSub,updateSub} from "../../../functions/sub";
import {getCategories} from "../../../functions/category";


const SubUpdate = ({history,match}) => {
    
    const {user} = useSelector(state => ({...state}));

    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [parent,setParent] = useState("");
    const [categories,setCategories] = useState([]);
    
    useEffect(() => {
        loadCategories(); 
        loadSub();
        setParent(parent);
    },[]);

    const loadCategories =() => {
        getCategories().then((e) => setCategories(e.data));
    }

    const loadSub =() => {
        getSub(match.params.slug).then((e) => {
            
            setName(e.data.sub.name);
            setParent(e.data.sub.parent);
        })
       }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        updateSub(match.params.slug,{name},user.token)
        .then(res => {
           
            setLoading(false);
            toast.success(`"${res.data.name}" is updated`);
            loadSub();
        })
        .catch(err => {
            
           setLoading(false)
           toast.success(`"${match.params.slug}" is updated`);
           loadSub();
        //    if (err.response.status===400) toast.error(err.response.data);
        });
        
        history.push("/admin/sub");
    }


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
           {loading ? <h4>Loading...</h4> : <h4>Sub Category Update Page</h4>}

           <div className="form-group">
              <label>Parent category</label>
              <select name="parent" className="form-control mb-2"
               onChange={(e)=> {
                setParent(e.target.value);
                
                }}>
    
              <option>Select</option>
              {categories.length>0 && categories.map((c)=> (<option key={c._id} value={c._id} selected={c._id===parent}>{c.name}</option>) )}

             </select>

            </div>

            {categoryForm()}
            <hr></hr>
           
            </div>
        </div>
    </div>
);
}

export default SubUpdate;