import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from'../store/products'; // Evee and Shanntal changed
/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount () {
    await this.props.getProducts()
  }
  render () {
    const products = this.props.products
    return (
    <div>
      <div className = 'hero'>
        <img src='' />
      </div>
      <div className='itemList'>
        <h2>
          Featured Items
        </h2>
        <div>
          { products.map( product => 
            <div key={ product.name }>
              <Link to={`products/${product.id}`}>
                <img src={ product.imgUrl1 } />
                <h3>{ product.name }</h3>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    products: state.products.filter(product => product.isFeatured)
  }
}
const mapDispatchToProps = {
  getProducts
}
export default connect(mapState, mapDispatchToProps)(Home)