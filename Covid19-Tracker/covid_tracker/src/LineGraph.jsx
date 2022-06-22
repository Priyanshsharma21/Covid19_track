// import React, { useState, useEffect } from "react";
// import { Line } from 'react-chartjs-2';
// import numeral from "numeral";
// import './LineGraph.css'

// const options = {
//   legend: {
//     display: false,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
//   maintainAspectRatio: false,
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return numeral(tooltipItem.value).format("+0,0");
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           // Include a dollar sign in the ticks
//           callback: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };

// const buildChartData = (data, casesType) => {
//   let chartData = [];
//   let lastDataPoint;
//   for (let date in data.cases) {
//     if (lastDataPoint) {
//       let newDataPoint = {
//         x: date,
//         y: data[casesType][date] - lastDataPoint,
//       };
//       chartData.push(newDataPoint);
//     }
//     lastDataPoint = data[casesType][date];
//   }
//   return chartData;
// };

// function LineGraph({ casesType }) {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           let chartData = buildChartData(data, casesType);
//           setData(chartData);
//           // buildChart(chartData);
//         });
//     };

//     fetchData();
//   }, [casesType]);

//   return (
//     <div className="linegraph">
//       {data?.length > 0 && (
//         <Line
//           data={{
//             datasets: [
//               {
//                 backgroundColor: "rgba(204, 16, 52, 0.5)",
//                 borderColor: "#CC1034",
//                 data: data,
//               },
//             ],
//           }}
//           options={options}
//         />
//       )}
//     </div>
//   );
// }

// export default LineGraph;
// !------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=350")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;




















// ---------------------------------------------------------------------
// import React,{useState} from 'react'
// import { useEffect } from 'react'
// import {Line} from 'react-chartjs-2'
// import numeral from 'numeral'

// const options = {
//     legend: {
//       display: false,
//     },
//     elements: {
//       point: {
//         radius: 0,
//       },
//     },
//     maintainAspectRatio: false,
//     tooltips: {
//       mode: "index",
//       intersect: false,
//       callbacks: {
//         label: function (tooltipItem, data) {
//           return numeral(tooltipItem.value).format("+0,0");
//         },
//       },
//     },
//     scales: {
//       xAxes: [
//         {
//           type: "time",
//           time: {
//             format: "MM/DD/YY",
//             tooltipFormat: "ll",
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//           ticks: {
//             // Include a dollar sign in the ticks
//             callback: function (value, index, values) {
//               return numeral(value).format("0a");
//             },
//           },
//         },
//       ],
//     },
//   };

// const LineGraph = () => {
//     const [data, setData] = useState({})

//     //this function gives us the format in which chart.js takes to form a graph
//     const buildChartData = (data, casesType="cases")=>{
//         const chartData = []
//         let lastDataPoint;
//         for(let date in data.cases){
//             if(lastDataPoint){
//                 const newDataPoint = {
//                     x:date,
//                     y:data[casesType][date] - lastDataPoint
//                     //if result is +ve then graph goes up else down
//                 }
//                 chartData.push(newDataPoint)
//             }
//             lastDataPoint = data[casesType][date]
//         }
//         return chartData
//     }

//     useEffect(()=>{
//         const fetchData = async()=>{
//            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120').then((res)=>res.json()).then((data)=>{
//                 const chartData = buildChartData(data)
//                 setData(chartData)
//             })
//         }
//         fetchData()
        
//     },[])

    

//   return (
//     <div className='linegraph'>
//     {data?.length>0 && (
//         <Line 
//     data={{
//         datasets : [
//             {data:data,
//             backgroundColor : "red",
//             borderColor : "black"
//             }
//             ]
//     }}
//     options = {options}
//     />
//     )}
//     </div>
//   )
// }

// export default LineGraph