// Import the useState hook from React - enables state management in functional components
import { useState } from 'react'
import {useEffect} from "react"
//Import the axios library for making HTTP requests
import axios from 'axios'
// Import custom components that will be used in the App
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
// Import the numberService module for making HTTP requests to the backend
import numberService from './services/numbers'




// Define App as a functional component using arrow function syntax
const App = () => {
  // Initialize state for persons array with one default contact
  // useState returns an array with the current state value and a function to update it
  const [persons, setPersons] = useState([]) 
  // State for the new name input field - starts as empty string
  const [newName, setNewName] = useState('')
  // State for the new phone number input field - starts as empty string
  const [newNumber, setNewNumber] = useState('')
  // State for the search/filter term - starts as empty string
  const [searchTerm, setSearchTerm] = useState('')
  // State for the notification message (What the actual words displayed in the message are)
  // notificationMessage is the state variable that holds the current message text
  // setNotificationMessage is the setter function that allows us to update the message
  // useState(null) initializes the state with null as the default value, meaning no notification is shown initially
  const [notificationMessage, setNotificationMessage] = useState(null)
  // State variable for controling the visual style of the notifications
  // notificationType is the state variable that holds the current type of notification
  // setNotificationType is the setter function to update the notification type
  // useState("success") initializes the state with "success" as the default value, giving us a positive starting point
  const[notificationType, setNotificationType] = useState("success")


  /* This version of useEffect can now be replaced with the below
  version of useEffect from the src/service/numbers.js file which handles backend communication
  
  // Add this effect hook right after your state declarations
  // The useEffect hook lets us perform side effects in function components
  // In this case, we're using it to fetch data when the component first mounts
  useEffect(() => {
    // This is the effect function that will run after component mounts
    console.log('effect is running')
    
    // axios.get() sends a GET request to the specified URL
    // It returns a promise that resolves with the response data
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // When we get the data, we store it in our component's state
        console.log('promise fulfilled')
        // response.data is the array of persons from the server
        setPersons(response.data)
      })
    }, []) // Empty array means this effect runs only once when component mounts*/

    //This is the better version of the above, 

    useEffect(() => {
        // numberService is imported from src/services/numbers.js
        // It contains our axios HTTP methods wrapped in cleaner functions
      numberService
        // getAll() is defined in numbers.js and makes a GET request to http://localhost:3001/persons
        // Looking at numbers.js, we can see it returns response.data via a Promise
        .getAll()
        // .then() executes when the promise resolves
        // We will recieve the array of persons from the server
        // initialPersons contains the actual data from our backend
        .then(initialPersons => {
          // setPersons is our state setter from useState([])
          // This updates our persons array with the data from the backend
          // After this runs, our component will re-render with the new data
          setPersons(initialPersons)
        })
    }, []) // Empty array means this effect runs only once after initial render
  


  // Event handler function that updates newName state when input changes
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Event handler function that updates newNumber state when input changes
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Event handler function that updates searchTerm state when search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }


  // This function handles deletion of a contact from the phonebook
  // Parameters:
  // - id: unique identifier of the person to be deleted
  // - name: name of the person (used for confirmation dialog)
  const handleDelete = (id, name) => {
    // window.confirm() shows a native browser confirmation dialog
    // Returns true if user clicks OK, false if Cancel
    if (window.confirm(`Delete ${name}?`)) {
      // If user confirms deletion, we proceed with the backend operation
      numberService // numberService is our axios wrapper from services/numbers.js
        .remove(id) // Makes HTTP DELETE request to http://localhost:3001/persons/${id}
        // After successful deletion from backend, update frontend state
        // Using filter() creates a new array with all persons EXCEPT the deleted one
        // This is React's immutable state update pattern - never modify state directly
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


// This is a utility function that manages the display and timing of notifications in the app
// It encapsulates all notification-related state updates in one reusable function
// Parameters:
// message: The text content to display in the notification
// type = 'success': A parameter with a default value that determines the notification style
  const showNotification = (message, type = 'success') => {
    // Updates the notification message text using the state setter from useState
    // This will trigger a re-render and display the notification to the user
    setNotificationMessage(message)
    // Updates the notification type which controls the visual styling (e.g., success=green, error=red)
    // The default parameter 'success' means if no type is provided, it defaults to success styling
    setNotificationType(type)
    // setTimeout is a Web API function that executes code after a delay
    // Here it's used to automatically clear the notification after 5 seconds (5000 milliseconds)
    // This creates a better user experience by not requiring manual dismissal of notifications
    setTimeout(() => {
      // After 5 seconds, sets the notification message back to null
      // This effectively hides the notification component from view
      setNotificationMessage(null)
    }, 5000)
  }
  

  /* This version of addPerson can be replaced with the addPerson
  function below which handles backend communication
  // Function to handle form submission and add new person to phonebook
  const addPerson = (event) => {
    // Prevent default form submission behavior
    event.preventDefault()
    
    // Check if name already exists in phonebook
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // Create new person object with current input values
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Add new person to persons array using concat (immutable way)
    setPersons(persons.concat(personObject))
    // Clear input fields after submission
    setNewName('')
    setNewNumber('')
  }*/

  // addPerson is a crucial function that handles both creating new contacts and updating existing ones
  // It's triggered when the form is submitted (see PersonForm component usage in the return statement)
  const addPerson = (event) => {
    // Prevents the default form submission behavior which would refresh the page
    // This is a fundamental concept in React - we want to handle form submissions in JavaScript
    event.preventDefault()
    
    // Searches the persons array (state of list of people) to find if a person
    // with the same name already exists, .find() returns the first element that 
    // matches the condition or undefined if none found
    const existingPerson = persons.find(person => person.name === newName)
    
    // If existingPerson from above returns anything other than undefined we do the following
    if (existingPerson) {
      // Shows a confirmation dialog to the user
      // window.confirm returns true if user clicks OK, false if Cancel
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Creates a new object using the spread operator (...) to copy all properties {name:, number: id:}
        // Then overwrites the number: property with the new value
        // This is immutability in practice - we create new objects rather than modifying existing ones
        const changedPerson = { ...existingPerson, number: newNumber }
        // Uses our numberService .update() method (which wraps axios) to make a PUT request to the backend
        // This is a key full-stack concept - frontend communicating with backend
        numberService
          .update(existingPerson.id, changedPerson)
            // On successful update, we need to update our frontend state
            // .then() is executed once we get a successful return from our PUT request above
            // Uses .map() to create a new array where the updated person replaces the old one
            // This is another example of immutable state updates in React
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            // Shows a success notification using our custom notification system
            showNotification(`Updated ${returnedPerson.name}'s number`)
          })
          // Here we are catching the case where we have this site open in two different browsers
          // and we delete someone in one browser and try to update their number shortly after in 
          // the other browser. This creates a discrepency between the front and back end for a few 
          // seconds. So when this happens we display a notification and then do the action to remove
          .catch(error => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            )
            // Removes the person from frontend state since they no longer exist in backend
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
        // Clears the form inputs using state setters
        setNewName('')
        setNewNumber('')
      }
      // THIS IS AN IMPORTANT LINE. 
      /*This return statement is strategically placed after handling an existing person case. 
      When a person with the same name already exists and we've handled the update logic 
      (either updating their number or the user cancelled the operation), 
      we want to exit the function early before reaching the code that would create a new person.
      This is a common pattern called "early return" which helps prevent unnecessary code execution
      and maintains clean control flow in the function. */
      return
    }
  
    // This is the code that will add a new person if the above code does not find
    // that the person already exists:
    // This block creates a new person object that will be sent to the backend
    // The structure matches what our backend API expects: {name, number, id}
    const personObject = {
      name: newName,
      number: newNumber,
      // Creates a unique ID by:
      // 1. persons.map(p => Number(p.id)) - converts all existing IDs to numbers
      // 2. Math.max(...array) - finds the highest ID in the array
      // 3. + 1 - increments it by 1 for the new entry
      // 4. String() - converts back to string format for consistency
      id: String(Math.max(...persons.map(p => Number(p.id)), 0) + 1)
    }
  
    // numberService.create() is an axios wrapper from services/numbers.js
    // It sends a POST request to http://localhost:3001/persons with personObject
    numberService
      .create(personObject)
      // .then() executes when the POST request successfully completes
      // returnedPerson contains the newly created person from the backend
      // This is important because the backend might modify the data (e.g., generate its own ID)
      .then(returnedPerson => {
        // Updates the frontend state by:
        // 1. Creating a new array using concat (immutable update pattern)
        // 2. Adding the returnedPerson from the backend to the existing persons array
        setPersons(persons.concat(returnedPerson))
        // Shows a success notification using the custom notification system
        // This provides user feedback that the operation succeeded
        showNotification(`Added ${returnedPerson.name}`)
        // Clears both input fields by resetting their state to empty strings
        setNewName('')
        setNewNumber('')
      })
      // .catch() handles any errors that occur during the POST request
      // Common errors might include network issues or backend validation failures
      .catch(error => {
        // Shows an error notification to inform the user something went wrong
        showNotification('Failed to add person', 'error')
      })
  }
  
  

  // This returns a new array called filteredPersons that contains only the matching contacts
  // When a user types "jo" in the search box:
  /*
  searchTerm becomes "jo"
  The filter runs on each person
  For "John Smith": "John Smith".toLowerCase() becomes "john smith"
  "john smith".includes("jo") returns true
  For "Jane Doe": "Jane Doe".toLowerCase() becomes "jane doe"
  "jane doe".includes("jo") returns false
  So, the new array only contains the John object 
  */
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Main heading for the phonebook application */}
      <h2>Phonebook</h2>
      {/*The <Notification> component receives two props: 
      1. message={notificationMessage} - Passes the current notification text from the state variable notificationMessage
      2. type={notificationType} - Passes the visual style type (success/error) from the state variable notificationType*/}
      <div>
        <Notification message={notificationMessage} type = {notificationType} />
      </div>
      {/* Filter component with search functionality props */}
      <FilterForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      
      {/* Subheading for the form section */}
      <h3>Add a new</h3>
      {/* PersonForm component for adding new contacts with all necessary props */}
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      {/* Subheading for the contacts list section */}
      <h3>Numbers</h3>
      {/* Persons component that displays the filtered contacts list */}
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )

}

export default App


