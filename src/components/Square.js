import React from "react";

const Square = ({ setLands, value, onClick , user }) => {
  let son;
  if(value.type===1){
    son="One";
  }
  else if(value.type===2){
    son="Two";
  }
  else{
    son="Three";
  }
  let style = value.type ? `${son}` : `squares`;
  if(user!==null){
  if(value.ownerId==user.id){
    style="mine";
  }
}
  return (
    <button className={style} onClick={onClick}>
      { value.available === false && value.type===1 ? "X" :""}
    </button>
  );
};

export default Square;