import React from "react";
import ReactDOM from "react-dom";

import classes from "./Loader.module.css";
import { Backdrop } from "./Modal";

const Loader: React.FC = (props: any) => {
  const backdropElement: HTMLElement = document.getElementById(
    "backdrop-root"
  ) as HTMLElement;
  return (
    <div className={classes.lds}>
      <div></div>
      <div></div>
      <div></div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        backdropElement
      )}
    </div>
  );
};

export default Loader;
