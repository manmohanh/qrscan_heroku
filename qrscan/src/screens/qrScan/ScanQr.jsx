import { Dialog, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const ScanQr = () => {
  const [houseId, setHouseId] = useState("");
  const [scanned, setScanned] = useState("");
  const [open, setOpen] = useState(false);
  const [diaData, setDiaData] = useState({
    name: "",
    phone: "",
  });

  let navigate = useNavigate();

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <QrReader
          onResult={(result) => {
            if (result) {
              setScanned(result.text);
            }
          }}
          delay={300}
          onError={handleErrorWebCam}
        />
      </div>
      <Button
        disabled={scanned === ""}
        onClick={async () => {
          if (scanned) {
            setHouseId("HS0035995");
            console.log(houseId);
            let data;
            await axios
              .post("/getSpecificData", {
                table_name: "metadata_customer",
                condition: {
                  field: "house_id",
                  value: scanned,
                },
              })
              .then(async (res) => {
                if (!res.data.flag) {
                  setOpen(true);
                } else {
                  navigate("/questions");
                }
              })
              .catch((err) => {
                console.error(err);
              });
            // const p = await axios.post("/createCustomer");

            console.log(data);
          }
        }}
        variant="contained"
      >
        Click
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDiaData({ ...diaData, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone number"
            type="tel"
            fullWidth
            variant="standard"
            onChange={(e) => setDiaData({ ...diaData, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              await axios
                .get(`https://dev.tsapplications.in/api/v1/amenity/${scanned}`)
                .then(async (res) => {
                  let { data } = res;
                  localStorage.setItem(
                    "houseDetails",
                    JSON.stringify(res.data)
                  );

                  await axios.post("/createCustomer", {
                    house_id: scanned,
                    customer_name: diaData.name,
                    mobile_no: diaData.phone,
                    ...data,
                  });
                });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScanQr;
