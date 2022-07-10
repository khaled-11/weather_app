import React from 'react';
import axios from 'axios';
import {Button,Form,Col,Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {updateCoordinates, updateLoadingStatus, updateLastSearchData} from "./actions/actions";

// Function for the search section
export default function SearchSection(){
  const dispatch = useDispatch()
  const loadingStatus = useSelector(state => state.loadingStatus)
  const lastSearchData = useSelector(state => state.lastSearchData)
  const coordinates = useSelector(state => state.coordinates)
  const selectedRadioOption = useSelector(state => state.selectedRadioOption)
  // Reference hooks for inputs
  const lon = React.useRef();
  const lat = React.useRef();
  const zipCode = React.useRef();
  const cityName = React.useRef();

   // Function to call the geocoding API
   const callGeoCodingAPI = (type) =>{
    console.log("Geolocation API Call")
    var url;
    // Check the search type and select the URL
    if (type === "zipcode"){
      url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.current.value},us&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    } else {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.current.value}&limit=1&appid=1604d72c4008fa37d3a0ed877efbc0c4&mode=JSON&units=imperial`
    }
    // Call the API with the selected URL
    axios.get(url).then((response) => {
      // Check for the response format and set the coordinates
      if (response.data.lon && response.data.lat){
        dispatch(updateCoordinates([response.data.lon.toString(),response.data.lat.toString()]))
        // setCoordinates([response.data.lon.toString(),response.data.lat.toString()])
      } else if (response.data[0] && response.data[0].lon && response.data[0].lat){
        // setCoordinates([parseFloat(response.data[0].lon.toFixed(4)).toString(),parseFloat(response.data[0].lat.toFixed(4)).toString()])
        dispatch(updateCoordinates([parseFloat(response.data[0].lon.toFixed(4)).toString(),parseFloat(response.data[0].lat.toFixed(4)).toString()]))
      } else {
        // Set error if the response is not recognized
        // setLoadingStatus("data_error")
        dispatch(updateLoadingStatus("data_error"))
      }
    }).catch(() => {
      // Set error
      // setLoadingStatus("data_error")
      dispatch(updateLoadingStatus("data_error"))
    });
  }

  // Function to handle the search button click
  const handleSearchButtonClick = () =>{
    // Check if the status is loading or not to avoid double clicks
    if (loadingStatus!=="loading"){
      // Set status to loading
      // setLoadingStatus('loading')
      dispatch(updateLoadingStatus("loading"))
      // If search by city name
      if (selectedRadioOption === "search_city_name"){
        // If the search value is empty
        if (cityName.current.value === ""){
          // Set loading error
          setTimeout(()=>{
            dispatch(updateLoadingStatus("data_error"))
            // setLoadingStatus('data_error')
          })
        // If the input is not empty
        } else {
          // If the last data was not New York
          if(lastSearchData.cityName!==cityName.current.value.toLowerCase()){
            // Update the last search data
            dispatch(updateLastSearchData({cityName:cityName.current.value.toLowerCase(), zipCode:""}))
            // setLastSearchData({cityName:cityName.current.value.toLowerCase(), zipCode:""})
            callGeoCodingAPI('city_name')
          // If the last data was new york
          } else {
            // Check if the previous search was error or not
            if (loadingStatus==="data_error"){
              // Set loading error
              setTimeout(()=>{
                // setLoadingStatus('data_error')
                dispatch(updateLoadingStatus("data_error"))
              })
            } else {
              // Set data loaded
              setTimeout(()=>{
                dispatch(updateLoadingStatus("data_loaded"))
                // setLoadingStatus("data_loaded")
              })
            }
          }
        }
      // If search by zip code
      } else if (selectedRadioOption==="search_zipcode"){
        // If the search value is empty
        if (zipCode.current.value === ""){
          // Set loading error
          setTimeout(()=>{
            // setLoadingStatus('data_error')
            dispatch(updateLoadingStatus("data_error"))
          })
        // If the input is not empty
        } else {
          // If the last search value is not the same
          if(lastSearchData.zipCode!==zipCode.current.value.toString()){
            // Update the last search data
            dispatch(updateLastSearchData({cityName:"", zipCode:zipCode.current.value.toString()}))
            // setLastSearchData({cityName:"", zipCode:zipCode.current.value.toString()})
            callGeoCodingAPI('zipcode')
          // If the last search value is the same
          } else {
            // Check if the previous search was error or not
            if (loadingStatus==="data_error"){
              // Set loading error
              setTimeout(()=>{
                // setLoadingStatus('data_error')
                dispatch(updateLoadingStatus("data_error"))
              })
            } else {
              // Set data loaded
              setTimeout(()=>{
                dispatch(updateLoadingStatus("data_loaded"))
                // setLoadingStatus("data_loaded")
              })
            }
          }
        }
      // If search by GPS coordinates
      } else {
        // If the search values are empty
        if (lat.current.value === "" || lon.current.value === ""){
          // Set loading error
          setTimeout(function(){
            // setLoadingStatus('data_error')
            dispatch(updateLoadingStatus("data_error"))
          })
        // If not empty
        } else {
          // If the input is the same as the last data
          if (coordinates[0]===lon.current.value && coordinates[1]===lat.current.value){
            setTimeout(()=>{
              // setLoadingStatus("data_loaded")
              dispatch(updateLoadingStatus("data_loaded"))
            })
          // Set the coordinates if new values
          } else {
            dispatch(updateCoordinates([lon.current.value, lat.current.value]))
            // setCoordinates([lon.current.value, lat.current.value])
            // setLastSearchData({cityName:"", zipCode:""})
            dispatch(updateLastSearchData({cityName:"", zipCode:""}))
          }
        }
      }
    }
  }

  return(
    <Row className="justify-content-center" style={{textAlign:"center"}}>
      <Col sm={6}>
        {
          // Display the GPS search section when selected
          selectedRadioOption === "search_gps"?
          <Row xs={1} sm={2} md={2} lg={2}>
            <Col>
              <Form.Label htmlFor="longitude"><span style={{fontWeight: 'bold'}}>Longitude</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                // Use ref for inputs
                ref={lon}
                id="longitude"
                placeholder="Longitude Coordinates"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="longitude"><span style={{fontWeight: 'bold'}}>Latitude</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                ref={lat}
                id="latitude"
                placeholder="Latitude Coordinates"
              />
            </Col>
          </Row>
          :
          null
        }
        {
          // Display the zipcode search section when selected
          selectedRadioOption === "search_zipcode"?
            <div>
              <Form.Label htmlFor="zipcode"><span style={{fontWeight: 'bold'}}>Zip Code</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                ref={zipCode}
                id="zipcode"
                placeholder="Zipcode"
              />
            </div>
          :
            null
        }
        {
          // Display the city name search section when selected
          selectedRadioOption === "search_city_name"?
            <div>
              <Form.Label htmlFor="city_name"><span style={{fontWeight: 'bold'}}>City Name</span></Form.Label>
              <Form.Control
                size="sm"
                type="text"
                ref={cityName}
                id="city_name"
                placeholder="City Name"
              />
            </div>
          :
            null
        }
        {
          // Display one button for all search methods if any is selected
          selectedRadioOption === "search_gps" || selectedRadioOption === "search_city_name" || selectedRadioOption === "search_zipcode"?
          <div style={{marginBottom:"3px", marginTop:"8px"}} className="d-grid">
            {/* Call the all-in-one search function on button click event */}
            <Button id={"search_btn"} onClick={handleSearchButtonClick} variant="primary" size="sm">Search</Button>
          </div>
          :
          null
        } 
      </Col>
    </Row>
  )
}