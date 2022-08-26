import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import ToyContainer from './components/ToyContainer';
import LoginPage from './components/LoginPage';


function App() {

  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  console.log(toys)

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<ToyContainer toys={toys}/>}/>
      </Routes>
    </div>
  );
}

export default App;
