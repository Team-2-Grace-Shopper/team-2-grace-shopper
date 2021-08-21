import React, { Component } from "react";
import { connect } from "react-redux";

class CoffeeDetail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <hr />
        <br /><br />
        <div className="coffeeDetail-philo">
          <p>We only live once, so let’s explore the world we live in, set goals, and enjoy our time together over an amazing cup of coffee.</p>
        </div>
        <div className="coffeeDetail-paragraph">
          <div>
            <h2>Our Coffee</h2>
            <br />
            <p>This espresso blend is pure pleasure. We reverse-engineered a blue-collar Italian espresso blend (yes, Robusta!) with high-quality organic coffee to make a sturdy, crema-heavy, and unpretentious espresso. If Hayes Valley Espresso is like consuming a volume of In Search of Lost Time in liquid form, then 17ft Ceiling is like flipping through The New Yorker—edifying without being overly taxing.</p>
          </div>
          <img src="https://blue-bottle-cms.global.ssl.fastly.net/hbhhv9rz9/image/upload/c_thumb,h_576,w_576/v1526404876/gkhxnpntcaonvebez1ys.jpg" />

        </div>
      </div>
    )
  }
}

export default connect()(CoffeeDetail)