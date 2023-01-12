import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import LoadingOutlined from "@ant-design/icons";
import CategoryCreate from "../../pages/admin/category/CategoryCreate";

const SubList =()=>{
    const [subs,setSubs] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getSubs().then(c => {
            setSubs(c.data);
            setLoading(false);
        })
    },[])

    const showSubs =() => (
        subs.map((c) => 
        <Link to={`/sub/${c.slug}`} key={c._id} className="col btn btn-dark btn-block btn-raised m-3">
         {c.name}
        </Link>
        )
    );

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center"><LoadingOutlined /></h4>) : showSubs()}
            </div>
        </div>
    );
}

export default SubList;