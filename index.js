require("dotenv").config();
// const pool = require("./config/db");
const express = require("express");
const cors = require("cors");
const router = require("./server/src/routes/route");
const path = require("path");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config.env" });
}

const app = express();

app.use(cors({ "access-control-allow-origin": "*" })); //yha per client side ka url dalna hai bss
app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);
app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./qrscan/build/index.html"));
});

//GLOBAL ERROR HANDELING
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  res.status(500).json({
    message: "Something Went Wronge",
    Error: {
      error_stack: err.stack,
      error_name: err.name,
      error_code: err.code,
      error_message: err.message,
    },
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log("server suru ho gya hai at " + process.env.HOST_URL)
);
