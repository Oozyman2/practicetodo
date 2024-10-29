import { createContext, useState, useEffect, useContext } from "react";

import { base_url } from "../library/api";

import axios from "axios";

const AuthContext = createContext();

const Authprovider = ({ children }) => {
  // const { refetch } = UseCustom(`${base_url}/get-all-todo`, 'GET');
  const [authToken, setauthToken] = useState(
    sessionStorage.getItem("authToken")
  );
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * Logs in a user by sending a POST request to the server.
   * Retrieves the user's authentication token from the response.
  
  */

  const logout = () => {
    sessionStorage.removeItem("token");
    setauthToken(null);
    setUser(null);
  };

  const login = async (username, password) => {
    setloading(true);
    const data = {
      username: username,
      password: password,
    };
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(`${base_url}/login`, data);
      // Add login data here, e.g., username and password;
      // refetch();
      const { token, user } = await response.data;

      setauthToken(token);
      sessionStorage.setItem("authToken", token);
      setUser(user);
      setTimeout(() => {
        setloading(false);
      }, 3000);

      // Handle the response, e.g., store auth token
      return { token, user };
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Login error:", error);
      setloading(false);
      throw error;
    }
  };

  const signup = async (username, password, email) => {
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${base_url}/signup`, data);
      const { token, user } = response.data;
      return response.data;
    } catch (error) {
      console.log("sign up Error", error);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setauthToken(storedToken);
      // Ideally, verify the token and fetch user data here
    }
    setloading(false);
  }, [loading]);
  return (
    <AuthContext.Provider
      value={{ authToken, user, login, signup, logout, loading, setloading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Authprovider, AuthContext };
