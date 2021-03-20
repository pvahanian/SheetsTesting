import React, { useState } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import axios from "axios";
import "../App.css";

const PortfolioEditor = (props) => {
  const { sheetsData, setSheetsData } = props;
  const [endingBalance, setEndingBalance] = useState("");
  let [startingValue] = useState(0);
  let [isLoading, setIsLoading] = useState(false)

  startingValue = calculateStartingValue(sheetsData);

  const handleSubmitPortfolioValue = (e) => {
    setIsLoading(true)
    const data = {
      PorfolioEndingBalance: endingBalance,
    };
    axios
      .patch("https://sheetdb.io/api/v1/gukfsbnzqayil/Id/0", { data: data })
      .then((response) => {});
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    calculateNewValues();

    function calculateNewValues() {
      buddyFunction();
    }

    function buddyFunction(){
      let totalProfit = endingBalance - startingValue;
      let clients = sheetsData;
      let requestArray = []

      for (let i = 0; i < clients.length; i++) {
        //Calculate regular client
        let clientStartingValue = Number(clients[i].startingBalance);
        let clientsCut =
          (clientStartingValue / startingValue) *
          totalProfit *
          (1 - Number(clients[i].SureFireFee));
        let percentGained = clientsCut / clientStartingValue;
        clientsCut += clientStartingValue;
        requestArray.push(axios.patch(`https://sheetdb.io/api/v1/gukfsbnzqayil/Id/${clients[i].Id}`,{"data":{"NewNetBalance":clientsCut,"PercentageGain":percentGained}}))
      }
      axios.all(requestArray).then(()=>{
        axios.get(`https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/March2021`)
          .then((response)=>{
            console.log('this fired', response.data)
            setSheetsData(response.data)
        })
        setIsLoading(false)

      })
    };
  }
  return (
      <div>
        <Container fluid>
          <Header id="border" as="h3">
            Starting Portfolio Value for the Month: £{startingValue}
          </Header>
          <Header id="border" as="h3">
            Gross Ending Portfolio Value for the Month: £{endingBalance}
          </Header>
        </Container>
        <Container fluid className="container">
          <Header as="h3">Update Portfolio</Header>
          <Form className="form">
            <Form.Field>
              <label>Portfolio Ending Value</label>
              <input
                className="portInput"
                placeholder="Portfolio Ending Value"
                onChange={(e) => setEndingBalance(e.target.value)}
              />
            </Form.Field>
            {!isLoading?
            <Button
              color="blue"
              type="button"
              onClick={handleSubmitPortfolioValue}
            >
              Update Portfolio Value
            </Button> :
            <Button loading primary></Button> }
          </Form>
        </Container>
      </div>
    );
  };


  function calculateStartingValue (clients) {
    let portfolioSum = 0;
    if (clients.length === 0) {
      // console.log("bad Data");
    } else {
      for (let i = 0; i < clients.length; i++) {
        portfolioSum += Number(clients[i].startingBalance);
      }
    }
    return portfolioSum;
  };


export default PortfolioEditor;
