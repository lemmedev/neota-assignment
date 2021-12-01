import { createSlice } from "@reduxjs/toolkit";

import DataClass from "../models/data.model";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    climateData: [new DataClass("", "", 0, 0, [0])],
    isLoading: false,
    error: { isError: false, errorMessage: "" },
  },

  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },

    error(state, action) {
      console.log("error reducer", action.payload.error);
      state.error = action.payload.error;
    },

    getClimateData(state, action) {
      state.climateData = [];
      state.climateData = action.payload.climateData.map((item: any) => {
        return new DataClass(
          item.gcm,
          item.variable,
          item.fromYear,
          item.toYear,
          item.annualData || item.monthVals
        );
      });
    },
    calYugoClimateMonthlyData(state, action) {
      state.climateData = [];

      const arr = action.payload.climateData;

      function getMean(test: any) {
        let o = 0;

        let objlength = test[0][0].monthVals.length;
        let parentarr = [];
        console.log("objlength", objlength);
        while (o < test[0].length) {
          let i = 0;
          let obj = {};
          let newarr = [];
          while (i <= objlength - 1) {
            let temp: any = [];
            for (const a of test) {
              temp.push(a[o].monthVals[i]);
            }

            newarr.push(
              temp.reduce((a: any, s: any) => {
                return a + s;
              }, 0) / test.length
            );

            i++;
          }
          obj = { ...test[0][0], annualData: newarr };

          console.log(obj);

          parentarr.push(
            new DataClass(
              test[0][o].gcm,
              test[0][o].variable,
              test[0][o].fromYear,
              test[0][o].toYear,
              newarr
            )
          );
          o++;
        }

        return parentarr;
      }

      state.climateData = getMean(arr);
    },

    calYugoClimateAnnualData(state, action) {
      state.climateData = [];

      const arr = action.payload.climateData;

      function getMean(test: any) {
        let o = 0;

        let objlength = test[0][0].annualData.length;
        let parentarr = [];
        console.log("objlength", objlength);
        while (o < test[0].length) {
          let i = 0;

          let newarr = [];
          while (i <= objlength - 1) {
            let temp: any = [];
            for (const a of test) {
              temp.push(a[o].annualData[i]);
            }

            newarr.push(
              temp.reduce((a: any, s: any) => {
                return a + s;
              }, 0) / test.length
            );

            i++;
          }
          parentarr.push(
            new DataClass(
              test[0][o].gcm,
              test[0][o].variable,
              test[0][o].fromYear,
              test[0][o].toYear,
              newarr
            )
          );
          o++;
        }

        return parentarr;
      }
      state.climateData = getMean(arr);
    },

    addClimateData(state, action) {
      state.climateData = [...state.climateData, action.payload.annualData];
    },
  },
});

export const climateDataActions = dataSlice.actions;

export default dataSlice;
