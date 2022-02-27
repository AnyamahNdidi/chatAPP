import logo from './logo.svg';
import {UseProvider} from "./userContext"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './component/home/Home';
import Chat from "./component/chat/Chat";
import NavBar from "./component/layout/NavBar"
import Login from './component/home/Login';



function App() {
  return (
 
      
        <div>
          <UseProvider>
          <Router>
            {/* <NavBar/> */}
            <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/login" element={<Login/>}/>
          </Routes>
          </Router>
          </UseProvider>
        </div>
      
  );
}

export default App;
