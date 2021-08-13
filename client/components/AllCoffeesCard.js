import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const _AllCoffeesCard = ({ coffee }) => {
    const [count, setCount] = useState(1);
    return (
        <div key= { coffee.id }>
            <Link to={`/coffees/${coffee.id}`}>
                <img src= { coffee.imageUrl1} />
                <h3>{ coffee.name }</h3>
                <span><StarRatings
                rating={ coffee.rating * 1 }
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="2px"
    /></span>
            </Link>
            <ul>
                <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                <li>{count}</li>
                <button onClick={() => setCount(count + 1)}>+</button>
            </ul>
            <p>${ coffee.price }</p>
            <button className={count > 0 ? 'cta' : 'ctadisabled'}
                    onClick={() => addToCart(0,'product',99,99.99)}
                    >ADD TO CART</button>
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
      addToCart: (userId, productId, quantity, price ) => dispatch(addToCart(userId, productId, quantity, price)),
    }
  }
  const AllCoffeesCard = connect(mapStateToProps, mapDispatchToProps)(_AllCoffeesCard)
  export default AllCoffeesCard;