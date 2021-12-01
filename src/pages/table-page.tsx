import { useState } from "react";
import ReactDOM from "react-dom";

import Section from "../UI/section";
import ChartFilter from "../components/ChartFilter";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Table from "../components/Table";
import Loader from "../UI/Loader";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import classes from "./chart-page.module.css";
import { errorType } from "../constants/constants";

const TablePage: React.FC = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const isLoading = useSelector<{ data: { isLoading: boolean } }>(
    (state) => state.data.isLoading
  );

  const error: errorType = useSelector<{ data: { error: errorType } }>(
    (state) => state.data.error
  ) as errorType;

  const overlayRoot = document.getElementById("overlay-root") as HTMLElement;

  let render;
  if (isLoading) {
    render = (
      <div className={classes.modal}>
        {ReactDOM.createPortal(<Loader />, overlayRoot)}
      </div>
    );
  } else {
    if (error?.isError) {
      render = error.errorMessage.toString();
    } else {
      render = <Table />;
    }
  }

  return (
    <>
      <Section
        styleName={{
          width: "auto",
          display: error.isError ? "" : "flex",
          color: error.isError ? "red" : "",
          backgroundColor: error.isError ? "lightgrey" : "",
        }}
      >
        {render}
      </Section>

      <ChartFilter />

      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add data
      </Button>
      {showModal && (
        <Modal
          title="Add Data"
          onConfirm={() => {
            setShowModal(false);
          }}
        >
          <Form setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default TablePage;
