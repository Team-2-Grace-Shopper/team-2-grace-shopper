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
          <span><strong>Origin</strong></span>
          <div className="Region">
            <div>
              <input type="radio" id="africa" name="africa" value="africa"></input>
              <label for="africa">Africa</label>
            </div>
            <div>
              <input type="radio" id="asia" name="asia" value="asia"></input>
              <label for="asia">Asia</label>
            </div>
            <div>
              <input type="radio" id="centralAmerica" name="centralAmerica" value="centralAmerica"></input>
              <label for="centralAmerica">Central America</label>
            </div>
          </div>
          <div className="Roast">
            <span><strong>Roast</strong></span>
            <div>
              <input type="radio" id="dark" name="dark" value="dark"></input>
              <label for="dark">Dark</label>
            </div>
            <div>
              <input type="radio" id="medium" name="medium" value="medium"></input>
              <label for="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="light" name="light" value="light"></input>
              <label for="light">Light</label>
            </div>
          </div>
          <div className="Type">
            <span><strong>Type</strong></span>
            <div>
              <input type="radio" id="decaffeinated" name="decaffeinated" value="decaffeinated"></input>
              <label for="decaffeinated">Decaffeinated</label>
            </div>
            <div>
              <input type="radio" id="flavored" name="flavored" value="flavored"></input>
              <label for="flavored">Flavored</label>
            </div>
            <div>
              <input type="radio" id="organic" name="organic" value="organic"></input>
              <label for="organic">Organic</label>
            </div>
          </div>
        </div>

        <div className="itemList col3">
          <div>
            {coffees.map((coffee) => (
              <AllCoffeesCard coffee={coffee} key={coffee.id} />
            ))}
          </div>
        </div>
        {/* backup original 4column item list */}
        {/* <div className="itemList-4col">
          <div>
            {coffees.map((coffee) => (
              <AllCoffeesCard coffee={coffee} key={coffee.id} />
            ))}
          </div>
        </div> */}
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
