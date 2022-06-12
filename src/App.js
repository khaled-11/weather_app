import React from 'react';
import axios from 'axios';
import Body from './App_Body'
import Search from './Search'
import Radios from './Radios'

// The main app function
function App() {
  // console.log("function reload")
  // State hooks for radio options, gps coordinates, weather data, and loading status.
  const [selectedRadioOption, setSelectedRadioOption] = React.useState('new_york');
  const [coordinates, setCoordinates] = React.useState(["-74.006","40.7127"])
  const [weatherData, setWeatherData] = React.useState({});
  const [loadingStatus, setLoadingStatus] =  React.useState("loading");
  const [lastSearchData, setLastSearchData] = React.useState({cityName:'new york', zipCode:""});
  // Hooks reference to inputs and functions 
  const lon = React.useRef();
  const lat = React.useRef();
  const zipCode = React.useRef();
  const cityName = React.useRef();

  // Use Effect hook to call the API
  React.useEffect(() => {
    console.log("API Call")
    setTimeout(function(){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lon=${coordinates[0]}&lat=${coordinates[1]}&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`).then((response) => {
        setWeatherData(response.data)
        setLoadingStatus('data_loaded')
      }).catch(() => {
        setLoadingStatus("data_error")
      });
    },100)
  }, [coordinates])

  // Function to handle radio options change
  const handleRadioChange = (e) => {
    // console.log("Radio Change")
    if (e.target.value === "new_york"){
      setLoadingStatus("loading")
      if (coordinates[0]!=="-74.006" && coordinates[1]!=="40.7127"){
        setCoordinates(["-74.006","40.7127"])
        setLastSearchData({cityName:"new york", zipCode:""})
      } else {
        setLoadingStatus('data_loaded')
      }
    }
    setSelectedRadioOption(e.target.value)
  }

  // Function to call the geocoding API
  const callGeoCodingAPI = (type) =>{
    console.log("Geolocation Call")
    var url;
    if (type === "zipcode"){
      url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.current.value},us&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    } else {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.current.value}&limit=1&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    }
    axios.get(url).then((response) => {
      if (response.data.lon && response.data.lat){
        setCoordinates([response.data.lon.toString(),response.data.lat.toString()])
      } else if (response.data[0] && response.data[0].lon && response.data[0].lat){
        setCoordinates([parseFloat(response.data[0].lon.toFixed(4)).toString(),parseFloat(response.data[0].lat.toFixed(4)).toString()])
      }
    }).catch(() => {
      setLoadingStatus("data_error")
    });
  }

  // Function to handle the search button
  const handleSearchButtonClick = () =>{
    setLoadingStatus('loading')
    if (selectedRadioOption === "search_city_name"){
      if (cityName.current.value === ""){
        setLoadingStatus('data_error')
      } else {
        if(lastSearchData.cityName!==cityName.current.value.toLowerCase()){
          setLastSearchData({cityName:cityName.current.value.toLowerCase(), zipCode:""})
          callGeoCodingAPI('city_name')
        } else {
          setLoadingStatus("data_loaded")
        }
      }
    } else if (selectedRadioOption === "search_zipcode"){
      if (zipCode.current.value === ""){
        setLoadingStatus('data_error')
      } else {
        if(lastSearchData.zipCode!==zipCode.current.value.toString()){
          setLastSearchData({cityName:"", zipCode:zipCode.current.value.toString()})
          callGeoCodingAPI('zipcode')
        } else {
          setLoadingStatus("data_loaded")
        }
      }
    } else {
      if (lat.current.value === "" || lon.current.value === ""){
        setLoadingStatus('data_error')
      } else {
        if (coordinates[0]===lon.current.value && coordinates[1]===lat.current.value){
          setLoadingStatus("data_loaded")
        } else {
          setCoordinates([lon.current.value, lat.current.value])
          setLastSearchData({cityName:"", zipCode:""})
        }
      }
    }
  }

  // The return of the main App function
  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Radios handleRadioChange={handleRadioChange} selectedRadioOption = {selectedRadioOption}></Radios>
        <Search selectedRadioOption={selectedRadioOption} lon={lon} lat={lat} zipCode={zipCode} cityName={cityName} handleSearchButtonClick={handleSearchButtonClick}></Search>   
      </div>
      <Body weatherData={weatherData} loadingStatus={loadingStatus}></Body>
    </div>
  );
}
export default App;
