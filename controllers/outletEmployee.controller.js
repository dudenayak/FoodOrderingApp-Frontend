///<reference path="../index.js"/>

app.controller('outletEmployeeCtrl', [
  '$scope',
  '$location',
  '$http',
  'outletService',
  '$state',
  '$rootScope',
  function ($scope, $location, $http, outletService, $state, $rootScope) {
    // LOADING OUTLET INFORMATION
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.brandData = data;
    $scope.brandUsername = data.username;
    $scope.brandName = data.brandName;
    $scope.outletInfo = [];
    outletService
      .outletInfoEmp(data.outlet.outletId)
      .then(function (res) {
        $rootScope.outletInfo = res.data.outlet;
        $rootScope.outletName = res.data.outlet.outletName;
        $rootScope.outletId = res.data.outlet._id;
        localStorage.setItem('outletInfo', JSON.stringify(res.data.outlet));

        // LOADING FOOD ITEMS OF OUTLET
        var data = JSON.parse(localStorage.getItem('outletInfo'));
        // console.log(data);
        $scope.allItemOutlet = [];
        outletService
          .getOutletItems(data._id)
          .then(function (res) {
            $scope.allItemOutlet = res.data.foodItem;
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

    $scope.IsVisible = false;

    // ORDER LIST
    $scope.foodList = [];

    // CARD CLICK
    $scope.testDine = function (res) {
      console.log(res);
      $scope.add = function (food) {
        food.foodCategory.foodItemQuantity++;
      };
      $scope.subtract = function (food) {
        food.foodCategory.foodItemQuantity--;
      };
      $scope.getData = res;
      if ($scope.foodList.indexOf(res) === -1) {
        $scope.foodList.push(res);
      } else {
        $scope.foodList.splice($scope.foodList.indexOf(res), 1);
      }
      console.log($scope.foodList);
      $scope.foodItemImage = $scope.getData.foodCategory.foodItemImage;
      $scope.IsVisible = true;

      // // TOTAL
      // $scope.totalPrice = function () {
      //   var sum = 0;
      //   angular.forEach($scope.foodList, function (item, index) {
      //     sum += parseInt(
      //       food.foodCategory.foodItemQuantity *
      //         food.foodCategory.foodItemPrice,
      //       10
      //     );
      //   });
      //   return sum;
      // };
    //   for (var i = 0; i < $scope.foodList.length; i++) {
    //     // $scope.count = $scope.foodList[i].foodCategory.foodItemQuantity;
    //     $scope.totalPrice =
    //       parseInt($scope.totalPrice) +
    //       parseInt($scope.foodList[i].foodCategory.foodItemPrice);
    //   }
    //   console.log($scope.totalPrice);
    };

         // TOTAL
      $scope.totalPrice = function () {
        var sum = 0;
        angular.forEach($scope.foodList, function (item, index) {
          sum += parseInt(
            food.foodCategory.foodItemQuantity *
              food.foodCategory.foodItemPrice,
            10
          );
        });
        return sum;
      };

    // $scope.total =
    //   food.foodCategory.foodItemPrice * food.foodCategory.foodItemQuantity;
    //   console.log($scope.total)


    // $scope.sum = function () {
    //   var total = 0;
    //   angular.forEach($scope.foodList, function (key, value) {
    //     total += $scope.foodList.foodCategory.foodItemPrice;
    //   });
    //   return total;
    // };
  },
]);
