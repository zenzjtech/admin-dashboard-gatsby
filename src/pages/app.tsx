import React from 'react';
import Login from '../components/View/Login';
import DashBoard from '../components/View/Dashboard'
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute" // highlight-line

const Home = () => (
  <Router basepath="/app">
    <Login path="/login"/>
    <PrivateRoute path="/" component={DashBoard}/>
  </Router>
)

export default Home
