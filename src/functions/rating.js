import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) =>{
    if (p && p.rating) {
        let ratingsArray =p.rating;
        
        let total=0;
        let length=ratingsArray.length;

        ratingsArray.map((r) => total+=r.star);
        
        let result=total/length;
       


    return(
        <div className="text-center pt-1 pb-3">
            <span>
                <StarRating rating={result} 
                starDimension="20px"
                starSpacing="=2px"
                isSelectable={true}
                starRatedColor="red"
                editing={false} />
                ({p.rating && p.rating.length})
            </span>
        </div>
    );
}
};