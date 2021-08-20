import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getProducts } from "../store/products"; // Evee and Shanntal changed
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Registration successful! Welcome to Grace Coffee.!', { duration: 4000, position: 'top-center' })
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
    if (justRegistered) {
      window.localStorage.removeItem('justRegistered');
      notify();
    }

    return (
      <div id="content-wrapper">
        <div className="hero">
          <img src="" />
          <div className="hero-text">
            <div className="brandblock"></div>
            <h1>Fresh Espresso,<br />Never Instant</h1>
            <p>A lot has changed, but our philosophy never has. We're passionate about delivering the best handcrafted products and take pride in the journey from seed to cup</p>
            <Link to="/coffees"><button className="cta">Shop now</button></Link>
          </div>
        </div>
        <Toaster />
        <div id="home" className="container">
          {/* section headline with line format start */}
          <hr /><h2 className="hrtxt">Today's Picks</h2>
          <br /><br />
          {/* section headline with line format end */}
          <div className="itemList col4">
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
                      <button className="hyperlink">View detail</button>
                    </Link>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="hpcontent hpsection-1">
            <div className="hpsection-1-imgA">
            </div>
            <div className="hpsection-1-txt">
              <br /><br />
              <div className="brandblock"></div>
              <h1>About Locally Roasted</h1>
              <p>Our Locally Roasted Program hosts unique blends from our roasters across the country. Each blend is aptly named for neighborhoods near our facilities: Fishtown, in Philadelphia, Bucktown in Chicago, and Frogtown in Los Angeles.</p>
              <form action="https://www.honeybeecoffeeco.com/blog/2020/4/2/6-benefits-of-buying-locally-roasted-coffee">
              <button className="cta">Learn more</button></form>
            </div>
          </div>
          <div className="hpcontent itemList col3">
            <div>
              <div className="itemcard">
                <div>
                  <a href="https://www.stumptowncoffee.com/pages/brew-guide-french-press">
                    <img src="https://import.cdn.thinkific.com/373767/L8aueU9TAqyE1gyaUDHy_black_coffee_square_jpg" />
                    <br />
                    <h3>The Art of the Cold Brew</h3>
                    <p>Learn how to brew better-tasting coffee</p>
                  </a>
                </div>
              </div>
              <div className="itemcard">
                <div>
                  <a href="https://www.stumptowncoffee.com/pages/brew-guide-vacuum-pot">
                    <img src="https://import.cdn.thinkific.com/373767/S4WnttO0SRCBRUbE6BX6_xr_bar_13_square2_jpg" />
                    <br />
                    <h3>Transform Your Morning Cup</h3>
                    <p>Learn to make cafe-quality cold brew in your home</p>
                  </a>
                </div>
              </div>
              <div className="itemcard">
                <div>
                  <a href="https://www.stumptowncoffee.com/pages/brew-guide-aeropress">
                    <img src="https://import.cdn.thinkific.com/373767%2Fcustom_site_themes%2Fid%2FMOnBNF57Qye35NRaCt9i_cold-brew-class-6.jpg" />
                    <br />
                    <h3>Transform Your Morning Cup</h3>
                    <p>Learn how to brew better-tasting coffee</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hpcontent hpsection-1">
            <div className="hpsection-1-txt">
              <br /><br />
              <div className="brandblock"></div>
              <h1>For you and for the planet</h1>
              <p>The pursuit of excellence is linked to the protection of the environment: to obtain a quality product, we must first take care of Mother Nature. We are committed to spreading a culture of respect for the ecosystem.</p>
              <form action="https://youmatter.world/en/definition/ecosystem-definition-example/">
              <button className="cta">Learn more</button></form>
            </div>
            <div className="hpsection-1-imgB">
            </div>
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
