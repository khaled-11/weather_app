function Search(props){
    return(
      <div>
          {
            props.selectedRadioOption === "search_gps"?
            <div style = {{marginTop:'0.5%'}}>
            Longitude<br/><input ref = {props.lon} type="number" placeholder="Longitude Coordinates"></input>
            <br/>
            Latitude<br/><input ref = {props.lat} type="number" placeholder="Latitude Coordinates"></input>
            <br/></div>:
            null
          }
          {
            props.selectedRadioOption === "search_zipcode"?
            <div style = {{marginTop:'0.5%'}}>
            Zip Code<br/>
            <input type="number" ref={props.zipCode} placeholder="Zipcode"/>
            <br/></div>:
            null
          }
          {
          props.selectedRadioOption === "search_city_name"?
            <div style = {{marginTop:'0.5%'}}>
            City Name<br/>
            <input type="text" ref={props.cityName} placeholder="City Name"/>
            <br/></div>:
            null
          }
          {
            props.selectedRadioOption === "search_gps" || props.selectedRadioOption === "search_city_name" || props.selectedRadioOption === "search_zipcode"?
            <div>
              <button style = {{marginTop:'0.5%'}} onClick={props.handleSearchButtonClick}>Search</button>
            </div>:
            null
          } 
      </div>
    )
  }
  export default Search;