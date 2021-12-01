export type nameVal = { name: string; value: string };

export type errorType = { isError: boolean; errorMessage: string };

export const COUNTRIES: nameVal[] = [
  { name: "Croatia", value: "HRV" },
  { name: "Slovenia", value: "SVN" },
  { name: "Serbia", value: "SRB" },
  { name: "Bosnia & Herzegovina", value: "BIH" },
  { name: "Montenegro", value: "MNE" },
  { name: "Macedonia", value: "MKD" },
  { name: "Yugoslavia", value: "YGO" },
];

export const YUGO_COUNTRIES: nameVal[] = [
  { name: "Croatia", value: "HRV" },
  { name: "Slovenia", value: "SVN" },
  { name: "Serbia", value: "SRB" },
  { name: "Bosnia & Herzegovina", value: "BIH" },
  { name: "Montenegro", value: "MNE" },
  { name: "Macedonia", value: "MKD" },
];

export const PERIOD: nameVal[] = [
  { name: "1920-1939", value: "1920/1939" },
  { name: "1940-1959", value: "1940/1959" },
  { name: "1960-1979", value: "1960/1979" },
  { name: "1980-1999", value: "1980/1999" },
];

export const TYPE: nameVal[] = [
  { name: "Precipitation", value: "pr" },
  { name: "Temperature", value: "tas" },
];

export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
