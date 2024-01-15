import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalCSS";
import { ThemeProvider } from "styled-components";
import App from "./App";
import LoadingScreen from "./pages/landing/LoadingScreen";

const theme = {
  primary: "#337ab7",
  secondary: "#285f8f",
  focus: "#63a0d4",
};

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingScreen />}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
