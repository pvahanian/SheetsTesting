import React from "react";
import { Table } from "semantic-ui-react";

const Dashboard = (sheetsData) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Month</Table.HeaderCell>
          <Table.HeaderCell>Client Name</Table.HeaderCell>
          <Table.HeaderCell>Starting Monthly Balance</Table.HeaderCell>
          <Table.HeaderCell>Sure Fire Fee</Table.HeaderCell>
          <Table.HeaderCell>New Net Balance</Table.HeaderCell>
          <Table.HeaderCell>Percentage Gain</Table.HeaderCell>
          <Table.HeaderCell>Withdrawal</Table.HeaderCell>
          <Table.HeaderCell>Deposit</Table.HeaderCell>
          <Table.HeaderCell>Next Months Balance</Table.HeaderCell>
          {/* <Table.HeaderCell>Empty Cell</Table.HeaderCell> */}
          {/* <Table.HeaderCell>Portfolio Total</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sheetsData ? (
          sheetsData.sheetsData.map((client) => {
            return (
                <React.Fragment key={client.Id}>
                  <Table.Row className={client.Id}>
                    <Table.Cell>{client.Month}</Table.Cell>
                    <Table.Cell>{client.clientName}</Table.Cell>
                    <Table.Cell>{client.startingBalance} </Table.Cell>
                    <Table.Cell>{client.SureFireFee} </Table.Cell>
                    <Table.Cell>{client.NewNetBalance} </Table.Cell>
                    <Table.Cell>{client.PercentageGain} </Table.Cell>
                    <Table.Cell>{client.Withdrawal} </Table.Cell>
                    <Table.Cell>{client.Deposit} </Table.Cell>
                    <Table.Cell>{client.NextMonthValue} </Table.Cell>
                    </Table.Row>
                </React.Fragment>
              );
            }
          )
        ) : (
          <Table.Row>
            <Table.Cell>Loading</Table.Cell>
            <Table.Cell>Data </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
export default Dashboard;
