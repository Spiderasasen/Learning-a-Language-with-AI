import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Selection from "./pages/Selection.jsx";
import Practice from "./pages/Practice.jsx";
import Drilling from "./pages/Drilling.jsx";

function App(){
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/selection" element={<Selection/>}/>
          <Route path="/practice" element={<Practice/>}/>
          <Route path="/drilling" element={<Drilling/>}/>
        </Routes>
      </Router>
  );
}
export default App;