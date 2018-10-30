import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    const user = this.props.authentication.user;

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-brand">CS-ADMIN</p>
          </div>
          <ul className="nav navbar-nav navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wallet_page">Wallet Lines</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right navigation">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication
  };
}

const connectedNavigationBar = connect(mapStateToProps)(NavBar);
export { connectedNavigationBar as NavBar };
