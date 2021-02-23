import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ open, setOpen, char, setChar }) {
  const classes = useStyles();
  const [display, setDisplay] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${char}`)
      .then((res) => res.json())
      .then((data) => setDisplay(data));
    return () => {
      setDisplay();
    };
  }, [char]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Character Information</h2>
            <div id="transition-modal-description">
              {display ? (
                <>
                  <img
                    className="image"
                    src={display.image}
                    alt={display.name}
                  />
                  {display.name}
                  <hr />
                  <p>Gender : {display.gender}</p>
                  <p>Location : {display.location.name}</p>
                </>
              ) : (
                "Loading"
              )}{" "}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
