import React from "react";
import { Table } from 'semantic-ui-react'

function withdraw(e){
  console.log(e.target)
  console.log("this was clicked")
}


const Dashboard = (clientData) => {
  console.log(clientData)
  if(clientData){
    console.log("after checker", clientData.clientData[0])
  }
  return(
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
          <Table.Row>
            <Table.Cell>March</Table.Cell>
            <Table.Cell>TesterDummy </Table.Cell>
            <Table.Cell>$1000</Table.Cell>
            <Table.Cell>$50</Table.Cell>
            <Table.Cell>$1050</Table.Cell>
            <Table.Cell>5%</Table.Cell>
            <Table.Cell selectable>
            <a href='#'>WithDraw</a>
          </Table.Cell>
            <Table.Cell selectable>
            <a href='#'>Deposit</a>
          </Table.Cell>
            <Table.Cell>1050</Table.Cell>
          </Table.Row>   
          {clientData? clientData.clientData.map((client) => {
            return(
            <Table.Row>
            <Table.Cell>{client.Month}</Table.Cell>
            <Table.Cell>{client.clientName}</Table.Cell>
            <Table.Cell>{client.startingBalance} </Table.Cell>
            <Table.Cell>{client.NewNetBalance} </Table.Cell>
            <Table.Cell>{client.NextMonthValue} </Table.Cell>
            <Table.Cell>{client.PercentageGain} </Table.Cell>
            <Table.Cell>{client.Withdrawal} </Table.Cell>
            <Table.Cell>{client.SureFireFee} </Table.Cell>
            <Table.Cell>{client.Deposit} </Table.Cell>
            </Table.Row>)
            }) 
            : 
            <Table.Row>
            <Table.Cell>Loading</Table.Cell>
            <Table.Cell>Data </Table.Cell>
            </Table.Row> 
          }
        </Table.Body>
      </Table>
)}
export default Dashboard;