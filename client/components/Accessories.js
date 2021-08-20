import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import AllAccessoriesCard from "./AllAccessoriesCard";

export class Accessories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: [],
      filteredMug: '',
      filteredGrinder: '',
      saleSelected: false,
      loading: true,
    }
  }
  async componentDidMount() {
    await this.props.getProducts();
    this.setState({ accessories: this.props.accessories });
    this.setState({ loading: false });
  }
  handleSort = (ev) => {
    const sortBy = ev.target.value;
    const sortProducts = [...this.state.accessories];
    sortProducts.sort((a, b) => {
      switch (sortBy) {
        case 'a-z':
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        case 'z-a':
          return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
        case 'lowtohigh':
          return a.price - b.price;
        case 'hightolow':
          return b.price - a.price;
        default: // includes ''featured
          return a.isFeatured && b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
      }
    })
    this.setState({ accessories: sortProducts })
  }
  handleClick = (ev) => {
    let newCategory = this.state.filteredCategory;
    let newSaleSelected = this.state.saleSelected;
    switch (ev.target.name) {
      case 'category':
        newCategory = ev.target.value;
        this.setState({ filteredCategory: newCategory });
        break;
      case 'sale':
        newSaleSelected = true;
        this.setState({ saleSelected: true });
        break;
    }
    let newList = [...this.props.accessories];
    if (newCategory) {
      newList = newList.filter(c => c.category.toLowerCase() === newCategory);
    }
    if (newSaleSelected) {
      newList = newList.filter(c => c.onSale);
    }
    this.setState({ accessories: newList })
  }
  resetFilter = () => {
    location.reload();
  }
  render() {
    const accessories = this.state.accessories;
    return (
      <div id='content-wrapper'>
        <div className="container filterList">
          <div className='filter'>
            <div className="sortBy">
              <span>Sort by</span>
              <select name="sort" onChange={this.handleSort}>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
                <option value="lowtohigh">Price low to high</option>
                <option value="hightolow">Price high to low</option>
              </select>
            </div>
            <br /><br />
            <span>Filter <button className="hyperlink" onClick={this.resetFilter}>Reset Filter</button></span>
            <hr />
            <span><strong>Special</strong></span>
            <div className="Sale">
              <div>
                <input type="radio" id="sale" name="sale" value="sale" onClick={this.handleClick}></input>
                <label htmlFor="sale">On sale</label>
              </div>
            </div>
            <div className="Type">
              <span><strong>Type</strong></span>
              <div>
                <input type="radio" id="mug" name="category" value="mug" onClick={this.handleClick}></input>
                <label htmlFor="mug">Mug</label>
              </div>
              <div>
                <input type="radio" id="grinder" name="category" value="grinder" onClick={this.handleClick}></input>
                <label htmlFor="grinder">Brewing Tools</label>
              </div>
            </div>
          </div>
          {
            accessories.length === 0 ?
              <h3>Sorry, no accessories match the filter criteria. Try other filters</h3>
              :
              <div className="itemList col3">
                <div>
                  {accessories.map((accessory) => (
                    <AllAccessoriesCard accessory={accessory} key={accessory.id} />
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
    accessories: state.products.filter(
      (product) => product.type === "accessory").sort((a, b) => a.name.localeCompare(b.name)),
  };
};
const mapDispatchToProps = {
  getProducts,
};
export default connect(mapState, mapDispatchToProps)(Accessories);