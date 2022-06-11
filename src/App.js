import React from 'react';

// The main app function
function App() {
  // State hooks for radio options, gps coordinates, weather data, and loading state.
  const [selectedRadioOption, setSelectedRadioOption] = React.useState('world_wide');
  const [coordinates, setCoordinates] = React.useState([0,0])
  const [weatherData, setWeatherData] = React.useState({});
  const [loaded, setLoading] =  React.useState("loading");
  // Reference to inputs hooks
  const lon = React.useRef();
  const lat = React.useRef();
  const zipCode = React.useRef();
  const cityName = React.useRef();

  // Function to handle radio options change
  async function handleRadioChange(e) {
    setSelectedRadioOption(e.target.value)
    setLoading("loading")
  }

  async function handleSearchButtonClick(){
    setLoading("loaded")
  }

  return (
    <div>
      <div style={{textAlign:'center'}}>
        <br/>
        <label><input onChange={handleRadioChange} checked={selectedRadioOption === "world_wide"} value = "world_wide" type="radio" />World Wide</label>
        <label><input onChange={handleRadioChange} checked={selectedRadioOption === "search_city_name"} value = "search_city_name" type="radio" />By City Name</label>
        <br/>
        <label><input onChange={handleRadioChange} checked={selectedRadioOption === "search_zipcode"} value = "search_zipcode" type="radio" />By Zip Code</label>
        <label><input onChange={handleRadioChange} checked={selectedRadioOption === "search_gps"} value = "search_gps" type="radio" />By GPS coordinates</label>
        <br/>
        {
          selectedRadioOption === "search_gps"?
          <div style = {{marginTop:'0.5%'}}>
          Longitude<br/><input ref = {lon} type="number" placeholder="Longitude Coordinates"></input>
          <br/>
          Latitude<br/><input ref = {lat} type="number" placeholder="Latitude Coordinates"></input>
          <br/></div>:
          null
        }
        {
          selectedRadioOption === "search_zipcode"?
          <div style = {{marginTop:'0.5%'}}>
          Zip Code<br/>
          <input type="text" ref={zipCode} placeholder="Zipcode"/>
          <br/></div>:
          null
        }
        {
        selectedRadioOption === "search_city_name"?
          <div style = {{marginTop:'0.5%'}}>
          City Name<br/>
          <input type="text" ref={cityName} placeholder="City Name"/>
          <br/></div>:
          null
        }
        {
          selectedRadioOption === "search_gps" || selectedRadioOption === "search_city_name" || selectedRadioOption === "search_zipcode"?
          <div>
            <button style = {{marginTop:'0.5%'}} onClick={handleSearchButtonClick}>Search</button>
          </div>:
          null
        }    
      </div>
      <div>
      {
        loaded === "loading"?
        <p>Loading ....</p>
        :
        null
      }
      </div>
    </div>
  );
}

export default App;
