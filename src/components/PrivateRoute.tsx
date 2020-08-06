import React, { Component } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!rest.loggedIn && location.pathname !== '/app/login') {
    navigate('/app/login')
  }
  return (
    <Component { ...rest }/>
    // <h1>Hello world</h1>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

export default connect(mapStateToProps)(PrivateRoute)

