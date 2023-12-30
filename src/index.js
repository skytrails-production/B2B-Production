import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./Redux/store";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        
           <App />
    
        </BrowserRouter>
      </PersistGate>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </Provider>
  
  </React.StrictMode>
);

reportWebVitals();
