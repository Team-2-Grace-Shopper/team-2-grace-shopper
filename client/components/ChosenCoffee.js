import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import AllCoffeesCard from "./AllCoffeesCard";
import ChosenCoffeeCard from "./ChosenCoffeeCard";

class ChosenCoffee extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    // console.log("PROPS:", this.props);
    const chosenCoffee = this.props.products.filter(
      (product) => product.id === this.props.match.params.id
    )[0];
    // console.log("CHOSEN COFFEE:" + chosenCoffee);
    // console.log("PRODUCTS:" + this.props.products);

    if (!chosenCoffee) {
      getProducts();
      return <h1>Item Not Found</h1>;
    }

    return (
      <div id='testrun'>
      <ChosenCoffeeCard chosenCoffee={chosenCoffee} key={chosenCoffee.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log("Is it executing?", state.products);
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
