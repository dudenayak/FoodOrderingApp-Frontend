///<reference path="../index.js"/>

app.controller('outletEmployeeCtrl', [
  '$scope',
  '$window',
  'outletService',
  'socketService',
  '$state',
  '$rootScope',
  function ($scope, $window, outletService, socketService, $state, $rootScope) {
    // LOADING OUTLET INFORMATION

    var data = JSON.parse(localStorage.getItem('user'));
    $scope.brandData = data;
    $scope.brandUsername = data.username;
    $scope.brandName = data.brandName;
    $scope.brandId = data.brandId;
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
        $scope.loading = true;
        $scope.allItemOutlet = [];
        outletService
          .showOutletItems(data._id)
          // console.log(data._id)
          .then(function (res) {
            // console.log($scope.allItemOutlet);
            $scope.allItemOutlet = res.data.showFoodItem;
            $scope.loading = false;
          })
          .catch(function (err) {
            console.log(err);
            $scope.loading = false;
          });

        // LOADING RECOMMENENDED ITEMS
        var data = JSON.parse(localStorage.getItem('outletInfo'));
        $scope.allSpecial = [];
        outletService
          .recommendedItems(data._id)
          .then(function (res) {
            $scope.allSpecial = res.data.recommendedItems;
            // console.log($scope.allSpecial);
          })
          .catch(function (err) {
            console.log(err);
          });

        // LOADING CONTENT BASED ITEMS
        // var data = JSON.parse(localStorage.getItem('outletInfo'));
        // $scope.allContentBasedItems = [];
        // outletService
        //   .contentBasedOrders(data._id)
        //   .then(function (res) {
        //     $scope.allContentBasedItems = res.data.contentBasedOrders;
        //     console.log($scope.allContentBasedItems);
        //   })
        //   .catch(function (err) {
        //     console.log(err);
        //   });

        // LOADING ORDERS OF OUTLET
        $scope.pageno = 0;
        $scope.next = function () {
          $scope.loading = true;
          $scope.allOrders = [];
          outletService
            .getOrders(data._id, ++$scope.pageno)
            .then(function (res) {
              $scope.allOrders = res.data.order;
              $scope.loading = false;
            })
            .catch(function (err) {
              console.log(err);
              $scope.loading = false;
            });
        };
        $scope.previous = function () {
          $scope.loading = true;
          $scope.allOrders = [];
          outletService
            .getOrders(data._id, --$scope.pageno)
            .then(function (res) {
              $scope.allOrders = res.data.order;
              $scope.loading = false;
            })
            .catch(function (err) {
              console.log(err);
              $scope.loading = false;
            });
        };
        $scope.allOrders = [];
        outletService
          .getOrders(data._id, 0)
          .then(function (res) {
            $scope.allOrders = res.data.order;
          })
          .catch(function (err) {
            console.log(err);
          });

        // LOADING PREPARING ORDERS
        $scope.allPrepare = [];
        socketService.getSocketInstance().on('newOrder', function (socketData) {
          if (socketData.outlet.outletId == data._id) {
            $scope.$apply(function () {
              $scope.allPrepare.push(socketData);
              // console.log($scope.allPrepare);
            });
          }
          console.log(socketData);
        });
        outletService
          .getPreparingStatusOrders(data._id)
          .then(function (res) {
            $scope.allPrepare = res.data.statusPreparing;
          })
          .catch(function (err) {
            console.log(err);
          });

        // $scope.allPrepare = [];
        // $scope.$on('newOrderCreated', function (event, data) {
        //   $scope.allPrepare.push(data);
        // });

        // outletService
        //   .getPreparingStatusOrders(data._id)
        //   .then(function (res) {
        //     $scope.allPrepare = res.data.statusPreparing;
        //   })
        //   .catch(function (err) {
        //     console.log(err);
        //   });

        $scope.preparingOrders = function () {
          outletService
            .getPreparingStatusOrders(data._id)
            // console.log(data._id)
            .then(function (res) {
              $scope.allPrepare = res.data.statusPreparing;
              console.log($scope.allPrepare);
            })
            .catch(function (err) {
              console.log(err);
            });
        };
      })

      .catch(function (err) {
        console.log(err);
      });

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('outletInfo');
      localStorage.removeItem('token');
      $state.go('login');
    };

    $scope.IsVisible = false;

    // ORDER LIST
    $scope.foodList = [];

    // CARD CLICK
    $scope.testDine = function (res) {
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
      $scope.total = 0;
      $scope.totalTax = 0;
      $scope.cgst = 0;
      $scope.taxes = 0;
      $scope.gst = 0;
      $scope.finalTax = 0;
      $scope.finalSum = 0;

      $scope.getTotal = function () {
        // console.log($scope.total);
        $scope.total = 0;
        // $scope.totalTax = 0;

        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.total +=
            food.foodCategory.foodItemPrice *
            food.foodCategory.foodItemQuantity;

          // $scope.totalTax += food.foodCategory.foodItemTax;
        }
        $scope.cgst = parseInt(($scope.total / 100) * 2.5);
        $scope.gst = $scope.cgst + $scope.taxes;
        return $scope.total;
        // $scope.taxes = $scope.totalTax;
        // $scope.gst = $scope.cgst + $scope.taxes;
      };

      $scope.getTotalTaxes = function () {
        console.log($scope.totalTax);
        $scope.totalTax = 0;
        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.totalTax += parseInt(food.foodCategory.foodItemTax);
        }
        $scope.taxes = $scope.totalTax;
        return $scope.totalTax;
      };

      $scope.getTaxDetails = function () {
        return $scope.taxes;
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
      // console.log($rootScope.outletName);
      // console.log($rootScope.outletId);

      $scope.createOrder = function ($event) {
        $event.preventDefault();
        // if (angular.equals($scope.orderDineIn, {})) {
        // alert('Please add items!');
        // } else {
        // console.log($scope.orderDineIn);
        var newOrder = {
          outletId: $scope.outletId,
          outletName: $scope.outletName,
          brandId: $scope.brandId,
          brandName: $scope.brandName,
          customerName: $scope.customerName,
          customerPhone: $scope.customerPhone,
          orderItems: $scope.foodList,
          orderTotal: $scope.finalSum,
          orderTax: $scope.finalTax,
        };
        console.log(newOrder);
        outletService
          .createOrderDineIn(newOrder)
          .then(function (res) {
            console.log(res);
            alert('Item added successfully!');
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      };
      // $scope.socket = function(){

      // }
      // var socket = io.connect();
      // socket.on('newOrder', function (order) {
      //   $scope.allPrepare.push(order);
      // });

      //   $scope.createOrder = function ($event) {
      //     $event.preventDefault();
      //     var newOrder = {
      //       outletId: $scope.outletId,
      //       outletName: $scope.outletName,
      //       brandId: $scope.brandId,
      //       brandName: $scope.brandName,
      //       customerName: $scope.customerName,
      //       customerPhone: $scope.customerPhone,
      //       orderItems: $scope.foodList,
      //       orderTotal: $scope.finalSum,
      //       orderTax: $scope.finalTax,
      //     };
      //     outletService
      //       .createOrderDineIn(newOrder)
      //       .then(function (res) {
      //         // Emit a socket event to notify the server about the new order
      //         socket.emit('newOrder', res.data);

      //         alert('Item added successfully!');
      //       })
      //       .catch(function (err) {
      //         console.log(err);
      //       });
      //   };
    };

    // io.on('connection', function (socket) {
    //   socket.on('newOrder', function (order) {
    //     // Save the new order to the database
    //     // ...

    //     // Emit the new order to all connected clients
    //     io.emit('newOrder', order);
    //   });
    // });

    // TAKE AWAY
    $scope.testTake = function (res) {
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
      $scope.total = 0;
      $scope.totalTax = 0;
      $scope.cgst = 0;
      $scope.taxes = 0;
      $scope.gst = 0;
      $scope.finalTax = 0;
      $scope.finalSum = 0;

      $scope.getTotal = function () {
        // console.log($scope.total);
        $scope.total = 0;
        // $scope.totalTax = 0;

        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.total +=
            food.foodCategory.foodItemPrice *
            food.foodCategory.foodItemQuantity;

          // $scope.totalTax += food.foodCategory.foodItemTax;
        }
        $scope.cgst = parseInt(($scope.total / 100) * 2.5);
        $scope.gst = $scope.cgst + $scope.taxes;
        return $scope.total;
        // $scope.taxes = $scope.totalTax;
        // $scope.gst = $scope.cgst + $scope.taxes;
      };

      $scope.getTotalTaxes = function () {
        console.log($scope.totalTax);
        $scope.totalTax = 0;
        for (var i = 0; i < $scope.foodList.length; i++) {
          var food = $scope.foodList[i];
          $scope.totalTax += parseInt(food.foodCategory.foodItemTax);
        }
        $scope.taxes = $scope.totalTax;
        return $scope.totalTax;
      };

      $scope.getTaxDetails = function () {
        return $scope.taxes;
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
        var newOrder = {
          outletId: $scope.outletId,
          outletName: $scope.outletName,
          brandId: $scope.brandId,
          brandName: $scope.brandName,
          customerName: $scope.customerName,
          customerPhone: $scope.customerPhone,
          orderItems: $scope.foodList,
          orderTotal: $scope.finalSum,
          orderTax: $scope.finalTax,
        };
        console.log(newOrder);
        outletService
          .createOrderTakeAway(newOrder)
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

    // LOADING READY ORDERS
    $scope.readyOrders = function () {
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      console.log(data._id);
      outletService
        .getReadyStatusOrders(data._id)
        .then(function (res) {
          $scope.allPrepare = res.data.statusReady;

          // console.log($scope.allPrepare);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    $scope.allOutletOrders = function () {
      $scope.loading = true;
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      console.log(data);
      outletService
        .getOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.order;
          // console.log($scope.allOrders);
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

    // DINE IN ORDERS
    $scope.dineInOrders = function () {
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      $scope.loading = true;
      // console.log(data)
      outletService
        .getDineInOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.dineIn;
          $scope.loading = false;
          // console.log($scope.allOrders);
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

    // TAKE AWAY ORDERS
    $scope.takeAwayOrders = function () {
      $scope.loading = true;
      var data = JSON.parse(localStorage.getItem('outletInfo'));
      outletService
        .getTakeAwayOrders(data._id)
        .then(function (res) {
          $scope.allOrders = res.data.takeAway;
          // console.log($scope.allOrders);
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
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
          // console.log(res);
          if (orderStatus == 'Preparing') {
            alert('Item ready to serve! Click on READY ORDERS!');
          } else if ((orderStatus = 'Ready')) {
            alert('Item served!');
          }
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // $scope.statusReadyButton = function (id, orderStatus) {
    //   var status = orderStatus == 'Preparing' ? 'Ready' : 'Served';
    //   outletService
    //     .updateStatus(id, status)
    //     .then(function (res) {
    //       console.log(res);
    //       // Update local $scope object to reflect the updated status
    //       var index = $scope.allPrepare.findIndex(function (prepare) {
    //         return prepare._id === id;
    //       });
    //       if (index >= 0) {
    //         $scope.allPrepare[index].orderStatus = status;
    //       }

    //       // Show success message
    //       if (orderStatus == 'Preparing') {
    //         alert('Item ready to serve! Click on READY ORDERS!');
    //       } else if (orderStatus == 'Ready') {
    //         alert('Item served!');
    //       }
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // };

    // UPDATE ORDER STATUS TO CANCELLED
    $scope.order = [];
    $scope.statusCancelledButton = function (id, order) {
      console.log(id, order);
      outletService
        .updateCancelledStatus(id)
        .then(function (res) {
          // console.log(res);
          alert('Item cancelled!');
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  },
]);
