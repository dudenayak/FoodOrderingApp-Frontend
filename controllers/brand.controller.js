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
  'brandService',
  '$state',
  function ($scope, $element, $window, $http, brandService, $state) {
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
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.brandData = data;
    $scope.brandUsername = data.username;
    $scope.saveOutlet = function ($event) {
      $scope.showPassword = false;
      $event.preventDefault();
      $scope.outletManager.name = data.brandName;
      $scope.outletManager.id = data.brandId;
      brandService
        .createOutletManager($scope.outletManager)
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
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.saveSuper = function ($event) {
      alert('Super Category Added!')
      $window.location.reload();
      // var formData = new FormData();
      // $scope.superCategoryName = $scope.superFood.superCategoryName;
      // $scope.superCategoryDescription = $scope.superFood.superCategoryDescription;
      // $scope.brandName = $scope.superFood.brandName;
      // $scope.superCategoryName = $scope.superFood.superCategoryName;
      // formData.append('superCategoryName', $scope.superFood.superCategoryName);
      // formData.append('file', $scope.superFood.superCategoryImage);
      // console.log($scope.superFood.superCategoryImage);
      // formData.append(
      //   'superCategoryDescription',
      //   $scope.superFood.superCategoryDescription
      // );
      // formData.append('brandName', data.brandName);
      // console.log(data.brandName);
      // console.log(data.brandId);
      // formData.append('brandId', data.brandId);

      $event.preventDefault();
      // console.log($scope.superFood);
      // $scope.superCategoryDescription = $scope.superFood.superCategoryDescription;
      // $scope.superItem = {};
      $scope.superFood.brandId = data.brandId;
      $scope.superFood.brandName = data.brandName;
      console.log($scope.superFood.brandId);
      console.log($scope.superFood.brandName);
      brandService
        .createSuper($scope.superFood)
        .then(function (res) {
          console.log(res);
          // $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // ADD SUB CATEGORY
    $scope.saveSub = function ($event) {
      alert('Sub Category Added!')
      $window.location.reload();
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
      // $window.location.reload();
      // $event.preventDefault();
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
      $event.preventDefault();
      $window.location.reload();
      brandService
        .createFood(formDataFood, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined },
        })
        .then(function (res) {
          console.log(res);
          // alert('Item added successfully!');
          // $window.location.reload();
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
        $scope.allSub = res.data.subFood;
        $scope.selectedSubCategory = $scope.allSub[0];
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
        $scope.allSuper = res.data.superFood;
        $scope.selectedSuperCategory = $scope.allSuper[0];
        // console.log($scope.allSuper);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING NUMBER OF FOOD ITEMS
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allFood = [];
    brandService
      .getFoodBrand(data.brandId)
      .then(function (res) {
        $scope.allFood = res.data.foodItemBrand;
        // console.log($scope.allFood);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING SUM PER BRAND
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.allBrandTotal = [];
    brandService
      .getOrderSumBrand(data.brandId)
      .then(function (res) {
        // console.log(res.data.superFood[0].brand.brandId);
        $scope.allBrandTotal = res.data.brandRevenue[0];
        // console.log($scope.allBrandTotal);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING BEST OUTLET PER BRAND
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.profitableOutletBrand = [];
    brandService
      .getProfitableOutletBrand(data.brandId)
      .then(function (res) {
        $scope.profitableOutletBrand = res.data.profitableOutletBrand[0];
        // console.log($scope.profitableOutletBrand);
      })
      .catch(function (err) {
        console.log(err);
      });

    // LOADING ORDER CREATED PER BRAND
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.orderCreatedBrand = [];
    brandService
      .getOrderCreatedBrand(data.brandId)
      .then(function (res) {
        $scope.orderCreatedBrand = res.data.orderCreatedBrand[0];
        // console.log($scope.orderCreatedBrand);
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
    $scope.pageno = 0;
    $scope.next = function () {
      $scope.loading = true;
      $scope.allOutlets = [];
      brandService
        .getOutlets(data.brandId, ++$scope.pageno)
        .then(function (res) {
          $scope.allOutlets = res.data.outlet;
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
      brandService
        .getOutlets(data.brandId, --$scope.pageno)
        .then(function (res) {
          $scope.allOutlets = res.data.outlet;
          $scope.loading = false;
        })
        .catch(function (err) {
          console.log(err);
          $scope.loading = false;
        });
    };

    var data = JSON.parse(localStorage.getItem('user'));
    // console.log(data.brandId)
    $scope.loading = true;
    $scope.allOutlets = [];
    brandService
      .getOutlets(data.brandId, 0)
      .then(function (res) {
        // console.log(res);
        $scope.allOutlets = res.data.outlet;
        // $scope.selectedOutlet = $scope.allOutlets[0];
        $scope.loading = false;
        // console.log($scope.allOutlets);
      })
      .catch(function (err) {
        console.log(err);
        $scope.loading = false;
      });

    // LOADING OUTLET MANAGER
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.loading = true;
    $scope.allManagers = [];
    brandService
      .getOutletManagers(data.brandId, $scope.pageno)
      .then(function (res) {
        $scope.allManagers = res.data.userData;
        // console.log($scope.allManagers);
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
          // console.log($scope.outlet);
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

    // GET SALES BUTTON
    $scope.testOutlet = function () {
      $scope.dataId = $scope.selectedOutlet._id;
      // $scope.selectedOutlet = $scope.allOutlets[0];
      // console.log($scope.selectedOutlet);

      // GET SALES PER OUTLET
      $scope.salesPerOutlet = [];
      var dateOutletLabel = [];
      var countOutletDataset = [];
      var revenueOutletDataset = [];
      brandService
        .getSalesPerOutlet(data.brandId, $scope.dataId)
        .then(function (res) {
          $scope.salesPerOutlet = res.data.salesPerOutlet;
          // console.log($scope.salesPerOutlet);
          for (var i = 0; i < $scope.salesPerOutlet.length; i++) {
            dateOutletLabel.push($scope.salesPerOutlet[i]._id.date);
            countOutletDataset.push($scope.salesPerOutlet[i].totalOrders);
            revenueOutletDataset.push($scope.salesPerOutlet[i].totalSales);
          }
          if (chart) {
            chart.destroy();
          }
          chart = new Chart('myChart', {
            type: 'bar',
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
                      max: 20,
                    },
                  },
                ],
              },
              title: {
                display: true,
                text: 'Order per Outlet',
                position: 'bottom',
              },
            },
          });
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
                      max: 10000,
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

          $scope.ratioPerOutlet = [];
          var statusTypeLabel = [];
          var statusCountDataset = [];
          brandService
            .getRatioPerOutlet(data.brandId, $scope.dataId)
            .then(function (res) {
              $scope.ratioPerOutlet = res.data.ratioPerOutlet;
              // console.log($scope.ratioPerOutlet);
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
                    text: 'Revenue per Outlet',
                    position: 'bottom',
                  },
                },
              });
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  },
]);
