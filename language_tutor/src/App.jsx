import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Selection from "./pages/Selection.jsx";

function App(){
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/selection" element={<Selection/>}/>
        </Routes>
      </Router>
  );
}
export default App;