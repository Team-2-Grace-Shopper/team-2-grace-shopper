import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products';

//need to create addCart button
//need to create button to increment & decrement count

const ChosenAccessory = ({ products, match }) => {

        const chosenAccessory = products.filter(accessory=> accessory.id === match.params.id)[0]
        return (
            <div>
                <div className= 'chosenAccessory' key={chosenAccessory.id}>
                    <img src={chosenAccessory.imageUrl} />
                    <h1>Rating: { chosenAccessory.rating }</h1>
                    <h4>{ chosenAccessory.name }</h4>
                    <h2>{ chosenAccessory.description }</h2>
                    <h2>${ chosenAccessory.price }</h2>
                </div>
            </div>
        )
} 

const mapState = state => {
    return {
        accessories: state.products.filter(product => product.type === 'accessory')
    }
}

export default connect(mapState)(ChosenAccessory);