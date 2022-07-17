import React ,{useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Game from "./components/Game";
import LoginForm from "./components/LoginForm";
import SignupFormSuccess from "./components/SignupFormSuccess";

function App() {
    const [userInfo,setUserInfo]=useState(null);

    const loginNewUser = (newUser) =>{
         setUserInfo(newUser);
    }
  return (
    //user={{"funds":50 ,"name":"Omer","id":1}}
    //user={null}
    /* <Game user={null}/> */
    <Router>
      <Routes>
        <Route path="/" exact element={<Form setUserInfo={loginNewUser}/>} />
        <Route
          path="/Game"
          element={<Game setUserInfo={loginNewUser} user={userInfo} />}
        />
        <Route path="/Login" element={<LoginForm  setUserInfo={loginNewUser}/>} />
        <Route path="/Success" element={<SignupFormSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
