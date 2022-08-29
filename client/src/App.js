import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useContext} from "react"
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ToyContainer from './components/ToyContainer';
import LoginPage from './components/LoginPage';
import Header from './components/Header'
import Nav from './components/Nav';
import Home from './components/Home'
import UserProfile from './components/UserProfile';
import { UserContext } from "./context/user";
import { ToysContext } from './context/toys';


function App() {

  const { user, setUser } = useContext(UserContext);
  const { setToys } = useContext(ToysContext)

  useEffect(() => {
    fetch("/me")
    .then((res) => res.json())
    .then((user) => setUser(user))
  }, [])

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [user])

  if (!user) {
    return (
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/user_login" element={<LoginPage/>}/>
          <Route path="/view_all_toys" element={<ToyContainer/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    )
  } else {

    return (
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/view_all_toys" element={<ToyContainer/>}/>
            <Route path={`/user_profiles/:id`} element={<UserProfile/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
    )
  };
}

export default App;
