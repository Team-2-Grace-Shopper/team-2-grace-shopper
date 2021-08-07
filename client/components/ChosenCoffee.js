import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products';
import ChosenAccessory from './ChosenAccessory';

//need to create addCart button
//need to create button to increment & decrement count

const ChosenCoffee = ({ products, match }) => {
    const chosenCoffee = products.filter(coffee => coffee.id === match.params.id)
        return (
            <div>
                <div className= 'chosenCoffee' key={chosenCoffee.id}>
                    <img src={chosenCoffee.imageUrl} />
                    <h1>Rating: { chosenCoffee.rating }</h1>
                    <h4>{ chosenCoffee.name }</h4>
                    <h2>{ chosenAccessory.description }</h2>
                    <h2>${ chosenCoffee.price }</h2>
                </div>
            </div>
        )
} 

const mapState = ({ products }) => {
    return {
        products
    }
}

export default connect(mapState)(ChosenCoffee);