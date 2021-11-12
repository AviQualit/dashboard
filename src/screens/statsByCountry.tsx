import React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Brush,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

type countryType = {
  id: string;
  name: string;
};
type chartLine = {
  id: string;
  symbol: string;
  country: string;
  continent: string;
  date: string;
  totalCases: number;
  new_cases: number;
};
const axios = require("axios").default;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "8rem",
    },
    paperGraph: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "50vh",
    },
  })
);
const StatsByCountries: React.FC<{}> = (props) => {
  const rkey = process.env.REACT_APP_RAPID_KEY;
  const classes = useStyles();
  const [countries, setCountries] = useState<Array<countryType>>([]);
  const [selectedCountry, setSelectedContry] = useState<countryType | null>(
    null
  );
  const [loadingLineChartData, setLoadingLineChartData] = useState(false);
  const [chartData, setChartData] = useState<Array<chartLine>>([]);

  useEffect(() => {
    try {
      const fetchCountries = async () => {
        var options = {
          method: "GET",
          url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
          headers: {
            "x-rapidapi-key":
              rkey,
            "x-rapidapi-host":
              "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
          },
        };

        const result = await axios.request(options);
        const countries = result.data.map((line: any) => {
          const country: countryType = {
            id: line.ThreeLetterSymbol,
            name: line.Country,
          };
          return country;
        });
        setCountries(countries);
        console.log(result);
      };
      fetchCountries();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedCountry !== null) {
        setLoadingLineChartData(true);
        const fetchLineChart = async () => {
          var options = {
            method: "GET",
            url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${selectedCountry?.id}`,
            headers: {
              "x-rapidapi-key":
                rkey,
              "x-rapidapi-host":
                "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            },
          };

          const result = await axios.request(options);
          const currentData = result.data.map((line: any) => {
            const dataLine: chartLine = {
              id: line.id,
              continent: line.Continent,
              country: line.Country,
              date: line.date,
              totalCases: line.total_cases,
              new_cases: line.new_cases,
              symbol: line.symbol,
            };

            return dataLine;
          });
          setChartData(currentData);
        };
        fetchLineChart();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingLineChartData(false);
    }

    setLoadingLineChartData(false);
  }, [selectedCountry]);
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.root}
        spacing={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Autocomplete
              id="country-select"
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <React.Fragment>
                  {option.id} - {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={(event: any, value: countryType | null) => {
                setSelectedContry(value);
              }}
            ></Autocomplete>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paperGraph}>
            {!loadingLineChartData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  // width={500}
                  // height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* <Area
                    type="monotone"
                    dataKey="totalCases"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  /> */}
                  <Area type="monotone" dataKey="new_cases" stroke="#82ca9d" />
                  <Brush dataKey="date" height={30} stroke="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div>loading </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsByCountries;
