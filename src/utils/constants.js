export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clearDay.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudyDay.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rainDay.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clearNight.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudyNight.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rainNight.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/defaultDay.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/defaultNight.png", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },

  {
    _id: 6,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  /* Los Angeles */
  /* latitude: 34.052235,
  longitude: -118.243683, */
  /* San Antonio */
/*     latitude: 29.407780,
  longitude: -98.502582, */
  /* Honolulu */
  /*     latitude: 21.298075,
  longitude: -157.875712, */
  /* Evjen, Norway */
  /*   latitude: 68.2441,
  longitude: 13.7601, */
  /* Isla Navarino, Chile  */
  /*   latitude: -55.126163,
  longitude: -67.597523, */
  /*COLD: Yakutsk, Russia */
  /*   latitude: 61.981701,
  longitude: 129.80615, */
  /*HOT: Asuncion, Paraquay */
  /* latitude: -25.28646,
  longitude: -57.647, */
  /*HOT: Death Valley, Nevada USA*/
  /* latitude: 36.532265,
  longitude: -116.932541, */
  /*HOT Jan/20@8pmCST: Marble Bar, Australia*/
  latitude: -21.171422,
  longitude: 119.742776,

};

export const APIkey = "ad5625a093de3d7e472d2d1fd3d0e964";
