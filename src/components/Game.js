import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Board from "./Board";
import axios from "axios";
import Menu from "./Menu";
import { Prev } from "react-bootstrap/esm/PageItem";
const Game = ({ user ,setUserInfo}) => {
  const [lands, setLands] = useState([]);
  const [markedLand, setMarkedLand] = useState(-1);
//   const [stepNumber, setStepNumber] = useState(0);
    function closeMenu(){
        setMarkedLand(-1);
    }
    useEffect(()=>{
        getLandsFromDB();
    }, []);

    const getLandsFromDB = async () => {
        const { data } = await axios.get("http://localhost:3001/lands");
        console.log(data);
        setLands(data);
    }

  const handleClick =  (i) => {
      if(i===markedLand)
      setMarkedLand(-1);
    else{
        setMarkedLand(i);
    }
    console.log(lands[i]);
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  const resetGame = async () => {
      const count=await axios.delete("http://localhost:3001/delete");
      console.log(count);
    for (let i = 0; i < 400; i++) {  
      await resetLand(i);
    }
    await getLandsFromDB();
    console.log("done");
  };
  const resetLand = async  (i) => {
    let idVal = i;
    let typeVal = -1;
    let availableVal = false;
    let priceVal = getRandomInt(151) + 50;
    let linkVal="";
    if (idVal < 20 || idVal > 379) typeVal = 2;
    else if (idVal % 21 === 0 || idVal % 19 === 0) typeVal = 3;
    else {
      typeVal = 1;
      availableVal = true;
    }
    if(typeVal!==1){
        priceVal=99999;
    }
    const newLand = {
      id: idVal,
      type: typeVal,
      available: availableVal,
      price: priceVal,
      owner: null,
      link:linkVal,
      ownerId:-1
    };

    const returnedLand = await axios.post("http://localhost:3001/create", newLand);
    
    console.log(returnedLand);
  };

  

  return (
    <>
      
    {user!==null &&<div className="row">  <div className="smallerColumn"> <h2>Funds: {user.funds}$</h2> </div><div className="smallerColumn"></div><div className="smallerColumn"></div> <div className="smallerColumn"></div>  <div className="smallerColumn">&emsp;<Link to='/Login'><button className="btn btn-danger fs-5" onClick={()=>setUserInfo(null)}>Log Out</button></Link><h3>Welcome  {user.name}</h3></div>
    </div>}
    {user===null &&<div className="row">  <div className="smallerColumn">  </div><div className="smallerColumn"></div><div className="smallerColumn"></div> <div className="smallerColumn"></div>  <div className="smallerColumn">&emsp;<Link to='/Login'><button className="btn btn-success fs-5">Log In</button></Link><h3></h3></div>
    </div>}
    
      <center><h1 className="badge bg-primary text-wrap fs-1">Welcome to CentraLand</h1></center>
      {/* {isClicked && <Component/>} */}
        {markedLand!==-1 && <Menu  setUserInfo={setUserInfo} getLands={getLandsFromDB} lands={lands} landIndex={markedLand} user={user} setLands={setLands}/> }
        <br/>     
      {markedLand!==-1 && <button onClick={()=>closeMenu()}className="btn btn-danger fs-5">Close Menu</button>}
        <br/><br/>
      {lands && <Board setLands={setLands} squares={lands} user={user}  onClick={handleClick} />}
      <div>
          <br/>
          <button type="button" className="btn btn-danger" onClick={resetGame} >
            Reset game
          </button> 
        </div>
    </>
  );
};
export default Game;
