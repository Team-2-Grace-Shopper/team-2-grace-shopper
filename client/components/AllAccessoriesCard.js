import React, { useState } from "react";
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";

const AllAccessoriesCard = ({ accessory }) => {
    const [count, setCount] = useState(1);
    return (
        <div key={accessory.id} className="itemcard">
            <div>
                <Link to={`/accessories/${accessory.id}`}>
                    <img src={accessory.imageUrl1} />
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
                <Link to={`/accessories/${accessory.id}`}>
                    <h3>{accessory.name}</h3>
                </Link>
            </div>
            <div>
                <ul>
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <li>{count}</li>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </ul>
                <p>${accessory.price}</p>
                <button>ADD TO CART</button>
            </div>

        </div>
    )
}

export default AllAccessoriesCard;