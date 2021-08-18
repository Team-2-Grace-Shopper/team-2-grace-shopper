import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import CoffeeCarousel from './CoffeeCarousel';
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const notify = () => toast.success('Added to cart!', { duration: 3000, position: 'top-center' });
const notify2 = () => toast.error('This will exceed our inventory!',  { duration: 3000, position: 'top-center' })

const addToShopCart = (userId, id, count, price, coffee) =>{
    addToCart(userId, id, count, price, coffee);
    notify();
}

const _ChosenCoffeeCard = ({ chosenCoffee, userId, addToCart }) => {
    const [count, setCount] = useState(1);

    return (
        <div key= { chosenCoffee.id }>
            <div className= 'singleItem'>
                <div className= 'chosenCoffeeInfo' key={chosenCoffee.id}>
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
                    {chosenCoffee.onSale ? <span className="label">ON SALE</span> : null}
                    <CoffeeCarousel chosenCoffee={chosenCoffee} key={chosenCoffee.id}/>
                    <h1>{ chosenCoffee.name }</h1>
                    <p>{ chosenCoffee.description }</p>
                    <p>{ chosenCoffee.weight }oz</p>
                </div>
            </div>
            
            <div>
                <div>
                    <ul>
                        <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                        <li>{count}</li>
                        <button onClick={() => {
                            count < chosenCoffee.inventory ?
                                setCount(count + 1)
                                :                
                                notify2();
                        }
                        }>+</button>
                    </ul>
                    <p>{chosenCoffee.onSale && <span><del>${chosenCoffee.price}</del> - sale:  ${chosenCoffee.salePrice}</span>}
                    {!chosenCoffee.onSale && <span>${chosenCoffee.price}</span>}
                    </p>
                </div>
                <button className={count > 0 ? 'cta' : 'ctadisabled'}
                    onClick={() => addToShopCart(userId, chosenCoffee.id, count, chosenCoffee.price, chosenCoffee)}
                    >ADD TO CART</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userId: state.auth.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const ChosenCoffeeCard = connect(mapStateToProps, mapDispatchToProps)(_ChosenCoffeeCard)
export default ChosenCoffeeCard;

//to do the add to cart you'll have to connect it
