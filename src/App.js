import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CityTable from "./Scences/CityTable";
import StudentTable from "./Scences/StudentTable";

function App() {
  return (
    <div>
<Router>
      <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
          Cities
          </Link>
          <Link to="/students" style={{ padding: 5 }}>
          Students
          </Link>
      </nav>
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/students" element={<StudentTable />} />
      </Routes>
    </Router>
 
    </div>

 
    
  );
}

export default App;