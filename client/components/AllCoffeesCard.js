import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const AllCoffeesCard = ({ coffee }) => {
    const [count, setCount] = useState(1);
    return (
        <div key= { coffee.id }>
            <Link to={`/coffees/${coffee.id}`}>
                <img src= { coffee.imageUrl1} />
                <h3>{ coffee.name }</h3>
                <span>Rating: { coffee.rating }</span>
            </Link>
            <ul>
                <button onClick={() => setCount(count - 1)}>-</button>
                <li>{count}</li>
                <button onClick={() => setCount(count + 1)}>+</button>
            </ul>
            <p>${ coffee.price }</p>
            <button>ADD TO CART</button>
        </div>
    )
}

export default AllCoffeesCard

//to do the add to cart you'll have to connect it