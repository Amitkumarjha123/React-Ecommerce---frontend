import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {SearchOutlined} from "@ant-design/icons";

const Search =() =>{
    let dispatch = useDispatch();
    const {search} = useSelector((state) => ({...state}));
    const {text} = search;

    const history=useHistory();

    const handleChange= (e) => {
        dispatch({
            type : "SEARCH_QUERY",
            payload : {text : e.target.value}
        
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`shop?${text}`);
    }

    return (
        <form className="form-inline my-1 my-lg-0" onSubmit={handleSubmit}>
            <input 
            onChange={handleChange}
            type="search" 
            value={text} 
            className="form-inline"
            placeholder="Search"
            />
            <SearchOutlined onClick={handleSubmit} style ={{cursor:"pointer"}} />
        
    
        </form>
    );  

}

export default Search;
