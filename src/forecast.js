import {Accordion,Tabs,Tab} from "react-bootstrap";
import WeatherCard from "./weather_card";

// Function to sort and handle the forecast data
export default function Forecast(props){
  // Hashmap to divide and group forecast by date
  var forecastDataMap = new Map();
  // Array to save the forecast acoordion items
  var forecastTabs = [];
  // Process all items in the forecast data array in a loop
  for (let i = 0 ; i < props.forecastData.list.length; i++){
    // Date converted to current browser's time zone
    let day = Intl.DateTimeFormat('en-US',{ day: '2-digit' ,month: 'short' }).format(props.forecastData.list[i].dt*1000)
    // Sort and add items to the map
    if (forecastDataMap.get(day)){
      forecastDataMap.set(day,[...forecastDataMap.get(day), props.forecastData.list[i]])
    } else {
      forecastDataMap.set(day,[props.forecastData.list[i]])
    }
    // Save the new formatted time and date
    props.forecastData.list[i].browser_date = day
    // Time converted to current browser's time zone
    props.forecastData.list[i].browser_time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(props.forecastData.list[i].dt*1000)
  }

  // Iterate over the map and create accordion item for each date
  forecastDataMap.forEach((forecastDay)=>{
    // Append all accordion items to the return array
    forecastTabs.push(
      <Accordion.Item key={forecastTabs.length+1} eventKey={forecastTabs.length+1}>
        <Accordion.Header id={`accordion_${forecastTabs.length+1}`}>Forecast ({forecastDay[0].browser_date})</Accordion.Header>
        <Accordion.Body>
          {/* Tabs for hourly forecast */}
            <Tabs defaultActiveKey={forecastDay[0].browser_time} className="mb-3">
            {
              // Iterate over the hourly forecast array for each date
              forecastDay.map((item)=>{
                // For each hour forecast create new tab in the accordion item
                return <Tab key={item.dt} eventKey={item.browser_time} title={item.browser_time}>
                  {/* Display the weather data for this hourly forecast in the tab */}
                  <WeatherCard weatherData={item}></WeatherCard>
                </Tab>
              })
            } 
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
    )
  })
  // Return forecastTabs array
  return forecastTabs
}