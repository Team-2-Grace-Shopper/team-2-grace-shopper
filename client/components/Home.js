import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products"; // Evee and Shanntal changed
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
    return (
      <div>
        <div className="hero">
          <img src="" />
        </div>
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
const mapState = (state) => {
  return {
    username: state.auth.username,
    products: state.products.filter((product) => product.isFeatured),
  };
};
const mapDispatchToProps = {
  getProducts,
};
export default connect(mapState, mapDispatchToProps)(Home);
