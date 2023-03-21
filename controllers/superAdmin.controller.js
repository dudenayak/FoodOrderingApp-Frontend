///<reference path="../index.js"/>

// SUPER ADMIN CONTROLLER
app.controller('superCtrl', [
  '$scope',
  '$http',
  '$window',
  'superAdminService',
  function ($scope, $http, $window, superAdminService) {
    // ADD BRAND INFO AND ADMIN INFO
    $scope.openModal = function () {
      // $http('#createModal').modal('show');
    };

    $scope.registerBrand = [];

    $scope.saveBrand = function ($event) {
      $event.preventDefault();
      // $http.post('http://localhost:5000/brand/registerBrand', $scope.brandUser)
      superAdminService
        .createBrandUser($scope.brandUser)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // Loading brand data from DB
    $scope.allBrands = [];
    superAdminService
      .getBrands()
      .then(function (res) {
        // $scope.allBrands = res.data.brandData;
        $scope.allBrands.splice(
          0,
          $scope.allBrands.length,
          ...res.data.brandData
        );
        // console.log($scope.allBrands.length);
      })
      .catch(function (err) {
        console.log(err);
      });

    // Loading owner data from DB
    $scope.allOwners = [];
    superAdminService
      .getBrandOwners()
      .then(function (res) {
        $scope.allOwners = res.data.userData;
        // console.log($scope.allOwners);
      })
      .catch(function (err) {
        console.log(err);
      });

    // OPEN EDIT MODAL OWNER
    $scope.openModalEditOwner = function (ownerData) {
      $scope.owner = {};
      $scope.owner.username = ownerData.username;
      $scope.owner.brandName = ownerData.brand.brandName;
      // console.log($scope.owner.brandname);
      $scope.owner.phone = ownerData.phone;
      $scope.owner.email = ownerData.email;
      $scope.owner.id = ownerData._id;
      // $http.get('#editModalOwner').modal('show');
    };

    // UPDATE BRAND OWNER DATA
    $scope.saveOwnerData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        // console.log($scope.owner);
        superAdminService
          .updateOwner($scope.owner.id, $scope.owner)
          .then(function (res) {
            // console.log(res);
            $window.location.reload();
            // console.log($scope.owner);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    // OPEN EDIT MODAL
    $scope.openModalEdit = function (brandData) {
      $scope.brand = [];
      superAdminService
        .editBrand(brandData._id)
        .then(function (res) {
          $scope.brand = res.data.brand;
        })
        .catch(function (err) {
          console.log(err);
        });
      // $http.get('#editModal').modal('show');
    };

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('outletInfo');
      $state.go('login');
    };

    // UPDATE BRAND DATA
    $scope.saveData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        superAdminService
          .updateBrand($scope.brand._id, $scope.brand)
          .then(function (res) {
            // console.log($scope.brand.id);
            // console.log(res);
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    // UPDATE BRAND STATE
    $scope.handleToggle = function (res, _id) {
      if (res == true) {
        if (confirm('Are you sure you want to toggle off?')) {
          $http
            .put('http://localhost:5000/api/brand/' + _id + '/false', $scope.brand)
            // superAdminService
            // .updateTrue($scope.brand.id, $scope.brand)
            .then(function (res) {
              // console.log($scope.brand._id);
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
          // .updateFalse($scope.brand._id, $scope.brand)
          $http
            .put('http://localhost:5000/api/brand/' + _id + '/true', $scope.brand)
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
  },
]);
