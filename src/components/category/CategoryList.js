import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import LoadingOutlined from "@ant-design/icons";
import CategoryCreate from "../../pages/admin/category/CategoryCreate";

const CategoryList =()=>{
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getCategories().then(c => {
            setCategories(c.data);
            setLoading(false);
        })
    },[])

    const showCategories =() => (
        categories.map((c) => 
        <Link to={`/category/${c.slug}`} key={c._id} className="col btn btn-dark btn-block btn-raised m-3">
         {c.name}
        </Link>
        )
    );

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center"><LoadingOutlined /></h4>) : showCategories()}
            </div>
        </div>
    );
}

export default CategoryList;