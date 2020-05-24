import axios from "axios";

export default axios.create({
  baseURL: "https://agricolab-un.appspot.com/api",

  headers: {
    "Content-type": "application/json"
  }
});
