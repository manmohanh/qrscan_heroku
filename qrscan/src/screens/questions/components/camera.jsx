import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CameraIcon from "@mui/icons-material/Camera";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: { exact: "environment" },
};

export default function Camera({ open, setOpen, setImage }) {
  const handleClose = () => {
    setOpen(false);
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            camera
          </Typography>
        </Toolbar>
      </AppBar>
      <Webcam
        style={{ alignSelf: "center" }}
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button
        sx={{ width: 100, alignSelf: "center", mt: 4 }}
        variant="contained"
        endIcon={<CameraIcon />}
        onClick={capture}
      >
        click
      </Button>
    </Dialog>
  );
}
