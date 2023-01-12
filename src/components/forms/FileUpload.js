import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import {Avatar,Badge} from "antd";

const FileUpload = ({values,setValues,setLoading}) => {
    const {user} = useSelector((state) => ({...state}));
    
    
    const fileUploadAndResize = (e) => {
        
        let files = e.target.files;
        let allUploadedFiles = values.images;
        // console.log(files);
        if (files) {
            setLoading(true);

            Array.from(files).forEach((item) => {
                Resizer.imageFileResizer(item, 720,720,"JPEG",100,0, (uri) =>{
                //  console.log(uri);
                 axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image:uri},{
                    headers :{
                        authtoken : user ? user.token :""
                    }
                 })
                 .then(res => {
                    console.log("IMAGE UPLOAD RES DATA", res);
                    setLoading(false);
                    allUploadedFiles.push(res.data);

                    setValues({...values,images:allUploadedFiles});
                    
                 })
                 .catch(err => {
                    setLoading(false);
                    console.log("CLOUDINARY upload ERROR",err);
                    
                 });
                },"base64");
                
            });
        }
}

const handleImageRemove=(public_id) =>{
    setLoading(true);
    // console.log("remove",public_id);
    axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
        headers : {
            authtoken:user ? user.token :""
        }
    })
    .then((res) => {
        setLoading(false);
        let filteredImages = values.images.filter((item) =>{
            return item.public_id!==public_id;
        });
        setValues({...values,images:filteredImages})
    })
    .catch((err) => {
        console.log(err);
        setLoading(false); 
    })
}
    return (
    <>
    <div className="">
    {values.images.map((item) => (
         <Badge  count="X" style={{cursor:"pointer"}} onClick={()=> handleImageRemove(item.public_id)}>
         <Avatar key={item.public_url} src={item.url} size={100} shape="square" className="ms-3 mb-3" />
         </Badge>
    ))}
    
    </div>

    <div>
    
    <label className="btn btn-primary btn-raised" >Choose File
    <input name="images" type="file" multiple accept="images/*" onChange={fileUploadAndResize} hidden></input>
    </label> 
    </div>
    
    
    </>
    );
}

export default FileUpload;
