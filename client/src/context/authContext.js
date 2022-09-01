import React, { useContext, useEffect, useState,useReducer } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import reducer from "../reducer/authReducer";

const AuthContext = React.createContext();

// const initialState = {
//   isLogged:false,
//   isAdmin:0,
//   username:"",
//   password:"",
//   cart: [],
//   history:[]
// };

export const AuthProvider = ({ children }) => {
    //const [state, dispatch] = useReducer(reducer, initialState);
    const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);

    const onChangeInput = (e) => {
        if(e.target.name==="username"){
            setUsername(e.target.value);
        }
        if(e.target.name==="password"){
            setPassword(e.target.value);
        }
    }

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
              

            
            




  return (
    <AuthContext.Provider value={{ onChangeInput, onSubmitForm }}>
      {children}
    </AuthContext.Provider>
  );
};
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
};
