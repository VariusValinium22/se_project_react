const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(handleRequest);
};

const addClothingItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleRequest);
};

const deleteClothingItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

const updateUserProfile = (userData, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(handleRequest);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE", 
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
}

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
