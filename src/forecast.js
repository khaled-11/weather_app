import {Accordion,Tabs,Tab} from "react-bootstrap";
import WeatherCard from "./weather_card";

export default function Forecast(props){
    var forecastDataMap = new Map();
    var forecastTabs = [];
    for (let i = 0 ; i < props.forecastData.list.length; i++){
      console.log(props.forecastData.list[i].dt_txt)
      console.log(new Date(props.forecastData.list[i].dt*1000))
      console.log(`${new Intl.DateTimeFormat('en-US', { days:'2-digit' ,hour: '2-digit', minute: '2-digit' }).format(props.forecastData.list[i].dt*1000)}_${new Date(props.forecastData.list[i].dt*1000)}`)
      let day = new Intl.DateTimeFormat('en-US').format(props.forecastData.list[i].dt*1000)
      if (forecastDataMap.get(day)){
          forecastDataMap.set(day,[...forecastDataMap.get(day), props.forecastData.list[i]])
        } else {
          forecastDataMap.set(day,[props.forecastData.list[i]])
        }
    }
    forecastDataMap.forEach((data,dataKey)=>{
      forecastTabs.push(
        <Accordion.Item key={dataKey} eventKey={forecastTabs.length}>
          <Accordion.Header>Forecast ({new Intl.DateTimeFormat('en-US').format(new Date(data[0].dt_txt.split(" ")[0]))})</Accordion.Header>
          <Accordion.Body>
            <Tabs defaultActiveKey={data[0].dt} className="mb-3">
              {
                data.map((item)=>{
                  return <Tab key={item.dt} eventKey={item.dt} title={new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'}).format(item.dt*1000)}>
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