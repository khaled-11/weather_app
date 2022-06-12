import {Spinner,Accordion,Tabs,Tab} from "react-bootstrap";
import WeatherCard from "./weather_card";

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
          <Accordion.Header>Current</Accordion.Header>
          <Accordion.Body>
            {
              props.loadingStatus === "data_loaded" && props.weatherData.current.id?
              <WeatherCard weatherData={props.weatherData}></WeatherCard>
              :
                <p>Error, no data!<br/>Please try again.</p>
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Forecast</Accordion.Header>
          <Accordion.Body>
            <Tabs defaultActiveKey="home" className="mb-3">
              <Tab eventKey="home" title="Home">
                {JSON.stringify(props.weatherData.forecast.list)}
              </Tab>
              <Tab eventKey="profile" title="Profile">
                gdfgfdg
              </Tab>
              <Tab eventKey="contact" title="Contact">
                hgfhgrt
              </Tab>
              <Tab eventKey="rer" title="rer">
                hgfhgrt
              </Tab>
            </Tabs>
              </Accordion.Body>
        </Accordion.Item>
      </Accordion>
  )
}