///<reference path="../index.js"/>

// LOGIN CONTROLLER
app.controller('myCtrl', [
  '$scope',
  '$location',
  '$window',
  'signupService',
  function ($scope, $location, $window, signupService) {
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
          alert('Logged in successfully!');
          // console.log(res);
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('token', res.data.token);
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
          alert('Enter valid details!');
          console.log(err);
        });
    };
  },
]);

// app.factory('getLocalStorage', function () {
//   var userList = {};
//   return {
//     list: userList,
//     updateUsers: function (usersArray) {
//       if (window.localStorage && usersArray) {
//         // method used to store data in local storage
//         localStorage.setItem('users', angular.toJson(usersArray));
//       }
//       userList = usersArray;
//     },
//     getUsers: function () {
//       // method used to get data from local storage
//       userList = angular.fromJson(localStorage.getItem('users'));
//       return userList ? userList : [];
//     },
//   };
// });
