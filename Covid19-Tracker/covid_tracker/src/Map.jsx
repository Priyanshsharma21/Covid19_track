// import React from "react";
// import { MapContainer  as LeafletMap, TileLayer } from "react-leaflet";
// import "./Map.css";
// import { showDataOnMap } from "./utils";

// const Map = ({ countries, casesType, center, zoom }) => {
//   return (
//     <div className="map">
//       <LeafletMap center={center} zoom={zoom}>
//       {/* //center is lang and long and zoom is how mush to zoom */}
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {showDataOnMap(countries, casesType)}
//       </LeafletMap>
//     </div>
//   );
// }

// export default Map





import React from "react";
import "./Map.css";
import { showDataOnMap } from "./utils";
import { TileLayer, MapContainer as LeafletMap } from "react-leaflet";

function Map({ countries, casesType, center, zoom, key }) {
  return (
   <>
     <div className="map" id="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType, key)}
      </LeafletMap>
    </div>
   </>
  );
}

export default Map;