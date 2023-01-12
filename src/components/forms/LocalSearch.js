import React from "react";

const LocalSearch =({handleSearchChange,keyword}) =>{

    // const handleSearchChange = (e) =>{
    //     e.preventDefault();
    //     setKeyword(e.target.value.toLowerCase());
    // }
    return (
        <div className="form-group col-md-6">
            <input 
            type="text"
             placeholder="Filter"
             className="form-control col-md-6 p-2"
             onChange={handleSearchChange}
             value={keyword}>
             </input>
        </div>
    );
}



export default LocalSearch;