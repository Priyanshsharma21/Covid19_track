// import React from 'react'
// import {Card, CardContent, Typography} from '@material-ui/core'
// import './InfoBox.css'
// const InfoBox = ({title,cases,total,active,isRed , ...props}) => {
//      {/* <CardIn BEM naming conventions we use __ for new and -- for modifed one */}


//   return (
//     <>
//       <Card
//       onClick={props.onClick}
//       className={`infoBox ${active && "infoBox--selected"} ${
//         isRed && "infoBox--red"
//       }`}
//     >
//       <CardContent>
//         <Typography color="textSecondary" gutterBottom>
//           {title}
//         </Typography>
//         <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
//           {cases}
//         </h2>

//         <Typography className="infoBox__total" color="textSecondary">
//           {total} Total
//         </Typography>
//       </CardContent>
//     </Card>
//     </>
//   )
// }

// export default InfoBox

// !-----------------------------------------------------------

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;