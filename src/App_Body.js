function Body(props){
    return(
      <div>
      {
        props.loadingStatus === "loading"?
        <p>Loading ....</p>
        :
        props.loadingStatus === "data_loaded" && props.weatherData.id?
        <div style={{textAlign:'left'}}>
          <p style={{textTransform: 'capitalize'}}>
          <span style={{fontWeight: 'bold'}}>Coordinates</span>: Longitude: {props.weatherData.coord.lon}, Latitude: {props.weatherData.coord.lat}
          <br/>
          <span style={{fontWeight: 'bold'}}>Location Name</span>: {props.weatherData.name}
          <br/>
          <span style={{fontWeight: 'bold'}}>General</span>: {props.weatherData.weather[0].description}
          <br/>
          <span style={{fontWeight: 'bold'}}>Temperature</span>: {props.weatherData.main.temp} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Feels Like</span>: {props.weatherData.main.feels_like} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Minimum Temperature</span>: {props.weatherData.main.temp_min} ℉
          <br/>
          <span style={{fontWeight: 'bold'}}>Maximum Temperature</span>: {props.weatherData.main.temp_max} ℉
          <br/>
          {
            props.weatherData.weather[0].main === "Snow"?
              <span style={{fontWeight: 'bold'}}>Snow volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {props.weatherData.snow['1h']} mm</span><br/></span>
            :null
          }
          {
            props.weatherData.weather[0].main === "Rain"?
              <span style={{fontWeight: 'bold'}}>Rain volume for the last 1 hour<span style={{fontWeight: 'normal'}}>: {props.weatherData.rain['1h']} mm</span><br/></span>
              :null
          }
          <span style={{fontWeight: 'bold'}}>Humidity</span>: {props.weatherData.main.humidity} %
          <br/>
          <span style={{fontWeight: 'bold'}}>Atmospheric pressure</span>: {props.weatherData.main.pressure} hPa
          <br/>
          <span style={{fontWeight: 'bold'}}>Visibility</span>: {props.weatherData.visibility} Meter
          <br/>
          <span style={{fontWeight: 'bold'}}>Wind Speed</span>: {props.weatherData.wind.speed} Meter/Sec
          <br/>
          <span style={{fontWeight: 'bold'}}>Wind Direction</span>: {props.weatherData.wind.deg} Degrees
          <br/>
          <span style={{fontWeight: 'bold'}}>Cloudiness</span>: {props.weatherData.clouds.all} %
          <br/>
          <span style={{fontWeight: 'bold'}}>Sunrise</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.sys.sunrise*1000)}
          <br/>
          <span style={{fontWeight: 'bold'}}>Sunset</span>: {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.weatherData.sys.sunset*1000)}
          <br/>          
          </p>
        </div>
        :
        <p>Error, no data!<br/>Please try again.</p>
      }
      </div>
    )
  }
  export default Body;
