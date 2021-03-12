import React, { Component, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Button, Form, Container, Header } from 'semantic-ui-react'
import NavBars from './NavBars'
import axios from "axios";

// import Login from "./pages/Login"


interface ClientData {
  name: string;
  age: number,
  salary: number,
  hobby: string
}

function App() {
    
  const [clientInput, setClientInput] = useState<string>('')
  const [data, setData] = useState([])
  const [clients, setClients] = useState<ClientData>({
    name: '',
    age: 0,
    salary: 0,
    hobby: ''
  })

  useEffect(()=>{
    axios.post(`https://sheet.best/api/sheets/619d222f-7a12-41e1-ac03-3a701302e6e1`,{Client:"Tester",NewLine:17,Month:"Lol",tee:"new",New:"buren",NewWorkingLine:"does it tho"})
      .then(res => {
        const persons = res.data;
        setData(res.data)
      })

  },[])


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value)
    setClientInput(e.target.value)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();    
    setClients(prevClient => {
    return {
      ...prevClient,
      
    }
})
}


  return (
    <div className="App">
      <NavBars />
      <Container fluid className="container">
        <Header as='h2'>React Google Sheets!</Header>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Enter your name' type="text" name="clientName" value={clients.name} onChange={changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input placeholder='Enter your age' type="number" name="age" value={clients.age} onChange={changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Salary</label>
            <input placeholder='Enter your salary' type="number" name="salary" value={clients.salary} onChange={changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Hobby</label>
            <input placeholder='Enter your hobby' type="text" name="hobby" value={clients.hobby} onChange={changeHandler} />
          </Form.Field>

          <Button color="blue" type='submit'>Submit</Button>
        </Form>
      </Container>

    </div>
  );
}

export default App;
