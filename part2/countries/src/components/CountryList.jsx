// Declares a React functional component named CountryList
// Destructures the countries and onSelect props from the component's props
// countries: An array of country objects to display.
// onSelect: A callback function for handling the selection of a specific 
// country (e.g., when the "Show" button is clicked).
const CountryList = ({ countries, onSelect }) => {
    // If there are more than 10 countries that match the search query,
    // display a message indicating that too many matches were found.
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    // Otherwise, if there are 1-10 countries that match the search query
    return (
      <ul>
        {/* We will use the map() method to iterate over each country object 
        in the countries array. For each country object we render a <li> element */}
        {countries.map((country) => (
        // Here we define a unique key for each list item.
          <li key={country.name.common}>
            {/*This line outputs the name.common property of the country object
            and adds a space between the name and the "show" button */}
            {country.name.common}{" "}
            {/*The onClick event is set to an arrow function that calls the onSelect 
            function, passing the current country object as its argument.
            This allows the user to select a specific country from the list */}
            <button onClick={() => onSelect(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  };
  
export default CountryList;
  
  