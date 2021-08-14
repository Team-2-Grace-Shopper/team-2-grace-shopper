import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getProducts } from '../store/products';
import AllAccessoriesCard from './AllAccessoriesCard';

//need to create addCart button
//need to create button to increment & decrement count

export class Accessories extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }


  render() {
    const accessories = this.props.accessories;
    return (
      <div className="container filterList">
        <div className="filter">
          <div className="sortBy">
            <span>Sort by</span>
            <select>
              <option>Featured</option>
              <option>A - Z</option>
              <option>Z - A</option>
              <option>Price low to high</option>
            </select>
          </div>
          <br /><br />
          <span>Filter</span>
          <hr />
          <div className="Type">
            <span><strong>Type</strong></span>
            <div>
              <input type="radio" id="mug" name="mug" value="mug"></input>
              <label for="mug">Mug</label>
            </div>
            <div>
              <input type="radio" id="brewingtool" name="brewingtool" value="brewingtool"></input>
              <label for="brewingtool">Brewing tool</label>
            </div>
          </div>
        </div>
        <div className="itemList col3">
          <div>
            {accessories.map(accessory => (
              <AllAccessoriesCard accessory={accessory} key={accessory.id} />
              // <div>
              //   <div key={accessory.id}>
              //     <Link to={`accessories/${accessory.id}`}>
              //       <img src={accessory.imageUrl1}></img>
              //       <h3>{accessory.name}</h3>
              //       <span>Rating: {accessory.rating}</span>
              //     </Link>
              //     <ul>
              //       <li>-</li>
              //       <li>1</li>
              //       <li>+</li>
              //     </ul>
              //     <p>${accessory.price}</p>
              //     <button>ADD TO CART</button>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    accessories: state.products.filter(
      (product) => product.type === "accessory"
    ),
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapState, mapDispatchToProps)(Accessories);
