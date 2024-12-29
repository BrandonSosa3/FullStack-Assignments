// Import core React library and useState hook
// useState is a fundamental React Hook that allows functional components to manage state
// Without hooks like useState, we would need to use class components for state management
import React, { useState } from "react"
// Importing custom components from the components directory
// This demonstrates component-based architecture, a key React principle
// Each component handles a specific piece of functionality
import SearchBar from "./components/SearchBar"
import CountryList from "./components/CountryList"
import CountryDetail from "./components/CountryDetail"


// IN THIS PROJECT HERE IS WHAT THE COURSE GAVE US TO PULL INFO FROM BACKEND: 
// https://studies.cs.helsinki.fi/restcountries/

  // This is the main App component using arrow function syntax
  // It serves as the parent component that manages the application's state and data flow
const App = () => {
  // query: stores the current search term
  // setQuery: function to update query
  // useState(""): initializes query with empty string
  const [query, setQuery] = useState("")
  // countries: stores the filtered list of countries
  // setCountries: function to update countries array
  // useState([]): initializes countries with empty array
  const [countries, setCountries] = useState([])
  // selectedCountry: stores the currently selected country for detailed view
  // setSelectedCountry: function to update selectedCountry
  // useState(null): initializes selectedCountry as null
  const [selectedCountry, setSelectedCountry] = useState(null)

    // Async function to fetch country data from API
    // async/await is used for handling asynchronous operations cleanly
    // which allows for other operations to continue running while
    // waiting for the data to be fetched
  const fetchCountries = async (query) => {
    // fetch: makes HTTP request to REST Countries API
    // await: pauses execution until promise resolves
    const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    // Converts response to JSON format
    // await is needed as .json() returns a promise
    const countries = await response.json()
      // Uses the filter() array method to create a new array
      // that only includes countries whose name matches the query
      // toLowerCase() makes the query case-insensitive
      // includes() checks if the query string is part of the country name
    return countries.filter(country => 
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Here we have another async funciton like the one above, 
  // that while fetching data fromt the API, it does not 
  // interrupt other operations. This function will be passed as a prop
  // to the SearchBar component. It is triggered when the user types into the search input,\
  // updating the UI and fetching relevant data.
  // This line defines the async function handleSearch that takes
  // a searchQuery parameter which represents the text the user has entered into 
  // the search bar.
  const handleSearch = async (searchQuery) => {
    // Update the query state with the search query
    setQuery(searchQuery)
    // calls the fetchCountries function with the search query
    // the await keyword ensures the function pauses execution until
    // the fetchCountries promise resolves
    const results = await fetchCountries(searchQuery)
    // Updates the state variable (countries) with the results from fetchCountries.
    // This will cause the component to re-render, displaying the updated list of countries.
    setCountries(results)
    //Resets the selectedCountry state variable to null, effectively deselecting any 
    // previously selected country. If the user had previously selected a specific country 
    // to view its details, this reset allows them to see the full search results again.
    setSelectedCountry(null) 
  };

  return (
    // The outer div is needed because React components must return a single parent element
    // This is due to how React's virtual DOM works with component rendering
    <div>
           {/* SearchBar Component
          - Receives onSearch prop which is the handleSearch function
          - This creates a two-way data flow:
            1. Parent (App) passes down the handler function
            2. Child (SearchBar) calls this function when user types
          - This pattern is called "lifting state up" in React */}

      {/* Conditional Rendering Section
          Uses nested ternary operators (? :) to determine what to display
          Think of this like an if-else-if chain:
          
          if (selectedCountry exists) {
              show CountryDetail for selected
          } else if (exactly one country matches) {
              show CountryDetail for that country
          } else {
              show CountryList
          } */}
      
      {selectedCountry ? (
        // First condition: Is there a selected country?
        // If true, render CountryDetail with that specific country
        // The country prop receives the full country object with all its data
        <CountryDetail country={selectedCountry} />
      ) : countries.length === 1 ? (
        // Second condition: Is there exactly one country in the filtered list?
        // If true, automatically show its details
        // countries[0] accesses the first (and only) country in the array
        <CountryDetail country={countries[0]} />
      ) : (
        // Final fallback: Show the list of all matching countries
        // Passes two props to CountryList:
        // 1. countries: the array of filtered countries to display
        // 2. onSelect: the setSelectedCountry function to handle user selection
        <CountryList 
          countries={countries} 
          onSelect={setSelectedCountry} 
        />
      )}
    </div>
  );
};


export default App;

