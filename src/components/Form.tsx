import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { MONTHS } from "../constants/constants";
import DataClass from "../models/data.model";
import { climateDataActions } from "../store/data-slice";
import Button from "../UI/Button";
import classes from "./Form.module.css";

const initialValues: any = {
  gcm: "",
  variable: "",
  annualData: "",
  fromYear: 0,
  toYear: 0,
  monthlyData: [0],
};

const Form: React.FC<any> = (props) => {
  const [formValue, setFormValue] = useState(initialValues);
  const dispatch = useDispatch();

  const annualyData: DataClass[] =
    (useSelector<any>((state) => state.data.climateData) as DataClass[]) || [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((formVal: any) => {
      if (name === "gcm") return { ...formVal, [name]: value };
      return { ...formVal, [name]: +value };
    });
  };

  const params = useLocation();

  const isAnnual = params.pathname === "/chart" ? true : false;

  const { fromYear, toYear, gcm, variable } = annualyData[0];
  useEffect(() => {
    setFormValue((formVal: any) => ({
      ...formVal,
      fromYear,
      toYear,
      gcm,
      variable,
    }));
  }, [fromYear, toYear, gcm, variable]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const monthsVal = MONTHS.map((item: any) => {
      return formValue[item];
    });

    const annualData = new DataClass(
      formValue.gcm,
      formValue.variable,
      +formValue.fromYear,
      +formValue.toYear,
      isAnnual ? [+formValue.annualData] : monthsVal
    );

    dispatch(climateDataActions.addClimateData({ annualData }));
    props.setShowModal(false);
  };

  const cancelHandler = () => {
    props.setShowModal(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["new-expense__controls"]}>
        <div className={classes["new-expense__control"]}>
          <label>GCM</label>
          <input
            type="text"
            required
            value={formValue.gcm}
            maxLength={10}
            name="gcm"
            onChange={handleInputChange}
          />
        </div>
        <div className={classes["new-expense__control"]}>
          <label>Variable</label>
          <input
            className={classes.removeOutline}
            type="text"
            readOnly
            value={formValue.variable}
            name="variable"
            onChange={handleInputChange}
          />
        </div>
        <div className={classes["new-expense__control"]}>
          <label>From Year</label>
          <input
            type="number"
            name="fromYear"
            className={classes.removeOutline}
            readOnly
            value={formValue.fromYear}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes["new-expense__control"]}>
          <label>To Year</label>
          <input
            type="number"
            name="toYear"
            className={classes.removeOutline}
            readOnly
            value={formValue.toYear}
            onChange={handleInputChange}
          />
        </div>

        {!isAnnual &&
          MONTHS.map((item, i) => (
            <div key={i} className={classes["new-expense__control"]}>
              <label>{item}</label>
              <input
                type="number"
                name={MONTHS[i]}
                step="any"
                required
                max="9999999999999999"
                value={formValue.monthlyData[i + 1]}
                onChange={handleInputChange}
              />
            </div>
          ))}

        {isAnnual && (
          <div className={classes["new-expense__control"]}>
            <label>Annual Data</label>
            <input
              type="number"
              step="any"
              required
              max="9999999"
              name="annualData"
              value={formValue.annualData}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <div className={classes["new-expense__actions"]}>
        <Button type="submit">Add Data</Button> &emsp;&emsp;
        <Button onClick={cancelHandler}>Cancel</Button>
      </div>
    </form>
  );
};

export default Form;
