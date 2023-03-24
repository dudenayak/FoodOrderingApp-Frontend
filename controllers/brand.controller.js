///<reference path="../index.js"/>

// BRAND DIRECTIVE
app.directive('fileModel', [
  '$parse',
  function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      },
    };
  },
]);

// BRAND CONTROLLER
app.controller('brandCtrl', [
  '$scope',
  '$window',
  '$http',
  'brandService',
  '$state',
  function ($scope, $window, $http, brandService, $state) {
    // IMAGE TEST
    $scope.imageTest = function () {
      console.log($scope.superFood.superCategoryImage);
    };
    $scope.imageTestnew = function () {
      console.log($scope.foodItem.foodItemImage);
    };
    // TEST
    $scope.test = function () {
      // console.log("object")
      console.log($scope.selectedSuperCategory);
      console.log($scope.selectedSuperCategory.brand.brandName);
      console.log($scope.selectedSuperCategory.brand.brandId);
      console.log($scope.selectedSuperCategory.superCategoryName);
      console.log($scope.selectedSuperCategory._id);
    };

    $scope.testSub = function () {
      console.log($scope.selectedSubCategory);
      console.log($scope.selectedSubCategory._id);
      console.log($scope.selectedSubCategory.subCategoryName);
      console.log($scope.selectedSubCategory.superCategory.superId);
      console.log($scope.selectedSubCategory.superCategory.superName);
      console.log($scope.selectedSubCategory.brand.brandId);
      console.log($scope.selectedSubCategory.brand.brandName);
    };

    // ADD OUTLET INFO AND OUTLET MANAGER INFO
    var data = JSON.parse(localStorage.getItem('user'));
    // console.log(data.brandId);
    // console.log(data);
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

    // ADD SUPER CATEGORY

    // formData.append('image2', file2);
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.saveSuper = function ($event) {
      var formData = new FormData();
      formData.append('superCategoryName', $scope.superFood.superCategoryName);
      formData.append('file', $scope.superFood.superCategoryImage);
      console.log($scope.superFood.superCategoryImage);
      formData.append(
        'superCategoryDescription',
        $scope.superFood.superCategoryDescription
      );
      formData.append('brandName', data.brandName);
      console.log(data.brandName);
      console.log(data.brandId);
      formData.append('brandId', data.brandId);

      $event.preventDefault();
      console.log($scope.superFood);
      $scope.superFood.name = data.brandName;
      $scope.superFood.id = data.brandId;
      // console.log(data.id);
      // console.log(data.brandName);
      brandService
        .createSuper(formData, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined },
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
          $window.location.reload();
        });
    };

    // ADD SUB CATEGORY
    $scope.saveSub = function ($event) {
      $event.preventDefault();
      console.log($scope.selectedSuperCategory);
      $scope.subFood.brandName = $scope.selectedSuperCategory.brand.brandName;
      $scope.subFood.brandId = $scope.selectedSuperCategory.brand.brandId;
      $scope.subFood.superName = $scope.selectedSuperCategory.superCategoryName;
      $scope.subFood.superId = $scope.selectedSuperCategory._id;
      // console.log(data.id);
      // console.log(data.brandName);
      brandService
        .createSub($scope.subFood)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // ADD FOOD CATEGORY
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.saveFood = function ($event) {
      alert('Item added successfully!');
      $window.location.reload();
      console.log($scope.foodItem);
      var formDataFood = new FormData();
      formDataFood.append('foodItemName', $scope.foodItem.foodItemName);
      formDataFood.append('file', $scope.foodItem.foodItemImage);
      formDataFood.append('foodItemPrice', $scope.foodItem.foodItemPrice);

      // $event.preventDefault();
      $scope.foodItem.brandId = $scope.selectedSubCategory.brand.brandId;
      $scope.foodItem.brandName = $scope.selectedSubCategory.brand.brandName;
      $scope.foodItem.superId =
        $scope.selectedSubCategory.superCategory.superId;
      $scope.foodItem.superName =
        $scope.selectedSubCategory.superCategory.superName;
      $scope.foodItem.subId = $scope.selectedSubCategory._id;
      $scope.foodItem.subName = $scope.selectedSubCategory.subCategoryName;
      formDataFood.append('brandId', $scope.foodItem.brandId);
      formDataFood.append('brandName', $scope.foodItem.brandName);
      formDataFood.append('superId', $scope.foodItem.superId);
      formDataFood.append('superName', $scope.foodItem.superName);
      formDataFood.append('subId', $scope.foodItem.subId);
      formDataFood.append('subName', $scope.foodItem.subName);
      // console.log(data.id);
      // console.log(data.brandName);
      brandService
        .createFood(formDataFood, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined },
        })
        .then(function (res) {
          console.log(res);
          alert('Item added successfully!');
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOADING SUB
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allSub = [];
    brandService
      .getSub(data.brandId)
      .then(function (res) {
        // console.log(res.data);
        $scope.allSub = res.data.subFood;
        // console.log($scope.allSub);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING SUPER
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allSuper = [];
    brandService
      .getSuper(data.brandId)
      .then(function (res) {
        // console.log(res.data.superFood[0].brand.brandId);
        $scope.allSuper = res.data.superFood;
        // console.log($scope.allSuper);
      })
      .catch(function (err) {
        console.log(err);
      });

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
              'http://localhost:5000/api/outlet/' + _id + '/false',
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
            .put(
              'http://localhost:5000/api/outlet/' + _id + '/true',
              $scope.outlet
            )
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
