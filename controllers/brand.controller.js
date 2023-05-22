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
  '$element',
  '$window',
  '$http',
  'socketService',
  'brandService',
  'outletService',
  'brandFactory',
  '$state',
  function (
    $scope,
    $element,
    $window,
    $http,
    socketService,
    brandService,
    outletService,
    brandFactory,
    $state
  ) {
    var userData = JSON.parse(localStorage.getItem('user'));
    var chart;
    $scope.showPassword = false;
    // IMAGE TEST
    $scope.imageTest = function () {
      console.log($scope.superFood.superCategoryImage);
    };
    $scope.imageTestnew = function () {
      console.log($scope.foodItem.foodItemImage);
    };

    // FORM DATA EMPTY
    $scope.outletManager = {
      username: '',
      password: '',
      phone: '',
      email: '',
      outletName: '',
      outletAddress: '',
      outletPhone: '',
    };

    $element.on('hidden.bs.modal', function () {
      $scope.$apply(function () {
        $scope.outletManager = {};
      });
    });

    $scope.superFood = {
      superCategoryName: '',
      superCategoryImage: '',
      superCategoryDescription: '',
    };

    $element.on('hidden.bs.modal', function () {
      $scope.$apply(function () {
        $scope.superFood = {};
      });
    });

    $scope.foodItem = {
      foodItemName: '',
      foodItemImage: '',
      foodItemPrice: '',
    };

    $element.on('hidden.bs.modal', function () {
      $scope.$apply(function () {
        $scope.foodItem = {};
      });
    });

    $scope.brandUser = {
      username: '',
      phone: '',
      email: '',
    };

    $element.on('hidden.bs.modal', function () {
      $scope.$apply(function () {
        $scope.brandUser = {};
      });
    });

    // TEST
    $scope.test = function () {
      // console.log($scope.selectedSuperCategory);
    };

    $scope.testSub = function () {
      // console.log($scope.selectedSubCategory);
    };

    // ADD OUTLET INFO AND OUTLET MANAGER INFO
    $scope.brandData = userData;
    $scope.brandUsername = userData.username;
    $scope.saveOutlet = function ($event) {
      $scope.showPassword = false;
      $event.preventDefault();
      $scope.outletManager.name = userData.brandName;
      $scope.outletManager.id = userData.brandId;
      brandFactory
        .outletManager($scope.outletManager)
        .then(function (res) {
          console.log(res);
          alert('Outlet and manager created!');
          $window.location.reload();
        })
        .catch(function (err) {
          alert('Enter valid data!');
          console.log(err);
        });
    };

    // ADD SUPER CATEGORY

    // formData.append('image2', file2);
    $scope.saveSuper = function ($event) {
      alert('Super Category Added!');
      $window.location.reload();
      $event.preventDefault();
      $scope.superFood.brandId = userData.brandId;
      $scope.superFood.brandName = userData.brandName;
      // console.log($scope.superFood.brandId);
      // console.log($scope.superFood.brandName);
      brandFactory
        .createSuper($scope.superFood)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // ADD SUB CATEGORY
    $scope.saveSub = function ($event) {
      alert('Sub Category Added!');
      $window.location.reload();
      $event.preventDefault();
      // console.log($scope.selectedSuperCategory);
      $scope.subFood.brandName = $scope.selectedSuperCategory.brand.brandName;
      $scope.subFood.brandId = $scope.selectedSuperCategory.brand.brandId;
      $scope.subFood.superName = $scope.selectedSuperCategory.superCategoryName;
      $scope.subFood.superId = $scope.selectedSuperCategory._id;
      // console.log(data.id);
      // console.log(data.brandName);
      brandFactory
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
    $scope.saveFood = function ($event) {
      alert('Item added successfully!');
      console.log($scope.foodItem);
      var formDataFood = new FormData();
      formDataFood.append('foodItemName', $scope.foodItem.foodItemName);
      formDataFood.append('file', $scope.foodItem.foodItemImage);
      formDataFood.append('foodItemPrice', $scope.foodItem.foodItemPrice);
      formDataFood.append('foodItemTax', $scope.foodItem.foodItemTax);
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
      $event.preventDefault();
      $window.location.reload();
      brandService
        .createFood(formDataFood, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined },
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOADING SUB
    $scope.allSub = [];
    brandService
      .getSub(userData.brandId)
      .then(function (res) {
        $scope.allSub = res.data.subFood;
        $scope.selectedSubCategory = $scope.allSub[0];
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING SUPER
    $scope.allSuper = [];
    brandService
      .getSuper(userData.brandId)
      .then(function (res) {
        $scope.allSuper = res.data.superFood;
        $scope.selectedSuperCategory = $scope.allSuper[0];
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING NUMBER OF FOOD ITEMS
    $scope.allFood = [];
    brandService
      .getFoodBrand(userData.brandId)
      .then(function (res) {
        $scope.allFood = res.data.foodItemBrand;
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING SUM PER BRAND
    $scope.allBrandTotal = [];
    brandService
      .getOrderSumBrand(userData.brandId)
      .then(function (res) {
        $scope.allBrandTotal = res.data.brandRevenue[0];
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING BEST OUTLET PER BRAND
    $scope.profitableOutletBrand = [];
    brandService
      .getProfitableOutletBrand(userData.brandId)
      .then(function (res) {
        $scope.profitableOutletBrand = res.data.profitableOutletBrand[0];
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING ORDER CREATED PER BRAND
    $scope.orderCreatedBrand = [];
    brandService
      .getOrderCreatedBrand(userData.brandId)
      .then(function (res) {
        $scope.orderCreatedBrand = res.data.orderCreatedBrand[0];
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING OUTLETS
    $scope.pageno = 0;
    $scope.next = function () {
      $scope.loading = true;
      brandFactory.outletInfo(
        userData.brandId,
        ++$scope.pageno,
        function (res) {
          $scope.allOutlets = res;
        }
      );
      $scope.loading = false;
    };
    $scope.previous = function () {
      $scope.loading = true;
      brandFactory.outletInfo(
        userData.brandId,
        --$scope.pageno,
        function (res) {
          $scope.allOutlets = res;
        }
      );
      $scope.loading = false;
    };
    $scope.loading = true;
    $scope.allOutlets = [];
    brandFactory.outletInfo(userData.brandId, 0, function (res) {
      $scope.allOutlets = res;
    });

    // LOADING OUTLET MANAGER
    $scope.loading = true;
    $scope.allManagers = [];
    brandService
      .getOutletManagers(userData.brandId, $scope.pageno)
      .then(function (res) {
        $scope.allManagers = res.data.userData;
        $scope.loading = false;
      })
      .catch(function (err) {
        console.log(err);
        $scope.loading = false;
      });

    // UPDATE OUTLET STATE
    $scope.handleToggle = function (res, _id) {
      if (res == true) {
        if (confirm('Are you sure you want to toggle off?')) {
          $http
            .put(
              'http://localhost:5000/api/outlet/' + _id + '/false',
              $scope.outlet
            )
            .then(function (res) {
              $window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      } else if (res == false) {
        if (confirm('Are you sure you want to toggle on?')) {
          $http
            .put(
              'http://localhost:5000/api/outlet/' + _id + '/true',
              $scope.outlet
            )
            .then(function (res) {
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
          $scope.outlet = outletData;
          console.log($scope.outlet);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // UPDATE OUTLET DATA
    $scope.saveOutletData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        brandService
          .updateOutlet($scope.outlet._id, $scope.outlet)
          .then(function (res) {
            console.log($scope.outlet.id);
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    // GET SALES BUTTON
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.getSalesButton = function () {
      $scope.dataId = $scope.selectedOutlet._id;

      // LOADING AVG TIME PER OUTLET
      $scope.avgTime = [];
      brandService
        .getAvgTime($scope.dataId)
        .then(function (res) {
          $scope.avgTime = res.data.averageTime[0];
        })
        .catch(function (err) {
          console.log(err);
        });

      // LOADING PREDICTED ORDERS PER OUTLET
      $scope.predictedOrders = [];
      brandService
        .getPrediction($scope.dataId)
        .then(function (res) {
          $scope.predictedOrders = res.data.predictOrders[0].predictedOrders[0];
        })
        .catch(function (err) {
          console.log(err);
        });

      // LOADING AVG ORDER TOTAL PER OUTLET
      $scope.avgOrderTotal = [];
      brandService
        .getAvgOrderValue($scope.dataId)
        .then(function (res) {
          $scope.avgOrderTotal = res.data.avgOrderTotal[0];
          // console.log($scope.avgOrderTotal);
        })
        .catch(function (err) {
          console.log(err);
        });

      // LOADING TOP SELLING ITEMS PER OUTLET
      $scope.topItems = [];
      outletService.recommendedItems($scope.dataId)
      .then(function (res) {
        $scope.topItems = res.data.recommendedItems;
        console.log($scope.topItems);
      })
      .catch(function (err) {
        console.log(err);
      });

      // GET SALES PER OUTLET
      $scope.salesPerOutlet = [];
      socketService.getSocketInstance().on('newOrder', function (socketData) {
        if (socketData.outlet.outletId == data._id) {
          $scope.$apply(function () {
            $scope.salesPerOutlet.push(socketData);
            // console.log($scope.allPrepare);
          });
        }
        console.log(socketData);
      });
      var dateOutletLabel = [];
      var countOutletDataset = [];
      var revenueOutletDataset = [];
      brandService
        .getSalesPerOutlet(data.brandId, $scope.dataId)
        .then(function (res) {
          $scope.salesPerOutlet = res.data.salesPerOutlet;
          // console.log($scope.salesPerOutlet)
          for (var i = 0; i < $scope.salesPerOutlet.length; i++) {
            dateOutletLabel.push($scope.salesPerOutlet[i]._id.date);
            countOutletDataset.push($scope.salesPerOutlet[i].totalOrders);
            revenueOutletDataset.push($scope.salesPerOutlet[i].totalSales);
          }
          if (chart) {
            chart.destroy();
          }
          chart = new Chart('myChart', {
            type: 'line',
            data: {
              labels: dateOutletLabel,
              datasets: [
                {
                  label: 'Number of Orders',
                  data: countOutletDataset,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      // max: 20,
                    },
                  },
                ],
              },
              title: {
                display: true,
                text: 'Orders per Outlet',
                position: 'bottom',
              },
            },
          });
          // Dynamically set the maximum value of the y-axis
          const maxOrders = Math.max(...countOutletDataset);
          chart.options.scales.yAxes[0].ticks.suggestedMax =
            maxOrders + maxOrders * 0.1;
          chart.update();

          chart = new Chart('myChart1', {
            type: 'bar',
            data: {
              labels: dateOutletLabel,
              datasets: [
                {
                  label: 'Revenue of Orders',
                  data: revenueOutletDataset,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Revenue',
                    },
                  },
                ],
              },
              title: {
                display: true,
                text: 'Revenue per Outlet',
                position: 'bottom',
              },
            },
          });

          // Dynamically set the maximum value of the y-axis
          const maxRevenue = Math.max(...revenueOutletDataset);
          chart.options.scales.yAxes[0].ticks.suggestedMax =
            maxRevenue + maxRevenue * 0.1;
          chart.update();

          $scope.ratioPerOutlet = [];
          socketService
            .getSocketInstance()
            .on('newOrder', function (socketData) {
              if (socketData.outlet.outletId == data._id) {
                $scope.$apply(function () {
                  $scope.ratioPerOutlet.push(socketData);
                  // console.log($scope.allPrepare);
                });
              }
              console.log(socketData);
            });
          var statusTypeLabel = [];
          var statusCountDataset = [];
          brandService
            .getRatioPerOutlet(data.brandId, $scope.dataId)
            .then(function (res) {
              $scope.ratioPerOutlet = res.data.ratioPerOutlet;
              for (var i = 0; i < $scope.ratioPerOutlet.length; i++) {
                statusTypeLabel.push($scope.ratioPerOutlet[i]._id);
                statusCountDataset.push($scope.ratioPerOutlet[i].count);
              }
              chart = new Chart('myChart2', {
                type: 'doughnut',
                data: {
                  labels: statusTypeLabel,
                  datasets: [
                    {
                      label: 'Revenue of Orders',
                      data: statusCountDataset,
                      backgroundColor: [
                        'rgba(50, 205, 50, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                      ],
                      borderColor: [
                        'rgba(50, 205, 50, 1)',
                        'rgba(255, 99, 132, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  title: {
                    display: true,
                    text: 'Orders served/cancelled per Outlet',
                    position: 'bottom',
                  },
                },
              });
            });

          $scope.orderPerHour = [];
          var orderTypeLabel = [];
          var orderCount = [];
          brandService.getOrderPerHour($scope.dataId).then(function (res) {
            $scope.orderPerHour = res.data.orderPerHour;
            // console.log($scope.orderPerHour);
            for (var i = 0; i < $scope.orderPerHour.length; i++) {
              orderTypeLabel.push($scope.orderPerHour[i]._id);
              orderCount.push($scope.orderPerHour[i].count);
            }
            chart = new Chart('myChart3', {
              type: 'line',
              data: {
                labels: orderTypeLabel,
                datasets: [
                  {
                    label: 'Number of Orders',
                    data: orderCount,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        // max: 20,
                      },
                    },
                  ],
                },
                title: {
                  display: true,
                  text: 'Orders per Hour',
                  position: 'bottom',
                },
              },
            });
          });
          // Dynamically set the maximum value of the y-axis
          const maxOrderPerHour = Math.max(...orderCount);
          chart.options.scales.yAxes[0].ticks.suggestedMax =
            maxOrderPerHour + maxOrderPerHour * 0.1;
          chart.update();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('outletInfo');
      $state.go('login');
    };
  },
]);
