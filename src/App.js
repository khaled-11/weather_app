import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import RadiosOptions from './radios'
import SearchSection from './search'
import WeatherDisplay from './weather_display'
import Container from "react-bootstrap/Container";

// The main app function
export default function App() {
  const weatherData = useSelector(state => state.weatherData)
  const dispatch = useDispatch()
  const updateData = (data) => {
    return {
        type:'UPDATE',
        data:data
    };
  }
  // State hooks for radio options, gps coordinates, weather data, loading status, and last search query
  const [selectedRadioOption, setSelectedRadioOption] = React.useState('new_york');
  const [coordinates, setCoordinates] = React.useState(["-74.006","40.7127"])
  // const [weatherData, setWeatherData] = React.useState({});
  const [loadingStatus, setLoadingStatus] =  React.useState("loading");
  const [lastSearchData, setLastSearchData] = React.useState({cityName:'new york', zipCode:""});
  // Reference hooks for inputs inputs
  const lon = React.useRef();
  const lat = React.useRef();
  const zipCode = React.useRef();
  const cityName = React.useRef();

  // Use Effect hook to call the API
  React.useEffect(() => {
    console.log("APIs Call")
    // Call the current weather API
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lon=${coordinates[0]}&lat=${coordinates[1]}&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`).then((current) => { 
      // Call the forecast API on success
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lon=${coordinates[0]}&lat=${coordinates[1]}&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`).then((forecast) => {
        // Update the weather data and loading statue on success
        setTimeout(()=>{
          dispatch(updateData({current:current.data, forecast:forecast.data}))
          //setWeatherData({current:current.data, forecast:forecast.data})
          setLoadingStatus("data_loaded")
        },50)
      }).catch(() => {
        // Set loading error
        setLoadingStatus("data_error")
      });
    }).catch(() => {
      // Set loading error
      setLoadingStatus("data_error")
    });
    // Execute whenever coordinates change
  }, [coordinates, dispatch])

  // Function to call the geocoding API
  const callGeoCodingAPI = (type) =>{
    console.log("Geolocation API Call")
    var url;
    // Check the search type and select the URL
    if (type === "zipcode"){
      url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.current.value},us&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    } else {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.current.value}&limit=1&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    }
    // Call the API with the selected URL
    axios.get(url).then((response) => {
      // Check for the response format and set the coordinates
      if (response.data.lon && response.data.lat){
        setCoordinates([response.data.lon.toString(),response.data.lat.toString()])
      } else if (response.data[0] && response.data[0].lon && response.data[0].lat){
        setCoordinates([parseFloat(response.data[0].lon.toFixed(4)).toString(),parseFloat(response.data[0].lat.toFixed(4)).toString()])
      } else {
        // Set error if the response is not recognized
        setLoadingStatus("data_error")
      }
    }).catch(() => {
      // Set error
      setLoadingStatus("data_error")
    });
  }
  
  // Function to handle radio options change
  const handleRadioChange = (e) => {
    // Replace the selectedRadioOption with the selected value
    setSelectedRadioOption(e.target.value)
    // If the selected option is New York
    if (e.target.value === "new_york"){
      setLoadingStatus("loading")
      // If the last displayed data was error or a different location
      if (loadingStatus==="data_error" || (coordinates[0]!=="-74.006" && coordinates[1]!=="40.7127")){
        // Update the coordinates
        setCoordinates(["-74.006","40.7127"])
        setLastSearchData({cityName:"new york", zipCode:""})
      // If the last displayed data was New York
      } else {
        // Set loading status to reload the weather section
        setTimeout(()=>{
          setLoadingStatus("data_loaded")
        })
      }
    }
  }

  // Function to handle the search button click
  const handleSearchButtonClick = () =>{
    // Check if the status is loading or not to avoid double clicks
    if (loadingStatus!=="loading"){
      // Set status to loading
      setLoadingStatus('loading')
      // If search by city name
      if (selectedRadioOption === "search_city_name"){
        // If the search value is empty
        if (cityName.current.value === ""){
          // Set loading error
          setTimeout(()=>{
            setLoadingStatus('data_error')
          })
        // If the input is not empty
        } else {
          // If the last data was not New York
          if(lastSearchData.cityName!==cityName.current.value.toLowerCase()){
            // Update the last search data
            setLastSearchData({cityName:cityName.current.value.toLowerCase(), zipCode:""})
            callGeoCodingAPI('city_name')
          // If the last data was new york
          } else {
            // Check if the previous search was error or not
            if (loadingStatus==="data_error"){
              // Set loading error
              setTimeout(()=>{
                setLoadingStatus('data_error')
              })
            } else {
              // Set data loaded
              setTimeout(()=>{
                setLoadingStatus("data_loaded")
              })
            }
          }
        }
      // If search by zip code
      } else if (selectedRadioOption==="search_zipcode"){
        // If the search value is empty
        if (zipCode.current.value === ""){
          // Set loading error
          setTimeout(()=>{
            setLoadingStatus('data_error')
          })
        // If the input is not empty
        } else {
          // If the last search value is not the same
          if(lastSearchData.zipCode!==zipCode.current.value.toString()){
            // Update the last search data
            setLastSearchData({cityName:"", zipCode:zipCode.current.value.toString()})
            callGeoCodingAPI('zipcode')
          // If the last search value is the same
          } else {
            // Check if the previous search was error or not
            if (loadingStatus==="data_error"){
              // Set loading error
              setTimeout(()=>{
                setLoadingStatus('data_error')
              })
            } else {
              // Set data loaded
              setTimeout(()=>{
                setLoadingStatus("data_loaded")
              })
            }
          }
        }
      // If search by GPS coordinates
      } else {
        // If the search values are empty
        if (lat.current.value === "" || lon.current.value === ""){
          // Set loading error
          setTimeout(function(){
            setLoadingStatus('data_error')
          })
        // If not empty
        } else {
          // If the input is the same as the last data
          if (coordinates[0]===lon.current.value && coordinates[1]===lat.current.value){
            setTimeout(()=>{
              setLoadingStatus("data_loaded")
            })
          // Set the coordinates if new values
          } else {
            setCoordinates([lon.current.value, lat.current.value])
            setLastSearchData({cityName:"", zipCode:""})
          }
        }
      }
    }
  }

  // The return of the main App function
  return (
    <Container>
      <p style={{marginTop:"5px", textAlign:"center"}}>Date and time follows <span style={{fontWeight: 'bold'}}>{Date().toString().match(/\(([^)]+)\)$/)[1]}</span></p>
      <h3 style={{textAlign:"center"}}><span style={{fontWeight: 'bold'}}>React Weather App</span></h3>
      <RadiosOptions handleRadioChange={handleRadioChange} selectedRadioOption = {selectedRadioOption}></RadiosOptions>
      <SearchSection selectedRadioOption={selectedRadioOption} lon={lon} lat={lat} zipCode={zipCode} cityName={cityName} handleSearchButtonClick={handleSearchButtonClick}></SearchSection>   
      <WeatherDisplay weatherData={weatherData} loadingStatus={loadingStatus}></WeatherDisplay>
      <br/><br/>
    </Container>
  );
}