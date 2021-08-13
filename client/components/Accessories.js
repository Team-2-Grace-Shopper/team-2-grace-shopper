import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getProducts} from '../store/products';
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
      <div className="container">
        <div className="itemList">
          <div>
            {accessories.map((accessory) => (
              <AllAccessoriesCard accessory={accessory} key={accessory.id} />
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
