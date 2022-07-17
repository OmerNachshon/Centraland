import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
const Menu = ({ lands, landIndex, user, getLands, setUserInfo }) => {
  const { id, type, available, price, owner, link } = lands[landIndex];
  const [values, setValues] = useState({
    link: "",
    price: 0,
  });

  function getId() {
    return id;
  }
  function getType() {
    if (type === 1) {
      return "Property";
    } else if (type === 2) {
      return "Park";
    } else {
      return "Road";
    }
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const changeLink = async () => {
    console.log(values);
    // text input -> link  , check if input is valid with existing func
    if (validURL(values.link)) {
      let link = values.link;

      // update land.link= link from input
      const { data } = await axios.put(
        "http://localhost:3001/updateLand/" + id,
        {
          id,
          type,
          available,
          price,
          owner,
          link,
        }
      );
      console.log(data);
      // call Lands From DB
      getLands();
    }
  };
  const changeAvailable = async () => {
    // toggle land.available
    let available = !lands[landIndex].available;
    const { data } = await axios.put("http://localhost:3001/updateLand/" + id, {
      id,
      type,
      available,
      price,
      owner,
      link,
    });
    console.log(data);
    // call Lands From DB
    getLands();
  };
  function getAvailable() {
    return available ? "Yes" : "No";
  }

  function getPrice() {
    if (available) return price + "$";
    else return "Not for sale";
  }
  function getOwner() {
    if (owner === null) {
      return "Centraland";
    } else return owner;
  }

  const buyLand = async () => {
    if (user.funds < price) {
      //not enough money , do nothing
      console.log("you dont have enough funds");
    } else {
      // enough money , here buy logic will inserted
      let newFunds = user.funds - price;

      // //update [seller] user.funds=> [seller] user.funds+land.price   ONLY IF owner!==null
      if (lands[landIndex].owner !== null) {
        const { data } = await axios.get("http://localhost:3001/findUserId", {
          params: {
            id: lands[landIndex].ownerId,
          },
        });
        console.log(data);
        const {} = await axios.put(
          "http://localhost:3001/updateUser/" + lands[landIndex].ownerId,
          { newFunds: data.funds + price }
        );
        setUserInfo({ ...user, funds: newFunds });
      }

      let ownerId = user.id;
      let owner = user.name;
      // update user.funds => user.funds-land.price
      const {} = await axios.put(
        "http://localhost:3001/updateUser/" + user.id,
        { newFunds: newFunds }
      );
      setUserInfo({ ...user, funds: newFunds });

      //update land.owner=user.name
      //update land.ownerId=user.id
      const {} = await axios.put("http://localhost:3001/updateLand/" + id, {
        id,
        type,
        available,
        price,
        owner,
        link,
        ownerId,
      });

      // call Lands From DB
      getLands();
      console.log("Success");
    }
  };

  const changePrice = async () => {
    console.log(values);
    // text input -> link  , check if input is valid with existing func
    if (values.price > 0) {
      let price = values.price;

      // update land.link= link from input
      const { data } = await axios.put(
        "http://localhost:3001/updateLand/" + id,
        {
          id,
          type,
          available,
          price,
          owner,
          link,
        }
      );
      console.log(data);
      // call Lands From DB
      getLands();
    }
  };
  function getOwnerId() {
    return lands[landIndex].ownerId;
  }

  function validURL(str) {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <div className="row">
      <div className="column">
        <h2>Id: {getId()}</h2>
        <h2>Type: {getType()}</h2>
        <h2>Available: {getAvailable()}</h2>
        <h2>Price: {getPrice()}</h2>
        <h2>Owner: {getOwner()}</h2>
        {validURL(link) && (
          <a href={link}>
            <button className="btn btn-primary fs-5">Go to event</button>
          </a>
        )}
        &nbsp;
        {available && user !== null && user.id !== getOwnerId() && (
          <button
            onClick={buyLand}
            type="button"
            className="btn btn-primary fs-5"
          >
            Buy
          </button>
        )}
      </div>

      <div className="column">
        {" "}
        &ensp;
        {user !== null && user.id === getOwnerId() && (
          <div>
            <Popup
              trigger={
                <button
                  onClick={changeLink}
                  type="button"
                  className="btn btn-primary fs-5"
                >
                  Add/Change Event
                </button>
              }
              position="right"
            >
              <button onClick={changeLink} className="btn btn-danger fs-6">
                Submit event
              </button>
              &emsp;
              <div>
                <form>
                  <div>
                    <input
                      type="text"
                      name="link"
                      placeholder="insert event"
                      onChange={handleChange}
                    ></input>
                  </div>
                </form>
              </div>
            </Popup>
          </div>
        )}
        &nbsp; &nbsp;
        {user !== null && user.id === getOwnerId() && (
          <div>
            <Popup
              trigger={
                <button
                  onClick={changePrice}
                  type="button"
                  className="btn btn-primary fs-5"
                >
                  Change Price
                </button>
              }
              position="right"
            >
              <button onClick={changePrice} className="btn btn-danger fs-6">
                Submit price
              </button>
              &emsp;
              <div>
                <form>
                  <div>
                    <input
                      type="text"
                      name="price"
                      placeholder="insert price"
                      onChange={handleChange}
                    ></input>
                  </div>
                </form>
              </div>
            </Popup>
          </div>
        )}
        <br />
        {!available && user !== null && user.id === getOwnerId() && (
          <div>
            {" "}
            <Popup
              trigger={
                <button type="button" className="btn btn-primary fs-5">
                  Sell
                </button>
              }
              position="right center"
            >
              {" "}
              <h5>Are you sure?</h5>
              <button onClick={changeAvailable} className="btn btn-danger fs-6">
                yes
              </button>{" "}
            </Popup>
          </div>
        )}
        {available && user !== null && user.id === getOwnerId() && (
          <div>
            {" "}
            <Popup
              trigger={
                <button type="button" className="btn btn-primary fs-5">
                  Unsell
                </button>
              }
              position="right center"
            >
              <h5>Are you sure?</h5>
              <button onClick={changeAvailable} className="btn btn-danger fs-6">
                yes
              </button>
            </Popup>
          </div>
        )}
      </div>

      <div className="column"></div>
    </div>
  );
};

export default Menu;
