import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import DashBoard from "./component/Dashboard";
import PortfolioEditor from "./component/PortfolioEditor";
import AddClient from "./component/AddClient";

function App() {
  const [sheetsData, setSheetsData] = useState([]);

  //Creates the Data to go into the Month in a Month Year format.
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
  const currentMonth =  monthNames[dateHolder.getMonth()] + dateHolder.getFullYear();

  useEffect(() => {
    const getData = () => {
      axios
        .get(
          `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
        )
        .then((response) => {
          setSheetsData(response.data);
        });
    };
    getData();
  }, []);


  return (
    <div>
      <DashBoard sheetsData={sheetsData} />
      <PortfolioEditor sheetsData={sheetsData} setSheetsData={setSheetsData} />
      <AddClient />
     
    </div>
  );
}
export default App;
