import React, { Component } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"

class PrivateRoute extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount(): void {
    if (!this.props.loggedIn && this.props.location.pathname !== '/app/login') {
      navigate('/app/login')
    }
  }

  render() {
    const { component: Component, location, ...rest } = this.props;
    return (
      <Component { ...rest }/>
      // <h1>Hello world</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

export default connect(mapStateToProps)(PrivateRoute)

