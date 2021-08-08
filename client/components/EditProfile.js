import React from 'react';
import { connect } from 'react-redux';
import { updateUser, getUser } from '../store/users';

class _EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      loading: false,
      message: 'message area (if needed)',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   componentDidMount() {
    console.log('CDM 1',this.props)
    this.setState({ loading: true });
    this.setState({city: 'xxx'})
//    await this.props.getUser(this.props.username)
    this.setState({ loading: false })
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    switch (name){

    }
    this.setState({[name] : [value]})
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
  }

  render(props) {
    if (this.state.loading) {
      return 'Retrieving your information...';
    }
    return (
      <div>
        <h1 className="profile">Edit Profile</h1> 
        <h2>props.name</h2>
        <h3>{ this.state.message }</h3>
        <h4>Personal Info</h4>
        <form onSubmit={this.handleSubmit} >
          <div className="formfield">
            <label>Email</label>
            <input type="text" 
                   name="username" 
                   disabled
                   value = { this.state.username }
                   onChange = { this.handleChange } />
          </div>
          <div className="formfield">
            <label>Address</label>
            <input type="text" 
                   name="address" 
                   autoFocus 
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
            <button>Save</button>
          </div>
        </form>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('in MSTP', state.auth.username, state.auth)
  return {
    username: state.auth.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getUser: (username) => dispatch(getUser(username))
  }
}

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(_EditProfile)

export default EditProfile;
