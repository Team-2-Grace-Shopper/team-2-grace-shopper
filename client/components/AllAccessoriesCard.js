import React, { useState } from "react";
import { Link } from 'react-router-dom';

const AllAccessoriesCard = ({ accessory }) => {
    const [count, setCount] = useState(0);
    return (
        <div key= { accessory.id }>
            <Link to={`/accessories/${accessory.id}`}>
                <img src= { accessory.imageUrl1} />
                <h3>{ accessory.name }</h3>
                <span>Rating: { accessory.rating }</span>
            </Link>
            <ul>
                <button onClick={() => setCount(count - 1)}>-</button>
                <li>{ count }</li>
                <button onClick={() => setCount(count + 1)}>+</button>
            </ul>
            <p>${ accessory.price }</p>
            <button>ADD TO CART</button>
        </div>
    )
}

export default AllAccessoriesCard;