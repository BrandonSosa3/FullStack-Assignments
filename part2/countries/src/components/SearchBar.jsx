// Creates react funcitonal component called SearchBar
// onSearch is expected to be a callback function passed
// down from a parent component. This callback will handle 
// the user’s search input.
const SearchBar = ({ onSearch }) => {
    return (
    // The input element in React is used to capture text input
    // from the user. In this case it will allow the user to type the 
    // seacrh query
      <input
      // This will set the type attribute of the input element to text
      // This ensures the input behaves as a text box
        type="text"
        // This is the text displayed in the input box when it's empty
        placeholder="Search for a country"
        // onChange is a React Specific event handler that triggers
        // when the user types in or modifies the input field.
        // The arrow function takes an event object "e" as the argument
        // e.target.value represents the current value of the input field
        // (which is the text entered by the user), then the array function 
        // calls the onSearch function with the current value of the input field
        // as an argument. Detects changes to the input field and notifies the parent 
        // component (via the onSearch function) about the new input value.
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  };
  
  export default SearchBar;
  