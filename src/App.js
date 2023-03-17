import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    temperature: "0",
    pressure: "0",
    humidity: "0"
  });

  useEffect(() => {
    setInterval(() => {
      axios
        .get(
          "https://api.thingspeak.com/channels/2068505/feeds.json?api_key=S86PHXT0AX1NYNGO&results=2"
        )
        .then((doc) => {
          console.log(doc.data.feeds[0].field1);
          setData({
            temperature: doc.data.feeds[0].field1,
            pressure: doc.data.feeds[0].field2,
            level: doc.data.feeds[0].field3
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
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
