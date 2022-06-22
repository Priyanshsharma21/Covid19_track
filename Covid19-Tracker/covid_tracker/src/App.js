// import './App.css';
// import React,{ useState,useEffect } from 'react'
// import InfoBox from './InfoBox';
// import {Card,CardContent} from '@material-ui/core';
// import {FormControl, MenuItem, Select} from '@material-ui/core';
// import Table from './Table';
// import {sortData} from './utils'
// import LineGraph from './LineGraph';
// import "leaflet/dist/leaflet.css";
// import Map from './Map'
// import {prettyPrintStat} from './utils'



// const URL = 'https://disease.sh/v3/covid-19/countries'

// function App() {
  
//   const [countries, setCountries] = useState([]); // use to get name and code from api
//   const [defaultCountry, setdefaultCountry] = useState("worldwide");
//   const [countryInfo, setCountryInfo] = useState({}) ;
//   const [tableData, setTableData] = useState([]);
//   const [casesType, setCasesType] = useState("cases");
//   const [mapCenter, setMapCenter] = useState({ lat: 64.80746, lng: -40.4796 });
//   const [mapZoom, setMapZoom] = useState(5);
//   const [mapCountries, setMapCountries] = useState([]);

//   useEffect(()=>{
//     //this will run fo one time only for worldwide
//     fetch('https://disease.sh/v3/covid-19/all')
//     .then((res)=>res.json())
//     .then((data)=>{
//       setCountryInfo(data)
//     })
//   },[])

//   useEffect(()=>{
//     const getCountryData = async()=>{
//       await fetch(URL).then((res)=>res.json()).then((data)=>{
//         const countries = data.map((country)=>({
//           name : country.country,
//           value : country.countryInfo.iso3,
//         }))

//         const sortedData = sortData(data)
//         setTableData(sortedData)
//         setCountries(countries);
//         setMapCountries(data)
//         console.log(data)
//       })
//     }
//     getCountryData()
//   },[])




//   const handelChange = async (e)=>{
//     const countryCode = e.target.value;
//     setdefaultCountry(countryCode)
    
//     const url = countryCode==='worldwide'
//     ? 'https://disease.sh/v3/covid-19/all'
//     : `https://disease.sh/v3/covid-19/countries/${countryCode}`

//     await fetch(url)
//     .then(res=>res.json())
//     .then((data)=>{
//       setdefaultCountry(countryCode);
//       setCountryInfo(data);
//       setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
//       setMapZoom(2);
//     });
//   }




  
  

//   return (
//     <div className="app">
//      <div className="app__left">
//      <div className="app__header">
//         <h1>COVID-19 TRACKER</h1>
//         <FormControl className="app__dropdown">
//           <Select varient="outlined" value={defaultCountry} onChange={handelChange}>
//           <MenuItem value="worldwide">Worldwide</MenuItem>
//             {countries.map(country => 
//               <MenuItem value={country.value}>
//                 {country.name}
//               </MenuItem>
//             )}
//           </Select>
//       </FormControl>
//       </div>
//      {/* title + select input box  */}
//      <div className="app__state">
//      <InfoBox
//      isRed={true}  
//      active={casesType==='cases'}
//      onClick={(e)=>setCasesType("cases")}
//      title="CoronaVirus Cases" 
//      cases={prettyPrintStat(countryInfo.todayCases)} 
//      total={prettyPrintStat(countryInfo.cases)}/>

//      <InfoBox
//      isRed={false}
//      active={casesType==='recovered'}
//      onClick={(e)=>setCasesType("recovered")}
//      title="Recovered" 
//      cases={prettyPrintStat(countryInfo.todayRecovered)} 
//      total={prettyPrintStat(countryInfo.recovered)}/>

//      <InfoBox
//      isRed={true}  
//      active={casesType==='deaths'}
//      onClick={(e)=>setCasesType("deaths")}
//      title="Deaths" 
//      cases={prettyPrintStat(countryInfo.todayDeaths)} 
//      total={prettyPrintStat(countryInfo.deaths)}/>

     
//      </div>
//       {/* map  */}
//       <Map  
//       countries={mapCountries}
//       casesType={casesType}
//       center={mapCenter}
//       zoom={mapZoom} />
//      </div>




//      <Card className="app__right">
//       <CardContent>

//       {/* table representation  */}
//       <h3>Live Cases By Country</h3>
//       <Table countries={tableData}/>
//       {/* graph representation  */}
//       <h3>Worldwide New {casesType}</h3>
//       <LineGraph casesType={casesType} />

//       </CardContent>
//      </Card>

//     </div>
//   );
// }

// export default App;



// !--------------------------------Code---------------------------------------
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./utils";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === "worldwide") {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(5);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
        }
      });
  };



  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          key={mapCenter[0]}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph  casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;