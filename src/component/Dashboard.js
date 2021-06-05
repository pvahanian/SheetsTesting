import React,{useState} from "react";
import useTableInput from "./hooks/useTableInput";
import axios from "axios";


import { monthsDropdownData,currentMonth,currentYear} from "../consts/constants";

import { Table, Select } from "semantic-ui-react";

const Dashboard = (props) => {
  const { sheetsData, setSheetsData } = props;
  const [dropDownHolder,setDropDownHolder] = useState(currentMonth)


  const handleDropdown = e => {
    let selectedMonth = e+" "+currentYear
    if(selectedMonth==="May2021"){
      selectedMonth="May 2021"
    }
    setDropDownHolder(selectedMonth)
    
    const getData = () => {
      axios
        .get(
          `https://api.steinhq.com/v1/storages/60b53b5ed2a8585c5af2817f/${selectedMonth}`
        )
        .then((response) => {
          let unSortedSheet = response.data
          unSortedSheet.sort((a, b) => {
            return a.Id - b.Id;
          });
          setSheetsData(unSortedSheet)
        })    
    }
    getData();
  }

  const MonthDropDown = () => (
    <Select
      fluid
      selection
      options={monthsDropdownData}
      onChange={(e)=>handleDropdown(e.target.innerText)}
      defaultValue={dropDownHolder}
    />
  );

  


  return (
    <>
      <Table striped className="testforDommy">
        <Table.Header>
          <Table.Row>
            <MonthDropDown />
            <Table.HeaderCell width={2}>
              <h3>Client Name</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <h3>Starting Monthly Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              <h3>Sure Fire Fee</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <h3>New Net Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              <h3>Percentage Gain</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <h3>Withdrawal</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <h3>Deposit</h3>
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <h3>Next Months Balance</h3>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sheetsData ? (
            sheetsData.map((client) => {
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
        <Table.Cell>$ {Number(client.startingBalance).toFixed(2)} </Table.Cell>
        <Table.Cell>{client.SureFireFee} </Table.Cell>
        <Table.Cell>$ {Number(client.NewNetBalance).toFixed(2)} </Table.Cell>
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
          <button className="negative ui button" onClick={withDrawlHandler}>
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
          <button  className="positive ui button"  onClick={depositHandler}>
            {depositEditing ? "Confirm" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>
          ${" "}
          {Number(client.NewNetBalance).toFixed(2) -
            Number(newWithdrawal) +
            Number(newDeposit)}
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}

export default Dashboard;
