import React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { globalCovidData, allCountries } from "../network/covidAPi";
import PieCard from "../components/PieCard";
import FilteredBarChart from "../components/FilteredBarChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { Height } from "@material-ui/icons";

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

export type barChartData = {
  ThreeLetterSymbol: string;
  country: string;
  newCases: number;
  activeCases: number;
  totalCases_1M_Pop: number;
};

export type pieChartsData = {
  name: string;
  value: number;
};

export type PieChartTitleAndData = {
  title: string;
  data: pieChartsData[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      display: "flex",
      overflow: "hidden",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "25vh",

      border: "solid",
      [theme.breakpoints.down("md")]: {
        height: "45vh", // secondary
        width: "80vw",
      },
    },
    paperList: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      display: "flex",
      overflow: "hidden",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "75vh",
      [theme.breakpoints.down("md")]: {
        height: "45vh", // secondary
        width: "80vw",
      },
      border: "solid",
    },
  })
);
const CompareCountries: React.FunctionComponent = (props) => {
  const classes = useStyles();
  const [worldStatisticsPiesData, setWorldStatisticsPiesData] = useState<
    PieChartTitleAndData[]
  >([]);
  const [countries, setCountries] = useState<Array<countryType>>([]);
  const [selectedCountry, setSelectedContry] = useState<countryType | null>(
    null
  );
  const [loadingLineChartData, setLoadingLineChartData] = useState(false);
  const [chartData, setChartData] = useState<Array<chartLine>>([]);
  const [countriesBarChart, setCountriesBarChart] = useState<barChartData[]>(
    []
  );

  useEffect(() => {
    const fetchGlobalStatData = async () => {
      const globalData = await globalCovidData();
      const allCountriesData = await allCountries();
      //remove the first two elements of workd data
      allCountriesData.splice(0, 2);

      const newbarChartData: barChartData[] = allCountriesData.map(
        (element: any) => {
          const elem: barChartData = {
            activeCases: element["ActiveCases"],
            ThreeLetterSymbol: element["ThreeLetterSymbol"],
            country: element["Country"],
            newCases: element["NewCases"],
            totalCases_1M_Pop: element["TotCases_1M_Pop"],
          };
          return elem;
        }
      );
      setCountriesBarChart((oldData) => newbarChartData);

      const tmpData: PieChartTitleAndData[] = [];
      //revovery vs sick proportion
      tmpData.push({
        title: "Recovery Proportion",
        data: [
          {
            name: "Recovery proportion",
            value: globalData[0]["Recovery_Proporation"] as number,
          },
          {
            name: "not recovered proportion",
            value: 100 - (globalData[0]["Recovery_Proporation"] as number),
          },
        ],
      });

      //new cases vs total cases

      tmpData.push({
        title: "new cases vs total cases",
        data: [
          { name: "NewCases", value: globalData[0]["NewCases"] as number },
          {
            name: "TotalCases",
            value: globalData[0]["TotalCases"] as number,
          },
        ],
      });

      //new recoverd vs new cases
      tmpData.push({
        title: "new recoverd vs new cases",
        data: [
          {
            name: "NewRecovered",
            value: globalData[0]["NewRecovered"] as number,
          },
          { name: "NewCases", value: globalData[0]["NewCases"] as number },
        ],
      });

      setWorldStatisticsPiesData((originalData) => tmpData);
    };
    try {
      fetchGlobalStatData();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.root}
        spacing={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item xs={2}>
          <Paper elevation={3} className={classes.paperList}></Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper elevation={3} className={classes.paperList}></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className={classes.paperList}></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompareCountries;
