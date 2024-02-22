import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import BrowserRouter, Route, Switch
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Agenttable from './Agenttable';
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router> /* Wrap your entire app with the Router component */
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Switch> {/* Use Switch to render the first matching Route */}
          <Route exact path="/"> {/* Define Route for the Home page */}
            <Home />
          </Route>
          <Route exact path="/subAdmin/Dashboard/Agenttable" element={<Agenttable />} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;


