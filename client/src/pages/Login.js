import React from "react";
import axios from "axios";
import styled from "styled-components";
//import { useAuthContext } from "../context/authContext";


const Login = () => {
  //const { onChangeInput, username, password, isLogged,isAdmin,onSubmitForm } =useAuthContext();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);



  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
     const res= await axios.post("http://localhost:5123/api/auth/login", {
        username,
        password,
      })
      console.log(res);
      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <Wrapper>
      
      {user ? window.location.href = "/": (
        <div className="login mt-10 px-10 container ">
          <form
            onSubmit={onSubmitForm}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <span className="formTitle text-center my-2 fw-bold">Login</span>
            <input
              className="my-3"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="my-3"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton ">
              Login
            </button>

            <a href="/sign-up" type="button" className="my-2">
              Doesn't have an account? Register now!
            </a>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f5f5f5;
  height: 100%;



  .submitButton {
    width: 100%;
    max-width: 100px;
  }
`;

export default Login;
