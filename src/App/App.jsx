import React from "react";
import { Router, HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { WalletPage } from "../WalletPage";
import { NavBar } from "../NavBar";

function withBaseFix(HashRouter) {
  return class extends React.Component {
    constructor() {
      super();
      this.baseElement = document.querySelector("base");
      if (this.baseElement) {
        this.baseHref = this.baseElement.getAttribute("href");
        this.baseElement.setAttribute("href", "");
      }
    }

    render() {
      return <HashRouter {...this.props}>{this.props.children}</HashRouter>;
    }

    componentDidMount() {
      if (this.baseElement)
        this.baseElement.setAttribute("href", this.baseHref);
    }
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const Formulage1 = {
      backgroundColor: "#687F96",
      height: "fit-content",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginBottom: "15px"
    };
    const { alert } = this.props;
    const FixedHashRouter = withBaseFix(HashRouter);

    return (
      <FixedHashRouter history={history}>
        <div>
          <NavBar />
          <div className="container">
            {/* <div style={Formulage1} className="jumbotron"> */}
            {/* <div className="col-sm-8 col-sm-offset-2"> */}
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/wallet_page" component={WalletPage} />
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
      </FixedHashRouter>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
