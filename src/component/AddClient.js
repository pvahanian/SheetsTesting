import React, { useState } from "react";

import { Button, Form, Container, Header, Input } from "semantic-ui-react";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateHolder = new Date();

const AddClient = () => {
  const [clientName, setClientName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [SureFireFee, setSureFireFee] = useState("");

  const handleSubmitNewClient = (e) => {
    e.preventDefault();

    let confirmValues = window.confirm(
      `Please confirm values: ClientName ${clientName}, Starting Balance: ${startingBalance}, Fee ${SureFireFee}`
    );

    if (confirmValues) {
      const forID = Date.now();
      let nextMonth;

      if (dateHolder.getMonth() === 11) {
        nextMonth = "January" + dateHolder.getFullYear();
      } else {
        nextMonth =
          monthNames[dateHolder.getMonth() + 1] + dateHolder.getFullYear();
      }

      const dataSend = {
        Month: nextMonth,
        clientName,
        startingBalance,
        SureFireFee,
        Id: forID,
        EnrollmentDate: new Date(forID).toDateString(),
      };

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
    <Container fluid className="container">
      <Header as="h3">Add New Client after Portfolio is balanced</Header>
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
        <Button color="blue" type="button" onClick={handleSubmitNewClient}>
          Add New Client
        </Button>
      </Form>
    </Container>
  );
};

export default AddClient;
