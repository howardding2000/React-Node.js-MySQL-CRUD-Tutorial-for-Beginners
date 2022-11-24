import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


//To adapt Typescript, make sure root is not null.
// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
