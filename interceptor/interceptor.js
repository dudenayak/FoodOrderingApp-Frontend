// ///<reference path="../index.js"/>
// var interceptorRequest = function ($q) {
//   return {
//     request: function (config) {
//       console.log('request Started');
//       //adding the token to the header
//       //bearer token
//       //creating the string with bearer and token
//       config.headers['Authorization'] =
//         'Bearer ' + localStorage.getItem('token');
//       return config;
//     },
//     responseError: function (rejection) {
//       //if the token is expired then redirect to login page
//       if (rejection.status === 401) {
//         location.href = '/index.html#!/';
//       }
//       return $q.reject(rejection);
//     },
//     response: function (response) {
//       return response;
//     },
//     requestError: function (rejection) {
//       return $q.reject(rejection);
//     },
//   };
// };

// myapp = angular.module('myapp', ['ui.router']).config(function ($httpProvider) {
//   $httpProvider.interceptors.push(interceptorRequest);
// });

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push(function () {
    return {
      request: function (req) {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        // Set the `Authorization` header for every outgoing HTTP request
        req.headers.Authorization = token;
        return req;
      },
    };
  });
});
