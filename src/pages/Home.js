import React, {useEffect,useState} from "react";
import Border from "../components/cards/Border";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {

return (
    <>
    <div className="mt-4 p-5 bg-info h1 font-weight-bold text-center rounded"> 
    <Border text ={["Latest Products", "New Arrivals", "Best Sellers"]} />
    </div>
    <br></br>

    <h4 className="mt-4 p-3 bg-info font-weight-bold text-center rounded">
    New Arrivals
    </h4>
    <NewArrivals />
    <br></br>

    <h4 className="mt-4 p-3 bg-info font-weight-bold text-center rounded">
    Best Sellers
    </h4>
    <BestSellers />
    <br></br>

    <h4 className="mt-4 p-3 bg-info font-weight-bold text-center rounded">
    Categories
    </h4>
    <CategoryList />
    <br></br>

    <h4 className="mt-4 p-3 bg-info font-weight-bold text-center rounded">
    Sub Categories
    </h4>
    <SubList />
    <br></br>
    </>

    
);
}
export default Home;