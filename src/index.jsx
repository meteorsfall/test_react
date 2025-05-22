import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const App = () => {
    return <h1>Hello, Webpack + React!</h1>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
