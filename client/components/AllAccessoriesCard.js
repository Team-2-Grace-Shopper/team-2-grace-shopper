import React, { useState } from "react";
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";

const AllAccessoriesCard = ({ accessory }) => {
    const [count, setCount] = useState(1);
    return (
        <div key= { accessory.id }>
            <Link to={`/accessories/${accessory.id}`}>
                <img src= { accessory.imageUrl1} />
                <h3>{ accessory.name }</h3>
            </Link>
            <span>
                <StarRatings
                    rating={accessory.rating * 1}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                    starDimension="15px"
                    starSpacing="0px"
                />
            </span>
            <div>
                <ul>
                    <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                    <li>{ count }</li>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </ul>
                <p>${ accessory.price }</p>
            </div>
            <button className={count > 0 ? "cta" : "ctadisabled"}>ADD TO CART</button>
        </div>
    )
}

export default AllAccessoriesCard;