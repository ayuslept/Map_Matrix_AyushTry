import React from "react";
import { useEffect, useState } from "react";

export default function Map() {
  const [minDistance, setminDistance] = useState(0);
  const [threshHold, setthreshHold] = useState(75);
  const [allow, SetAllow] = useState(-1);
  function getMinDis(distanceArr) {
    let dis = Number.POSITIVE_INFINITY;
    for (const temp of distanceArr) {
      let huh = temp.distance.split(" ")[0];
      let num = Number(huh);
      if (num < dis) dis = num;
    }
    setminDistance(dis);
    isAllowed(dis);
  }
  function isAllowed(dis) {
    if (dis <= threshHold) {
      SetAllow(1);
    } else {
      SetAllow(0);
    }
  }
  useEffect(() => {
    var map, direction_plugin;
    function initMap1() {
      map = new window.mappls.Map("map", {
        center: [28.09, 78.3],
        zoom: 5,
      });
      map.addListener("load", function () {
        var direction_option = {
          map: map,
          //   divWidth: "350px",
          isDraggable: false,
          start: { label: "Dehradun", geoposition: "30.3165,78.0322" },
          end: { label: "India Gate", geoposition: "28.612964,77.229463" },
          Profile: ["driving", "biking", "trucking", "walking"],
          rtype: "1",
        };
        window.mappls.direction(direction_option, function (data) {
          direction_plugin = data;
          //   console.log(direction_plugin.data);
          getMinDis(direction_plugin.data);
        });
      });
    }
    initMap1();
  }, []);
  setTimeout(() => {
    console.log(minDistance);
  }, 2000);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h1>Threshhold distance is : 75km</h1>
      <div
        style={{ width: "150vh", height: "60vh", borderRadius: "9px" }}
        id="map"
      ></div>
      <div>
        <h1>{`The Shortest Distance is : ${minDistance} km`}</h1>
      </div>
      <div>
        {(() => {
          if (allow == -1) {
            return <h1>ESS Service : Pending</h1>;
          } else if (allow == 0) {
            return <h1>ESS Service : Not Granted</h1>;
          } else {
            return <h1>ESS Service : Granted</h1>;
          }
        })()}
      </div>
    </div>
  );
}
