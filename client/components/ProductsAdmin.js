import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";

//need to create addCart button
//need to create button to increment & decrement count

export class ProductsAdmin extends React.Component {
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
        <div className="sortBy"></div>
        <div className="Region"></div>
        <div className="Roast"></div>
        <div className="Type"></div>
        <div className="itemList-admin">
          <h2>Manage all products</h2>
          <br />
          <div>
            {products.map((product) => (
              <div key={product.id}>
                <Link
                  to={
                    "/"
                    // product.type === "coffee"
                    //   ? `coffees/${product.id}`
                    //   : `accessories/${product.id}`
                  }
                >
                  <img src={product.imageUrl1} />
                </Link>
                <Link to={"/"} className="product-basicInfo">
                  <p>
                    <span>Featured </span>
                    {product.isFeatured ? (
                      <span>Yes</span>
                    ) : (
                      <span className="disabled">No</span>
                    )}
                  </p>
                  <br />
                  <span>Type: {product.type}</span>
                  <h3>{product.name}</h3>
                  <span>{product.category}</span>
                  <br />
                  <br />
                  <span>Rating: {product.rating}</span>
                </Link>
                <p className="product-description">{product.description}</p>
                <div>
                  {product.onSale ? (
                    <p>
                      <span className="disabled">${product.price}</span> $
                      {product.salePrice} / {product.weight}lbs
                    </p>
                  ) : (
                    <p>
                      ${product.price} / {product.weight}lbs
                    </p>
                  )}
                  <p>Inventory: {product.inventory}</p>
                  <br />
                  <button className="cta">Edit Product</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    products: state.products,
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapState, mapDispatchToProps)(ProductsAdmin);
