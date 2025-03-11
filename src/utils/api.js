import { BASE_URL } from "../utils/constants";

const headers = { "Content-Type": "application/json" };

const getClothingItems = () => {
  return fetch(`${BASE_URL}/items`, {
    headers,
  }).then(handleRequest);
};

const addClothingItem = (item, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleRequest);
};

const deleteClothingItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

const updateUserProfile = (userData, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(handleRequest);
};

const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  handleRequest,
};
