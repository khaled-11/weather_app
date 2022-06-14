import {Button,Form,Col,Row} from "react-bootstrap";

// Function for the search section
export default function SearchSection(props){
  return(
    <Row className="justify-content-center" style={{textAlign:"center"}}>
      <Col sm={6}>
        {
          // Display the GPS search section when selected
          props.selectedRadioOption === "search_gps"?
          <Row xs={1} sm={2} md={2} lg={2}>
            <Col>
              <Form.Label htmlFor="longitude"><span style={{fontWeight: 'bold'}}>Longitude</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                // Use ref for inputs
                ref={props.lon}
                id="longitude"
                placeholder="Longitude Coordinates"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="longitude"><span style={{fontWeight: 'bold'}}>Latitude</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                ref={props.lat}
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
          props.selectedRadioOption === "search_zipcode"?
            <div>
              <Form.Label htmlFor="zipcode"><span style={{fontWeight: 'bold'}}>Zip Code</span></Form.Label>
              <Form.Control
                size="sm"
                type="number"
                ref={props.zipCode}
                id="zipcode"
                placeholder="Zipcode"
              />
            </div>
          :
            null
        }
        {
          // Display the city name search section when selected
          props.selectedRadioOption === "search_city_name"?
            <div>
              <Form.Label htmlFor="city_name"><span style={{fontWeight: 'bold'}}>City Name</span></Form.Label>
              <Form.Control
                size="sm"
                type="text"
                ref={props.cityName}
                id="city_name"
                placeholder="City Name"
              />
            </div>
          :
            null
        }
        {
          // Display one button for all search methods if any is selected
          props.selectedRadioOption === "search_gps" || props.selectedRadioOption === "search_city_name" || props.selectedRadioOption === "search_zipcode"?
          <div style={{marginBottom:"3px", marginTop:"8px"}} className="d-grid">
            {/* Call the all-in-one search function on button click event */}
            <Button onClick={props.handleSearchButtonClick} variant="primary" size="sm">Search</Button>
          </div>
          :
          null
        } 
      </Col>
    </Row>
  )
}