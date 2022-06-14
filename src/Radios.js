import Form from "react-bootstrap/Form";

// Function for the radio options
export default function RadiosOptions(props) {
  return(
    <div style = {{textAlign:"center"}}>
      <Form.Check
        inline
        // Checked or not based on a state variable
        checked={props.selectedRadioOption === "new_york"}
        // Call handleRadioChange on change
        onChange={props.handleRadioChange}
        label="New York"
        name="group1"
        type="radio"
        // The value of this option
        value={`new_york`}
        id={`new_york`}
      />
      <Form.Check
        inline
        checked={props.selectedRadioOption === "search_city_name"}
        onChange={props.handleRadioChange}
        label="By City Name"
        name="group1"
        type="radio"
        value={`search_city_name`}
        id={`search_city_name`}
      />
      <br/>
      <Form.Check
        inline
        checked={props.selectedRadioOption === "search_zipcode"}
        onChange={props.handleRadioChange}
        label="By US Zip Code"
        name="group1"
        type='radio'
        value={`search_zipcode`}
        id={`search_zipcode`}
      />
      <Form.Check
        inline
        checked={props.selectedRadioOption === "search_gps"}
        onChange={props.handleRadioChange}
        label="By GPS coordinates"
        name="group1"
        type='radio'
        value={`search_gps`}
        id={`search_gps`}
      />
    </div>
  )
}