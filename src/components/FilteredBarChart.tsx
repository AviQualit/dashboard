import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  BarChart,
  Brush,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
} from "recharts";
import { barChartData } from "../screens/worldStatistics";

const FilteredBarChart: React.FC<{ data: barChartData[] }> = (props) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <ResponsiveContainer height="100%" width={"100%"}>
      <BarChart
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />

        <Brush dataKey="country" height={30} stroke="#8884d8" />
        <Bar dataKey="totalCases_1M_Pop" fill="#8884d8" />
        <Bar dataKey="activeCases" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FilteredBarChart;
