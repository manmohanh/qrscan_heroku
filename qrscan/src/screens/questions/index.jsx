// import * as React from "react";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import Column from "./components/Coulmn";

// import logo from "./logo.png";
import styles from "./TableStyles";

export default function BasicTable() {
  const [dataTable, setDataTable] = useState([]);
  const [marks, setMarks] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .post("/getAllData", { table_name: "metadata_QnA_list" })
      .then((res) => {
        console.log(res.data.data + "data ");
        setDataTable(res.data.data);
      });
    axios.post("/getAllData", { table_name: "metadata_marks" }).then((res) => {
      console.log(res.data.data);
      setMarks(res.data.data);
    });

    setId(uuidV4());
  }, []);
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Rewards & Recognition Program</h1>
      <Container>
        {dataTable.map((d, i) => (
          <Column Q={d} M={marks} i={i} id={id} />
        ))}
      </Container>
    </div>
  );
}
