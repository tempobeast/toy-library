import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import { Routes, Route, Link } from 'react-router-dom';


function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path="/testing" element={<h1>Test Route</h1>}/>
        <Route path="/count" element={<h1>Count: {count}</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
