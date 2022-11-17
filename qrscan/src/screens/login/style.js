export const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 4,
    width: "450px",
  },
  imgLogo: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "10px",
  },
  imgLogoMobile: {
    width: "90%",
    marginBottom: "20px",
  },

  textLogo: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "28px",
    color: "#2D2D2D",
    display: "flex",
    justifyContent: "center",
    my: "20px",
    "@media (max-width: 650px)": {
      fontSize: "22px",
    },
  },
  loginText: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "25px",
    color: "#5D5D5D",
    display: "flex",
    justifyContent: "center",
    mb: "10px",
    "@media (max-width: 650px)": {
      fontSize: "20px",
    },
  },
  inputField: {
    width: "100%",
    my: "10px",
  },

  divider: {
    background: "#e1e1e1",
    my: "20px",
  },

  forgotPwdText: {
    color: "#0044a9",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "20px",
    cursor: "pointer",
    "@media (max-width: 650px)": {
      fontSize: "15px",
    },
  },
  loginBtn: {
    width: "100%",
    background: "#1b84e7",
    mt: "10px",
  },
  signupText: {
    color: "#1D1D1D",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "18px",
    cursor: "pointer",
    "@media (max-width: 650px)": {
      fontSize: "13px",
    },
  },
  signupBtn: {
    color: "#0044a9",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "18px",
    cursor: "pointer",
    mx: "10px",
    "@media (max-width: 650px)": {
      fontSize: "16px",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: "10px",
  },
  adminBtn: {
    position: "absolute",
    right: "30px",
    top: "10px",
  },
};
