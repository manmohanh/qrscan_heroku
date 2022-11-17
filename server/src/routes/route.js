const { application } = require("express");
const express = require("express");
const pool = require("../../config/db");
const router = new express.Router();

const createCustomer = require("../routes/dataManagement/createCustomer");
const transaction = require("../routes/dataManagement/transaction");
const createUser = require("../routes/users/createuser");
const login = require("../routes/users/login");
const { readDb, readDbs } = require("../utils/sqlCommands");

//POST TO READ ALL DATA {table}
router.post("/getAllData", async (req, res) => {
  const response = await readDb(req.body.table_name);
  res.send(response);
});

//POST TO READ SPECIFIC DATA {table}
router.post("/getSpecificData", async (req, res) => {
  const response = await readDbs(req.body.table_name, {
    field: req.body.condition.field,
    value: req.body.condition.value,
  });
  res.send(response);
});

//POST CREATE USER {user_role,username,password}
router.post("/createUser", async (req, res) => {
  const response = await createUser(req.body);
  res.send(response);
});

//POST LOGIN USER {username,password}
router.post("/login", async (req, res) => {
  const response = await login(req.body);
  res.send(response);
});

//POST CREATE CUSTOMER  {house_id,customer_name,mobile_no,address,zone,area,location,latitude, longitude}
router.post("/createCustomer", async (req, res) => {
  const response = await createCustomer(req.body);
  res.send(response);
});

//POST RECORD TRANSACTIONS  { house, QnA_id, marks, entry_by_token, event_id }
router.post("/record", async (req, res) => {
  const response = await transaction(req.body);
  res.send(response);
});

router.post("/getTransData", async (req, res) => {
  const response = await pool.execute(
    `SELECT B.house_id, B.customer_name, B.mobile_no, B.address, B.zone, B.area, B.location, SUM(A.marks) "Total Marks", A.entry_date AS "Surveyed On" FROM \`transaction_survey\` AS A LEFT JOIN metadata_customer AS B ON A.house_id = B.id WHERE 1 GROUP BY A.event_id ORDER BY A.entry_date, A.id`
  );

  res.send(response);
});

router.get("/excelData", async (req, res) => {
  const excelData = await pool.execute(`SELECT
  #ROW_NUMBER() OVER(ORDER BY B.id) AS 'Sl. No.',
  C.house_id, 
  C.customer_name,
  C.mobile_no,
  max(CASE WHEN (A.question='App Usage') THEN B.marks ELSE NULL END) AS 'App Usage', 
  max(CASE WHEN (A.question='Awareness') THEN B.marks ELSE NULL END) AS 'Awareness', 
  max(CASE WHEN (A.question='Provision for Segregation') THEN B.marks ELSE NULL END) AS 'Provision for Segregation', 
  max(CASE WHEN (A.question='Practices segregation at source') THEN B.marks ELSE NULL END) AS 'Practices segregation at source', 
  max(CASE WHEN (A.question='Sanitary waste') THEN B.marks ELSE NULL END) AS 'Sanitary waste', 
  max(CASE WHEN (A.question='Handling over segregated waste') THEN B.marks ELSE NULL END) AS 'Handling over segregated waste', 
  max(CASE WHEN (A.question='Waste reduction initiatives') THEN B.marks ELSE NULL END) AS 'Waste reduction initiatives', 
  max(CASE WHEN (A.question='IEC') THEN B.marks ELSE NULL END) AS 'IEC', 
  SUM(B.marks) AS 'total_marks', 
  DATE_FORMAT(B.entry_date, "%d-%m-%Y %h:%i:%s %p") AS 'surveyed_on' 
  FROM metadata_QnA_list AS A LEFT JOIN transaction_survey AS B ON A.id = B.QnA_id LEFT JOIN metadata_customer AS C ON C.id= B.house_id GROUP BY B.event_id ORDER BY B.entry_date, B.event_id, A.id`);

  res.send(excelData);
});
// router.post("/check",async (req,res)=>{
//   const response = await readDbs("metadata_customer",{})
// })

// router.get("/check", async (req, res) => {
//   const response = await readDb("metadata_marks", { field: "id", value: 1 });
//   console.log(response);
//   res.send(response);
// });

module.exports = router;
