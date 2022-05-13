import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface WeatherData {
    forecasts: Array<Forecast>,
    loading: boolean
}

interface Forecast {
    Date: string,
    TemperatureC: string,
    TemperatureF: string,
    Summary: string
}

export const FetchData = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({ forecasts: [], loading: true })

    const populateWeatherData = async () => {
        console.log("get weather...")
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URI}/WeatherForecast`);
        const data = await response.json();
        setWeatherData({ forecasts: data, loading: false });
    }

    useEffect(() => {
        (async () => {
            populateWeatherData()
        })()
    }, []);

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {!weatherData.loading && (weatherData.forecasts.map((forecast: Forecast) =>
                        <tr key={forecast.Date}>
                            <td>{forecast.Date}</td>
                            <td>{forecast.TemperatureC}</td>
                            <td>{forecast.TemperatureF}</td>
                            <td>{forecast.Summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {weatherData.loading && (
                <Spinner animation="border" />
            )}
        </div>
    );

}
