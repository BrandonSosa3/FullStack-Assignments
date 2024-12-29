
// ReactDOM is the package that provides DOM-specific methods for React
// We specifically import 'createRoot' from react-dom/client which is part of React 18's concurrent features
// This new API replaced the older ReactDOM.render() method and enables concurrent rendering capabilities
import ReactDOM from "react-dom/client";
// Importing our main App component from App.jsx
// This is the root component that will contain all other components in our application
import App from "./App";
// Let's break down this crucial line of code:
// 1. document.getElementById("root") - This finds the HTML element with id="root"
//    - In your index.html, there's a div with id="root" where React will mount
//    - This is the bridge between React and the actual DOM
//
// 2. createRoot() - Creates a React root container for managing your React tree
//    - Part of React 18's concurrent rendering system
//    - Enables features like automatic batching of state updates
//    - Handles hydration in server-side rendering scenarios
//    - Manages the mounting and unmounting of components
//
// 3. .render(<App />) - Tells React what to render in the root container
//    - <App /> is a JSX expression that creates an instance of your App component
//    - JSX is transformed into React.createElement() calls during build
//    - This starts the React component lifecycle
//
// In a full-stack context:
// - This file is the entry point for your frontend application
// - It's typically bundled by Vite (as configured in vite.config.js)
// - The bundled JS is served to clients by your backend server
// - When loaded in browser, it bootstraps your React application
// - Any API calls, WebSocket connections, or other backend interactions
//   will be initialized in components rendered within <App />
ReactDOM.createRoot(document.getElementById("root")).render(<App />);