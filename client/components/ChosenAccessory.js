import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProducts} from'../store/products';
import ChosenAccessoryCard from './ChosenAccessoryCard';


//need to create addCart button
//need to create button to increment & decrement count

/*
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
*/

class ChosenAccessory extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    console.log("PROPS:", this.props);
    const chosenAccessory = this.props.products.filter(
      (product) => product.id === this.props.match.params.id
    )[0];
    console.log("CHOSEN Accessory:" + chosenAccessory);
    console.log("PRODUCTS:" + this.props.products);

    render() {
        const chosenAccessory = this.props.products.filter(product => product.id === this.props.match.params.id)[0]
        
        if (!chosenAccessory) {
           //const NewProductsArray = getProducts()
           getProducts()
           return <h1>Item Not Found</h1>
        }
        
        return (
           /* 
            <div className= 'singleItem'>
                <div className= 'chosenAccessory' key={chosenAccessory.id}>
                    <img src={chosenAccessory.imageUrl} />
                    <p>Rating: { chosenAccessory.rating }</p>
                    <h1>{ chosenAccessory.name }</h1>
                    <p>{ chosenAccessory.description }</p>
                    <p>{ chosenAccessory.weight }oz</p>
                </div>
                <div>
                    <ul>
                        <li>-</li>
                        <li>1</li>
                        <li>+</li>
                    </ul>
                    <p>${ chosenAccessory.price }</p>
                    <button>ADD TO CART</button>
                </div>
                
            </div>
            */
           <ChosenAccessoryCard chosenAccessory= { chosenAccessory } />
        )
    }

    return (
      <div className="container">
        <div className="chosenAccessory" key={chosenAccessory.id}>
          <img src={chosenAccessory.imageUrl} />
          <p>Rating: {chosenAccessory.rating}</p>
          <h1>{chosenAccessory.name}</h1>
          <p>{chosenAccessory.description}</p>
          <p>{chosenAccessory.weight}oz</p>
        </div>
        <div>
          <ul>
            <li>-</li>
            <li>1</li>
            <li>+</li>
          </ul>
          <p>${chosenAccessory.price}</p>
          <button>ADD TO CART</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Is it executing?", state.products);
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChosenAccessory);
