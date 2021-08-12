import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import AllCoffeesCard from "./AllCoffeesCard";

//need to create addCart button
//need to create button to increment & decrement count

export class Coffees extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    const coffees = this.props.coffees;

    return (
      <div>
        <div className="sortBy"></div>
        <div className="Region"></div>
        <div className="Roast"></div>
        <div className="Type"></div>
        <div className="itemList">
          <div>
            {coffees.map((coffee) => (
              <AllCoffeesCard coffee={coffee} key={coffee.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    coffees: state.products.filter((product) => product.type === "coffee"),
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapState, mapDispatchToProps)(Coffees);
