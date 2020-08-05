import React from 'react'
import { navigate } from "gatsby"

const IndexPage = () => {
  typeof window !== "undefined" && navigate("/app");
  return <></>
}

export default IndexPage
