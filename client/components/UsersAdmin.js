import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../store/users";
import { getOrders } from "../store/orders";

//need to create addCart button
//need to create button to increment & decrement count

export class UsersAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getUsers();
    await this.props.getOrders();
  }

  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    return (
      <div>
        <div className="itemList-admin">
          <h2>Manage all Users</h2>
          <br />
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <span>{user.id}</span>
                <Link to={"/"} className="product-basicInfo">
                  <h3>{user.name}</h3>
                  <span>User name: {user.username}</span>
                  <br />
                  <br />
                  <span>
                    Address: {user.address}, {user.state} {user.zip}
                  </span>
                </Link>
                <p className="product-description">
                  All orders
                  <br />
                  {/* {orders.onSale ? (
                    <p>
                      <span className="disabled">${product.price}</span> $
                      {product.salePrice} / {product.weight}lbs
                    </p>
                  ) : (
                    <p>
                      ${product.price} / {product.weight}lbs
                    </p>
                  )} */}
                </p>
                <p>
                  <button className="cta">Edit Users</button>
                </p>
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
    users: state.users,
  };
};

const mapDispatchToProps = {
  getUsers,
  getOrders,
};

export default connect(mapState, mapDispatchToProps)(UsersAdmin);
