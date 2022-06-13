import {Accordion,Tabs,Tab} from "react-bootstrap";
import WeatherCard from "./weather_card";

export default function Forecast(props){
    var forecastDataMap = new Map();
    var forecastTabs = [];
    for (let i = 0 ; i < props.forecastData.list.length; i++){
        if (forecastDataMap.get(props.forecastData.list[i].dt_txt.split(" ")[0])){
          forecastDataMap.set(props.forecastData.list[i].dt_txt.split(" ")[0],[...forecastDataMap.get(props.forecastData.list[i].dt_txt.split(" ")[0]), props.forecastData.list[i]])
        } else {
          forecastDataMap.set(props.forecastData.list[i].dt_txt.split(" ")[0],[props.forecastData.list[i]])
        }
    }
    forecastDataMap.forEach((data,dataKey)=>{
      console.log(data)
      forecastTabs.push(
        <Accordion.Item key={dataKey} eventKey={forecastTabs.length}>
          <Accordion.Header>Forecast ({data[0].dt_txt.split(" ")[0]})</Accordion.Header>
          <Accordion.Body>
            <Tabs defaultActiveKey={data[0].dt} className="mb-3">
              {
                data.map((item)=>{
                  return <Tab key={item.dt} eventKey={item.dt} title={item.dt_txt.split(" ")[1]}>
                    <WeatherCard weatherData={props.weatherData} footer={true}></WeatherCard>
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