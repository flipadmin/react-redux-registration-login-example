import React from "react";
import { Router, HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
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
    const { alert } = this.props;
    const FixedHashRouter = withBaseFix(HashRouter);
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <FixedHashRouter history={history}>
              <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </FixedHashRouter>
          </div>
        </div>
      </div>
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
