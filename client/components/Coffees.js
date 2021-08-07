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
                <div className= 'allCoffees'>
                    { coffees.map(coffee => 
                        <div key= { coffee.name }>
                            <Link to={`coffees`}>
                                <img src= { coffee.imgUrl1}></img>
                                <h4>{ coffee.name }</h4>
                                <h2>${ coffee.price }</h2>
                            </Link>
                        </div>
                    )}
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