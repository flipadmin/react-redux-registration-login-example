import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    let user =
      this.props.authentication.user === undefined ? "Login" : "Logout";
    return (
      <nav className="navbar navbar-inverse">
        <div style={{ backgroundColor: "#193550" }} className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-brand">CS-ADMIN</p>
          </div>
          <ul className="nav navbar-nav navavigation">
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
              <Link to="/login">
                {" "}
                <span className="glyphicon glyphicon-log-out" />
                {user}
              </Link>
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
