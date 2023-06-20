import React, { useState } from "react";
import "./Login.css";
import Navbar from "../../Components/Navbar/Navbar";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const onSubmitHandler = (e) => {
    e.preventDefault();

    loginController(formData);
  };
  const loginController = async (data) => {
    try {
      //console.log("data",{data})
      const res = await axios.post(`${API}/auth/login`, data);
      if (res && res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        navigate("/");
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
        </form>
      </div>
    </div>
  );
};

export default Login;
