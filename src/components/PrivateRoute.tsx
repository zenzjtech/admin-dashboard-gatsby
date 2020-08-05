import React, { Component } from "react"
import { navigate } from "gatsby"
import { userService } from "../services"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (typeof window !== "undefined" && !userService.isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute

