import React from "react";
import { connect } from "react-redux";
import { ChargeForm } from "./ChargeForm";
import { ExternalUserForm } from "./ExternalUserForm";

class WalletPage extends React.Component {
  render() {
    const { items } = this.props;
    const JsonTable = require("ts-react-json-table");
    const columns = [
      { key: "company_id", label: "COMPANY ID" },
      { key: "operation_date", label: "OPERATION DATE" },
      {
        key: "operation_type",
        label: "OT",
        className: "text-center",
        cell: function(items) {
          return (
            <span className="badge badge-light">{items.operation_type}</span>
          );
        }
      },
      {
        key: "operation_subtype",
        label: "OS",
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
        className: "text-center",
        cell: function(items) {
          return <span className="text-center">{items.src_title}</span>;
        }
      },
      { key: "balance_before", label: "BB" },
      { key: "amount_formatted", label: "AMOUNT" },
      { key: "balance_after", label: "BA" }
    ];
    console.table({ items });
    return (
      <React.Fragment>
        <ExternalUserForm />
        {items && <ChargeForm />}
        <br />
        {items && (
          <JsonTable
            theadClassName="text text-center"
            className="table table-condensed table-hover text-center"
            rows={items}
            columns={columns}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  // const { wallet_lines } = state;
  const { items } = state.wallet_lines;
  return {
    items
  };
}

const connectedWalletPage = connect(mapStateToProps)(WalletPage);
export { connectedWalletPage as WalletPage };
