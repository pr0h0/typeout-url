const initClient = require("./index.js");

const client = initClient({
  async get(url, options) {
    return fetch(url, options);
  },
  // async post(url, body, options) {
  //  custom implementation using axios or some other client
  //  return axiosClient.post(url, body, options);
  // },
});

// https://www.pr0h0.me
client.https.$c.$2s.www.$dot.pr0h0.$dot.me
  .$get()
  .then((res) => res.text())
  .then(console.log);
