import axios from "axios";

export default axios.create({
  baseURL: "https://agricolab-un.appspot.com/api/v1",

  headers: {
    "Content-type": "application/json"
  }
});
