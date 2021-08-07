import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadUserInfo } from './store/users';

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
    if (this.props.mode === 'edit'){
      console.log('editing...', this.props.mode)
    } else {
      console.log('adding...', this.props.mode)
    }
    // read user information
    this.setState({ loading: true });
    await this.props.loadUserInfo()
    this.setState({loading: false})
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
      <div> some data
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username,
    mode: ownProps.history.location.state.mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    loadUserInfo: (username) => dispatch(loadUserInfo(username))
  }
}

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(_EditProfile)

export default EditProfile;
