///<reference path="../index.js"/>

// LOGIN CONTROLLER
app.controller('myCtrl', [
  '$scope',
  '$location',
  '$http',
  '$window',
  'getLocalStorage',
  '$rootScope',
  'signupService',
  function (
    $scope,
    $location,
    $http,
    $window,
    getLocalStorage,
    $rootScope,
    signupService
  ) {
    $scope.check = function () {
      return $scope.password == $scope.cpassword;
    };
    $scope.reload = function () {
      $window.location.href = '../index.html';
    };

    // LOGIN TO DESIGNATED PAGE
    $scope.login = function ($event) {
      $event.preventDefault();
      var userData = {
        username: $scope.username,
        password: $scope.password,
      };
      signupService
        .loginUser(userData)
        .then(function (res) {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res.data));
          // $window.location.reload();
          if (res.data.userType == 'admin') {
            $location.path('/dashboard/superAdminPortal');
          }
          if (res.data.userType == 'brandOwner') {
            // console.log('object');
            $location.path('/panel/brandPortal');
          }
          if (res.data.userType == 'outletManager') {
            $location.path('/outlet/outletPortal');
          }
          if (res.data.userType == 'outletEmployee') {
            $location.path('/outletEmployee/outletEmployeePortal');
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // GET DATA FROM LOCAL STORAGE
    $scope.loadData = function () {
      $location.path('/home');
      if (
        $scope.users.some((data) => {
          return (
            (data.email == $scope.username_login ||
              data.username == $scope.username_login) &&
            data.password == $scope.password_login
          );
        })
      ) {
        let currUser = $scope.users.map((data) => {
          return (
            data.username == $scope.username_login ||
            (data.email == $scope.username_login &&
              data.password == $scope.username_password)
          );
        })[0];
        console.log($scope.currUser);
        alert('User logged in successfully!');
        localStorage.setItem('code', 'secret');
        $location.path('/home');
      } else {
        alert('Login failed! Please try again!');
      }
    };
  },
]);

app.factory('getLocalStorage', function () {
  var userList = {};
  return {
    list: userList,
    updateUsers: function (usersArray) {
      if (window.localStorage && usersArray) {
        // method used to store data in local storage
        localStorage.setItem('users', angular.toJson(usersArray));
      }
      userList = usersArray;
    },
    getUsers: function () {
      // method used to get data from local storage
      userList = angular.fromJson(localStorage.getItem('users'));
      return userList ? userList : [];
    },
  };
});
