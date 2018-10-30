import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";
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
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi Ziom</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(WalletPage);
export { connectedHomePage as WalletPage };
