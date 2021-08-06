import React from 'react'
import {connect} from 'react-redux';
import {getProducts} from'../store/products'; // Evee and Shanntal changed
/**
 * COMPONENT
 */
/* Before Evee and I changed it
export const Home = props => {
  const {username} = props
  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}
*/
export class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount () {
    await this.props.getProducts()
  }
  render () {
    // console.log('createRandomFive', this.createRandomFive)
    // console.log(new Array(5).)
    console.log(this.props.products)
    const products = this.props.products
    return (
    <div>
      <div className = 'hero'>
        <img src='' />
      </div>
      <div className='featuredItems'>
        <h2>
          Featured Items
        </h2>
        { products.map( product => {
          <div>
            <h3>hi</h3>
          </div>
        })}
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
    products: state.products
  }
}
const mapDispatchToProps = {
  getProducts
}
export default connect(mapState, mapDispatchToProps)(Home)