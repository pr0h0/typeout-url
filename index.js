/// <reference path="./index.d.ts" />
/**
 * @type {TypeoutUrlConfig}
 */
const defaultConfig = {
  get: (url, options) => fetch(url, options),
  post: (url, body, options) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),
  put: (url, body, options) =>
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),
  patch: (url, body, options) =>
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),
  delete: (url, options) =>
    fetch(url, {
      method: "DELETE",
      ...options,
    }),
  head: (url, options) =>
    fetch(url, {
      method: "HEAD",
      ...options,
    }),
  options: (url, options) =>
    fetch(url, {
      method: "OPTIONS",
      ...options,
    }),
  trace: (url, options) =>
    fetch(url, {
      method: "TRACE",
      ...options,
    }),
  connect: (url, options) =>
    fetch(url, {
      method: "CONNECT",
      ...options,
    }),
};

class TypeoutUrl {
  /**
   * @param {typeof defaultConfig} config
   */
  constructor(config) {
    this["#config"] = Object.assign({}, defaultConfig, config);
    this["#path"] = [];
  }

  #config = {};
  #path = [];

  /**
   * Reset appended url segments and return them
   * @returns {string[]}
   */
  $reset() {
    const copy = this["#path"].slice();
    this["#path"].length = 0;
    return copy;
  }

  /**
   * Appends a path segment to the url
   * @param {string} path path segment to append
   */
  $append(path) {
    this["#path"].push(path);
  }

  /**
   * Returns the current url as a string
   * @returns {string} the url
   */
  $getURL() {
    return this["#path"].join("");
  }

  /**
   *
   * @param {string} method Request method
   * @param {*} body Request body if request method supports body, otherwise is request options
   * @param {*} [options] Request options if request method supports body, otherwise is undefined
   * @returns {Promise<*>}
   */
  $send(method, body, options) {
    const url = this.$getURL();
    const config = this["#config"];
    this.$reset();

    return config[method](url, body, options);
  }
}

const proxyOptions = {
  /**
   * @param {TypeoutUrl} target
   * @param {string} key
   * @param {any} receiver
   */
  get(target, key, receiver) {
    // check if we're trying to access a special method
    if (key.startsWith("$")) {
      // check if we're trying to reset the url
      if (key === "$reset") {
        return () => target.$reset();
      }

      // check if we're trying to send a request
      if (key === "$get") {
        return (options) => target.$send("get", options);
      }
      if (key === "$post") {
        return (body, options) => target.$send("post", body, options);
      }
      if (key === "$put") {
        return (body, options) => target.$send("put", body, options);
      }
      if (key === "$delete") {
        return (options) => target.$send("delete", options);
      }
      if (key === "$patch") {
        return (body, options) => target.$send("patch", body, options);
      }
      if (key === "$head") {
        return (options) => target.$send("head", options);
      }
      if (key === "$options") {
        return (options) => target.$send("options", options);
      }
      if (key === "$trace") {
        return (options) => target.$send("trace", options);
      }
      if (key === "$connect") {
        return (options) => target.$send("connect", options);
      }

      // check for special characters and map them to their url encoded equivalent
      if (key === "$s") key = "/";
      if (key === "$2s") key = "//";
      if (key === "$c") key = ":";
      if (key === "$q") key = "?";
      if (key === "$h") key = "#";
      if (key === "$at") key = "@";
      if (key === "$dot") key = ".";
      if (key === "$u") key = "_";
      if (key === "$d") key = "-";
      if (key === "$eq") key = "=";
      if (key === "$amp") key = "&";

      // if we didn't find a match, remove the $ from the key
      if (key.startsWith("$") && key.length > 1) {
        key = key.slice(1);
      }
    }

    console.log(target, key);
    target.$append(key);

    return receiver;
  },
};

/**
 *
 * @param {typeof defaultConfig} config config for handling different request methods
 * @returns {Client} TypeoutUrl instance wrapped in a proxy
 */
const initClient = (config) => {
  const client = new TypeoutUrl(config);

  const proxy = /** @type {Client} */ (
    /** @type {*} */ (new Proxy(client, proxyOptions))
  );

  return proxy;
};

module.exports = initClient;
