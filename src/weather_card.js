import {Card,Col,Row} from "react-bootstrap";
export default function weatherCard(props){
    return(
        <Card className="text-center">
        <Card.Header>{props.weatherData.current.name} | {props.weatherData.current.main.temp} ℉</Card.Header>
        <Card.Body>
          <Card.Title style={{textTransform: 'capitalize', marginLeft:"10px"}}>{props.weatherData.current.weather[0].description}<img style={{minHeight:"50px",minWidth:"50px"}}alt="icon" src={`http://openweathermap.org/img/w/${props.weatherData.current.weather[0].icon}.png`}></img><br/></Card.Title>
          <Card.Body>
            <p style={{marginTop:"-35px"}}>H: {props.weatherData.current.main.temp_max} ℉ | L: {props.weatherData.current.main.temp_min} ℉<br/>Feels like: {props.weatherData.current.main.feels_like} ℉</p>
            <Row style={{textAlign:"left"}}>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Atmospheric pressure</span>: {props.weatherData.current.main.pressure} hPa
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Humidity</span>: {props.weatherData.current.main.humidity}%    
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Visibility</span>: {props.weatherData.current.visibility} Meter
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Wind Speed</span>: {props.weatherData.current.wind.speed} Meter/Sec
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Wind Direction</span>: {props.weatherData.current.wind.deg} Degrees
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Cloudiness</span>: {props.weatherData.current.clouds.all}%
              </Col>
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Sunrise</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.current.sys.sunrise*1000)}
              </Col>    
              <Col xs={15} sm={12} md={6} lg={4}>
              <span style={{fontWeight: 'bold'}}>Sunset</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.current.sys.sunset*1000)}
              </Col>
            </Row>  
          </Card.Body>
        </Card.Body>
        <Card.Footer className="text-muted">Longitude: {props.weatherData.current.coord.lon}, Latitude: {props.weatherData.current.coord.lat}</Card.Footer>
      </Card>
    )
}