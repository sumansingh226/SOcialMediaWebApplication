import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import {  useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyle from "./styles";
import { collapseClasses } from "@mui/material";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH } from "../../redux/constants/actionsType";
import {signin , signup} from '../../redux/actions/Auth'
import { GOOGLE_API_KEY } from "../../constants";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [formData, setformData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp)
    {
          dispatch(signup(formData , navigate))
    }
    else 
    {
      dispatch(signin(formData , navigate))

    }
  };

  const handleChange = (e) => {
    setformData({...formData , [e.target.name]:e.target.value})
  };

  const handleShowPassword = () => {
    setshowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setisSignUp((prevIsSignUp) => !prevIsSignUp);
    setshowPassword(false);
  };

  const googleSuccess = async (res) => {
    // toast.success("Signed in succesfully!");
    const result = res.profileObj;
    const token = res.tokenId;
    try {
      if (result && token) {
        dispatch({ type: AUTH, data: { result, token } });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    // toast.error("Google Sign In was unsucessfull. Try Again Later!");
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId={GOOGLE_API_KEY}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  style={{
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="center">
              <Grid item>
                <Button style={{color:"dark"}} onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account ? Sign In"
                    : "Don't have an account Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
