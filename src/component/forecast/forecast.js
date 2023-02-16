import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import './forecast.css';


const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ForeCast = ({ data,Unit }) => {
    let curunit;
    if(Unit==='C')
        curunit=1;
    else
        curunit=0;
    const dayInWeek = new Date().getDay();
    console.log(dayInWeek)
    let forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, WEEK_DAYS.length)
    );
    forecastDays=forecastDays.concat(WEEK_DAYS.slice(0, WEEK_DAYS.length))
    return (<>
            <label className="title">Daily</label>
            <Accordion>
                {data.forecast.forecastday.map((item, indx) => (
                    <AccordionItem key={indx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="dialy-item">
                                    <img alt="weather" className="icon-small" src={`${item.day.condition.icon}`} />
                                    <label className="days">{forecastDays[indx]},({item.date})</label>
                                    <label className="description">{item.day.condition.text}</label>
                                    <label className="min-max">{(curunit)?Math.round(item.day.maxtemp_c)+"°C":Math.round(item.day.maxtemp_f)+"°F"} | {(curunit)?Math.round(item.day.mintemp_c)+"°C":Math.round(item.day.mintemp_f)+"°F"}</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Visibility:</label>
                                    <label>{item.day.avgvis_km} km</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.day.avghumidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Rain:</label>
                                    <label>{item.day.daily_chance_of_rain}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.day.maxwind_kph} kph</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>precipitation</label>
                                    <label>{item.day.totalprecip_mm} mm</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels Like:</label>
                                    <label>{(curunit)?Math.round(item.day.avgtemp_c)+"°C":Math.round(item.day.avgtemp_f)+"°F"}</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

export default ForeCast;