import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./style";

export default function () {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    axios.post("/login", creds).then((res) => {
      localStorage.setItem("adminToken", res.data?.token);
      const role = res.data.role;
      console.log(res);
      console.log(role);
      if (role == "admin") navigate("/dashboard");
      else if (role == "operator") navigate("/scanQr");
    });
  };

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
      <Container maxWidth="xl" sx={styles.container}>
        <Paper sx={styles.paper} variant="outlined">
          <Typography sx={styles.textLogo}>Rewards</Typography>
          <Typography sx={styles.loginText}>Log in to continue.</Typography>
          <TextField
            id="username"
            type="text"
            label="Enter your Username"
            placeholder="Username"
            value={creds.username || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />
          <FormControl variant="outlined" sx={styles.inputField}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              placeholder="*****"
              type={showPassword ? "text" : "password"}
              value={creds.password || ""}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            sx={styles.loginBtn}
            onClick={loginHandler}
          >
            Log in
          </Button>
          <Divider sx={styles.divider} />
          <Typography sx={styles.forgotPwdText}>
            Forgot your password?
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
