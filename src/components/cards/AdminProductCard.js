import React from "react";
import {Card} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Meta} = Card;

const AdminProductCard =({product, handleRemove, slug})=> {
    const {title, description,images}= product;
    return (
        <Card
        cover={
            <img src={images && images.length ? images[0].url :"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80"} 
            style={{height:"150px", objectFit:"cover"}} className="p-1"></img>
        }
        actions ={[
        <Link to ={`/admin/product/${slug}`}>
        <EditOutlined />
        </Link>, 
        <DeleteOutlined onClick ={() => handleRemove(slug)} />
        ]}
        >
        <Meta title={title} description={`${description.substring(0,10)}...`} />
        </Card>
    );
}

export default AdminProductCard;