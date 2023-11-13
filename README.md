### TYPEOUT URL

Stop typing boring URLs as strings, use this package to type out URLs.

Why type

##### `/api/user?username=pr0h0`

when you can type

##### `$s.api.$s.user.$q.id.$eq.pr0h0`

### Installation

`npm install typeout-url`

### Usage

```javascript
const initClient = require('typeout-url');

// You can use axios or any other client
const axiosClient = axios.create({ ... });

// Initialize the client with any method you want, default fallback is fetch
const client = initClient({
  get: (url, options) => axiosClient.get(url, options),
  post: (url, body, options) => axiosClient.post(url, body, options),
  ...
});

// Use the client to make requests

// GET /api/user?username=pr0h0
const response = await client.$s.api.$s.user.$q.username.$eq.pr0h0.$get(options);

// POST /api/auth/login
client.$s.api.$s.auth.$s.login.$post(options).then(response => { ... });

// GET https://api.github.com/users/pr0h0
const response = await client.https.$c.$2s.api.$dot.github.$dot.com.$s.users.$q.username.$eq.pr0h0.$get(options);
```


### List of supported methods
| METHOD | ARGUMENTS |
| ------ | ----- |
| GET | `(url, options)` |
| POST | `(url, body, options)` |
| PUT | `(url, body, options)` |
| PATCH | `(url, body, options)` |
| DELETE | `(url, options)` |
| HEAD | `(url, options)` |
| OPTIONS | `(url, options)` |
| TRACE | `(url, options)` |
| CONNECT | `(url, options)` |

### List of supported URL parts
| PART  | DESCRIPTION   | EXAMPLE |
| :---: | :-----------: | :-----: |
| `$s`  | slash         | `/`     |
| `$2s` | double slash  | `//`    |
| `$c`  | colon         | `:`     |
| `$dot`| dot           | `.`     |
| `$q`  | question mark | `?`     |
| `$eq` | equal to      | `=`     |
| `$amp`| ampersand     | `&`     |
| `$h`  | hash          | `#`     |
| `$u`  | underscore    | `_`     |
| `$d`  | dash          | `-`     |
| `$at` | at            | `@`     |

### Explanation
Each time you start with `client.part1.part2.$dot.part4`, each part and every other symbol will be added to the internal path array and will be used to build the final URL.
Once you call `$get`, `$post`, or some of the other methods, the internal path array will be used to build the final URL, empty the array, and call one of the methods provided in initClient or use default implementation with fetch and send request.
At any moment you can call `$reset` to empty the internal path array.

### Contributing
Feel free to open issues and pull requests.