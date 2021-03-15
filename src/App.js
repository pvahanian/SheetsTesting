import React, { useState, useEffect } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import DashBoard from "./component/Dashboard"
import axios from "axios";
import "./App.css";

function App() {
  const [clientName, setClientName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [clientData, setClientData] = useState([]);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const dateHolder = new Date()
  const currentMonth = monthNames[dateHolder.getMonth()]

  useEffect(() => {
    // axios
    // .get(
    //     'https://sheet.best/api/sheets/619d222f-7a12-41e1-ac03-3a701302e6e1',
    // )
    // .then((response) => {
    //     console.log(response);
    //     setClientData(response.data)
    // });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = {
    //     Month: "March",
    //     Client: "Jack Doe",
    //     Id: 2,
    //     StartingBalance:1000,
    //     SureFireFee: 30,
    //     NewNetBalance: 1070,
    //     PercentageGain: .07,
    //     Withdrawal: "0",
    //     Deposit: "0",
    //     NextMonthValue: "$1070",
    //   };

    const data = {
      Month: currentMonth,
      clientName,
      startingBalance,
    };

    // Add one line to the sheet
    fetch(
      "https://sheet.best/api/sheets/619d222f-7a12-41e1-ac03-3a701302e6e1",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        // The response comes here
        console.log(data);
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        // setClientName("")
        // setStartingBalance("")
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });

  };

  return (
    <div>
    <DashBoard clientData={clientData}/>
    <Container fluid className="container">
      <Header as="h3">Add New Client</Header>
      <Form className="form">
        <Form.Field>
          <label>Client Name</label>
          <input
            placeholder="Client Name"
            onChange={(e) => setClientName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Starting Balance</label>
          <input
            placeholder="Starting Balance"
            onChange={(e) => setStartingBalance(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="button" onClick={handleSubmit}>
          Add New Client
        </Button>
      </Form>
    </Container>

    <Container fluid className="container">
      <Header as="h3">Update Portfolio</Header>
      <Form className="form">
        <Form.Field>
          <label>Starting Portfolio Value</label>
          <input
            placeholder="Starting Value"
            onChange={(e) => setClientName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ending Monthly Value</label>
          <input
            placeholder="Ending Portfolio Value"
            onChange={(e) => setStartingBalance(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="button" >
          Update Portfolio Value
        </Button>
      </Form>
    </Container>
    </div>
  );
}
export default App;
