import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products';
import ChosenAccessory from './ChosenAccessory';

//need to create addCart button
//need to create button to increment & decrement count

/*
const ChosenCoffee = ({ products, match }) => {
    const chosenCoffee = products.filter(product => product.id === match.params.id)[0]
    console.log('CHOSEN COFFEE:' + chosenCoffee)
    console.log('PRODUCTS:' + products)
    //console.log(`${id}`)


    if (!chosenCoffee.id) {
        return 'Loading data...'
    }
        return (
            <div>
                <div className= 'chosenCoffee' key={chosenCoffee.id}>
                    <img src={chosenCoffee.imageUrl} />
                    <h1>Rating: { chosenCoffee.rating }</h1>
                    <h4>{ chosenCoffee.name }</h4>
                    <h2>{ chosenCoffee.description }</h2>
                    <h2>${ chosenCoffee.price }</h2>
                </div>
                
            </div>
        )
} 

const mapStateToProps = ({ products }) => {
    console.log('Is it executing?', products)
    return {
        products
    }
}

export default connect(mapStateToProps)(ChosenCoffee);
*/

class ChosenCoffee extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        await this.props.products;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.products.length !== this.props.products.length) {
            this.props.products = prevProps.products;
        }
      }

    render() {
        console.log('PROPS:', this.props)
        const chosenCoffee = this.props.products.filter(product => product.id === this.props.match.params.id)[0]
        console.log('CHOSEN COFFEE:' + chosenCoffee)
        console.log('PRODUCTS:' + this.props.products)
        //console.log(`${id}`)
        return (
            <div>
                <div className= 'chosenCoffee' key={chosenCoffee.id}>
                    <img src={chosenCoffee.imageUrl} />
                    <h1>Rating: { chosenCoffee.rating }</h1>
                    <h4>{ chosenCoffee.name }</h4>
                    <h2>{ chosenCoffee.description }</h2>
                    <h2>${ chosenCoffee.price }</h2>
                </div>
                
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    console.log('Is it executing?', state.products)
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ChosenCoffee);



/* Incase we add reviews:
<div className= 'reviews'>
                    {chosenCoffee.reviews.map(review => {
                        return (
                            <div>
                                <h3>Rating: {chosenCoffee.rating}</h3>
                                <p>{chosenCoffee.review}</p>             
                            </div>
                        )
                    })}
                </div>
*/