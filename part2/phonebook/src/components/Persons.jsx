// This component renders all the people and their numbers
// It recieves two props:
// - persons: an array of person objects containing {id, name, number}
// - handleDelete: a callback function to handle deleting a person
// These props all are either varibles or methods defined in App.jsx
// We are basically using those things in the main  App.jsx file
// The reason why we have made this component its own file is because it is basically
// just used to write rendering code so our main file doesnt get too messy and large

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {/* persons.map() is a crucial React pattern for rendering lists
          - map() creates a new array by transforming each element in persons
          - For each person object, we create a paragraph element
          - This is declarative programming - we describe what we want, not how to do it */}
      {persons.map(person => {
        return (
          // The 'key' prop is essential for React's virtual DOM diffing algorithm
          // It helps React efficiently update only the elements that change
          // Always use a unique key when rendering lists in React - here we use person.id
          <p key={person.id}>
            {/* Display the person's name and number with a space between them */}
            {person.name} {person.number}
            
            {/* The delete button for each entry
                - onClick uses an arrow function to prevent immediate execution
                - When clicked, it calls handleDelete with the person's id and name
                - The handleDelete function likely communicates with the backend via
                  the numbers.js service to remove entries from the database
                - This is an example of "lifting state up" where the actual delete
                  logic lives in a parent component but is executed from here */}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </p>
        )
      })}
    </div>
  )
}


export default Persons
  
  