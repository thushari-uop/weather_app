import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function Dashboard() {

    const today = new Date();
    const dates = [];

    const REACT_APP_API_KEY = "577ce7992e14740a1c2cbdfe52858eaf";

    var dateVariable = Date().toLocaleString();

    const [current, setCurrent] = useState({});

    const [show, setShow] = useState(false);

    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    const [dataList, setDataList] = useState([]);

    const slicedArray = dataList.slice(0, -4);
    const moreDetailArray = dataList.slice(3);

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        dates.push(nextDay);
    }

    useEffect(() => {

        // load current weather
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=6.927079&lon=79.861244&appid=" + REACT_APP_API_KEY + "&units=metric")
            .then(res => {
                setCurrent(
                    {
                        ...current,
                        icons: res.data.weather[0].icon,
                        type: res.data.weather[0].main,
                        desc: res.data.weather[0].description,

                        celcius: res.data.main.temp,
                        min: res.data.main.temp_min,
                        max: res.data.main.temp_max,
                        pressure: res.data.main.pressure,
                        humidity: res.data.main.humidity,

                        name: res.data.name,
                        visibility: res.data.visibility,
                        cloud: res.data.clouds.all,

                        speed: res.data.wind.speed,
                        deg: res.data.wind.deg,
                        // rain: res.data.rain[0]
                    }
                );
                console.log(res.data);
            })
            .catch(err => console.log(err));


        // load data for next 7 days 
        axios.get("https://api.openweathermap.org/data/2.5/forecast/daily?lat=6.927079&lon=79.861244&cnt=7&appid=" + REACT_APP_API_KEY + "&units=metric")
            .then(res => {
                setDataList(res.data.list);
                console.log(res.data.list);
            })
            .catch(err => console.log(err));

    }, [])

    // load first 3 days forcasting details
    const dailyForcast = slicedArray.map((item, index) => {
        return (
            <div className='d-inline-flex mb-5 '>
                <Card className='mx-auto ms-5 me-5 px-4 pt-4' >
                    <div key={index}>
                        <p className='font-monospace'>{dates[index].toLocaleDateString()}</p>
                        <h2>{Math.round(item.temp.day)} °C</h2>
                        <p className='small'>{item.temp.min} °C - {item.temp.min} °C</p>
                        <h6 className='mt-4 fw-bold small'>Humidity : {item.humidity} %</h6>
                        <h6 className='mt-3 fw-bold small'>Pressure : {item.pressure} hPa</h6>
                        <h6 className='mt-3 fw-bold small '>Rain : {item.rain} mm </h6>
                        <h6 className='mt-3 fw-bold small'>Wind :  {item.speed} mps, {item.deg} deg</h6>
                        <h6 className='mt-3 mb-4 fw-bold small'>Clouds : {item.clouds} %</h6>
                    </div>
                </Card>
            </div>
        );
    });


    // load More forcasting details
    const loadDataMore = () => moreDetailArray.map((item, index) => {
        return (
            <div className='d-inline-flex mb-5 mt-4'>
                <Alert show={show} className='mx-auto ms-4 me-4 px-3 bg-light border-dark-subtle'>

                    <div key={index}>
                        <p className='mt-4 font-monospace'>{dates[index + 3].toLocaleDateString()}</p>
                        <h2>{Math.round(item.temp.day)} °C</h2>
                        <p className='small'>{item.temp.min} °C - {item.temp.min} °C</p>
                        <h6 className='mt-4 fw-bold small'>Humidity : {item.humidity} %</h6 >
                        <h6 className='mt-3 fw-bold small'>Atm. pressure : {item.pressure} hPa</h6 >
                        <h6 className='mt-3 fw-bold small'>Rain : {item.rain} mm</h6 >
                        <h6 className='mt-3 fw-bold small'>Wind :  {item.speed} mps, {item.deg} deg</h6 >
                        <h6 className='mt-3 fw-bold small'>Clouds : {item.clouds} %</h6 >
                    </div>

                </Alert>
            </div>

        );
    });

    // search details
    const search = () => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + REACT_APP_API_KEY + "&units=metric")
            .then(res => {
                setCurrent(
                    {
                        ...current,
                        icons: res.data.weather[0].icon,
                        type: res.data.weather[0].main,
                        desc: res.data.weather[0].description,

                        celcius: res.data.main.temp,
                        min: res.data.main.temp_min,
                        max: res.data.main.temp_max,
                        pressure: res.data.main.pressure,
                        humidity: res.data.main.humidity,

                        name: res.data.name,
                        visibility: res.data.visibility,
                        cloud: res.data.clouds.all,

                        speed: res.data.wind.speed,
                        deg: res.data.wind.deg,
                        // rain: res.data.rain[0]
                    }
                );
                console.log(res.data);
            })
            .catch(err => console.log(err));

        axios.get("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + long + "&cnt=7&appid=" + REACT_APP_API_KEY + "&units=metric")
            .then(res => {
                setDataList(res.data.list);
                console.log(res.data.list);
            })
            .catch(err => console.log(err));
    }

    return (
        // heading
        <div className='py-4 '
            style={{
                backgroundImage: "url(Images/white-cloud-blue-sky.jpg)",
                backgroundSize: "cover",
                backgroundpositionx: "inherit",
            }}>
            <div className='w-auto mx-5 mt-5 pt-2 mb-3 rounded-4 shadow' style={{ background: "#f8f4eebf" }}>
                <div>
                    <h2 className='mt-5 fw-bold font-monospace '>Weather Forcast</h2>
                    <p className='font-monospace'>{dateVariable}</p>
                </div>

                <div className='mx-5 mx-auto col-5 '>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Longitude"
                            className="me-2"
                            aria-label="Search"
                            value={long}
                            onChange={(event) => setLong(event.target.value)}
                        />
                        <Form.Control
                            type="search"
                            placeholder="Latitude"
                            className="me-2"
                            aria-label="Search"
                            value={lat}
                            onChange={(event) => setLat(event.target.value)}
                        />
                        <Button variant="outline-dark" onClick={search}>Search</Button>
                    </Form>
                </div>

                <hr className='col-11 mx-auto border-2' />

                {/* current details desplay */}
                <div className='row mb-4 mx-5' style={{ background: "#4755e629" }}>
                    <div className='col-3 mt-4'>
                        <h2 className='mb-4 font-monospace fw-bold'>{current.name}</h2>
                        <img src={`http://openweathermap.org/img/w/${current.icons}.png`} alt="weather-icon" style={{ width: "100px" }} />
                        <p className='text-center fst-italic ms-2'>{current.desc}</p>
                    </div>
                    <div className='col-9 mt-4 container text-center mt-2' >
                        <h2 className='font-monospace fw-bolder'>{Math.round(current.celcius)} °C</h2>
                        <p className='font-monospace'>{current.min} °C - {current.max} °C</p>

                        <ul className='row mt-5 mx-3 fw-bold font-monospace' style={{ listStyleType: "none" }}>
                            <li className='col '>Humidity  : {current.humidity} %</li>
                            <li className='col'>Pressure  : {current.pressure} hPa</li>
                            <li className='col'>Visibility  : {current.visibility} m</li>
                        </ul>

                        <ul className='row mt-3 mx-3 fw-bold font-monospace' style={{ listStyleType: "none" }}>
                            <li className='col'>Wind  :  {current.speed} mps, {current.deg} deg</li>
                            <li className='col'>Clouds  : {current.cloud} %</li>
                            <li className='col'>Rain  : {current.rain} mm/h</li>
                        </ul>
                    </div>
                </div>

                <hr className='col-11 mx-auto mt-2' />

                {/* 3 days forecast */}
                <div className='mt-4'>
                    <div>{dailyForcast}</div>
                </div>

                <Button className='col-1 align-self-center mb-3' variant="outline-success" onClick={() => { loadDataMore(); setShow(true) }}>See More</Button>

                {/* load more forecasting details */}
                <div className="">
                    <div>{loadDataMore()}</div>
                    {show && <Button className='col-2 mb-3' variant="outline-success" onClick={() => setShow(false)}>Hide More Details</Button>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard
