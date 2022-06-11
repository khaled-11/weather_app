function Radios(props){
    return(
      <div>
        <label><input onChange={props.handleRadioChange} checked={props.selectedRadioOption === "new_york"} value = "new_york" type="radio" />New York</label>
        <label><input onChange={props.handleRadioChange} checked={props.selectedRadioOption === "search_city_name"} value = "search_city_name" type="radio" />By City Name</label>
        <br/>
        <label><input onChange={props.handleRadioChange} checked={props.selectedRadioOption === "search_zipcode"} value = "search_zipcode" type="radio" />By Zip Code</label>
        <label><input onChange={props.handleRadioChange} checked={props.selectedRadioOption === "search_gps"} value = "search_gps" type="radio" />By GPS coordinates</label>
      </div>
    )
    }
    export default Radios;