import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import AllCoffeesCard from "./AllCoffeesCard";
import { Toaster } from 'react-hot-toast';

export class Coffees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
      filteredRegion: '',
      filteredCategory: '',
      featuredSelected: false,
      saleSelected: false,
    }
  }

  async componentDidMount() {
    await this.props.getProducts();
    this.setState({ coffees: this.props.coffees })
  }

  handleSort = (ev) => {
    const sortBy = ev.target.value;
    const sortProducts = [...this.state.coffees];
    sortProducts.sort((a,b) => {
      switch (sortBy){
        case 'a-z':
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        case 'z-a':
          return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
        case 'lowtohigh':
          return a.price - b.price;
        case 'hightolow':
          return b.price - a.price;
        default: // includes 'featured'
          return a.isFeatured && b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
      }
      })
    this.setState({ coffees: sortProducts })
  }

  handleClick = (ev) => {
    let newRegion = this.state.filteredRegion;
    let newCategory = this.state.filteredCategory;
    let newFeaturedSelected = this.state.featuredSelected;
    let newSaleSelected = this.state.saleSelected;

    switch(ev.target.name){
      case 'region':
        newRegion = ev.target.value;
        this.setState({filteredRegion: newRegion});
        break;
      case 'category':
        newCategory = ev.target.value;
        this.setState({filteredCategory: newCategory});
        break;
      case 'featured':
        newFeaturedSelected = true;
        this.setState({ featuredSelected: true });
        break;
      case 'sale':
        newSaleSelected = true;
        this.setState({ saleSelected: true });
        break;
      }

    let newList = [...this.state.coffees];
    if (newRegion){
      newList = newList.filter(c => c.country.region.toLowerCase() === newRegion);
    }
    if (newCategory){
      newList = newList.filter(c => c.category.toLowerCase() === newCategory);
    }
    if (newFeaturedSelected){
      newList = newList.filter(c => c.isFeatured);
    }
    if (newSaleSelected){
      newList = newList.filter(c => c.onSale);
    }

    this.setState({ coffees: newList })
  }

  resetFilter = () => {
    location.reload();
//    window.location.reload(false);

    // let newList = [...this.props.coffees];
    // this.setState({...this.state,
    //   coffees: newList,
    //   filteredRegion: '',
    //   filteredCategory: '',
    //   featuredSelected: false,
    //   saleSelected: false,
    // })
  }

  render() {
    const coffees = this.state.coffees;

    return (
      <div id='content-wrapper'>
      <Toaster /> 

      <div className="container filterList">
        <div className="filter">
          <div className="sortBy">
            <span>Sort by</span>
            <select name="sort" onChange={ this.handleSort }>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
              <option value="lowtohigh">Price low to high</option>
              <option value="hightolow">Price high to low</option>
            </select>
          </div>
          <br /><br />
          <span>Filter <button onClick={this.resetFilter}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(reset filter)</button></span>
          <hr />
          <span><strong>Special</strong></span>
          <div className="Featured">
            <div>
              <input type="radio" id="featured" name="featured" value="featured" onClick={ this.handleClick }></input>
              <label htmlFor="featured">Featured</label>
            </div>
          </div>
          <span><strong></strong></span>
          <div className="Sale">
            <div>
              <input type="radio" id="sale" name="sale" value="sale" onClick={ this.handleClick }></input>
              <label htmlFor="sale">On sale</label>
            </div>
          </div>
          <span><strong>Origin</strong></span>
          <div className="Region">
            <div>
              <input type="radio" id="africa" name="region" value="africa" onClick={ this.handleClick }></input>
              <label htmlFor="africa">Africa</label>
            </div>
            <div>
              <input type="radio" id="asia" name="region" value="asia" onClick={ this.handleClick }></input>
              <label htmlFor="asia">Asia</label>
            </div>
            <div>
              <input type="radio" id="centralAmerica" name="region" value="central america" onClick={ this.handleClick }></input>
              <label htmlFor="centralAmerica">Central America</label>
            </div>
            <div>
              <input type="radio" id="southAmerica" name="region" value="south america" onClick={ this.handleClick }></input>
              <label htmlFor="southAmerica">South America</label>
            </div>
          </div>
          <div className="Roast">
            <span><strong>Roast</strong></span>
            <div>
              <input type="radio" id="dark" name="category" value="roast-dark" onClick={ this.handleClick }></input>
              <label htmlFor="dark">Dark</label>
            </div>
            <div>
              <input type="radio" id="medium" name="category" value="roast-medium" onClick={ this.handleClick }></input>
              <label htmlFor="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="light" name="category" value="roast-light" onClick={ this.handleClick }></input>
              <label htmlFor="light">Light</label>
            </div>
          </div>
          <div className="Type">
            <span><strong>Type</strong></span>
            <div>
              <input type="radio" id="decaffeinated" name="category" value="decaf" onClick={ this.handleClick }></input>
              <label htmlFor="decaffeinated">Decaffeinated</label>
            </div>
            <div>
              <input type="radio" id="flavored" name="category" value="flavored" onClick={ this.handleClick }></input>
              <label htmlFor="flavored">Flavored</label>
            </div>
            <div>
              <input type="radio" id="organic" name="category" value="organic" onClick={ this.handleClick }></input>
              <label htmlFor="organic">Organic</label>
            </div>
          </div>
        </div>
        {
          coffees.length === 0 ? 
            <h3>Sorry, no coffees match the filter criteria. Try a broader selection please.</h3>
          :
            <div className="itemList col3">
              <div>
                {coffees.map((coffee) => (
                  <AllCoffeesCard coffee={coffee} key={coffee.id} />
                ))}
              </div>
            </div>
        }
      </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    coffees: state.products.filter((product) => product.type === "coffee").sort((a,b) => a.name.localeCompare(b.name)),
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapState, mapDispatchToProps)(Coffees);
