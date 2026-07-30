import React from "react"; // Load React for rendering.
import ReactDOM from "react-dom/client"; // Load the DOM renderer.
import App from "./App"; // Load the app component.
import "./index.css"; // Load Tailwind styles.
ReactDOM.createRoot(document.getElementById("root")).render( // Create the app root and render it.
  <React.StrictMode> 
    <App />
  </React.StrictMode> // Close strict mode.
);
