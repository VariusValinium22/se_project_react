const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  })
    .then(handleRequest)
    .catch((err) => {
    });
};

const addClothingItem = (item) => {
  const formattedItem = {
    ...item,
    imageUrl: item.link,
  };
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(formattedItem),
  }).then(handleRequest);
};

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export { getClothingItems, addClothingItem };
