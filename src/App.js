import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    temperature: "Loading...",
    pressure: "Loading...",
    level: "Loading..."
  });

  useEffect(() => {
    setInterval(() => {
      axios
        .get(
          "https://api.thingspeak.com/channels/2068505/feeds.json?api_key=S86PHXT0AX1NYNGO&results=2"
        )
        .then((doc) => {
          setData({
            temperature: doc.data.feeds[1].field1,
            pressure: doc.data.feeds[1].field2,
            level: doc.data.feeds[1].field3
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <h1>PoC IoT DAQ NI PT Tangkas</h1>
      <h1 style={{ color: "red" }}>Suhu: {data.temperature}</h1>
      <h1 style={{ color: "blue" }}>Pressure: {data.pressure}</h1>
      <h1 style={{ color: "green" }}>Level: {data.level}</h1>
    </div>
  );
}

export default App;
