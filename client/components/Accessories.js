import React from 'react'
import { connect } from 'react-redux';
import { getProducts } from '../store/products';
import AllAccessoriesCard from './AllAccessoriesCard';
import { Toaster } from 'react-hot-toast';

export class Accessories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: [],
      filteredRegion: '',
      filteredCategory: '',
      featuredSelected: false,
      saleSelected: false,
      loading: true,
    }
  }

  async componentDidMount() {
    await this.props.getProducts();
    this.setState({ accessories: this.props.accessories });
    this.setState({loading: false});
  }

  handleSort = (ev) => {
    const sortBy = ev.target.value;
    const sortProducts = [...this.state.accessories];
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
    this.setState({ accessories: sortProducts })
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

    let newList = [...this.props.accessories];
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

    this.setState({ accessories: newList })
  }

  resetFilter = () => {
    location.reload();
  }

  render() {
    if (this.state.loading){
      return <h2 style={{marginTop: 150, marginBottom: 200, textAlign: 'center'}}>Please wait while we load your favorite accessories!</h2>
    }

    const accessories = this.props.accessories;

    return (
      <div id="content-wrapper">
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
              {accessories.map((accessory) => (
                <AllAccessoriesCard accessory={accessory} key={accessory.id} />
              ))}
            </div>
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
