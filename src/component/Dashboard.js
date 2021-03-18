import React, { useState } from "react";
import useTableInput from './hooks/useTableInput'
import { Table,Button } from "semantic-ui-react";

const Dashboard = (sheetsData) => {

  return (
    <>
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
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sheetsData ? (
          sheetsData.sheetsData.map((client) => {
            return <BuddysWorld client={client}/>
          })
        ) : (
          <Table.Row>
            <Table.Cell>Loading</Table.Cell>
            <Table.Cell>Data </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      
    </Table>
    <div id="movestuff"><Button color="blue">Submit Changes</Button></div>
    </>
  );
};

function BuddysWorld ({client}) {
  const [withdrawalEditing, newWithdrawal,setNewWithdrawal, withDrawlHandler] = useTableInput()
  const [depositEditing, newDeposit,setNewDeposit, depositHandler] = useTableInput()
  
  return (
    <React.Fragment key={client.Id}>
      <Table.Row className={client.Id}>
        <Table.Cell>{client.Month}</Table.Cell>
        <Table.Cell>{client.clientName}</Table.Cell>
        <Table.Cell>{client.startingBalance} </Table.Cell>
        <Table.Cell>{client.SureFireFee} </Table.Cell>
        <Table.Cell>{client.NewNetBalance} </Table.Cell>
        <Table.Cell>{client.PercentageGain} </Table.Cell>
        <Table.Cell>
          {withdrawalEditing ? (
            <input
              onChange={(e) => setNewWithdrawal(e.target.value)}
              value={newWithdrawal}
              type="number"

            />
          ) : (
            Number(newWithdrawal) + Number(client.Withdrawal) + " "
          )}
          <button class="positive ui button" onClick={withDrawlHandler}>
            {withdrawalEditing ? "Submit" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>{depositEditing ? (
            <input
              onChange={(e) => setNewDeposit(e.target.value)}
              value={newDeposit}
              type="number"
            />
          ) : (
            Number(newDeposit) + Number(client.Deposit)+ " "
          )}
          <button class="negative ui button" onClick={depositHandler}>
            {depositEditing ? "Submit" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>{client.NextMonthValue} </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}

export default Dashboard;