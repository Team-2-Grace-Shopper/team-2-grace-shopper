import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import ChosenAccessoryCard from "./ChosenAccessoryCard";

//need to create addCart button

class ChosenAccessory extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    //console.log("PROPS:", this.props);
    const chosenAccessory = this.props.products.filter(
      (product) => product.id === this.props.match.params.id
    )[0];
    //console.log("CHOSEN Accessory:" + chosenAccessory);
    //console.log("PRODUCTS:" + this.props.products);

    if (!chosenAccessory) {
      //const NewProductsArray = getProducts()
      getProducts();
      return <h1>Item Not Found</h1>;
    }

    return (
      <div id='content-wrapper'>
      <ChosenAccessoryCard chosenAccessory={chosenAccessory} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChosenAccessory);
