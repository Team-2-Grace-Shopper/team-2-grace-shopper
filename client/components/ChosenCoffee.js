import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";

//need to create addCart button
//need to create button to increment & decrement count

/*
const ChosenCoffee = ({ products, match }) => {
    const chosenCoffee = products.filter(product => product.id === match.params.id)[0]
    console.log('CHOSEN COFFEE:' + chosenCoffee)
    console.log('PRODUCTS:' + products)
    //console.log(`${id}`)

//useEffect- use to check if coffee exists
    if (!chosenCoffee) {
        return <h1>NOT FOUND</h1>
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
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    console.log("PROPS:", this.props);
    const chosenCoffee = this.props.products.filter(
      (product) => product.id === this.props.match.params.id
    )[0];
    console.log("CHOSEN COFFEE:" + chosenCoffee);
    console.log("PRODUCTS:" + this.props.products);

    if (!chosenCoffee) {
      //const NewProductsArray = getProducts()
      getProducts();
      return <h1>Item Not Found</h1>;
    }

    return (
      <div className="container">
        <div className="chosenCoffee" key={chosenCoffee.id}>
          <img src={chosenCoffee.imageUrl} />
          <p>Rating: {chosenCoffee.rating}</p>
          <h1>{chosenCoffee.name}</h1>
          <p>{chosenCoffee.description}</p>
          <p>{chosenCoffee.weight}oz</p>
        </div>
        <div>
          <ul>
            <li>-</li>
            <li>1</li>
            <li>+</li>
          </ul>
          <p>${chosenCoffee.price}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChosenCoffee);

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
