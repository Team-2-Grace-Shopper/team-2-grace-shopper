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
                <div className= 'allAccessories'>
                    { accessories.map(accessory => 
                        <div key= { accessory.id }>
                            <Link to={`accessories`}>
                                <p>Rating: { accessory.rating }</p>
                                <img src= { accessory.imgUrl1}></img>
                                <h4>{ accessory.name }</h4>
                                <h2>${ accessory.price }</h2>
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
        accessories: state.products.filter(product => product.type === 'accessory')
    }
}

const mapDispatchToProps = {
    getProducts
}

export default connect(mapState, mapDispatchToProps)(Accessories);