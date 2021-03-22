import React, { useState } from "react";

import { Button, Form, Container, Header, Input } from "semantic-ui-react";
import axios from "axios";

//Change to bring in constants

import {nextMonth} from "../consts/constants";

const AddClient = () => {
  const [clientName, setClientName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [SureFireFee, setSureFireFee] = useState("");
  const [monthToAdd, setMonthToAdd] = useState("");


  const handleSubmitNewClient = (e) => {
    e.preventDefault();

    let confirmValues = window.confirm(
      `Please confirm ClientName:${clientName}   Starting Balance:${startingBalance}    Fee:${SureFireFee}`
    );
    const forID = Date.now();

    if (confirmValues) {
      
    //   let nextMonth;

    //   if (dateHolder.getMonth() === 11) {
    //     nextMonth = "January" + dateHolder.getFullYear();
    //   } else {
    //     nextMonth =
    //       monthNames[dateHolder.getMonth() + 1] + dateHolder.getFullYear();
    //   }

      const dataSend = {
        Month: nextMonth,
        clientName,
        startingBalance,
        SureFireFee,
        Id: forID,
        EnrollmentDate: new Date(forID).toDateString(),
      };

      console.log(dataSend, "data were sending", "Next Month value ", nextMonth)
      axios
        .post(`https://sheetdb.io/api/v1/gukfsbnzqayil?sheet=${nextMonth}`, {
          data: dataSend,
        })
        .then((data) => {
          // The response comes here
          // console.log(data,"this is data");
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
          );
          setStartingBalance("");
          setSureFireFee("");
        })
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
    }
  };

  return (
    <div className="addClient">
      <Header as="h3">4. Add New Client after Portfolio is balanced</Header>
      <Form className="form">
        <Form.Field required>
          <label>New Client Name</label>
          <input
            required="required"
            type="text"
            placeholder="Client Name"
            onChange={(e) => setClientName(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Starting Balance</label>
          <input
            required="required"
            type="number"
            placeholder="Starting Balance"
            onChange={(e) => setStartingBalance(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Sure Fire Fee</label>
          <Input
            type="number"
            placeholder="Enter as Decimal"
            onChange={(e) => setSureFireFee(e.target.value)}
          />
        </Form.Field>
        {/* <Form.Field required>  // Add once you make this a drop down with default values being monthsyear together no space
          <label>Month to Add Client</label>
          <Input
            type="string"
            placeholder="Example April2021"
            onChange={(e) => setMonthToAdd(e.target.value)}
          />
        </Form.Field> */}
        <Button color="blue" type="button" onClick={handleSubmitNewClient}>
          Add New Client
        </Button>
      </Form>
      </div>
  );
};

export default AddClient;
