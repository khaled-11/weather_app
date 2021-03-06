import {Spinner,Accordion} from "react-bootstrap";
import WeatherCard from "./weather_card";
import Forecast from "./forecast";
import { useSelector } from 'react-redux';

// Function for the weather display section
export default function WeatherDisplay(props){
  const weatherData = useSelector(state => state.weatherData)
  const loadingStatus = useSelector(state => state.loadingStatus)  
  
  return(
    // Check if the data is ready or not
    loadingStatus === "loading"?
    // Loading effects if the data is loading
    <div style={{textAlign:"center"}}>
      <br/>
      <Spinner animation="grow" />
      <p><span style={{fontWeight: 'bold'}}>Loading ....</span></p>
    </div>
    :
    // If the data is not loading, display the accordion
    <Accordion defaultActiveKey={['0']} alwaysOpen style={{marginTop:"5px"}}>
      {/* Accordion item for the current weather */}
      <Accordion.Item key={"0"} eventKey="0">
        <Accordion.Header id={"accordion_0"}>Weather Now</Accordion.Header>
        <Accordion.Body>
          {
            // Check whether the data is loaded successfully or there is an error
            loadingStatus === "data_loaded"?
              // Display the current weather card if the data is loaded
              <WeatherCard weatherData={weatherData.current}></WeatherCard>
            :
              // Display error message if there is an error
              <p>Error, no data!<br/>Please try again.</p>
          }
        </Accordion.Body>
      </Accordion.Item>
      {
        // Display the forecast accordion items section if the data is loaded successfully
        loadingStatus === "data_loaded"?
          <Forecast forecastData={weatherData.forecast}></Forecast>
        :
          null
      }
    </Accordion>
  )
}