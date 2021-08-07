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
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    console.log('CDM', this.props)
    if (this.props.mode === 'edit'){
      console.log('editing...', this.props.mode)
      this.setState({ loading: true });
      await this.props.getUser(this.props.username)
      this.setState({ loading: false })
    } else {
        console.log('adding...', this.props.mode)
    }
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

  render() {
    return (
      <div>
        <h3>{this.state.message}</h3>

        {this.props.mode === 'edit' ?
          <h1>Edit Profile</h1> 
          :
          <h1>Create Profile</h1>}
          <form onSubmit={this.handleSubmit} >
            <label>ID (email):
              <input type="text" 
                     name="username" 
                     autoFocus 
                     required 
                     value={ this.state.username }
                     onChange={this.handleChange} />
            </label>
            <label>Address:
              <input type="text" 
                     name="address" 
                     required 
                     value={ this.state.address }
                     onChange={this.handleChange} />
            </label>
            <label>City:
              <input type="text" 
                     name="city" 
                     required 
                     value={ this.state.city }
                     onChange={this.handleChange} />
            </label>
            <label>State:
              <input type="text" 
                     name="state" 
                     required 
                     value={ this.state.state }
                     onChange={this.handleChange} />
            </label>
            <label>Zip:
              <input type="text" 
                     name="zip" 
                     required 
                     value={ this.state.zip }
                     onChange={this.handleChange} />
            </label>
            <button>Save</button>
          </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('in MSTP', state, ownProps)
  return {
    username: state.auth.username,
    mode: ownProps.location.state.mode,
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
