import Form from "react-bootstrap/Form";
export default function RadiosOptions(props) {
  return(
    <div style = {{textAlign:"center", marginTop:"10px"}}>
      <Form.Check
        inline
        checked={props.selectedRadioOption === "new_york"}
        onChange={props.handleRadioChange}
        label="New York"
        name="group1"
        type="radio"
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