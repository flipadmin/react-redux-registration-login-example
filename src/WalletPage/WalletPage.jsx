import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { walletActions } from "../_actions";

class WalletPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      external_id: "",
      company_id: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { external_id, company_id } = this.state;
    const { dispatch } = this.props;
    if (external_id && company_id) {
      dispatch(walletActions.get_lines(external_id, company_id));
    }
  }

  render() {
    const { gettingLines } = this.props;
    const { external_id, company_id, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Get Wallet Lines</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !external_id ? " has-error" : "")
            }
          >
            <label htmlFor="external_id">External ID</label>
            <input
              type="text"
              className="form-control"
              name="external_id"
              value={external_id}
              onChange={this.handleChange}
            />
            {submitted &&
              !external_id && (
                <div className="help-block">
                  External ID of user is required
                </div>
              )}
          </div>
          <div
            className={
              "form-group" + (submitted && !company_id ? " has-error" : "")
            }
          >
            <label htmlFor="company_id">Company ID</label>
            <select
              className="form-control"
              name="company_id"
              value={company_id}
              onChange={this.handleChange}
            >
              <option value="InitialRewards">InitialRewards</option>
              <option value="RedZone">RedZone</option>
              <option value="RewardsMatrix">RewardsMatrix</option>
              <option value="SportNation">SportNation</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
            {gettingLines && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { wallet_lines } = state;
  const { gettingLines } = state.wallet_lines;
  return {
    gettingLines
  };
}

const connectedWalletPage = connect(mapStateToProps)(WalletPage);
export { connectedWalletPage as WalletPage };
