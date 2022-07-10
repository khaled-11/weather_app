import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import RadiosOptions from './radios'
import SearchSection from './search'
import WeatherDisplay from './weather_display'
import Container from "react-bootstrap/Container";
import {updateData, updateLoadingStatus} from "./actions/actions";

// The main app function
export default function App() {
  // Redux
  const coordinates = useSelector(state => state.coordinates)
  const dispatch = useDispatch()
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
          dispatch(updateLoadingStatus("data_loaded"))
        },50)
      }).catch(() => {
        // Set loading error
        dispatch(updateLoadingStatus("data_error"))
      });
    }).catch(() => {
      // Set loading error
      dispatch(updateLoadingStatus("data_error"))
    });
    // Execute whenever coordinates change
  }, [coordinates, dispatch])

  // The return of the main App function
  return (
    <Container>
      <p style={{marginTop:"5px", textAlign:"center"}}>Date and time follows <span style={{fontWeight: 'bold'}}>{Date().toString().match(/\(([^)]+)\)$/)[1]}</span></p>
      <h3 style={{textAlign:"center"}}><span style={{fontWeight: 'bold'}}>React Weather App</span></h3>
      <RadiosOptions></RadiosOptions>
      <SearchSection></SearchSection>   
      <WeatherDisplay></WeatherDisplay>
      <br/><br/>
    </Container>
  );
}