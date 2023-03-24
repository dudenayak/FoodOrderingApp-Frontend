///<reference path="../index.js"/>

app.controller('outletEmployeeCtrl', [
  '$scope',
  '$window',
  '$location',
  'outletService',
  '$state',
  '$rootScope',
  function ($scope, $window, $location, outletService, $state, $rootScope) {
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
      // console.log(res);

      $scope.add = function (food) {
        food.foodCategory.foodItemQuantity++;
      };
      $scope.subtract = function (food) {
        food.foodCategory.foodItemQuantity--;
        if (food.foodCategory.foodItemQuantity < 1) {
          $scope.foodList.splice($scope.foodList.indexOf(food), 1);
        }
      };
      $scope.getData = res;
      if ($scope.foodList.indexOf(res) === -1) {
        $scope.foodList.push(res);
      } else {
        $scope.foodList.splice($scope.foodList.indexOf(res), 1);
      }
      console.log($scope.foodList);
      $scope.IsVisible = true;

      // TOTAL
      $scope.total;
      $scope.cgst;
      $scope.getTotal = function () {
        $scope.total = 0;

        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.total +=
            food.foodCategory.foodItemPrice *
            food.foodCategory.foodItemQuantity;
        }
        $scope.cgst = parseInt(($scope.total / 100) * 2.5);
        $scope.gst = $scope.cgst + $scope.cgst;
        return $scope.total;
      };
      $scope.getCGST = function () {
        return $scope.cgst;
      };

      $scope.getTax = function () {
        return ($scope.finalTax = $scope.gst);
      };

      $scope.getSum = function () {
        return ($scope.finalSum = $scope.total + $scope.gst);
      };

      // CREATE ORDER
      $scope.orderDineIn = {
        orderItems: $scope.foodList,
        orderTotal: $scope.finalSum,
        orderTax: $scope.finalTax,
      };

      $scope.createOrder = function ($event) {
        $event.preventDefault();
        // if (angular.equals($scope.orderDineIn, {})) {
        // alert('Please add items!');
        // } else {
        // console.log($scope.orderDineIn);
        var finalObj = {
          orderItems: $scope.foodList,
          orderTotal: $scope.finalSum,
          orderTax: $scope.finalTax,
        };
        console.log(finalObj);
        outletService
          .createOrderDineIn(finalObj)
          .then(function (res) {
            console.log(res);
            alert('Item added successfully!');
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      };
    };

    // TAKE AWAY
    $scope.testTake = function (res) {
      // console.log(res);

      $scope.add = function (food) {
        food.foodCategory.foodItemQuantity++;
      };
      $scope.subtract = function (food) {
        food.foodCategory.foodItemQuantity--;
        if (food.foodCategory.foodItemQuantity < 1) {
          $scope.foodList.splice($scope.foodList.indexOf(food), 1);
        }
      };
      $scope.getData = res;
      if ($scope.foodList.indexOf(res) === -1) {
        $scope.foodList.push(res);
      } else {
        $scope.foodList.splice($scope.foodList.indexOf(res), 1);
      }
      console.log($scope.foodList);
      $scope.IsVisible = true;

      // TOTAL
      $scope.total;
      $scope.cgst;
      $scope.getTotal = function () {
        $scope.total = 0;

        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.total +=
            food.foodCategory.foodItemPrice *
            food.foodCategory.foodItemQuantity;
        }
        $scope.cgst = parseInt(($scope.total / 100) * 2.5);
        $scope.gst = $scope.cgst + $scope.cgst;
        return $scope.total;
      };
      $scope.getCGST = function () {
        return $scope.cgst;
      };

      $scope.getTax = function () {
        return ($scope.finalTax = $scope.gst);
      };

      $scope.getSum = function () {
        return ($scope.finalSum = $scope.total + $scope.gst);
      };

      // CREATE ORDER
      $scope.orderDineIn = {
        orderItems: $scope.foodList,
        orderTotal: $scope.finalSum,
        orderTax: $scope.finalTax,
      };

      $scope.createOrder = function ($event) {
        $event.preventDefault();
        // if (angular.equals($scope.orderDineIn, {})) {
        // alert('Please add items!');
        // } else {
        // console.log($scope.orderDineIn);
        var finalObj = {
          orderItems: $scope.foodList,
          orderTotal: $scope.finalSum,
          orderTax: $scope.finalTax,
        };
        console.log(finalObj);
        outletService
          .createOrderTakeAway(finalObj)
          .then(function (res) {
            console.log(res);
            alert('Item added successfully!');
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      };
    };

    // LOADING ORDERS OF OUTLET
    var data = JSON.parse(localStorage.getItem('outletInfo'));
    $scope.allOrders = [];
    outletService
      .getOrders(data._id)
      .then(function (res) {
        $scope.allOrders = res.data.order;
        console.log($scope.allOrders);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING PREPARING ORDERS
    // var data = JSON.parse(localStorage.getItem('outletInfo'));
    $scope.allPrepare = [];
    outletService
      .getPreparingStatusOrders(data._id)
      .then(function (res) {
        $scope.allPrepare = res.data.statusPreparing;
        console.log($scope.allPrepare);
      })
      .catch(function (err) {
        console.log(err);
      });
    $scope.preparingOrders = function () {
      outletService
        .getPreparingStatusOrders(data._id)
        .then(function (res) {
          $scope.allPrepare = res.data.statusPreparing;
          console.log($scope.allPrepare);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOADING READY ORDERS
    $scope.readyOrders = function () {
      outletService
        .getReadyStatusOrders(data._id)
        .then(function (res) {
          $scope.allPrepare = res.data.statusReady;
          console.log($scope.allPrepare);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    $scope.allOutletOrders = function () {
      // console.log(data);
      outletService
        .getOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.order;
          console.log($scope.allOrders);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // DINE IN ORDERS
    $scope.dineInOrders = function () {
      outletService
        .getDineInOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.dineIn;
          console.log($scope.allOrders);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // TAKE AWAY ORDERS
    $scope.takeAwayOrders = function () {
      outletService
        .getTakeAwayOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.takeAway;
          console.log($scope.allOrders);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // UPDATE ORDER STATUS TO READY
    $scope.statusReadyButton = function (id, orderStatus) {
      console.log(id, orderStatus);
      var status = orderStatus == 'Preparing' ? 'Ready' : 'Served';
      console.log(status);
      outletService
        .updateStatus(id, status)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // UPDATE ORDER STATUS TO CANCELLED
    $scope.order = [];
    $scope.statusCancelledButton = function (id, order) {
      console.log(id, order);
      outletService
        .updateCancelledStatus(id)
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
