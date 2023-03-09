///<reference path="../index.js"/>

// BRAND CONTROLLER
app.controller('brandCtrl', [
  '$scope',
  '$location',
  '$window',
  '$http',
  'brandService',
  '$state',
  function ($scope, $location, $window, $http, brandService, $state) {
    // ADD OUTLET INFO AND OUTLET MANAGER INFO
    var data = JSON.parse(localStorage.getItem('user'));
    // console.log(data.brandId);
    $scope.brandData = data;
    $scope.brandUsername = data.username;
    // console.log(data.username);
    $scope.saveOutlet = function ($event) {
      $event.preventDefault();
      // console.log($scope.outletManager);
      $scope.outletManager.name = data.brandName;
      $scope.outletManager.id = data.brandId;
      // console.log(data.id);
      // console.log(data.brandName);
      brandService
        .createOutletManager($scope.outletManager)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      $state.go('login');
    };

    // LOADING OUTLETS
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allOutlets = [];
    brandService
      .getOutlets(data.brandId)
      .then(function (res) {
        // console.log(res);
        $scope.allOutlets = res.data.outlet;
        // console.log($scope.allOutlets.length);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING OUTLET MANAGER
    $scope.allManagers = [];
    brandService
      .getOutletManagers(data.brandId)
      .then(function (res) {
        $scope.allManagers = res.data.userData;
        // console.log($scope.allManagers);
      })
      .catch(function (err) {
        console.log(err);
      });

    // UPDATE OUTLET STATE
    $scope.handleToggle = function (res, _id) {
      if (res == true) {
        if (confirm('Are you sure you want to toggle off?')) {
          // console.log($scope.outlet);
          $http
            .put(
              'http://localhost:5000/outlet/' + _id + '/false',
              $scope.outlet
            )
            // superAdminService
            // .updateTrue($scope.outlet.id, $scope.outlet)
            .then(function (res) {
              // console.log($scope.outlet._id);
              // console.log(res);
              $window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      } else if (res == false) {
        if (confirm('Are you sure you want to toggle on?')) {
          // superAdminService;
          // .updateFalse($scope.outlet._id, $scope.outlet)
          $http
            .put('http://localhost:5000/outlet/' + _id + '/true', $scope.outlet)
            .then(function (res) {
              // console.log(res);
              $window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      }
    };

    // OPEN EDIT OUTLET MODAL
    $scope.openOutletModal = function (outletData) {
      $scope.outlet = [];
      brandService
        .editOutlet(outletData._id)
        .then(function (res) {
          // console.log(res);
          // console.log(outletData);
          $scope.outlet = outletData;
          console.log($scope.outlet);
        })
        .catch(function (err) {
          console.log(err);
        });
      // $http.get('#editOutletModal').modal('show');
    };

    // UPDATE OUTLET DATA
    $scope.saveOutletData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        brandService
          .updateOutlet($scope.outlet._id, $scope.outlet)
          .then(function (res) {
            console.log($scope.outlet.id);
            // console.log(res);
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };
  },
]);
