import {Spinner,Accordion} from "react-bootstrap";
import WeatherCard from "./weather_card";
import Forecast from "./forecast";

export default function WeatherDisplay(props){
  return(
    props.loadingStatus === "loading"?
      <div style={{textAlign:"center"}}>
        <br/>
        <Spinner animation="grow" />
        <p><span style={{fontWeight: 'bold'}}>Loading ....</span></p>
      </div>
    :
      <Accordion defaultActiveKey={['0']} alwaysOpen style={{marginTop:"5px"}}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Weather Now</Accordion.Header>
          <Accordion.Body>
            {
              props.loadingStatus === "data_loaded" && props.weatherData.current.id?
                <WeatherCard weatherData={props.weatherData} footer={true}></WeatherCard>
              :
                <p>Error, no data!<br/>Please try again.</p>
            }
          </Accordion.Body>
        </Accordion.Item>
        {
          props.loadingStatus === "data_loaded" && props.weatherData.current.id?
            <Forecast weatherData={props.weatherData} forecastData={props.weatherData.forecast}></Forecast>
          :
            null
        }
      </Accordion>
  )
}