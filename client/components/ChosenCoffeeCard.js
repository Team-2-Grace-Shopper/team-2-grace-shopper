import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const ChosenCoffeeCard = ({ chosenCoffee }) => {
    const [count, setCount] = useState(1);
    return (
        <div key= { chosenCoffee.id }>
            <div className= 'singleItem'>
                <div className= 'chosenCoffee' key={chosenCoffee.id}>
                    <span>
                        <StarRatings
                            rating={chosenCoffee.rating * 1}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="15px"
                            starSpacing="0px"
                        />
                    </span>
                    <img src={chosenCoffee.imageUrl} />
                    <h1>{ chosenCoffee.name }</h1>
                    <p>{ chosenCoffee.description }</p>
                    <p>{ chosenCoffee.weight }oz</p>
                </div>
                <div>
                    <p>${ chosenCoffee.price }</p>
                    <button>ADD TO CART</button>
                </div>
                
            </div>
            
            <ul>
                <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                <li>{count}</li>
                <button onClick={() => setCount(count + 1)}>+</button>
            </ul>
            <p>${ chosenCoffee.price }</p>
            <button className={count > 0 ? "cta" : "ctadisabled"}>ADD TO CART</button>
        </div>
    )
}

export default ChosenCoffeeCard

//to do the add to cart you'll have to connect it

/*
<Link to={`/coffees/${coffee.id}`}>
                <img src= { coffee.imageUrl1} />
                <h3>{ coffee.name }</h3>
                <span>Rating: { coffee.rating }</span>
            </Link>
*/