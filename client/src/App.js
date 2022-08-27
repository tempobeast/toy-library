import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useContext} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import ToyContainer from './components/ToyContainer';
import LoginPage from './components/LoginPage';
import { UserContext } from "./context/user";


function App() {

  const [toys, setToys] = useState([]);
  const { user } = useContext(UserContext)

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  if (!user) return <LoginPage  />

  return (
      <div className="App">
        <h1>Hello {user.username}</h1>
        <Routes>
          {/* <Route path="/login" element={<LoginPage/>}/> */}
          <Route path="/" element={<ToyContainer toys={toys}/>}/>
        </Routes>
      </div>
  );
}

export default App;
