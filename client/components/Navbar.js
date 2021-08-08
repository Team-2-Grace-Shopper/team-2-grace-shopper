import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AccountDropdown from './AccountDropdown'

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      showDropdown: false,
    }
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown(ev){
    ev.preventDefault();
    this.setState({ showDropdown: true }, () => {
      document.addEventListener('click', this.closeDropdown)
    })
  }
  closeDropdown(){
    this.setState({ showDropdown: false }, () => {
      document.removeEventListener('click', this.closeDropdown)
    })
  }

  render() {
    const {handleClick, isLoggedIn, name, isAdmin} = this.props
    return(
      <div id="navbar">
      {console.log(isAdmin)}
      <Link to="/home"><h1 className="logo">Grace Coffee.</h1></Link>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <div>
              <Link to="/coffees">Coffee</Link>
              <Link to="/accessories">Accessories</Link>
              <Link to="/sale">Sale</Link>
              <Link to={{
                pathname: "/profile",
                state: { mode: 'edit'
                }
              }}>Profile</Link>
            </div>
            <div>
              <a href="#">Search</a>
              <Link to="/cart">Cart</Link>
              <button onClick={this.showDropdown}>Hi, {name}</button>
              <p onClick={handleClick}>Logout</p>
              { this.state.showDropdown ? <AccountDropdown /> : null }
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <ul>
              <Link to="/coffees">Coffee</Link>
              <Link to="/accessories">Accessories</Link>
              <Link to="/sale">Sale</Link>
              <Link to={{
                pathname: "/profile",
                state: { mode: 'new'
                }
              }}>Register</Link>
              </ul>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn, name, isAdmin}) => (
//   <div id="navbar">
//     {console.log(isAdmin)}
//     <Link to="/home"><h1 className="logo">Grace Coffee.</h1></Link>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <div>
//             <Link to="/coffees">Coffee</Link>
//             <Link to="/accessories">Accessories</Link>
//             <Link to="/sale">Sale</Link>
//             <Link to={{
//               pathname: "/profile",
//               state: { mode: 'edit'
//               }
//             }}>Profile</Link>
//           </div>
//           <div>
//             <a href="#">Search</a>
//             <Link to="/cart">Cart</Link>
//             <a className="nav-account" href="/profile">Hi, {name}</a>
//             <p onClick={handleClick}>Logout</p>
//             <AccountDropdown />
//           </div>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <ul>
//             <Link to="/coffees">Coffee</Link>
//             <Link to="/accessories">Accessories</Link>
//             <Link to="/sale">Sale</Link>
//             <Link to={{
//               pathname: "/profile",
//               state: { mode: 'new'
//               }
//             }}>Register</Link>
//             </ul>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)