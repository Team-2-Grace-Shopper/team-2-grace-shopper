import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Added to cart!', {duration: 4000, position: 'top-center'});

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const _AllCoffeesCard = ({ coffee, userId, addToCart }) => {
    const [count, setCount] = useState(1);
    return (
        <div key= { coffee.id } className="itemcard">
        <Toaster/>
          <div>
            <Link to={`/coffees/${coffee.id}`}>
                <img src= { coffee.imageUrl1} />
            </Link>
            <span><StarRatings
                rating={ coffee.rating * 1 }
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="15px"
                starSpacing="0px"
                />
            </span>
            <Link to={`/coffees/${coffee.id}`}>
                <h3>{ coffee.name }</h3>
            </Link>
          </div>
          <div>
            <div>
                <ul>
                    <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                    <li>{count}</li>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </ul>
                <p>${ coffee.price }</p>
            </div>
            <button className={count > 0 ? 'cta' : 'ctadisabled'}
                    onClick={() => {
                      addToCart(userId, coffee.id, count, coffee.price, coffee)
                    }}
                    >ADD TO CART</button>
           </div>
        </div>
    )
}




//to do the add to cart you'll have to connect it

const mapStateToProps = (state) => {
    return {
      userId: state.auth.id,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (userId, productId, quantity, price, product ) => {
        addToCart(userId, productId, quantity, price, product);
        notify();
      },
    }
  }
  const AllCoffeesCard = connect(mapStateToProps, mapDispatchToProps)(_AllCoffeesCard)
  export default AllCoffeesCard;

