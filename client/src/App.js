import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useContext} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import ToyContainer from './components/ToyContainer';
import LoginPage from './components/LoginPage';
import Header from './components/Header'
import Nav from './components/Nav';
import { UserContext } from "./context/user";


function App() {

  const [toys, setToys] = useState([]);
  const { user } = useContext(UserContext)

  console.log(user)

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  if (!user) return (
    <div>
      <Header />
      <Nav />
      <LoginPage  />
    </div>
  )

  return (
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          {/* <Route path="/login" element={<LoginPage/>}/> */}
          <Route path="/" element={<ToyContainer toys={toys}/>}/>
        </Routes>
      </div>
  );
}

export default App;
