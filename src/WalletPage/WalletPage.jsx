import React from "react";
import { connect } from "react-redux";
import { ChargeForm } from "./ChargeForm";
import { ExternalUserForm } from "./ExternalUserForm";
import "./style.css";

class WalletPage extends React.Component {
  render() {
    const { items } = this.props;
    const JsonTable = require("ts-react-json-table");
    const settings = {
      cellClass: function(current, key, item) {
        if (key == "balance_after" || key == "balance_before") {
          const amount_value =
            item.amount_formatted > 0 ? " balance" : " balance-red";
          return current + amount_value;
        } else if (key == "amount_formatted") {
          const amount_value =
            item.amount_formatted > 0 ? " amount" : " amount-red";
          return current + amount_value;
        }
      }
    };
    const columns = [
      { key: "company_id", label: "COMPANY ID" },
      { key: "operation_date", label: "OPERATION DATE" },
      {
        key: "operation_type",
        label: "OT",
        title: "OPERATION TYPE",
        className: "text-center",
        cell: function(items) {
          return (
            <span className="badge badge-light">{items.operation_type}</span>
          );
        }
      },
      {
        key: "operation_subtype",
        label: "ST",
        title: "OPERATION SUBTYPE",
        className: "text-center",
        cell: function(items) {
          return (
            <span className="badge badge-light">{items.operation_subtype}</span>
          );
        }
      },
      {
        key: "src_transaction_id",
        label: "TRANSACTION ID",
        className: "text-center text-nowrap"
      },
      {
        key: "src_title",
        label: "TITLE",
        className: "text-center"
      },
      {
        key: "balance_before",
        label: "BB",
        title: "BALANCE BEFORE"
        // className: "balance"
        // cell: function(items) {
        //   return <span className="balance">{items.balance_before}</span>;
        // }
      },
      { key: "amount_formatted", label: "AMOUNT" },
      {
        key: "balance_after",
        label: "BA",
        title: "BALANCE AFTER"
        // cellClass: function(current, key, item) {
        //   return current + " balance";
        // }
      }
    ];
    return (
      <React.Fragment>
        <div className="testing-style" />
        <ExternalUserForm />
        {items && <ChargeForm />}
        <br />
        {items && (
          <JsonTable
            // theadClassName="text text-center"
            className="table table-condensed table-hover text-center"
            rows={items}
            columns={columns}
            settings={settings}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state.wallet_lines;
  return {
    items
  };
}

const connectedWalletPage = connect(mapStateToProps)(WalletPage);
export { connectedWalletPage as WalletPage };
