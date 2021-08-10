import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products';

//need to create addCart button
//need to create button to increment & decrement count

export class Coffees extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        await this.props.getProducts()
    }

    render () {
        const coffees = this.props.coffees
        return (
            <div>
                <div className= 'sortBy'>
                </div>
                <div className= 'Region'>
                </div>
                <div className= 'Roast'>
                </div>
                <div className= 'Type'>
                </div>
                <div className= 'itemList'>
                    <div>
                        { coffees.map(coffee => 
                            <div key= { coffee.id }>
                                <Link to={`/coffees/${coffee.id}`}>
                                    <img src= { coffee.imageUrl1} />
                                    <h3>{ coffee.name }</h3>
                                    <span>Rating: { coffee.rating }</span>
                                </Link>
                                <ul>
                                    <li>-</li>
                                    <li>1</li>
                                    <li>+</li>
                                </ul>
                                <p>${ coffee.price }</p>
                                <button>ADD TO CART</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
} 

const mapState = state => {
    return {
        coffees: state.products.filter(product => product.type === 'coffee')
    }
}

const mapDispatchToProps = {
    getProducts
}

export default connect(mapState, mapDispatchToProps)(Coffees);