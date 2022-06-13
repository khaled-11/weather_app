import {Accordion,Tabs,Tab} from "react-bootstrap";
import WeatherCard from "./weather_card";

export default function Forecast(props){
    var forecastDataMap = new Map();
    var forecastTabs = [];
    for (let i = 0 ; i < props.forecastData.list.length; i++){
      let day = props.forecastData.list[i].dt_txt.split(" ")[0]
      console.log(day)
      if (forecastDataMap.get(day)){
          forecastDataMap.set(day,[...forecastDataMap.get(day), props.forecastData.list[i]])
        } else {
          forecastDataMap.set(day,[props.forecastData.list[i]])
        }
    }
    forecastDataMap.forEach((data,dataKey)=>{
      forecastTabs.push(
        <Accordion.Item key={dataKey} eventKey={forecastTabs.length}>
          <Accordion.Header>Forecast ({data[0].dt_txt.split(" ")[0]})</Accordion.Header>
          <Accordion.Body>
            <Tabs defaultActiveKey={data[0].dt} className="mb-3">
              {
                data.map((item)=>{
                  return <Tab key={item.dt} eventKey={item.dt} title={item.dt_txt.split(" ")[1]}>
                    <WeatherCard weatherData={{current:item}}></WeatherCard>
                  </Tab>
                })
              } 
            </Tabs>
          </Accordion.Body>
        </Accordion.Item>
      )
    })
    return forecastTabs
}