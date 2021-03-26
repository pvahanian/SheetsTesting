import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import axios from "axios";
import "../App.css";

import { currentMonth, nextMonth } from "../consts/constants";

const PortfolioEditor = (props) => {
  const { sheetsData, setSheetsData } = props;
  const [endingBalance, setEndingBalance] = useState("");
  let [startingValue] = useState(0);
  let [isLoading, setIsLoading] = useState(false);
  const [endingMonthValue, setEndingMonthValue] = useState(0);

  startingValue = calculateStartingValue(sheetsData);

  const handleSubmitPortfolioValue = (e) => {
    setIsLoading(true);
    axios
      .put(
        `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
        {
          condition: { Id: "0" },
          set: {
            PortfolioEndingBalance: endingBalance,
          },
        }
      )
      .then((response) => {
      });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    calculateNewValues();

    function calculateNewValues() {
      let totalProfit = Number(endingBalance) - startingValue;
      let clients = sheetsData;
      let requestArray = [];
      let sureFiresCut = 0;
      let atALossBalance = Number(endingBalance);

      // Use Total Profit to determine if this needs to be a loss calculation or a gain.
      //This will basically just take in all clients values and reduce them without surefire fee.
      if (totalProfit > 0) {
        for (let i = 0; i < clients.length; i++) {
          //Calculate regular client
          let clientStartingValue = Number(clients[i].startingBalance);

          let clientsCut =
            (clientStartingValue / startingValue) *
            totalProfit *
            (1 - Number(clients[i].SureFireFee));
          sureFiresCut +=
            (clientStartingValue / startingValue) * totalProfit - clientsCut;

          let percentGained = clientsCut / clientStartingValue;
          clientsCut += clientStartingValue;
          requestArray.push(
            axios.put(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
              {
                condition: { Id: clients[i].Id },
                set: {
                  NewNetBalance: clientsCut,
                  PercentageGain: percentGained,
                },
              }
            )
          );
        }
        axios.all(requestArray).then(() => {
          axios
            .get(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}?search={"Id":"0"}`
            )
            .then((res) => {
              sureFiresCut += Number(res.data[0].NewNetBalance);
              axios
                .put(
                  `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
                  {
                    condition: { Id: "0" },
                    set: {
                      NewNetBalance: sureFiresCut,
                    },
                  }
                )
                .then((need) => {
                  axios
                    .get(
                      `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
                    )
                    .then((response) => {
                      setSheetsData(response.data);
                      setIsLoading(false);
                    });
                });
            });
        });
      } else {
        for (let i = 0; i < clients.length; i++) {
          // Go through each client
          //Calculate regular client
          let clientStartingValue = Number(clients[i].startingBalance); // Gets their starting balance for the month
          let clientsCut =
            (clientStartingValue / startingValue) * atALossBalance; // Sees how much of the portfolio they are entitled too
          let percentageLoss = (1- clientsCut/clientStartingValue) * -1; //Calculates the negative value of the loss in %
          requestArray.push(
            axios.put(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
              {
                condition: { Id: clients[i].Id },
                set: {
                  NewNetBalance: clientsCut,
                  PercentageGain: percentageLoss,
                },
              }
            )
          );
        }
        axios.all(requestArray).then(() => {
          axios
            .get(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
            )
            .then((response) => {
              setSheetsData(response.data);
              setIsLoading(false);
            });
        });
      }
    }
  };

  const handleSubmitValues = (getData) => {
    //Pull Data from Dom Once values are submitted NEEDS TO BE REFACTORED TO ANOTHER COMPONENT
    let confirmSubmit = window.confirm(
      `Please confirm you want to submit ${currentMonth}'s values?`
    );

    if (confirmSubmit) {
      document.getElementsByClassName("submitbutton")[0].className =
        "ui blue disabled button submitbutton"; // Locks out resubmit button if its confirmed.

      let portfolioSum = 0;

      const timeStamp = new Date(Date.now()).toDateString();
      let wholeTable = document.getElementsByClassName("testforDommy");
      let postArray= []
      let dataSent = false


      for (let i = 1; i < wholeTable[0].rows.length; i++) {
        let row = wholeTable[0].rows[i];
        const enrollmentDate= row.children[0].innerText
        const clientNameHolder = row.children[1].innerText;
        const fee = row.children[3].innerText;
        let withDrawalHolder = Number(row.children[6].innerText.split(" ")[0]);
        let depositHolder = Number(row.children[7].innerText.split(" ")[0]);
        let finalClientValue = Math.round(Number(row.children[8].innerText.split(" ")[1])*100)/100;
        let clientIDHolder = row.className;

        portfolioSum += finalClientValue;
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
          if(postArray.length<1){
              console.log(postArray.length)
              postArray.push(
                  {
                    Month:nextMonth,
                    EnrollmentDate:enrollmentDate,
                    Id: clientIDHolder,
                    clientName: clientNameHolder,
                    startingBalance: finalClientValue,
                    SureFireFee: fee,
                  }
                
              )
          }
          else{
          if(postArray[postArray.length-1].Id<clientIDHolder){
            console.log(postArray.length)
            postArray.push(
                  {
                    Month:nextMonth,
                    EnrollmentDate:enrollmentDate,
                    Id: clientIDHolder,
                    clientName: clientNameHolder,
                    startingBalance: finalClientValue,
                    SureFireFee: fee,
                  }
                
              )
            
          }
          else{
            console.log(postArray.length)
            postArray.unshift(
                  {
                    Month:nextMonth,
                    EnrollmentDate:enrollmentDate,
                    Id: clientIDHolder,
                    clientName: clientNameHolder,
                    startingBalance: finalClientValue,
                    SureFireFee: fee,
                  }
                
              ) 
           }
          }
          // axios.post(
          //     `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${nextMonth}`,
          //     [
          //       {
          //         Month:nextMonth,
          //         EnrollmentDate:enrollmentDate,
          //         Id: clientIDHolder,
          //         clientName: clientNameHolder,
          //         startingBalance: finalClientValue,
          //         SureFireFee: fee,
          //       }
          //     ]
          //   );
          });
      }
     
      if(postArray.length>=wholeTable[0].rows.length-1){
        for(let index=0; index<postArray.length; index ++){
          console.log(postArray[index],"index",index)
        }
      }
     
      getData();
      setEndingMonthValue(portfolioSum);
    }
  };

  function getData() {
    let newSheetStuff = [];
    axios
      .get(
        `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
      )
      .then((response) => {
        // setNextMonthSheet(response.data);

        for (let i = 0; i < response.data.length; i++) {
          let client = response.data[i];
          newSheetStuff.push({
            Month: nextMonth,
            clientName: client.clientName,
            Id: client.Id,
            EnrollmentDate: client.EnrollmentDate,
            startingBalance: client.NextMonthValue,
            SureFireFee: client.SureFireFee,
          });
        }
      });
    console.log(newSheetStuff);
  }

  return (
    <>
      <div id="container">
        <div id="boxValues">
          <h3 id="border">
            Starting Portfolio Value for the Month: ${startingValue}
          </h3>
          <h3 id="border">
            Gross Ending Portfolio Value for the Month: ${endingBalance}
          </h3>
          <h3 id="endingborder">
            Net Ending Portfolio Value for the Month: $ {Number(endingMonthValue).toFixed(2)}
          </h3>
        </div>
      </div>
      <div className="step1">
        <Header as="h3">1. Update Portfolio</Header>
        <Form className="form">
          <Form.Field>
            <label>Portfolio Ending Value</label>
            <input
              className="portInput"
              placeholder="Portfolio Ending Value"
              onChange={(e) => setEndingBalance(e.target.value)}
            />
          </Form.Field>
          {!isLoading ? (
            <Button
              color="blue"
              type="button"
              onClick={handleSubmitPortfolioValue}
            >
              Update Portfolio Value
            </Button>
          ) : (
            <Button loading primary></Button>
          )}
        </Form>
      </div>
      <div className="steps2to3">
        <h3>2. Update Withdrawals/Deposits and Confirm</h3>
        <h3>3. Submit Values for the Month</h3>
        <div id="sumbitButtonCenter">
          <Button
            color="blue"
            className="submitbutton"
            onClick={(e) => {
              handleSubmitValues(getData);
            }}
          >
            Submit Ending Values
          </Button>
        </div>
      </div>
    </>
  );
};

function calculateStartingValue(clients) {
  let portfolioSum = 0;
  if (clients.length === 0) {
    // console.log("bad Data");
  } else {
    for (let i = 0; i < clients.length; i++) {
      portfolioSum += Number(clients[i].startingBalance);
    }
  }
  return portfolioSum;
}

export default PortfolioEditor;
