const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(handleRequest);
};

const addClothingItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  }).then(handleRequest);
};

const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleRequest);
};

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export { getClothingItems, addClothingItem, deleteClothingItem, handleRequest };
