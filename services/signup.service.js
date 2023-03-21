///<reference path="../index.js"/>

app.service('signupService', [
  '$http',
  function ($http) {
    var url = '';
    return {
      loginUser: function (user) {
        url = 'http://localhost:5000/api/auth/login';
        return $http.post(url, user);
      },
    };
  },
]);
