import React from 'react';
import { connect } from "react-redux";
import { Link } from "gatsby"
import PropTypes from "prop-types"
import {
  Avatar, Button, CssBaseline, TextField,
  FormControlLabel, Checkbox, Link as LinkTo,
  Paper, Box, Grid,
  Typography, withStyles
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import Layout, { Root, getHeader } from '@mui-treasury/layout';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { userActions} from "../../actions"
import Error from '../Helper/Error'
import logo from "../../assets/logo.svg";
import "../../assets/App.css"

const Header = getHeader(styled);
const scheme = Layout();

scheme.configureHeader((builder) => {
  builder
    .registerConfig("xs", {
      position: "sticky",
    })
    .registerConfig("md", {
      position: "relative", // won't stick to top when scroll down
    });
});

interface Props {
}
interface State {
  email: String,
  password: String
}
class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    // reset login status
    // this.props.userLogout();

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.props
      .userLogin(email, password)
      .catch(error => {
        this.setState({error: error});
      });
  }

  clearError = () => {
    this.setState({ error: ''});
  }

  render() {
    const { email, password } = this.state;
    const classes = this.props.classes;
    return (
      <Root scheme={scheme}>
        <CssBaseline/>
        <Header className={classes.header}>
          <img src={logo} className="App-logo"/>
        </Header>
        <Grid container component="main" className={classes.root}>
          <CssBaseline/>
          <Grid item xs={false} sm={3} md={5} className={classes.imageContainer}>
            <div className={classes.quoteContainer}>
              <Typography
                variant="h4"
                className={classes.quoteText}
              >
                <p>Please enter your details to enter your account</p>
                <p>If you've forgotten your password, please use the reset link below the Login button</p>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={7}
                component={Paper} elevation={6} square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  onFocus={this.clearError}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                  onFocus={this.clearError}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Keep me logged in"
                />
                { this.state.error && <Error error={this.state.error}/> }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright/>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Root>
    )
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <LinkTo color="inherit" href="https://material-ui.com/">
        Admin Dashboard for "Company X"
      </LinkTo>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main
  },
  root: {
    height: '100%',
  },
  imageContainer: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    backgroundColor: '#f4f6f8',
    padding: theme.spacing(10, 16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  quoteContainer: {
    textAlign: 'center'
  },
  quoteText: {
    fontWeight: 300,
    fontSize: 17,
    color: 'white',
    margin: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => dispatch(userActions.login(email, password)),
    userLogout: () => dispatch(userActions.logout())
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))

