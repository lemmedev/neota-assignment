import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import classes from "./App.module.css";

const Chart = React.lazy(() => import("./pages/chart-page"));
const Table = React.lazy(() => import("./pages/table-page"));
const NoPage = React.lazy(() => import("./pages/no-page"));

function App() {
  return (
    <div className={classes.App}>
      <ul>
        <li className={classes.pr}>
          <b className={classes.appname}>
            Temperature and precipitation visualizer
          </b>
        </li>
        <li>
          <NavLink
            to="/"
            className={(isActive) => (isActive.isActive ? classes.active : "")}
          >
            Table
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(isActive) => (isActive.isActive ? classes.active : "")}
            to="/chart"
          >
            Chart
          </NavLink>
        </li>
      </ul>

      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <Table />
            </React.Suspense>
          }
        />

        <Route
          path="/chart"
          element={
            <React.Suspense fallback={<>...</>}>
              <Chart />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<>...</>}>
              <NoPage />
            </React.Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
