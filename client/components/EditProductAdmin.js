import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";

class _EditProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.getProducts();
    // const _product = this.props.products.filter((product) => { return product.id === parseInt(this.props.match.params.id) }) || {}
    // const product = _product[0]
    const product = await this.props.product
    this.setState({
      loading: false,
      featured: product.featured,
      type: product.type,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      weight: product.weight,
      onSale: product.onSale,
      inventory: product.inventory
    });
  }

  handleChange(ev) {
    let { name, value, type } = ev.target;
    console.log('TARGETTTT', ev.target.name)
    switch (name) {
      case "name":
        if (ev.target.value.length > 75) return;
        break;
      // case "category":
      //   if (ev.target.value.length > 75) return;
      //   break;
      // case "type":
      //   if (ev.target.value.length > 75) return;
      //   break;
      case "origin":
        if (ev.target.value.length > 75) return;
        break;
      case "inventory":
        if (ev.target.value.length > 75) return;
        break;
      case "price":
        if (ev.target.value.length > 75) return;
        break;
      case "weight":
        if (ev.target.value.length > 75) return;
        break;
      case " description":
        if (ev.target.value.length > 75) return;
        break;
      case "isFeatured":
        if (ev.target.value.length > 75) return;
        break;
      case "onSale":
        if (ev.target.value.length > 75) return;
        break;
      case "salePrice":
        if (ev.target.value.length > 75) return;
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
    if (this.state.loading) {
      return "Retrieving your information...";
    }
    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">
          <h2 className="profilehdr">Update Product info</h2>
        </div>
        <div className="container" id="profileright">
          <form onSubmit={this.handleSubmit} id="profileform">
            <span className="timedAlert">
              {this.state.message && <h3> {this.state.message}</h3>}
            </span>
            <h2>{this.props.product.name}</h2>
            <br />
            <div>
              <div className="formfield">
                <select value={this.state.type} onChange={this.handleChange} name="type">
                  <option disabled key="0" value="0">
                    {" "}
                  -- select a type --{" "}
                  </option>
                  <option value="coffee">Coffee</option>
                  <option value="accessory">Accessory</option>
                </select>
                <label>Type</label>
              </div>
              {this.state.type === 'coffee' ?
                <div className="formfield">
                  <select value={this.state.category} onChange={this.handleChange} name="category">
                    <option disabled key="0" value="0">
                      {" "}
                  -- select a category --{" "}
                    </option>
                    <option value="roast-light">Light roast</option>
                    <option value="roast-dark">Dark roast</option>
                  </select>
                  <label>Category</label>
                </div>
                :
                <div className="formfield">
                  <select value={this.state.category} onChange={this.handleChange} name="category">
                    <option disabled key="0" value="0">
                      {" "}
                  -- select a category --{" "}
                    </option>
                    <option value="grinder">Grinders</option>
                    <option value="brewtool">Brewing tools</option>
                  </select>
                  <label>Category</label>
                </div>
              }

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
              <label>Name</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="origin"
                maxLength="75"
                value={this.state.country}
                onChange={this.handleChange}
              />
              <label>origin</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="inventory"
                maxLength="4"
                value={this.state.inventory}
                onChange={this.handleChange}
              />
              <label>Inventory</label>
            </div>

            <div className="formfield">
              <input
                type="text"
                name="price"
                maxLength="15"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <label>Price</label>
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

const mapStateToProps = ({ products, auth }, { match }) => {
  // console.log(products, 'STATE')
  const _product = products.filter((product) => { return product.id === match.params.id }) || {}
  const product = _product[0]
  return {
    id: auth.id,
    product
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
