import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../store/users';

class _EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      message: 'message area (if needed)'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.getUser(this.props.id)
    const user = this.props.users[0];
    this.setState({
      loading: false,
      username: user.username,
      name: user.name,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      id: user.id,
      enableSave: true,
      message: '',
    })
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    switch (name){

    }
    this.setState(Object.assign({}, this.state, {[name]:value}, { enableSave : false }));
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
    this.setState(Object.assign({}, this.state, { enableSave : true, message: 'Changes saved!' }));
    window.setTimeout(() => this.setState({message: ''}), 3000)
  }

  render() {
    if (this.state.loading) {
      return 'Retrieving your information...';
    }
    return (
      <div className="profilecontainer">
        <section className="profile">
          <h1 className="profile">Edit Profile</h1> 
          <div className="profilehdr">
            <h2>{ this.state.name }</h2>
            <h3>{ this.state.message }</h3>
            <h4>Personal Info</h4>
            </div>
        </section>
        <section className="profile">
          <form onSubmit={this.handleSubmit} id="profileform">
            <div className="formfield">
              <label>Email</label>
              <input type="text" 
                      name="username" 
                      disabled
                      value = { this.state.username }
                      onChange = { this.handleChange } />
            </div>
            <div className="formfield">
              <label>Name</label>
              <input type="text" 
                      name="name" 
                      autoFocus 
                      required 
                      value={ this.state.name }
                      onChange={this.handleChange} />
            </div>
            <div className="formfield">
              <label>Address</label>
              <input type="text" 
                      name="address" 
                      required 
                      value={ this.state.address }
                      onChange={this.handleChange} />
            </div>
            <div className="formfield">
              <label>City</label>
                <input type="text" 
                        name="city" 
                        required 
                        value={ this.state.city }
                        onChange={this.handleChange} />
            </div>
            <div className="formfield">
              <label>State</label>
                <input type="text" 
                      name="state" 
                      required 
                      value={ this.state.state }
                      onChange={this.handleChange} />
            </div>
            <div className="formfield">
              <label>Zip</label>
              <input type="text" 
                      name="zip" 
                      required 
                      value={ this.state.zip }
                      onChange={this.handleChange} />
            </div>
            <div className="formfield">
              <label> </label>
              <button disabled={ this.state.enableSave }>Save</button>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getUser: (id) => dispatch(getUser(id))
  }
}

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(_EditProfile)

export default EditProfile;
