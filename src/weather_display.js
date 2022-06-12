import {Spinner,Accordion,Tabs,Tab,Card} from "react-bootstrap";

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
          <Card className="text-center">
  <Card.Header>{props.weatherData.current.name} | {props.weatherData.current.main.temp} ℉</Card.Header>
  <Card.Body>
    <Card.Title style={{textTransform: 'capitalize'}}>{props.weatherData.current.weather[0].description}<img src={`http://openweathermap.org/img/w/${props.weatherData.current.weather[0].icon}.png`}></img></Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
  </Card.Body>
  <Card.Footer className="text-muted">Longitude: {props.weatherData.current.coord.lon}, Latitude: {props.weatherData.current.coord.lat}</Card.Footer>
</Card>

            
                // <div style={{textAlign:'left'}}>
                //   <p style={{textTransform: 'capitalize'}}>

                //   <span style={{fontWeight: 'bold'}}>Feels Like</span>: {props.weatherData.current.main.feels_like} ℉
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Minimum Temperature</span>: {props.weatherData.current.main.temp_min} ℉
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Maximum Temperature</span>: {props.weatherData.current.main.temp_max} ℉
                //   <br/>
                //   {
                //     props.weatherData.current.weather[0].main === "Snow"?
                //       <span style={{fontWeight: 'bold'}}>Snow volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {props.weatherData.current.snow['1h']} mm</span><br/></span>
                //     :null
                //   }
                //   {
                //     props.weatherData.current.weather[0].main === "Rain"?
                //       <span style={{fontWeight: 'bold'}}>Rain volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {props.weatherData.current.rain['1h']} mm</span><br/></span>
                //       :null
                //   }
                //   <span style={{fontWeight: 'bold'}}>Humidity</span>: {props.weatherData.current.main.humidity} %
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Atmospheric pressure</span>: {props.weatherData.current.main.pressure} hPa
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Visibility</span>: {props.weatherData.current.visibility} Meter
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Wind Speed</span>: {props.weatherData.current.wind.speed} Meter/Sec
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Wind Direction</span>: {props.weatherData.current.wind.deg} Degrees
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Cloudiness</span>: {props.weatherData.current.clouds.all} %
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Sunrise</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.current.sys.sunrise*1000)}
                //   <br/>
                //   <span style={{fontWeight: 'bold'}}>Sunset</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.current.sys.sunset*1000)}
                //   <br/>          
                //   </p>
                // </div>
              :
                <p>Error, no data!<br/>Please try again.</p>
            }
          </Accordion.Body>

    </Accordion.Item>
<Accordion.Item eventKey="1">
<Accordion.Header>Forecast</Accordion.Header>
<Accordion.Body>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          fdfdfds
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