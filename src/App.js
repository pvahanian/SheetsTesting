import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import { Button, Form, Container, Header } from "semantic-ui-react";

import DashBoard from "./component/Dashboard"
import PortfolioEditor from "./component/PortfolioEditor";


function App() {
  const [clientName, setClientName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [SureFireFee, setSureFireFee] = useState("");
  const [sheetsData, setSheetsData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState([]);

  // const [editSheetState, setEditSheetState] = useState([]);


  //Creates the Data to go into the Month in a Month Year format.
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const dateHolder = new Date()
  const currentMonth = monthNames[dateHolder.getMonth()] +" "+ dateHolder.getFullYear()

  useEffect(() => {
    const getData =() =>{
    axios.get(`https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/March2021`)
    .then((response)=>{
      setSheetsData(response.data)
    })
  }
  getData()
  }, []);

  const handleSubmitNewClient = (e) => {
    e.preventDefault();

    const dataSend = {
      Month: currentMonth,
      clientName,
      startingBalance,
      SureFireFee,
      "Id":Math.floor(Math.random() * 10000) + 2 
    };

    axios.post("https://sheetdb.io/api/v1/gukfsbnzqayil",{"data": dataSend}
    )
     .then((data) => {
        // The response comes here
        // console.log(data,"this is data");
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
          setStartingBalance("")
          setSureFireFee("")
          setPortfolioValue("")
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });
  };
  
  

  return (
    <div>
    <DashBoard sheetsData={sheetsData}/>
    <PortfolioEditor sheetsData={sheetsData} setSheetsData={setSheetsData}/>
    <Container fluid className="container">
      <Header as="h3">Add New Client after Portfolio is balanced</Header>
      <Form className="form">
        <Form.Field>
          <label>New Client Name</label>
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
        <Form.Field>
          <label>Sure Fire Fee</label>
          <input
            placeholder="Sure Fire Fee"
            onChange={(e) => setSureFireFee(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="button" onClick={handleSubmitNewClient}>
          Add New Client
        </Button>
      </Form>
    </Container>
    </div>
  );
}
export default App;
