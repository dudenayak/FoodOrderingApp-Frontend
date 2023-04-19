///<reference path="../index.js"/>

// OUTLET CONTROLLER
app.controller('outletCtrl', [
  '$scope',
  '$element',
  'outletService',
  '$state',
  '$rootScope',
  '$window',
  function ($scope, $element, outletService, $state, $rootScope, $window) {
    // LOADING OUTLET INFORMATION
    var data = JSON.parse(localStorage.getItem('user'));
    // console.log(data);
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
        $scope.allItemOutlet = [];
        $scope.loading = true;
        outletService
          .getOutletItems(data[0]._id, 0)
          .then(function (res) {
            $scope.allItemOutlet = res.data.foodItem;
            $scope.loading = false;
          })
          .catch(function (err) {
            console.log(err);
            $scope.loading = false;
          });
      })
      .catch(function (err) {
        console.log(err);
      });

    // FORM EMPTY
    $scope.brandUser = {
      username: '',
      password: '',
      phone: '',
      email: '',
    };

    $element.on('hidden.bs.modal', function () {
      $scope.$apply(function () {
        $scope.brandUser = {};
      });
    });

    var data = JSON.parse(localStorage.getItem('outletInfo'));
    $scope.pageno = 0;
    $scope.next = function () {
      $scope.loading = true;
      $scope.allOutlets = [];
      outletService
        .getOutletItems(data[0]._id, ++$scope.pageno)
        .then(function (res) {
          $scope.allItemOutlet = res.data.foodItem;
          console.log($scope.allItemOutlet);
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };
    $scope.previous = function () {
      $scope.loading = true;
      $scope.allOutlets = [];
      outletService
        .getOutletItems(data[0]._id, --$scope.pageno)
        .then(function (res) {
          $scope.allItemOutlet = res.data.foodItem;
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

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
    $scope.loading = true;
    $scope.allSuper = [];
    outletService
      .getSuper(data.brandId)
      .then(function (res) {
        // console.log(res.data);
        $scope.allSuper = res.data.superFood;
        // console.log($scope.allSuper);
        $scope.loading = false;
      })
      .catch(function (err) {
        console.log(err);
        $scope.loading = false;
      });

    // addClass
    $scope.addClass = function (id) {
      if ($scope.foodId == id) {
        return 'bg-danger';
      }
    };

    $scope.addSubClass = function (id) {
      if ($scope.subId == id) {
        return 'bg-danger';
      }
    };

    $scope.addFoodClass = function (id) {
      if ($scope.foodItemId == id) {
        return 'bg-danger';
      }
    };

    // LOADING SUB
    $scope.superTest = function (id) {
      $scope.foodId = id;
      // console.log($scope.selectedSuperCategory);
      // console.log(id);
      // var data = JSON.parse(localStorage.getItem('user'));
      // console.log('object')

      // console.log($scope.selectedSuperCategory.brand.brandName);
      // console.log($scope.selectedSuperCategory.brand.brandId);
      // console.log($scope.selectedSuperCategory.superCategoryName);
      // console.log($scope.selectedSuperCategory._id);
      $scope.allSub = [];
      $scope.loading = true;
      outletService
        .fetchSub(id)
        .then(function (res) {
          // console.log(res);
          $scope.allSub = res.data.subFood;
          // $scope.sample = 'superCard1';
          // console.log($scope.allSub);
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

    // LOADING FOOD ITEMS
    $scope.subTest = function (id) {
      $scope.loading = true;
      $scope.subId = id;
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
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

    // LOADING FOOD ITEM DATA
    $scope.foodTest = function (res) {
      $scope.foodItemId = res._id;
      console.log($scope.foodItemId);
      $scope.newName = res;
      console.log($scope.newName);
    };

    // ADD FOOD ITEM PER OUTLET
    $scope.saveItem = function ($event) {
      $event.preventDefault();
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      // alert('Item added successfully!');
      // $window.location.reload();
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
          alert('Item added successfully!');
          $window.location.reload();
          console.log(res);
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
    // console.log($scope.outletData);
    // $scope.brandName = data[0].outletBrand.brandName;
    // $scope.brandId = data[0].outletBrand.brandId;
    $scope.saveEmployee = function ($event) {
      $scope.showPassword = false;
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
          alert('Employee created!');
          // $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  },
]);
