import React, { useState } from "react";
import useTableInput from "./hooks/useTableInput";
import axios from "axios";

import {
  monthsDropdownData,
  defaultDropDownMonth,
  nextMonth,
  dateHolder,
  currentMonth,
} from "../consts/constants";

import { Table, Button, Dropdown, Header } from "semantic-ui-react";

const Dashboard = (sheetsData) => {
  let [isLoading, setIsLoading] = useState(false);

  const handleDropdown = (event, data) => {
    // console.log(data);
    // console.log(event, "this is the event")
  };

  const handleSubmitValues = (event) => {
    //Pull Data from Dom Once values are submitted
    const timeStamp = new Date(Date.now()).toDateString();
    let wholeTable = document.getElementsByClassName("testforDommy");
    // let requestArray = [];
    console.log(nextMonth);
    console.log(dateHolder);
    console.log(dateHolder.getMonth());
    for (let i = 1; i < wholeTable[0].rows.length; i++) {
      let row = wholeTable[0].rows[i];
      let withDrawalHolder = Number(row.children[6].innerText.split(" ")[0]);
      let depositHolder = Number(row.children[7].innerText.split(" ")[0]);
      let finalClientValue = Number(row.children[8].innerText.split(" ")[1]);
      let clientIDHolder = row.className;
      axios
        .put(
          `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
          {
            condition: { Id: clientIDHolder },
            set: {
              Withdrawal: withDrawalHolder,
              Deposit: depositHolder,
              TimeStamp: timeStamp,
              NextMonthValue: finalClientValue,
            },
          }
        )
        .then((response) => {
          console.log("this fired", response.data);
        });
    }
  };

  // }
  // console.log(requestArray)
  // axios.all(requestArray).then((response) => {
  //         console.log("this fired", response.data);
  //         setIsLoading(false);
  // });
  //   data: [
  //     {
  //         "query":"id=1",
  //         "name":"qwes",
  //         "age":20
  //     },
  //     {
  //         "query":"id=2",
  //         "age":25,
  //     }
  // ]

  const DropdownExampleDropdown = () => (
    <Dropdown
      fluid
      selection
      options={monthsDropdownData}
      onChange={handleDropdown}
      defaultValue={defaultDropDownMonth.value}
    />
  );

  return (
    <>
      <Table striped className="testforDommy">
        <Table.Header>
          <Table.Row>
            <DropdownExampleDropdown />
            <Table.HeaderCell>
              <h3>Client Name</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Starting Monthly Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Sure Fire Fee</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>New Net Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Percentage Gain</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Withdrawal</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Deposit</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Next Months Balance</h3>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sheetsData ? (
            sheetsData.sheetsData.map((client) => {
              return <BuddysWorld client={client} />;
            })
          ) : (
            <Table.Row>
              <Table.Cell>Loading</Table.Cell>
              <Table.Cell>Data </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div id="submitChangesButtonDiv">
        <Button
          color="blue"
          className="submitbutton"
          onClick={(e) => {
            handleSubmitValues(e);
          }}
        >
          Submit Changes
        </Button>
        <Header id="endingborder" as="h3">
          Net Ending Portfolio Value for the Month: {}
        </Header>
      </div>
    </>
  );
};

function BuddysWorld({ client }) {
  const [
    withdrawalEditing,
    newWithdrawal,
    setNewWithdrawal,
    withDrawlHandler,
  ] = useTableInput();
  const [
    depositEditing,
    newDeposit,
    setNewDeposit,
    depositHandler,
  ] = useTableInput();

  return (
    <React.Fragment key={client.Id}>
      <Table.Row className={client.Id}>
        <Table.Cell>{client.Month}</Table.Cell>
        <Table.Cell>
          <h4>{client.clientName}</h4>
        </Table.Cell>
        <Table.Cell>£ {Number(client.startingBalance).toFixed(2)} </Table.Cell>
        <Table.Cell>{client.SureFireFee} </Table.Cell>
        <Table.Cell>£ {Number(client.NewNetBalance).toFixed(2)} </Table.Cell>
        <Table.Cell>{client.PercentageGain} </Table.Cell>
        <Table.Cell>
          {withdrawalEditing ? (
            <input
              className="withdrawalinput"
              onChange={(e) => setNewWithdrawal(e.target.value)}
              name={client.Id}
              value={newWithdrawal}
              type="number"
            />
          ) : (
            Number(newWithdrawal) + Number(client.Withdrawal) + " "
          )}
          <button className="positive ui button" onClick={withDrawlHandler}>
            {withdrawalEditing ? "Confirm" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>
          {depositEditing ? (
            <input
              className="depositinput"
              onChange={(e) => setNewDeposit(e.target.value)}
              value={newDeposit}
              type="number"
            />
          ) : (
            Number(newDeposit) + Number(client.Deposit) + " "
          )}
          <button className="negative ui button" onClick={depositHandler}>
            {depositEditing ? "Confirm" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>
          £{" "}
          {Number(client.NewNetBalance).toFixed(2) -
            Number(newWithdrawal) +
            Number(newDeposit)}
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}

export default Dashboard;
