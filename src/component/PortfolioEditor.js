import React, {useState} from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import axios from "axios";
import "../App.css";

const PortfolioEditor = (sheetsData) => {
  const [endingBalance, setEndingBalance] = useState("");
  let [startingValue, setStartingValue] = useState(0);
  
  startingValue=(calculateStartingValue(sheetsData))

  const handleSubmitPortfolioValue = (e) => {
    const data = {
      "PorfolioEndingBalance":endingBalance
    };
    // clientName	Id	startingBalance	SureFireFee	NewNetBalance	PercentageGain	Withdrawal	Deposit	NextMonthValue
    axios.patch("https://sheetdb.io/api/v1/gukfsbnzqayil/Id/0",{"data":data}).then( response => {
    });
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    calculateNewValues()

    function calculateNewValues() {
      let clients= sheetsData.sheetsData
      let totalProfit= endingBalance-startingValue;
      console.log(totalProfit)  //1000 - 500 =500
      //need to find out how much each client gets and patch their values respectively
      for(let i=0;i<clients.length;i++){
        //Harry's Cut without fee
        if(Number(clients[i].Id)===1){
          const hStartingBalance = Number(clients[i].startingBalance)
          let harrysCut=(hStartingBalance/startingValue)*totalProfit
          let percentGained= harrysCut/hStartingBalance
          harrysCut+=hStartingBalance
          axios.patch("https://sheetdb.io/api/v1/gukfsbnzqayil/Id/1",{"data":{"NewNetBalance":harrysCut,"PercentageGain":percentGained}}).then( response => {
          });
        }
        //Calculate Surefires Portion
        if(Number(clients[i].Id)===0){
          const StartingBalance = Number(clients[i].startingBalance)
          let sureFirePort=(StartingBalance/startingValue)*totalProfit
          let percentGained= sureFirePort/StartingBalance
          sureFirePort+=StartingBalance
          axios.patch("https://sheetdb.io/api/v1/gukfsbnzqayil/Id/0",{"data":{"NewNetBalance":sureFirePort,"PercentageGain":percentGained}}).then( response => {
          });
        }
        //Calculate regular client
        let clientStartingValue = Number(clients[i].startingBalance)
        let clientsCut=((clientStartingValue/startingValue)*totalProfit)*(1-Number(clients[i].SureFireFee))
        let percentGained= clientsCut/clientStartingValue
        clientsCut+=clientStartingValue
        axios.patch(`https://sheetdb.io/api/v1/gukfsbnzqayil/Id/${clients[i].Id}`,{"data":{"NewNetBalance":clientsCut,"PercentageGain":percentGained}}).then( response => {
        });
      }
    } 
  };

  
return (
<div>
<Container fluid>
    <Header id="border" as="h3">Starting Portfolio Value for the Month: ${startingValue}</Header>
    <Header id="border" as="h3">Ending Portfolio Value for the Month: $UPDATED VALUE HERE</Header>

</Container>
<Container fluid className="container">
      <Header as="h3">Update Portfolio</Header>
      <Form className="form">
        <Form.Field>
          <label>Ending Monthly Value</label>
          <input
            className="portInput"
            placeholder="Ending Portfolio Value"
            onChange={(e) => setEndingBalance(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="button" onClick={handleSubmitPortfolioValue}>
          Update Portfolio Value
        </Button>
      </Form>
    </Container>
    
</div>
)
}

const calculateStartingValue = (data) =>{
  let portfolioSum=0;
  const clients = data.sheetsData
  if(clients.length===0){
    console.log("garbo data",data)  
  }
  else{
    for(let i=0;i<clients.length;i++){
      portfolioSum+=Number(clients[i].startingBalance)
    }
  }
  return portfolioSum  
}

export default PortfolioEditor;