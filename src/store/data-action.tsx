import { Dispatch } from "react";

import { YUGO_COUNTRIES } from "../constants/constants";
import { climateDataActions } from "./data-slice";

export const fetchClimateData = ({
  periodType = "mavg",
  type = "tas",
  period = "1920/1939",
  country = "HRV",
}) => {
  return async (dispatch: Dispatch<any>) => {
    const fetchData = async () => {
      let url;
      let response: Response | Response[];
      if (country === "YGO") {
        response = await Promise.all(
          YUGO_COUNTRIES.map((item) => {
            return fetch(
              `${process.env.REACT_APP_URL}/${periodType}/${type}/${period}/${item.value}.json`
            ).then((res) => res.json());
          })
        );

        return response;
      } else {
        url = `${process.env.REACT_APP_URL}${periodType}/${type}/${period}/${country}.json`;
        response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Could not fetch the data`);
        }

        return response.json();
      }
    };

    try {
      dispatch(climateDataActions.isLoading({ isLoading: true }));

      const climateData = await fetchData();

      dispatch(
        climateDataActions.error({
          error: { isError: false, errorMessage: "" },
        })
      );

      if (country !== "YGO") {
        dispatch(
          climateDataActions.getClimateData({
            climateData: climateData,
          })
        );
        return;
      }
      if (periodType !== "mavg")
        dispatch(
          climateDataActions.calYugoClimateAnnualData({
            climateData: climateData,
          })
        );
      else
        dispatch(
          climateDataActions.calYugoClimateMonthlyData({
            climateData: climateData,
          })
        );
    } catch (err) {
      dispatch(
        climateDataActions.error({
          error: { isError: true, errorMessage: err },
        })
      );
      console.log("error", err);
    } finally {
      dispatch(climateDataActions.isLoading({ isLoading: false }));
    }
  };
};
