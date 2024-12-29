/* This is a functional component that displays a notification message
 whether it be success or error. It takes two props:
 - message: The text content to display in the notification.
 - type: The type of notification, either 'success' or 'error'.*/
const Notification = ({ message, type }) => {
    // First safety check - if there's no message, don't render anything
    // This is a common pattern in React to conditionally render components
    // When this returns null, React will not render anything in the DOM
    if (message === null) {
      return null
    }

    // Base styling object using JavaScript object notation
    // These styles will be applied to all notifications regardless of type
    // In React, inline styles use camelCase instead of kebab-case (like in CSS)
    // Values can be numbers (React adds 'px' automatically) or strings
    const baseStyle = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    // Create final notification style by spreading the baseStyle
    // and adding conditional color based on the type prop
    // The spread operator (...) copies all properties from baseStyle
    // Then we override/add the color property based on the type
    // This is a common pattern for composing styles or objects in React
    const notificationStyle = {
      ...baseStyle,
      color: type === 'error' ? 'red' : 'green'
    }
  
    return (
    /*This uses the style we created */
      <div style={notificationStyle}>
        {/*This displays the message prop*/}
        {message}
      </div>
    )
  }
  
  export default Notification
  