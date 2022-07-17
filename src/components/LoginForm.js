import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import validation from "./validation";

const LoginForm = ({ setUserInfo }) => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  // const [submitFormVal,setSubmitForm]=useState(submitForm);
  let navigate = useNavigate();
  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      setSubmitForm(true);
    } else {
      setSubmitForm(false);
    }
  }, [errors]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setDataIsCorrect(true);
    const {data} = await axios.get("http://localhost:3001/findUser", {
      params: {
        email:values.email
      }
    });
    // console.log(data);
    if(data!==null && values.password===data.password){   // success login logic 
      const user={
        id:data.id,
        name:data.name,
        funds:data.funds
      }
      await setUserInfo(user);
      navigate("/game");
    }
   
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <h2 className="title">Log in </h2>

        <div>
          <form className="form-wrapper">
            <div className="email">
              <label className="label"> Email</label>
              <input
                className="input"
                type={"email"}
                name="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
              ></input>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="password">
              <label className="label"> Password </label>
              <input
                className="input"
                type={"password"}
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
              ></input>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button className="submit" onClick={handleFormSubmit}>
                Log in
              </button>
            </div>
            <div>
              <h3 className="title">
                Don't you have an account? Click below to sign up
              </h3>
              <Link to="/">
                <button className="submit">Sign up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
