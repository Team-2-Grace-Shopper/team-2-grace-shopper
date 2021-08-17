import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getProducts } from "../store/products"; // Evee and Shanntal changed
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Registration successful! Welcome to Grace Coffee.!',{ duration: 4000, position: 'top-center' })
/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getProducts();
  }
  render() {
    const products = this.props.products;
    const justRegistered = window.localStorage.getItem('justRegistered');
    if (justRegistered){
      window.localStorage.removeItem('justRegistered');
      notify();
    }

    return (
      <div id="content-wrapper">
        <div className="hero">
          <img src="" />
        </div>
        <Toaster />
        <h2>Featured Items</h2>
        <div className="itemList col4 container">
          <div>
            {products.map((product, idx) => {
              return idx < 4 ? (
                <div className="itemcard" key={product.name}>
                  <Link
                    to={
                      product.type === "coffee"
                        ? `coffees/${product.id}`
                        : `accessories/${product.id}`
                    }
                  >
                    <img src={product.imageUrl1} />
                    <br />
                    <h3>{product.name}</h3>
                  </Link>
                </div>
              ) : null;
            })}

          </div>

        </div>
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    username: state.auth.username,
    products: state.products.filter((product) => product.isFeatured),
  };
};
const mapDispatchToProps = {
  getProducts,
};
export default withRouter(connect(mapState, mapDispatchToProps)(Home));
