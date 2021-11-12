import React from "react";
import { useEffect, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { covidNews } from "../network/covidAPi";
import PieCard from "../components/PieCard";
import FilteredBarChart from "../components/FilteredBarChart";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

type newsProperties = {
  title: string;
  link: string;
  urlToImage: string;
  content: string;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      display: "flex",
      overflow: "hidden",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "55vh",
      width: "30vh",
      border: "solid",
      [theme.breakpoints.down("md")]: {
        height: "45vh", // secondary
        width: "80vw",
      },
    },
    barChartPaper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: "center",
      display: "flex",
      overflow: "hidden",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      height: "55vh",
      [theme.breakpoints.down("md")]: {
        height: "45vh", // secondary
        width: "80vw",
      },
      border: "solid",
    },
  })
);
const News: React.FunctionComponent = (props) => {
  const [newsArray, setNewsArray] = useState<newsProperties[]>([]);
  const classes = useStyles();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await covidNews();
      setNewsArray((prev) => {
        return (newsData as Array<any>).map((newsElement) => {
          const formatedNews: newsProperties = {
            title: newsElement["title"],
            link: newsElement["link"],
            urlToImage: newsElement["urlToImage"],
            content: newsElement["content"],
          };
          return formatedNews;
        });
      });
    };
    try {
      fetchNews();
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div
      className={classes.root}
      style={{
        width: "40vw",

        margin: "auto",
      }}
    >
      <Grid
        container
        className={classes.root}
        spacing={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {newsArray.map((newsArticle) => {
          return (
            <Grid item xs={12} md={12} key={newsArticle.title}>
              <Paper>
                <Card>
                  {/* <CardMedia component="img" image={newsArray[page - 1].urlToImage} /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {newsArticle.title}
                    </Typography>
                    <Divider />
                    <Typography
                      gutterBottom
                      variant="body1"
                      paragraph={true}
                      component="div"
                    >
                      {newsArticle.content}
                    </Typography>
                    <Divider />
                    <a href={newsArticle.link}>link to article</a>
                  </CardContent>
                  <CardActions>
                    {/* <Pagination
                count={newsArray.length}
                page={page}
                onChange={handleChange}
              /> */}
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default News;
