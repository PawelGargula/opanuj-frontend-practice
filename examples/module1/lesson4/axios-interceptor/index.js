// import axios from 'axios';

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   config.metadata = { startTime: new Date() };
//   return config;
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   const {
//     config: { url, metadata },
//   } = response;
//   const endTimestamp = Date.now();
//   console.log(`Request to ${url} took ${endTimestamp - metadata.startTime}ms`);
//   return response;
// });

// const { data: articles } = await axios.get('/api/data/articles?timeout=3000');

// document.querySelector('#data').innerHTML = articles[0].content;

const fetchProxy = new Proxy(fetch, {
  async apply(target, thisArg, args) {
    const [url, options] = args;
    const startTime = Date.now();
    const response = await target(url, options);
    const endTime = Date.now();
    console.log(`Request to ${url} took ${endTime - startTime}ms`);
    return response;
  },
});

fetchProxy('/api/data/articles?timeout=3000')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector('#data').innerHTML = data[0].content;
  });
