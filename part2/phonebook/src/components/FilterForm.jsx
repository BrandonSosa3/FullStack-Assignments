// This is a controlled Form component that renders the filter shown with text box
// It receives props from its parent component
// - searchTerm: the current value of the filter box input
// - handleSearchChange: a callback function that handles input changes
const FilterForm = ({ searchTerm, handleSearchChange }) => {
    return (
      <div>
        {/* 
          This is a controlled form element pattern in React, which is fundamental to understand:
          1. The 'value' prop binds the input's value to the searchTerm state variable
          2. The 'onChange' prop connects to the handleSearchChange function
          
          This creates a "single source of truth" where:
          - The parent component maintains the state
          - This component purely renders based on props
          - Any changes are handled by the parent through handleSearchChange
          
          This is a key React pattern called "lifting state up" where:
          - State is maintained at a higher level (parent component)
          - Data flows down through props
          - Changes flow up through callback functions
        */}

          {/*the "filter shown with:" is the text displayed to the left of the text box
          value={searchTerm} displays whatever is stored in the searchTerm state variable
          When you type, handleSearchChange runs and updates searchTerm with what you typed
          This creates a live connection between what you see and what's stored in React*/}
        filter shown with: <input 
          value={searchTerm} // Controlled input - value is a state defined in the parent (App.jsx)
          onChange={handleSearchChange} // Event handler passed from parent (App.jsx)
        />
      </div>
    )
  }
  
  export default FilterForm
  