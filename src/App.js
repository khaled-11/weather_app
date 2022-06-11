import React, { useRef } from 'react';

// The main app function
function App() {
  // State hooks for radio options, gps coordinates, weather data, and loading state.
  const [selectedRadioOption, setSelectedRadioOption] = React.useState('world_wide');
  const [coordinates, setCoordinates] = React.useState(["0","0"])
  const [weatherData, setWeatherData] = React.useState({});
  const [loaded, setLoading] =  React.useState("loading");
  // Reference to inputs hooks
  const lon = React.useRef(0);
  const lat = React.useRef(0);
  const zipCode = React.useRef();
  const cityName = React.useRef();
  const fetchAPI = useRef(()=>{})

  // Use Effect hook to call the API
  React.useEffect(() => {
    fetchAPI.current()
  }, [coordinates])

  // Function to call the weather API
  fetchAPI.current = () => {  
    console.log("API Call")
    fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${coordinates[0]}&lat=${coordinates[1]}&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`)
    .then(res => res.json())
    .then(
      (result) => {
        setTimeout(function(){
          setWeatherData(result)
          setLoading('data_loaded')
        }, 200)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setLoading("data_error")
      }
    )
    // const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?lon=${coordinates[0]}&lat=${coordinates[1]}&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`, {
    //   method: 'GET',
    // })
    // const resJSON = await res.json()
    // if (resJSON.cod === 200){
    //   setTimeout(function(){
    //     setWeatherData(resJSON)
    //     setLoading('data_loaded')
    //   }, 200)
    // } else {
    //   setLoading('data_error')
    // }
  }

  // Function to handle radio options change
  const handleRadioChange = (e) => {
    setSelectedRadioOption(e.target.value)
  }

  // Function to handle the search button
  async function handleSearchButtonClick(){
    setLoading('loading')
    if (selectedRadioOption === "search_city_name"){
      const res = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.current.value}&limit=1&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`, {
        method: 'GET',
      })
      const resJSON = await res.json()
      setCoordinates([resJSON[0].lon,resJSON[0].lat])
    } else if (selectedRadioOption === "search_zipcode"){
      const res = await fetch (`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.current.value},us&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`, {
        method: 'GET',
      })
      const resJSON = await res.json()
      setCoordinates([resJSON.lon,resJSON.lat])
    } else {
      // Handle empty input
      if (lat.current.value === "" || lon.current.value === ""){
        setLoading('data_error')
      } else {
        if (coordinates[0]===lon.current.value && coordinates[1]===lat.current.value){
          setLoading("data_loaded")
        } else {
          setCoordinates([lon.current.value, lat.current.value])
        }
      }
    }

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
        loaded === "data_loaded"?
        <div style={{textAlign:'left'}}>
          <p style={{textTransform: 'capitalize'}}>
          <span style={{fontWeight: 'bold'}}>Coordinates</span>: Longitude: {weatherData.coord.lon}, Latitude: {weatherData.coord.lat}
          <br/>
          <span style={{fontWeight: 'bold'}}>Location Name</span>: {weatherData.name}
          <br/>
          <span style={{fontWeight: 'bold'}}>General</span>: {weatherData.weather[0].description}
          <br/>
          <span style={{fontWeight: 'bold'}}>Temperature</span>: {weatherData.main.temp} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Feels Like</span>: {weatherData.main.feels_like} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Minimum Temperature</span>: {weatherData.main.temp_min} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Maximum Temperature</span>: {weatherData.main.temp_max} ℉
          <br/>
          {
            weatherData.weather[0].main === "Snow"?
              <span style={{fontWeight: 'bold'}}>Snow volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {weatherData.snow['1h']} mm</span><br/></span>
            :null
          }
          {
            weatherData.weather[0].main === "Rain"?
              <span style={{fontWeight: 'bold'}}>Rain volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {weatherData.rain['1h']} mm</span><br/></span>
              :null
          }
          <span style={{fontWeight: 'bold'}}>Humidity</span>: {weatherData.main.humidity} %
          <br/>
          <span style={{fontWeight: 'bold'}}>Atmospheric pressure</span>: {weatherData.main.pressure} hPa
          <br/>
          <span style={{fontWeight: 'bold'}}>Visibility</span>: {weatherData.visibility} Meter
          <br/>
          <span style={{fontWeight: 'bold'}}>Wind Speed</span>: {weatherData.wind.speed} Meter/Sec
          <br/>
          <span style={{fontWeight: 'bold'}}>Wind Direction</span>: {weatherData.wind.deg} Degrees
          <br/>
          <span style={{fontWeight: 'bold'}}>Cloudiness</span>: {weatherData.clouds.all} %
          <br/>
          <span style={{fontWeight: 'bold'}}>Sunrise</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(weatherData.sys.sunrise*1000)}
          <br/>
          <span style={{fontWeight: 'bold'}}>Sunset</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(weatherData.sys.sunset*1000)}
          <br/>          
          </p>
        </div>
        :
        <p>Error, no data!<br/>Please try again.</p>
      }
      </div>
    </div>
  );
}

export default App;
