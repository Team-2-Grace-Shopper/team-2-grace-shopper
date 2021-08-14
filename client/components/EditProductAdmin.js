import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";

class _EditProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "message area (if needed)",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.getProducts();
    const _product = await this.props.products.filter((product) => { return product.id === parseInt(this.props.match.params.id) })
    const product = _product[0]
    this.setState({
      loading: false,
      featured: product.featured,
      type: product.type,
      name: product.name
      // username: user.username,
      // name: user.name,
      // address: user.address,
      // city: user.city,
      // state: user.state ? user.state : "0",
      // zip: user.zip,
      // id: user.id,
      // enableSave: true,
      // message: "",
      // dispName: user.name,
    });
  }

  handleChange(ev) {
    let { name, value, type } = ev.target;
    if (type === "select-one") {
      name = "state";
    }
    switch (name) {
      case "username":
        if (ev.target.value.length > 75) return;
        break;
      case "name":
        if (ev.target.value.length > 75) return;
        break;
      case "address":
        if (ev.target.value.length > 75) return;
        break;
      case "city":
        if (ev.target.value.length > 50) return;
        break;
      case "zip":
        if (ev.target.value.length > 15) return;
        break;
    }
    this.setState(
      Object.assign({}, this.state, { [name]: value }, { enableSave: false })
    );
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
    this.setState(
      Object.assign({}, this.state, {
        dispName: this.state.name,
        enableSave: true,
        message: "Changes saved!",
      })
    );
    window.setTimeout(() => this.setState({ message: "" }), 3000);
  }

  render() {
    console.log(this.props, '*******')
    if (this.state.loading) {
      return "Retrieving your information...";
    }
    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">
          <h2 className="profilehdr">Update<br />{this.state.name}'s<br />profile</h2>
        </div>
        {/* <div className="profilehdr">
          
        </div> */}
        <div className="container" id="profileright">
          <form onSubmit={this.handleSubmit} id="profileform">
            <span className="timedAlert">
              {this.state.message && <h3> {this.state.message} </h3>}
            </span>
            <h2>{this.state.name}</h2>
            <br />
            <div className="formfield">
              <input
                type="text"
                name="username"
                disabled
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label>Email</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="name"
                autoFocus
                required
                maxLength="75"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <label>Name (*)</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="address"
                maxLength="75"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <label>Address</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="city"
                maxLength="50"
                value={this.state.city}
                onChange={this.handleChange}
              />
              <label>City</label>
            </div>
            {/*}            <div className="formfield">
              <label>State</label>
              <input type="text" 
                    name="state" 
                    value={ this.state.state }
                    onChange={this.handleChange} />
            </div>
    */}
            <div className="formfield">
              <select value={this.state.state} onChange={this.handleChange}>
                <option disabled key="0" value="0">
                  {" "}
                  -- select a state --{" "}
                </option>
                <option value="AL">Alabama</option>
              </select>
              <label>State</label>
            </div>

            <div className="formfield">
              <input
                type="text"
                name="zip"
                maxLength="15"
                value={this.state.zip}
                onChange={this.handleChange}
              />
              <label>Zip</label>
            </div>

            <div className="formfield">
              <span>(*) - required field</span>
              <button className="cta" disabled={this.state.enableSave}>
                Save
              </button>
              <a href="/users-admin" className="hyperlink"><span>Back to user list</span></a>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    user: state.user,
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getUser: (id) => dispatch(getUser(id)),
    getProducts: () => dispatch(getProducts())
  };
};

const EditProductAdmin = connect(mapStateToProps, mapDispatchToProps)(_EditProductAdmin);

export default EditProductAdmin;
