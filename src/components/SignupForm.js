import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./validation";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SignupForm = (setUserInfo) => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  let history = useNavigate();
  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const getUsersFromDB = async () => {
    const { data } = await axios.get("http://localhost:3001/users");
    return data;
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setDataIsCorrect(true);
    if (submitForm) {
      const {data} = await axios.get("http://localhost:3001/countUsers");
      console.log(data);
      const newUser = {
        id: data,
        name: values.fullname,
        email: values.email,
        password: values.password,
        funds: 1000
      };
      
      const returnedUser = await axios.post(
        "http://localhost:3001/createUser",
        newUser
      );

    //   console.log(returnedUser);
      history("/success");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      setSubmitForm(true);
    } else {
      setSubmitForm(false);
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <h2 className="title">Create Account </h2>
        <div>
          <form className="form-wrapper">
            <div className="name">
              <label className="label"> Full Name </label>
              <input
                className="input"
                placeholder="Enter your name"
                name="fullname"
                defaultValue={values.fullname}
                onChange={handleChange}
              ></input>
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>
            <div className="email">
              <label className="label"> Email</label>
              <input
                className="input"
                type="email"
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
                type="password"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
              ></input>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button
                type="button"
                className="submit"
                onClick={handleFormSubmit}
              >
                sign up
              </button>
            </div>

            <div>
              <h3 className="title">
                Already has an account? Just want to enter as a guest?
              </h3>
              <Link to="/Login">
                <button className="submit">Log in</button>
              </Link>
              <br />
              <b>
                <Link to="/Game">
                  <button className="submit" onClick={()=>setUserInfo(null)}> Log in as a guest</button>
                </Link>
              </b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
