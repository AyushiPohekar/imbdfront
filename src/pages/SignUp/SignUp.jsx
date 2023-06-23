import React, { useState } from "react";
import "./signup.css";
import Navbar from "../../Components/Navbar/Navbar";

import { API } from "../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //console.log(formData);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    signupController(formData);
  };
  const signupController = async (data) => {
    try {
      //console.log("data",{data})
      const res = await axios.post(`${API}/auth/register`, data);
      if (res && res.status === 201) {
        console.log(res.data.message);
        navigate("/login");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(`Error while calling signupApi`, error.message);
    }
  };

  return (
    <div className="LoginDiv">
      <Navbar />
      <div className="formdiv">
        <form>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="johndoe"
              name="username"
              value={formData.username}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label>Email Id:</label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
            />
          </div>

          <button onClick={onSubmitHandler}>Submit</button>
          <p>
            Already have an account?Click to{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
