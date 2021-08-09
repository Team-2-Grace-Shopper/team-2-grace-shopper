import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products';

//need to create addCart button
//need to create button to increment & decrement count

export class Accessories extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        await this.props.getProducts()
    }

    render () {
        const accessories = this.props.accessories
        return (
            <div>
<<<<<<< HEAD
                <div className= 'allAccessories'>
                    { accessories.map(accessory => 
                        <div key= { accessory.id }>
                            <Link to={`accessories/${accessory.id}`}>
                                <p>Rating: { accessory.rating }</p>
                                <img src= { accessory.imageUrl1}></img>
                                <h4>{ accessory.name }</h4>
                                <h2>${ accessory.price }</h2>
                            </Link>
                        </div>
                    )}
=======
                <div className= 'itemList'>
                    <div>
                        { accessories.map(accessory => 
                            <div key= { accessory.id }>
                                <Link to={`accessories`}>
                                    <img src= { accessory.imageUrl1}></img>
                                    <h3>{ accessory.name }</h3>
                                    <span>Rating: { accessory.rating }</span>
                                </Link>
                                <ul>
                                    <li>-</li>
                                    <li>1</li>
                                    <li>+</li>
                                </ul>
                                <p>${ accessory.price }</p>
                                <button>ADD TO CART</button>
                            </div>
                        )}
                    </div>
>>>>>>> 422f6a0b7596ee3517f01aa003d9e82576cb4a44
                </div>
            </div>
        )
    }
} 

const mapState = state => {
    return {
        accessories: state.products.filter(product => product.type === 'accessory')
    }
}

const mapDispatchToProps = {
    getProducts
}

export default connect(mapState, mapDispatchToProps)(Accessories);