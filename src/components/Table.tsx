import { useSelector } from "react-redux";
import React from "react";

import DataClass from "../models/data.model";
import { MONTHS } from "../constants/constants";
import classes from "./Table.module.css";

const parseAr = (test: any) => {
  let o = 0;

  let parentarr = [];

  while (o < test.length) {
    let obj: any = {};
    let j = 0;
    let keysArr = Object.keys(test[o]);
    while (j < keysArr.length) {
      if (keysArr[j] === "climateData") {
        let k = 0;
        while (k < test[o][keysArr[j]].length) {
          obj[MONTHS[k]] = test[o][keysArr[j]][k];
          k++;
        }
      } else obj[keysArr[j]] = test[o][keysArr[j]];

      j++;
    }
    parentarr.push(obj);

    o++;
  }
  return parentarr;
};

const Table: React.FC = () => {
  const annualyData: DataClass[] =
    (useSelector<any>((state) => state.data.climateData) as DataClass[]) || [];

  const resArr = parseAr(annualyData) as DataClass[];

  return (
    <div className={classes.tble_wrapper}>
      <table className={classes.tble}>
        <thead>
          <tr>
            <th>
              <b> GCM</b>
            </th>
            {MONTHS.map((item) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody className={classes.bdy}>
          {resArr.map((item: any, i) => {
            return (
              <tr key={i}>
                <td>
                  <b>{item.gcm}</b>
                </td>
                {MONTHS.map((mon, j) => {
                  return (
                    <td key={j} style={{ color: item[mon] < 0 ? "red" : "" }}>
                      {item[mon]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
