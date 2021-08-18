import React, { useState } from "react";
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

const notify = () => toast.success('Added to cart!', { duration: 3000, position: 'top-center' });
const notify2 = () => toast.error('This will exceed our inventory!',  { duration: 3000, position: 'top-center' })

const addToShopCart = (userId, id, count, price, accessory) =>{
    addToCart(userId, id, count, price, accessory);
    notify();
  }

const _AllAccessoriesCard = ({ accessory, userId, addToCart }) => {
    const [count, setCount] = useState(1);
    return (
        <div key={accessory.id} className="itemcard">
            <div>
                <Link to={`/accessories/${accessory.id}`}>
                    <img src={accessory.imageUrl1} alt={accessory.name}/>
                    {accessory.onSale ? <span className="label">ON SALE</span> : null}
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
                <div>
                    <ul>
                        <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                        <li>{count}</li>
                        <button onClick={() => {
                            count < accessory.inventory ?
                                setCount(count + 1)
                                :                
                                notify2();
                        }
                        }>+</button>
                    </ul>
                    <p>{accessory.onSale && <span><del>${accessory.price}</del> - sale:  ${accessory.salePrice}</span>}
                    {!accessory.onSale && <span>${accessory.price}</span>}
                    </p>
                </div>
                <button className={count > 0 ? 'cta' : 'ctadisabled'}
                    onClick={() => addToShopCart(userId, accessory.id, count, accessory.price, accessory)}
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

const AllAccessoriesCard = connect(mapStateToProps, mapDispatchToProps)(_AllAccessoriesCard)
export default AllAccessoriesCard;