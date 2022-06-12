import {Tab,Tabs,Accordion} from "react-bootstrap";
import './accordion_style.css';

function Forecast(props){
    return(
      <div>
                            <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                TAB 1
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>This is first tab body</Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                TAB 2
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <Card.Body>This is second tab body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    
        <Accordion defaultActiveKey={['0']} alwaysOpen >
          <Accordion.Item eventKey="0" >
            <Accordion.Header>Accordion Item #1

            </Accordion.Header>
            <Accordion.Toggle ref={props.accordion} eventKey="0">
              TAB 1
            </Accordion.Toggle>
            <Accordion.Body>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="home" title="Home">
                fdfdfds
              </Tab>
              <Tab eventKey="profile" title="Profile">
                gdfgfdg
              </Tab>
              <Tab eventKey="contact" title="Contact">
                hgfhgrt
              </Tab>
              <Tab eventKey="rer" title="rer">
                hgfhgrt
              </Tab>
            </Tabs>
            </Accordion.Body>
          </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Accordion Item #2</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

{
          props.loadingStatus === "data_loaded" && props.weatherData.current.cod?
            <div style={{textAlign:'left'}}>
              {JSON.stringify(props.weatherData.forecast)}
            </div>
          :
            null
        }
        </div>
    )
  }
  export default Forecast;
