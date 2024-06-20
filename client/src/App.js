// client/src/App.js
//================================================================
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar';
import routes from './routes';
import './App.css';

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    fetch("/api")
     .then(res => res.json())
     .then((data) => setData(data.message));
  })
  return (
    <Router>
      <body>
      {/* Navbar */}
        <NavBar />
        <div>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route 
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              );
            })}
          </Routes>
        </div>
      </body>
    </Router>
  );
}

export default App;
