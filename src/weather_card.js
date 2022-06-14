import {Card,Col,Row} from "react-bootstrap";

// Function to display the weather and forecast data
export default function weatherCard(props){
  return(
    // Bootstrap card for the display
    <Card className="text-center">
      {/* Display the location name in the card header for current weather card only */}
      {
        props.weatherData.name?
          <Card.Header>{props.weatherData.name} | {props.weatherData.main.temp} ℉</Card.Header>
        :
          <Card.Header>{props.weatherData.main.temp} ℉</Card.Header>
      }
      <Card.Body>
        {/* General weather description and icon */}
        <Card.Title style={{textTransform: 'capitalize', marginLeft:"10px"}}>{props.weatherData.weather[0].description}<img style={{minHeight:"50px",minWidth:"50px"}}alt="icon" src={`http://openweathermap.org/img/w/${props.weatherData.weather[0].icon}.png`}></img><br/></Card.Title>
        {/* Weather data */}
        <p style={{marginTop:"-20px"}}>H: {props.weatherData.main.temp_max} ℉ | L: {props.weatherData.main.temp_min} ℉<br/>Feels like: {props.weatherData.main.feels_like} ℉</p>
        <Row style={{textAlign:"left"}}>
          <Col xs={15} sm={12} md={6} lg={4}>
          <span style={{fontWeight: 'bold'}}>Atmospheric pressure</span>: {props.weatherData.main.pressure} hPa
          </Col>
          <Col xs={15} sm={12} md={6} lg={4}>
          <span style={{fontWeight: 'bold'}}>Humidity</span>: {props.weatherData.main.humidity}%    
          </Col>
          <Col xs={15} sm={12} md={6} lg={4}>
          <span style={{fontWeight: 'bold'}}>Visibility</span>: {props.weatherData.visibility} Meter
          </Col>
          <Col xs={15} sm={12} md={6} lg={4}>
          <span style={{fontWeight: 'bold'}}>Wind Speed</span>: {props.weatherData.wind.speed} Meter/Sec
          </Col>
          <Col xs={15} sm={12} md={6} lg={4}>
          <span style={{fontWeight: 'bold'}}>Wind Direction</span>: {props.weatherData.wind.deg} Degrees
          </Col>
          <Col xs={15} sm={12} md={6} lg={4}>
            <span style={{fontWeight: 'bold'}}>Cloudiness</span>: {props.weatherData.clouds.all}%
          </Col>
          {/* Sunrise and Sunset if available */}
          {
            props.weatherData.sys.sunrise?
              <Col xs={15} sm={12} md={6} lg={4}>
                {/* Time converted to current browser's time zone */}
                <span style={{fontWeight: 'bold'}}>Sunrise</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.sys.sunrise*1000)}
              </Col>    
            :
              null
          }
          {
            props.weatherData.sys.sunset?
              <Col xs={15} sm={12} md={6} lg={4}>
                {/* Time converted to current browser's time zone */}
                <span style={{fontWeight: 'bold'}}>Sunset</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.sys.sunset*1000)}
              </Col>    
            :
              null
          }
          {/* Snow and Rain if available */}
          {
            props.weatherData.weather[0].main === "Snow"?
              <Col>
                <span style={{fontWeight: 'bold'}}>Snow volume for the last {props.weatherData.snow['1h']?<span>1 hour</span>:<span>3 hours</span>}<span style={{fontWeight: 'normal'}}>: {props.weatherData.snow['1h']?props.weatherData.snow['1h']:props.weatherData.snow['3h']} mm</span><br/></span>
              </Col>
            :
              null
          }
          {
            props.weatherData.weather[0].main === "Rain"?
              <Col>
                <span style={{fontWeight: 'bold'}}>Rain volume for the last {props.weatherData.rain['1h']?<span>1 hour</span>:<span>3 hours</span>}<span style={{fontWeight: 'normal'}}>: {props.weatherData.rain['1h']?props.weatherData.rain['1h']:props.weatherData.rain['3h']} mm</span><br/></span>
              </Col>
            :
              null
          }
        </Row>  
      </Card.Body>
      {/* Display the footer only in the current weather card */}
      {
        props.weatherData.name?
          <Card.Footer className="text-muted">Longitude: {props.weatherData.coord.lon}, Latitude: {props.weatherData.coord.lat}</Card.Footer>
        :
          null
      }
    </Card>
  )
}