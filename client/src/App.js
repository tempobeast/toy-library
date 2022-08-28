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


function App() {

  const [toys, setToys] = useState([]);
  const { user, setUser } = useContext(UserContext);

  console.log(user)

  useEffect(() => {
    fetch("/me")
    .then((res) => res.json())
    .then((user) => console.log(user))
  }, [])

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  if (!user) {
    return (
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user_login" element={<LoginPage/>}/>
          <Route path="/view_all_toys" element={<ToyContainer toys={toys}/>}/>
        </Routes>
      </div>
    )
  } else {

    return (
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/view_all_toys" element={<ToyContainer toys={toys}/>}/>
            <Route path={`/user_profiles/${user.id}`} element={<UserProfile/>} />
          </Routes>
        </div>
    )
  };
}

export default App;
