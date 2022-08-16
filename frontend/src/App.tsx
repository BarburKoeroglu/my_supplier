import React, {useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [message, setMessage] =useState();

  axios.get("/api/supplier")
      .then((response => response.data))
      .then(setMessage)

  return (
    <h1>{message}</h1>
  );
}

export default App;
