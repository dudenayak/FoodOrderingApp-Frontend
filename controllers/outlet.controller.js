///<reference path="../index.js"/>

// OUTLET CONTROLLER
app.controller('outletCtrl', [
  '$scope',
  '$location',
  '$http',
  'outletService',
  '$state',
  '$rootScope',
  function ($scope, $location, $http, outletService, $state, $rootScope) {
    // LOADING OUTLET INFORMATION
    var data = JSON.parse(localStorage.getItem('user'));
    console.log(data);
    // $scope.outletName = data.outlet[0].outletName;
    // console.log($scope.outletInfo)
    $scope.brandData = data;
    $scope.brandUsername = data.username;
    $scope.brandName = data.brandName;
    $scope.outletInfo = [];
    outletService
      .outletInfo(data.id)
      // console.log(data)
      .then(function (res) {
        // ID NAME OF OUTLET ARE COMING FROM HERE
        // console.log(res.data.outlet[0]._id);
        // console.log(res.data.outlet[0].outletName);
        $rootScope.outletInfo = res.data.outlet;
        $rootScope.outletName = res.data.outlet[0].outletName;
        $rootScope.outletId = res.data.outlet[0]._id;
        localStorage.setItem('outletInfo', JSON.stringify(res.data.outlet));
        // console.log($rootScope.outletInfo);
        // LOADING FOOD ITEMS OF OUTLET
        var data = JSON.parse(localStorage.getItem('outletInfo'));
        console.log(data);
        $scope.allItemOutlet = [];
        // console.log(data[0]._id)
        outletService
          .getOutletItems(data[0]._id)
          .then(function (res) {
            // console.log(res);
            $scope.allItemOutlet = res.data.foodItem;
            // console.log($scope.allItemOutlet);
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('outletInfo');
      $state.go('login');
    };

    // // LOADING FOOD ITEMS OF OUTLET
    // var data = JSON.parse(localStorage.getItem('outletInfo'));
    // $scope.allItemOutlet = [];
    // // console.log(data[0]._id)
    // outletService
    //   .getOutletItems(data[0]._id)
    //   .then(function (res) {
    //     // console.log(res);
    //     $scope.allItemOutlet = res.data.foodItem;
    //     // console.log($scope.allItemOutlet);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    // LOADING SUPER
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allSuper = [];
    outletService
      .getSuper(data.brandId)
      .then(function (res) {
        // console.log(res.data);
        $scope.allSuper = res.data.superFood;
        // console.log($scope.allSuper);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING SUB
    $scope.superTest = function (id) {
      // console.log($scope.selectedSuperCategory);
      // console.log(id);
      // var data = JSON.parse(localStorage.getItem('user'));
      // console.log('object')

      // console.log($scope.selectedSuperCategory.brand.brandName);
      // console.log($scope.selectedSuperCategory.brand.brandId);
      // console.log($scope.selectedSuperCategory.superCategoryName);
      // console.log($scope.selectedSuperCategory._id);
      $scope.allSub = [];
      outletService
        .fetchSub(id)
        .then(function (res) {
          // console.log(res);
          $scope.allSub = res.data.subFood;
          // $scope.sample = 'superCard1';
          console.log($scope.allSub);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOADING FOOD ITEMS
    $scope.subTest = function (id) {
      // console.log(id);
      // var data = JSON.parse(localStorage.getItem('user'));
      $scope.allItem = {};
      // console.log($scope.allItem);
      outletService
        .fetchItem(id)
        .then(function (res) {
          // console.log(res);
          $scope.allItem = res.data.Food;
          console.log($scope.allItem);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOADING FOOD ITEM DATA
    $scope.foodTest = function (res) {
      // var data = JSON.parse(localStorage.getItem('outletInfo'));
      // $event.preventDefault();
      // $scope.outletId = data[0]._id;
      // $scope.outletName = data[0].outletName;
      $scope.newName = res;
      console.log($scope.newName);
      // console.log(res._id);
      // console.log(res.foodItemName);
      // console.log(res.foodItemPrice);
      // res.outletId = $scope.outletId;
      // res.outletName = $scope.outletName;
      // console.log(res);
      // outletService
      //   .createOutletItem(res)
      //   .then(function (res) {
      //     console.log(res);
      //     $window.location.reload();
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    };

    // var data = JSON.parse(localStorage.getItem('outletInfo'));
    // console.log(data[0].outletName);
    // console.log(data[0]._id);
    // console.log($rootScope.outletName)
    // console.log(res.data.outlet[0].outletName);

    // ADD FOOD ITEM PER OUTLET
    $scope.saveItem = function ($event) {
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      $event.preventDefault();
      $scope.outletId = data[0]._id;
      $scope.outletName = data[0].outletName;
      $scope.newName.outletId = $scope.outletId;
      $scope.newName.outletName = $scope.outletName;
      console.log($scope.newName);
      // console.log($scope.allItem.outletName);
      // console.log(data.id);
      // console.log(data.brandName);
      outletService
        .createOutletItem($scope.newName)
        .then(function (res) {
          console.log(res);
          // $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // CHECK
    // var data = JSON.parse(localStorage.getItem('outletInfo'));
    // $scope.outletId = data[0]._id;
    // $scope.outletName = data[0].outletName;

    // ADD OUTLET EMPLOYEE
    var data = JSON.parse(localStorage.getItem('outletInfo'));
    // console.log(data);
    $scope.outletData = data;
    // $scope.brandName = data[0].outletBrand.brandName;
    // $scope.brandId = data[0].outletBrand.brandId;
    $scope.saveEmployee = function ($event) {
      $event.preventDefault();
      $scope.outletEmployee = {};
      $scope.outletEmployee.outletId = data[0]._id;
      $scope.outletEmployee.outletName = data[0].outletName;
      $scope.outletEmployee.brandId = data[0].outletBrand.brandId;
      $scope.outletEmployee.brandName = data[0].outletBrand.brandName;
      $scope.outletEmployee.username = $scope.brandUser.username;
      $scope.outletEmployee.password = $scope.brandUser.password;
      $scope.outletEmployee.phone = $scope.brandUser.phone;
      $scope.outletEmployee.email = $scope.brandUser.email;
      console.log($scope.outletEmployee);
      outletService
        .createOutletEmployee($scope.outletEmployee)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  },
]);
