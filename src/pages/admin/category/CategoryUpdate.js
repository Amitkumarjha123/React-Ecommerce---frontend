import React, {useState,useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategory,updateCategory} from "../../../functions/category";


const CategoryUpdate = ({history,match}) => {
    
    const {user} = useSelector(state => ({...state}));

    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
   
    
    useEffect(() => {
        loadCategory();
        
    },[]);

    const loadCategory =() => {
        getCategory(match.params.slug).then((e) => {
            console.log(e);
            setName(match.params.slug);
        })
       }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        updateCategory(match.params.slug,{name},user.token)
        .then(res => {
           
            setLoading(false);
            toast.success(`"${res.data.name}" is updated`);
            
        })
        .catch(err => {
            
           setLoading(false)
           toast.success(`"${match.params.slug}" is updated`);
        //    if (err.response.status===400) toast.error(err.response.data);
        });
        
        history.push("/admin/category");
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
           {loading ? <h4>Loading...</h4> : <h4>Category Update Page</h4>}
            {categoryForm()}
            <hr></hr>
           
            </div>
        </div>
    </div>
);
}

export default CategoryUpdate;