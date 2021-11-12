const axios = require("axios").default;
const rkey = process.env.REACT_APP_RAPID_KEY;

const globalCovidData = async () => {
  
  console.log(process.env.REACT_APP_RAPID_KEY);
  var options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world",
    headers: {
      "x-rapidapi-host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
      "x-rapidapi-key":   rkey
      ,
    },
  };
  const res = await axios.request(options);

  return res.data;
};

const allCountries = async () => {
  var options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",
    headers: {
      "x-rapidapi-host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
      "x-rapidapi-key": rkey
,
    },
  };
  const res = await axios.request(options);

  return res.data;
};

const covidNews = async () => {
  var options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0",
    headers: {
      "x-rapidapi-host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
      "x-rapidapi-key": rkey,
    },
  };
  const res = await axios.request(options);

  return res.data.news;
};

const allCountriesNames = async () => {
  var options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
    headers: {
      "x-rapidapi-host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
      "x-rapidapi-key": rkey,
    },
  };
  const res = await axios.request(options);

  return res.data;
};
export { globalCovidData, allCountries, covidNews, allCountriesNames };
