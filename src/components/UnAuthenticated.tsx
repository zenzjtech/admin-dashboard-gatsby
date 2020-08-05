import React from "react";
import { Link } from "gatsby"

const UnAuthenticated = () => (
  <h1> Please <Link to="/">Login</Link> to view this page</h1>
)

export default UnAuthenticated;
