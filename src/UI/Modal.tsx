import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css";

export const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props: any) => {
  return (
    <Card className={classes["modal-content"]}>
      <header className={classes["modal-header"]}>
        <h2>{props.title}</h2>
        <Button onClick={props.onConfirm}> &#x2715; </Button>
      </header>

      <div className={classes["modal-body"]}>{props.children}</div>
      <footer className={classes["modal-footer"]}></footer>
    </Card>
  );
};

const Modal = (props: any) => {
  const backdropElement: HTMLElement = document.getElementById(
    "backdrop-root"
  ) as HTMLElement;

  const overlayRoot = document.getElementById("overlay-root") as HTMLElement;

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        backdropElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          onConfirm={props.onConfirm}
          children={props.children}
        />,
        overlayRoot
      )}
    </React.Fragment>
  );
};

export default Modal;
