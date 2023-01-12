import axios from "axios";

export const createCategory = async (category,authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/category`,category, {
        headers: {
            authtoken:authtoken
        },
    });


export const getCategories = async () =>
     await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const removeCategory = async (slug,authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers : {
            authtoken : authtoken
        },
    });


export const updateCategory = async (slug,category,authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers : {
            authtoken : authtoken
        },
    });

    export const getSingleCategory = async (slug) => {
        return await axios.post(`${process.env.REACT_APP_API}/category/${slug}`,slug);
    }
