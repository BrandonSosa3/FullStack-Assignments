// PersonForm is a controlled form component that receives props from its parent component
// These props all are either varibles or methods defined in App.jsx
// We are basically using those things in the main  App.jsx file
// The reason why we have made this component its own file is because it is basically
// just used to write rendering code so our main file doesnt get too messy and large

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
    // The component returns a form element with input fields for name and number
    // This means this component is called in the "return" section of the main App.jsx file
    // to render the form (the input section of the UI)
    return (
        // onSubmit prop takes the addPerson function that will be executed when form is submitted!!!
        // That method prevents default form submission and handles the data according to parent logic
      <form onSubmit={addPerson}>
        <div>
          {/*the "name:" is the text displayed to the left of the text box
          value={newName} displays whatever is stored in the newName state variable
          When you type, handleNameChange runs and updates newName with what you typed
          This creates a live connection between what you see and what's stored in React*/}
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          {/*Same as above with name but this is with number*/}
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          {/* Submit button triggers the form's onSubmit event */}
          {/* When clicked, it executes addPerson function from props */}
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm
  