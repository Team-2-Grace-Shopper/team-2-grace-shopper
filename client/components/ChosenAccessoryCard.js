import React, { useState } from 'react';
import StarRatings from "react-star-ratings";
import AccessoryCarousel from './AccessoryCarousel';
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const notify = () => toast.success('Added to cart!', { duration: 3000, position: 'top-center' });
const notify2 = () => toast.error('This will exceed our inventory!',  { duration: 3000, position: 'top-center' })

const addToShopCart = (userId, id, count, price, accessory) =>{
    addToCart(userId, id, count, price, accessory);
    notify();
}

const _ChosenAccessoryCard = ({ chosenAccessory, userId, addToCart }) => {
    const [count, setCount] = useState(1);
    
    return (
        <div key= { chosenAccessory.id }>
            <div className= 'singleItem'>
                <div className= 'chosenCoffeeInfo container' key={chosenAccessory.id}>
                    <div className='photoCarousel'>
                        {chosenAccessory.onSale ? <span className="label">ON SALE</span> : null}
                        <AccessoryCarousel chosenAccessory={chosenAccessory} key={chosenAccessory.id}/>
                    </div>
                    
                    <div className='productInfo'>
                        <span>
                            <StarRatings
                                rating={chosenAccessory.rating * 1}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="15px"
                                starSpacing="0px"
                            />
                        </span>
                        <h1>{ chosenAccessory.name }</h1>
                        <p>{ chosenAccessory.description }</p>
                        <p>{ chosenAccessory.weight }oz</p>
                        <br />
                        <br />

                        <div>
                        {chosenAccessory.onSale && <h3><del>${chosenAccessory.price}</del> - sale:  ${chosenAccessory.salePrice}</h3>}
                        {!chosenAccessory.onSale && <h3>${chosenAccessory.price}</h3>}
                    </div>
                    <div className='quantityButton'>
                        <ul>
                            <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                            <li>{count}</li>
                            <button onClick={() => {
                                count < chosenAccessory.inventory ?
                                    setCount(count + 1)
                                    :                
                                    notify2();
                            }
                            }>+</button>
                        </ul>

                        <button className={count > 0 ? 'cta' : 'ctadisabled'}
                            onClick={() => addToShopCart(userId, chosenAccessory.id, count, chosenAccessory.price, chosenAccessory)}
                            >ADD TO CART</button>
                    </div>
                    </div>
                </div>
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

const ChosenAccessoryCard = connect(mapStateToProps, mapDispatchToProps)(_ChosenAccessoryCard)
export default ChosenAccessoryCard;

//to do the add to cart you'll have to connect it

/*
<Link to={`/coffees/${coffee.id}`}>
                <img src= { coffee.imageUrl1} />
                <h3>{ coffee.name }</h3>
                <span>Rating: { coffee.rating }</span>
            </Link>
*/