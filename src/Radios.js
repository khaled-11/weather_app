import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from 'react-redux';
import {updateRadioOption, updateCoordinates, updateLoadingStatus, updateLastSearchData} from "./actions/actions";

// Function for the radio options
export default function RadiosOptions() {
  // Redux store variables
  const selectedRadioOption = useSelector(state => state.selectedRadioOption)
  const coordinates = useSelector(state => state.coordinates)
  const loadingStatus = useSelector(state => state.loadingStatus)
  const dispatch = useDispatch()
   // Function to handle radio options change
   const handleRadioChange = (e) => {
    // Replace the selectedRadioOption with the selected value
    // setSelectedRadioOption(e.target.value)
    dispatch(updateRadioOption(e.target.value))
    // If the selected option is New York
    if (e.target.value === "new_york"){
      // setLoadingStatus("loading")
      dispatch(updateLoadingStatus("loading"))
      // If the last displayed data was error or a different location
      if (loadingStatus==="data_error" || (coordinates[0]!=="-74.006" && coordinates[1]!=="40.7127")){
        // Update the coordinates
        dispatch(updateCoordinates(["-74.006","40.7127"]))
        // setCoordinates(["-74.006","40.7127"])
        dispatch(updateLastSearchData({cityName:"new york", zipCode:""}))
        // setLastSearchData({cityName:"new york", zipCode:""})
      // If the last displayed data was New York
      } else {
        // Set loading status to reload the weather section
        setTimeout(()=>{
          // setLoadingStatus("data_loaded")
          dispatch(updateLoadingStatus("data_loaded"))
        })
      }
    }
  }

  // The return of the function
  return(
    <div style = {{textAlign:"center"}}>
      <Form.Check
        inline
        // Checked or not based on a state variable
        checked={selectedRadioOption === "new_york"}
        // Call handleRadioChange on change
        onChange={handleRadioChange}
        label="New York"
        name="group1"
        type="radio"
        // The value of this option
        value={`new_york`}
        id={`new_york`}
      />
      <Form.Check
        inline
        checked={selectedRadioOption === "search_city_name"}
        onChange={handleRadioChange}
        label="By City Name"
        name="group1"
        type="radio"
        value={`search_city_name`}
        id={`search_city_name`}
      />
      <br/>
      <Form.Check
        inline
        checked={selectedRadioOption === "search_zipcode"}
        onChange={handleRadioChange}
        label="By US Zip Code"
        name="group1"
        type='radio'
        value={`search_zipcode`}
        id={`search_zipcode`}
      />
      <Form.Check
        inline
        checked={selectedRadioOption === "search_gps"}
        onChange={handleRadioChange}
        label="By GPS coordinates"
        name="group1"
        type='radio'
        value={`search_gps`}
        id={`search_gps`}
      />
    </div>
  )
}