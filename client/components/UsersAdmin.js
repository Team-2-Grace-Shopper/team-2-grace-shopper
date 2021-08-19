import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../store/users";

//need to create addCart button
//need to create button to increment & decrement count

export class UsersAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getUsers();
  }

  render() {
    const users = []
      .concat(this.props.users)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    return (
      <div>
        <div className="itemList-admin">
          <h2>Manage all Users</h2>
          <br />
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <span>{user.id}</span>
                <Link to={`/users-admin/${user.id}`} className="product-basicInfo">
                  <h3>{user.name}</h3>
                  <span>User name: {user.username}</span>
                  <br />
                  <br />
                  <span>
                    Address: {user.address}, {user.state} {user.zip}
                  </span>
                </Link>
                <p className="product-description">
                  <span>Total : </span>
                  {user.orders && user.orders.length} orders
                  <br />
                  <br />
                  <span>View order list</span>
                </p>
                <p>
                  <Link to={`/users-admin/${user.id}`} className="cta">
                    Edit User
                  </Link>
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
};

export default connect(mapState, mapDispatchToProps)(UsersAdmin);
