import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { COUNTRIES, PERIOD, TYPE } from "../constants/constants";
import { fetchClimateData } from "../store/data-action";
import classes from "./ChartFilter.module.css";

const initialValues = {
  country: "HRV",
  period: "1920/1939",
  type: "tas",
};

const ChartFilter: React.FC = () => {
  const [filterValue, setFilterValue] = useState(initialValues);
  const dispatch = useDispatch();
  const params = useLocation();

  const periodType = params.pathname === "/chart" ? "annualavg" : "mavg";

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFilterValue({
      ...filterValue,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(
      fetchClimateData({
        periodType: periodType,
        country: filterValue.country,
        period: filterValue.period,
        type: filterValue.type,
      })
    );
  }, [
    dispatch,
    filterValue.country,
    filterValue.period,
    filterValue.type,
    periodType,
  ]);

  return (
    <div className={classes.custom}>
      <div className={classes["expenses-filter"]}>
        <div className={classes["expenses-filter__control"]}>
          <div>
            <p>Filter by Country</p>

            <select
              name="country"
              value={filterValue.country}
              onChange={handleInputChange}
            >
              {COUNTRIES.map((item: any) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={classes["expenses-filter"]}>
        <div className={classes["expenses-filter__control"]}>
          <div>
            <p>Filter by Period </p>
            <select
              name="period"
              value={filterValue.period}
              onChange={handleInputChange}
            >
              {PERIOD.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={classes["expenses-filter"]}>
        <div className={classes["expenses-filter__control"]}>
          <div>
            <p>Filter by type</p>
            <select
              name="type"
              value={filterValue.type}
              onChange={handleInputChange}
              style={{ alignItems: "center" }}
            >
              {TYPE.map((item) => (
                <option
                  key={item.value}
                  style={{ alignItems: "center" }}
                  value={item.value}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartFilter;
