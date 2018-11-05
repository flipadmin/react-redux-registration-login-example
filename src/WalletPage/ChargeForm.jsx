import React, { Component } from "react";
import { connect } from "react-redux";
import { walletActions } from "../_actions";

class ChargeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      title: "",
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
    const { amount, title } = this.state;
    const { dispatch } = this.props;
    const { external_user_sub } = this.props;
    if (validateForm(amount, title)) {
      bootbox.confirm({
        message: `Charge User <b> ${external_user_sub} </b> with amount = <b> ${amount} </b><br> Are you sure?`,
        buttons: {
          confirm: {
            label: "Yes",
            className: "btn-success"
          },
          cancel: {
            label: "No",
            className: "btn-danger"
          }
        },
        callback: function(result) {
          if (result === true) {
            dispatch(walletActions.charge(amount, title, external_user_sub));
          }
        }
      });
    }
  }

  render() {
    const Formulage1 = {
      backgroundColor: "#687F96",
      height: "fit-content",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginBottom: "15px"
    };
    const FormDiv = {
      height: "fit-content"
    };
    const { chargingLines, items, external_user_sub } = this.props;
    const { amount, title, submitted } = this.state;
    return (
      <div style={Formulage1} className="jumbotron">
        <div className="form-row">
          <form className="" onSubmit={this.handleSubmit}>
            <div style={FormDiv} className="col col-md-5">
              <label htmlFor="amount" />
              <input
                type="number"
                className="form-control "
                name="amount"
                value={amount}
                placeholder="Charge external User with AMOUNT"
                onChange={this.handleChange}
              />
            </div>
            <div style={FormDiv} className="col col-md-5">
              <label htmlFor="title" />
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                placeholder="Title of operation"
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-danger">Charge</button>
            {chargingLines && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </form>
        </div>
      </div>
    );
  }
}
function validateForm(ex_amount, ex_title) {
  let amount = ex_amount;
  let title = ex_title;
  if (amount === "") {
    bootbox.alert("Please insert amount");
  } else if (parseInt(amount) <= 0) {
    bootbox.alert("Please insert positive amount");
  } else if (amount.match(/^[0-9.]+$/) === null) {
    bootbox.alert("Please insert amount in decimal");
  } else if (title === "") {
    bootbox.alert("Please insert title of operation");
  } else {
    return true;
  }
}

function mapStateToProps(state) {
  // const { wallet_lines } = state;
  const { chargingLines, items, external_user_sub } = state.wallet_lines;
  return {
    chargingLines,
    items,
    external_user_sub
  };
}

const connectedChargeForm = connect(mapStateToProps)(ChargeForm);
export { connectedChargeForm as ChargeForm };
