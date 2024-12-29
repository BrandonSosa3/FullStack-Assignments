import React, { useEffect, useState } from "react"
// Functional React component that displays detailed information about a country
// It receives a prop called country, which is an object containing information about the country
const CountryDetail = ({ country }) => {
  // State to manage the weather data for the country
  const [weather, setWeather] = useState(null)

  // This line loads an environment variable containing an API key for OpenWeather.
  // Environment variables are used to securely store sensitive information like API
  // keys so they don't hardcode them in the codebase.
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY

  //  This is the useEffect hook. It is used to perform side effects in React components,
  //  such as fetching data from an external API. The useEffect hook runs the code inside 
  // it whenever the dependencies (in the second argument) change. Here, the dependencies 
  // are country.capital and apiKey.
  // Side effect: In this case, fetching the weather data for the capital of the country is a 
  // side effect that happens after the component renders. useEffect ensures the weather is 
  // fetched whenever the country.capital or apiKey changes. This is important because if 
  // we left it an emprty array, the weather data would only be fetched once when the component
  // first renders.
  useEffect(() => {
    // This is a guard clause to ensure the country object has a valid capital before attempting 
    // to fetch weather data. If this is false, it will prevent the search for a capital in the weather api
    if (!country.capital || country.capital.length === 0) return;
    // This defines an async function to fetch weather from the OpenWeather API.
    // In JavaScript, certain operations are asynchronous, meaning they take time to complete
    //  (e.g., fetching data from a server, reading a file, or waiting for a timer). 
    // Instead of blocking the entire program until the operation is done (like in synchronous programming),
    // asynchronous functions allow other code to run while waiting for the operation to finish.
    const fetchWeather = async () => {
      try {
        // This line makes an HTTP GET request to the OpenWeather API to fetch weather data for the capital of the country.
        // The fetch function is used to send HTTP requests to external APIs.
        // await pauses the execcution of the fetchWeather function until the request is completed and the response is received.
        // The URL contains the country.capital[0] (first capital), units=metric for Celsius temperatures, and the appid=${apiKey} 
        // for the API key.
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${apiKey}`
        );
        // response.ok checks if the HTTP response was successful (HTTP status code 200-299). If 
        // the response status code is out of this range an error is thrown, and the fetch is failed. 
        if (!response.ok) throw new Error("Weather API request failed")
        // response.json() reads the body of the HTTP response and parses it as JSON. Since the OpenWeather 
        // API responds with JSON data, we need to convert the response body into a JavaScript object using json()
        const data = await response.json()
        // After successfully fetching the weather data, we update the weather state with the fetched data by calling
        //  setWeather(data). This triggers a re-render of the component, and now the component will display the weather data.
        setWeather(data)
        // This handles any errors that occur during the weather data fetching. 
        // If there is an error during the fetch operation (e.g., the API is down, no internet connection), 
        // the error is caught and logged to the console.
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }
// HERE WE ARE ACTUALLY DOING THE USE EFFECT HOOK, CALLING THE FETCH WEATHER FUNCTION, AND PASSING THE DEPENDENCIES
// These are dependencies because: We want the weather data to be fetched whenever the capital city of the country changes.
//  If the capital changes, we need to make a new API call to get the updated weather for the new capital. 
// So, country.capital is a dependency because it triggers the effect whenever its value changes.
// If the apiKey changes (which might happen if you change the environment variable or your API key), you want to refetch 
// the weather data using the new key. So, apiKey is a dependency because any change to it should trigger the effect and the 
// associated API call.
    fetchWeather();
  }, [country.capital, apiKey])


// If country is null or undefined, the component renders a message saying "No country data available." 
// This prevents errors if the country prop isn't provided or is invalid.
  if (!country) return <p>No country data available.</p>


  return (
    <div>
    {/*Displays the common name of the country*/}
      <h2>{country.name.common}</h2>
    {/*Displays the capital name of the country*/}
      <p>Capital: {country.capital[0]}</p>
    {/*Displays the area of the country (size of country)*/}
      <p>Area: {country.area}</p>
    {/*IDK*/}
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      {/*country.flags.svg is the URL of the flag image. The alt attribute provides a text description of the image for accessibility.*/}
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
    {/*This line "weather ?" checks if weather is truthy (it exists) then the following will run, 
    if it is false (data is still fetching or has failed) then the <p>Loading weather...<p> is displayed*/} 
      {weather ? (
        <div>
        {/*Just a heading to display the capital*/}
          <h3>Weather in {country.capital[0]}</h3>
          {/*This line accesses the temperarure from the weather APIs response*/}
          <p>Temperature: {weather.main.temp} °C</p>
          {/*This line offers a desciption of the weather from the APIs response */}
          <p>Condition: {weather.weather[0].description}</p>
          {/*IDK*/}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default CountryDetail;

  