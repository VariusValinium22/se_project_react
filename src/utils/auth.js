import { handleRequest } from "./api";

const BASE_URL = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const register = (name, avatar, email, password) => {
  console.log("Registering user with data:", { name, avatar, email, password });
  
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleRequest);
};

const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleRequest);
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
        ...headers,
        authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

export { register, login, checkToken };
