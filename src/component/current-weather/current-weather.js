import "./current-weather.css";

const CurrentWeather = ({ data ,Unit }) => {
    let curunit;
    if(Unit==='C')
        curunit=1;
    else
        curunit=0;
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <div className="country-city">
                        <p className="city">{data.location.name}</p>
                        <p className="country">{data.location.country}</p>
                    </div>
                    <p className="weather-description">{data.current.condition.text}</p>
                </div>
                <img alt="weather" className="weather-icon" src={`${data.current.condition.icon}`} />
            </div>
            <div className="bottom">
                <p className="temperature">{(curunit)?Math.round(data.current.temp_c)+"°C":Math.round(data.current.temp_f)+"°F"}</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-lebel">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-lebel">Feels Like</span>
                        <span className="parameter-value">{curunit?Math.round(data.current.feels_like_c)+"°C":Math.round(data.current.feels_like_f)+"°F"}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-lebel">Wind</span>
                        <span className="parameter-value">{data.current.wind_mph} mph</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-lebel">Humidity</span>
                        <span className="parameter-value">{data.current.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-lebel">Pressure</span>
                        <span className="parameter-value">{data.current.pressure} mb</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;