import { useState } from "react";
import ReactDOM from "react-dom";

import { BarChart } from "../components/BarChart";
import Section from "../UI/section";
import ChartFilter from "../components/ChartFilter";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Form from "../components/Form";
import { errorType } from "../constants/constants";
import { useSelector } from "react-redux";
import classes from "./chart-page.module.css";
import Loader from "../UI/Loader";

const ChartPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

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
      <div className={isLoading ? classes.modal : ""}>
        {ReactDOM.createPortal(<Loader />, overlayRoot)}
      </div>
    );
  } else {
    if (error?.isError) {
      console.log("renderrr", error);
      render = error.errorMessage.toString();
    } else {
      render = <BarChart />;
    }
  }

  return (
    <>
      <Section
        className={error.isError ? "" : classes.custom}
        styleName={{
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

export default ChartPage;
