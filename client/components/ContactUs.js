import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const _ContactUs = (props) => {
  return (
    <div>
        <h1 style={{marginTop: 150}}>Hello { props.user.name }</h1>
        <h2>Customer Service Home</h2>
        <h2>Email</h2>
        <h3><a href="mailto:customerservice@gracecoffee.com">Send an email</a></h3>
        <h2>Phone</h2>
        <h3><a href="tel:1-800-555-1212">Call us</a></h3>
        <h2>Holiday Closures</h2>
        <h3>Our customer service contact center is closed on the following US holidays:</h3>
        <h4><ul>
        <li>New Years Day</li>
        <li>Memorial Day</li>
        <li>Independence Day</li>
        <li>Labor Day</li>
        <li>Thanksgiving</li>
        <li>Christmas</li>
        </ul></h4>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = {

};

const ContactUs = connect(mapState, mapDispatchToProps)(_ContactUs);
export default ContactUs ;
