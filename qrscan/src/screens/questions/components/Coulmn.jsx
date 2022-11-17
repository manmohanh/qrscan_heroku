import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { style } from "./style";
const Column = ({ Q, M, i, id }) => {
  const [points, setPoints] = useState(-1);
  const [clicked, setClicked] = useState();

  const [data, setData] = useState({
    house: "",
    QnA_id: -1,
    marks: -1,
    entry_by_token: "",
    event_id: "",
  });

  let q, c, m;
  if (Q) {
    q = Q.question;
    c = Q.choice;
  }
  if (M) {
    m = M;
  }

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem("houseDetails") || "{}");

    console.log(M);

    if (json) {
      setData({
        ...data,
        house: json.house_id,
        QnA_id: Q.id,
        marks: points,
        entry_by_token: localStorage.getItem("adminToken"),
        event_id: id,
      });
    }
  }, [points]);
  console.log(Q);
  return (
    <Stack direction="column" alignItems="center" spacing={2} sx={style.main}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={style.container}
      >
        <h2 className="no">{i + 1}</h2>
        <h2 className="heading">{q}</h2>
      </Stack>

      <Stack
        direction="column"
        alignItems="flex-start"
        spacing={2}
        sx={style.container}
      >
        {" "}
        <div dangerouslySetInnerHTML={{ __html: c }}></div>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={style.container}
      >
        <FormControl>
          <FormLabel id="rewards">Weightage/Score</FormLabel>
          <RadioGroup
            row
            aria-labelledby="rewards"
            name="rewards"
            onChange={(e) => {
              console.log(e.target.value);
              setPoints(parseInt(e.target.value));
            }}
          >
            {m.map((k) => (
              <FormControlLabel
                value={k.marks}
                control={<Radio />}
                label={k.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={style.container}
      >
        <TextField
          value={points}
          hiddenLabel
          id="filled-hidden-label-normal"
          variant="filled"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Stack>
      </Stack>
      <Button
        onClick={async () => {
          await axios
            .post("/record", data)
            .then((res) => {
              setClicked(true);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
        disabled={points === -1 || clicked}
        variant="contained"
      >
        {clicked ? "Submitted" : "Submit"}
      </Button>
    </Stack>
  );
};

export default Column;
